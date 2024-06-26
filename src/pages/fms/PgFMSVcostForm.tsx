import React, { useState } from 'react'
import SubPageTitle from '../../components/ais/SubPageTitle'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Helper from '../../utils/aisService'
import Service from '../../utils/fmsService'
import moment from 'moment'

type Props = {}

// Save Form
export async function action({ request, params }){
   const id = params?.costId || 0;
   const formData = await request.formData()
   let data = Object.fromEntries(formData)
       data.amount = parseFloat(data.amount)
       data.sellType = Number(data.sellType)
      
    
   let resp;
    if(id != 0) 
      resp = await Service.updateVcost(id,data);
    else
      resp = await Service.postVcost(data);
   
    if(resp){
      return redirect(`/fms/vcosts`)
    }
} 
// Load Data of Single 
export async function loader({ params }){
   let data = { id: 0 };
   //const countries = await Service.fetchCountries()
  
  
   const id = params?.costId || 0;
   if(id != 0)
     data = await Service.fetchVcost(id)
  
   console.log(data)
   return { data }
}

function PgFMSScostForm({}: Props) {
  
  const navigate = useNavigate()
  const { data }: any = useLoaderData();
  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle title={`${data?.id ? 'Edit':'Create'} Price`} page="Voucher Prices" />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
         <section className="flex md:space-x-6">
           <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
              <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary/70">{data?.id ? 'Edit':'Create'} Price</h1>
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
                      <span className="text-sm md:text-base text-gray-500 font-medium">Voucher Form Title</span>
                      <input arial-label="title" name="title" defaultValue={data?.title} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md uppercase" />
                  </label>
                 <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Voucher Cost</span>
                      <input arial-label="amount" name="amount" defaultValue={data?.amount} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Currency</span>
                      <select arial-label="currency" name="currency" defaultValue={data?.currency} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        <option value="GHC">GHC</option>
                        <option value="USD">USD</option>
                      </select>
                  </label>
                 
                 
               </div>
             </div>

             <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               {/* <h1 className="py-0.5 px-4 w-fit text-base font-semibold rounded-md bg-blue-950/60 text-white tracking-widest uppercase -skew-x-6">SECURE PORTAL</h1> */}
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">Target Group Information</h1>
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm md:text-base text-gray-500 font-medium">Applicant Type</span>
                    <select arial-label="categoryId" name="categoryId" defaultValue={data?.categoryId} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                      <option selected disabled>-- Choose --</option>
                      <option value="CP">CERTIFICATE</option>
                      <option value="DP">DIPLOMA</option>
                      <option value="UG">UNDERGRADUATE</option>
                      <option value="PG">POST-GRADUATE</option>
                    </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm md:text-base text-gray-500 font-medium">Voucher Category</span>
                    <select arial-label="sellType" name="sellType" defaultValue={Number(data?.sellType)} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                      <option selected disabled>-- Choose --</option>
                      <option value="0">GENERAL</option>
                      <option value="1">MATURED</option>
                      <option value="2">INTERNATIONAL</option>
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

export default PgFMSScostForm