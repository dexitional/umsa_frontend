import React from 'react'
import Service from '../../utils/fmsService'
import { useLoaderData } from 'react-router';
import FMSFinanceCard from '../../components/fms/FMSFinanceCard';


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchAccount(params.accountId);
   return { data }
}

function PgFMSStudentFinance({}: Props) {
  const { data } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <FMSFinanceCard data={data} />
    </div>
  )
}

export default PgFMSStudentFinance