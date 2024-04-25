import React, { useState } from 'react'
import SubPageTitle from '../../components/ais/SubPageTitle'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Service from '../../utils/aisService'

type Props = {}

// Save Form
export async function action({ request, params }){
   const id = params?.jobId || 0;
   const formData = await request.formData()
   let data = Object.fromEntries(formData)
       data.status = data.status == 1
   let resp;
    if(id != 0) 
      resp = await Service.updateJob(id,data);
    else
      resp = await Service.postJob(data);
   
    if(resp){
      return redirect(`/ais/jobs`)
    }
} 
// Load Data of Single 
export async function loader({ params }){
   let data = { id: '' };
  
   const id = params?.jobId || 0;
   if(id != 0)
     data = await Service.fetchJob(id)
   return { data }
}

function PgAISJobForm({}: Props) {
  
  const navigate = useNavigate()
  const { data }: any = useLoaderData();
  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle title={`${data?.id ? 'Edit':'Create'} Job Designation`} page="Jobs" />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
         <section className="flex md:space-x-6">
           <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
              <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary/70">{data?.id ? 'Edit':'Create'} Job Designation</h1>
              <div className="flex items-center space-x-2 text-zinc-400 text-base">
                 <span className="text-xs md:text-base tracking-wider">Please provide neccessary information</span>
              </div>
            </div>
         </section>

         <Form method="post" className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-4">
             {/* Record */}
             <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">General Information</h1>
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Title</span>
                      <input arial-label="title" name="title" defaultValue={data?.title} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Type</span>
                      <select arial-label="type" name="type" defaultValue={data?.type} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="ACADEMIC">ACADEMIC</option>
                        <option value="NON_ACADEMIC">NON-ACADEMIC</option>
                      </select>
                  </label>
                 
               </div>
             </div>

             <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Staff Category</span>
                      <select arial-label="staffCategory" name="staffCategory" defaultValue={data?.staffCategory} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="JS">JUNIOR STAFF</option>
                        <option value="SS">SENIOR STAFF</option>
                        <option value="SM">SENIOR MEMBER/FELLOW</option>
                      </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Status</span>
                      <select arial-label="status" name="status" defaultValue={Number(data?.status)} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="0">Disabled</option>
                        <option value="1">Enabled</option>
                      </select>
                  </label>
                 
                 <div className="flex items-center">
                    {/* <input type="hidden" name="studentId" defaultValue={data?.id} /> */}
                    <button className="mr-4 py-1 px-4 w-4/5 rounded-md bg-primary/70 text-white font-semibold" type="submit">SAVE</button>
                    <button onClick={() => { if(confirm('Cancel')) navigate(-1) }} className="py-1 px-4 rounded-md  bg-slate-50 border text-sm text-gray-600" type="button">CANCEL</button>
                  </div>
                  
                </div>
             </div>
             
         </Form>
        
      </div>
    </main>
  )
}

export default PgAISJobForm