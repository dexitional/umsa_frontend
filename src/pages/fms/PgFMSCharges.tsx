import React, { useState } from 'react'
import Service from '../../utils/fmsService'
import { redirect, useLoaderData } from 'react-router'
import ChargeListView from '../../components/fms/ChargeListView'
import ChargeCardItem from '../../components/fms/ChargeCardItem'
import PageTitle from '../../components/fms/PageTitle'
type Props = {}


export async function action({ params }) {
  const data = await Service.deleteCharge(params.chargeId);
  if(data) return redirect('/fms/charges')
  return null
}

export async function loader({ request }) {
  const search = new URL(request.url).searchParams.get('search') || '';
  const page = new URL(request.url).searchParams.get('page') || 1;
  const data = await Service.fetchCharges(search,page);
  console.log(data)
  return { data, search, page }
}

function PgFMSCharges({}: Props) {
  const [ view, setView ] = useState('card')
  const { data: { data, totalPages,totalData }, page, search }: any = useLoaderData()
  
  return (
    <div className="md:pl-10 p-4 md:p-6 space-y-4 md:space-y-10">
      <PageTitle title="Student Charges" createtext="Create" createlink="create" pages={totalPages} setView={setView} view={view} />
      <div className="">
         { view == 'card' && (
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              { data && data?.map((row:any) => (<ChargeCardItem key={row.id} data={row} /> ))}
              { !data && (<div className="p-3 border rounded-xl"><h1 className="w-full text-center text-gray-400/70 text-[0.65rem] font-semibold tracking-widest uppercase">No Records ...</h1></div>)}
            </div>
          )}

         { view == 'list' && (<ChargeListView data={data} />)}
      </div>
    </div>
  )
}

export default PgFMSCharges