import React from 'react'
import Service from '../../utils/fmsService'
import { useLoaderData } from 'react-router';
import FMSBillActivityCard from '../../components/fms/FMSBillActivityCard';


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchBillActivity(params.billId);
   console.log(data)
   return { data }
}

function PgFMSBillActivity({}: Props) {
  const { data } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <FMSBillActivityCard data={data} />
    </div>
  )
}

export default PgFMSBillActivity