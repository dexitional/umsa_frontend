import React from 'react'
import Service from '../../utils/evsService'
import { redirect, useLoaderData } from 'react-router';
import { BsActivity } from 'react-icons/bs';
import AISStudentCard from '../../components/ais/AISStudentCard';
import EVSCandidateCard from '../../components/evs/EVSCandidateCard';

type Props = {}

export async function action({ params }) {
  await Service.deleteCandidate(params.candidateId);
  return redirect(`../../candidates`)
}

export async function loader({ params }){
   const data = await Service.fetchVotes(params.electionId);
   return { data }
}

function PgEVSCandidates({}: Props) {
  const { data: { portfolios } } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
       <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
          { portfolios && portfolios.map((row:any,i: number) => (
            <EVSCandidateCard key={row?.title} title={row?.title?.toUpperCase()} data={row?.candidates} />
          ))}
          { !portfolios.length ? (
              <div className="p-10 border border-primary/10 rounded-xl flex flex-col items-center justify-center space-y-3">
                <BsActivity className="h-20 w-20 text-primary/30 border rounded-md" />
                <span className="text-primary/40 font-medium">No Records ...</span>
              </div>
          ) : null}
       </div>
    </div>
  )
}

export default PgEVSCandidates