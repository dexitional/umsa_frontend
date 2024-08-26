import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import PageTitle from '../../components/ais/PageTitle'
import ProgressionCardItem from '../../components/ais/ProgressionCardItem'
import Service from '../../utils/aisService'
type Props = {}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchProgression(search,page);
  return { data, search, page }
}

function PgAISProgressions({}: Props) {
  const [ view, setView ] = useState('card')
  const { data }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Progressions" createtext="" createlink="" pages={data?.totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className={`grid ${data?.data?.length ? 'md:grid-cols-3':'md:grid-cols-2 justify' } gap-3 md:gap-6`}>
              { data?.data?.map((row:any) => (<ProgressionCardItem key={row.id} data={row} /> ))}
              { !data?.data?.length && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         {/* { view == 'list' && (
           <ProgressionListView data={data?.data} />
         )} */}
         
      </div>
    </div>
  )
}

export default PgAISProgressions