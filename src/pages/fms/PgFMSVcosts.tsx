import React, { useState } from 'react'
import PageTitle from '../../components/fms/PageTitle'
import Service from '../../utils/fmsService'
import { redirect, useLoaderData } from 'react-router'
import VcostListView from '../../components/fms/VcostListView'
import VcostCardItem from '../../components/fms/VcostCardItem'
type Props = {}



export async function action({ params }) {
  const data = await Service.deleteVcost(params.costId);
  return redirect(`/fms/vcosts`)
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchVcosts(search,page);
  return { data, search, page }
}

function PgFMSVcosts({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Voucher Prices" createtext="Create" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<VcostCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (<VcostListView data={data} />)}
      </div>
    </div>
  )
}

export default PgFMSVcosts