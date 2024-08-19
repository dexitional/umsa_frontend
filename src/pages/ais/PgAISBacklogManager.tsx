import React from 'react'
import Service from '../../utils/aisService'
import { useLoaderData } from 'react-router';
import AISSheetAccountCard from '../../components/ais/AISSheetAccountCard';


type Props = {}

export async function loader({ params }){
  const data = await Service.fetchSheet(params.sheetId)
  const isUser = await Service.checkUser(params.staffId)
   return { data,isUser }
}

function PgAISBacklogManager({}: Props) {
  const { data,isUser } :any = useLoaderData();
  console.log(isUser)
  return (
    <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-8 ">
       <AISSheetAccountCard data={data} isUser={isUser} />
    </div>
  )
}

export default PgAISBacklogManager