import React, { useState } from 'react'
import { redirect, useLoaderData } from 'react-router'
import CircularCardItem from '../../components/ais/CircularCardItem'
import PageTitle from '../../components/ais/PageTitle'
import Service from '../../utils/aisService'
type Props = {}

export async function action({ request,params }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  console.log(url)
  if(pathname.endsWith('send'))
    await Service.sendNotice(params.noticeId);
  else 
    await Service.deleteNotice(params.noticeId);
  
  return redirect("/ais/notices");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchNotices(search,page);
  return { data, search, page }
}

function PgAISCirculars({}: Props) {
  const [ view, setView ] = useState('card')
  const { data }: any = useLoaderData()
  console.log(data)
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Circulars" createtext="New" createlink="create" pages={data?.totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data?.data && data?.data?.map((row:any) => (<CircularCardItem key={row.id} data={row} /> ))}
              { !data?.data?.length && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         {/* { view == 'list' && (
           <ResitSessionListView data={data} />
         )} */}
         
      </div>
    </div>
  )
}

export default PgAISCirculars