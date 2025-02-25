import React, { useState } from 'react'
import { redirect, useLoaderData } from 'react-router'
import PageTitle from '../../components/ais/PageTitle'
import ProgramCardItem from '../../components/ais/ProgramCardItem'
import ProgramListView from '../../components/ais/ProgramListView'
import Service from '../../utils/aisService'
type Props = {}

export async function action({ params }) {
  await Service.deleteProgram(params.programId);
  return redirect("/ais/programs");
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchPrograms(search,page);
  return { data, search, page }
}

function PgAISPrograms({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Programs" createtext="New" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<ProgramCardItem key={row.id} data={row} /> ))}
              { !data?.data?.length && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         {/* { view == 'list' && (
           <ProgramListView data={data} />
         )} */}
         
      </div>
    </div>
  )
}

export default PgAISPrograms