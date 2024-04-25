import React, { useState } from 'react'
import SubPageTitle from '../../components/ams/SubPageTitle'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import { Form, Link } from 'react-router-dom'
import Service from '../../utils/amsService'
import { Outlet, redirect, useLoaderData } from 'react-router'
import { HiAcademicCap } from 'react-icons/hi2'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import FormTemplate from '../../components/ams/FormTemplate'

type Props = {}

// Post Shortlist / Activate shortlist
export async function action({ params }) {
  await Service.postShortlist({ serial: params.applicantId });
  return redirect("/ams/applicants");
}

// Loader for Single Project
export async function loader({ params }){
  const applicant = await Service.fetchApplicant(params.applicantId)
  const data = await Service.fetchApplicantPreview(params.applicantId)
  return { data,applicant }
}

function PgAMSApplicant({}: Props) {

  const { data,applicant } :any = useLoaderData();
  return (
    <main className="md:pl-10 p-3 md:p-6 space-y-3 md:space-y-10">
      <SubPageTitle title={``} page="APPLICANT" />
      <div className="relative p-3 md:p-6 w-full border bg-slate-50/50 rounded-xl md:space-y-6 space-y-4 ">
         <section className="flex flex-col md:flex-row md:space-y-0 space-y-3 space-x-2 md:space-x-6">
            <div className="hidden md:block p-2 md:p-2 h-16 w-16 md:h-24 md:w-24 border rounded-xl shadow-lg bg-white">
              <img src={applicant?.photo || Logo} className="h-12 w-12 md:h-20 md:w-20 object-contain" />
            </div>
             { !applicant?.sorted && applicant?.submitted ?
             <Form method="post" action={`/ams/applicants/${applicant?.serial}/shortlist`} onSubmit={(e)=> { if(!confirm("Shortlist Applicant?")) e.preventDefault(); return false; }}>
                <button type="submit" className="md:absolute md:right-6 md:top-6 px-4 py-1 border border-primary/50 hover:border-primary-accent/70 rounded-xl flex items-center justify-center space-x-2 bg-slate-50 group">
                  <span className="w-full text-primary/70 group-hover:text-primary-accent/70 hidden md:flex">Shortlist</span> 
                  <IoCheckmarkDoneCircleSharp className="h-6 w-6 text-primary/50 group-hover:text-primary-accent/70"/>
                </button>
             </Form>
              : null  
             }  
            
            <div className="flex-1 flex flex-col space-y-4 md:space-y-3">
              <div className="flex space-x-2">
                  <div className="block md:hidden p-2 md:p-4 h-16 w-16 border rounded-xl shadow-lg bg-white">
                    <img src={applicant?.photo || Logo} className="h-12 w-12 object-contain" />
                  </div>
                  <h1 className="text-md md:text-3xl md:tracking-wide leading-5 font-semibold text-primary/70">{(applicant?.profile?.fname+' '+(applicant?.profile?.mname ? applicant?.profile?.mname+' ':'')+applicant?.profile?.lname).toUpperCase()}</h1>
              </div>
              <div className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 text-zinc-400 text-lg">
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-1"> 
                    <span className="px-3 py-0.5 w-fit text-xs md:text-sm font-medium tracking-wider capitalize bg-primary rounded-md text-white">{applicant?.submitted ? `SUBMITTED` : 'IN-PROGRESS'}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 hidden md:flex"></div>
                    <span className="tracking-wider text-xs md:text-base capitalize">{applicant?.stage?.title?.toUpperCase()}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 hidden md:flex"></div>
                 </div>
                 <div className="flex items-center space-x-2">
                    <HiAcademicCap className="md:h-6 md:w-6 text-primary/70" />
                    {/* <span className="text-xs md:text-base tracking-wider font-medium capitalize">{data?.program?.longName}</span> */}
                    <span className="px-4 py-0.5 bg-white border border-primary/40 rounded-lg text-sm text-gray-500 font-medium relative">{applicant.choice?.program?.longName || 'No Program Set' }</span>
                </div>
              </div>
              {/* <code className="py-4 px-6 w-fit bg-primary-accent/5 text-gray-400 md:text-gray-500 text-xs md:text-sm font-roboto">{ReactHtml(data.signatory)}</code> */}
            </div>
         </section>
         <section>
             <div className="relative p-2 w-full md:py-4 md:px-6 flex flex-col space-y-3 md:space-y-6 border rounded-md md:rounded-xl bg-white">
                <FormTemplate data={{ applicant,data }}/>
             </div>
         </section>
      </div>
    </main>
  )
}

export default PgAMSApplicant