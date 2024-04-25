import React, { useState } from 'react'
import VoterCard from './VoterCard'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router';

export async function loader({ params }){
  const data = await Service.fetchElection(params.eid);
  console.log(params,data)
  return { data }
}

function PgRegister() {
  const { data }:any = useLoaderData();
  const [ keyword,setKeyword ] = useState('')
  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <h1 className="px-4 py-2.5 flex items-center justify-between text-xl rounded bg-blue-950/80 font-semibold text-white">
          <span className="text-white">VOTERS REGISTER</span>
          <span className="p-0.5 px-2 rounded bg-purple-50 text-base text-blue-950 font-extrabold tracking-wider">{data?.voterData?.length}</span>
        </h1>
        <div className="py-4 px-2 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
        <div className="mx-2 px-6 py-1 rounded-full text-base text-center text-blue-950 font-medium tracking-widest bg-slate-200/70">
            <input type="search" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Register with keyword ..." className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none" />
        </div>
        <div className="px-2 py-2 bg-zinc-200/50 shadow-inner">
            <div className="px-2 py-2 bg-white rounded">
              <div className="w-full h-96 grid grid-cols-1 md:grid-cols-2 gap-2 place-content-start overflow-y-scroll">
                  { data?.voterData?.filter((r:any) => r?.tag?.toLowerCase().includes(keyword?.toLowerCase()) || r?.name?.toLowerCase().includes(keyword?.toLowerCase()) )?.map((row:any) => (<VoterCard data={row} vmask={data?.allowMask} />))}
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PgRegister