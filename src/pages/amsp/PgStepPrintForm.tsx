import React, { useState } from 'react'
import Service from '../../utils/amsService'
import { Outlet, redirect, useLoaderData } from 'react-router'
import FormTemplate from '../../components/ams/FormTemplate'
import { useUserStore } from '../../utils/authService'

type Props = {}

// Loader for Single Project
export async function loader({ params }){
  const { user } = useUserStore.getState() ?? null;
  const serial = user?.user?.tag
  const applicant = await Service.fetchApplicant(serial)
  const data = await Service.fetchApplicantPreview(serial)
  return { data,applicant }
}

function PgStepPrintForm({}: Props) {
  const { data,applicant } :any = useLoaderData();
  return (
    <main className="p-2">
      <div className="p-3 border bg-slate-50/50 rounded-xl space-y-4">
         <section>
             <div className="p-2 w-fit md:w-full md:py-4 md:px-6 flex flex-col space-y-3 md:space-y-6 border rounded-md md:rounded-xl bg-white overflow-x-scroll">
               <FormTemplate data={{ applicant,data }}/>
             </div> 
         </section>
      </div>
    </main>
  )
}

export default PgStepPrintForm