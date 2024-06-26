import React, { useState } from 'react'
import SubPageTitle from '../../components/fms/SubPageTitle'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Service from '../../utils/fmsService'
import moment from 'moment'

type Props = {}

// Save Form
export async function action({ request, params }){
   const id = params?.billId || 0;
   const formData = await request.formData()
   let data = Object.fromEntries(formData)
       data.createdAt = moment(data.createdAt)
       data.amount = parseFloat(data.amount)
       data.transtypeId = 2
       
    
   let resp;
    if(id != 0) 
      resp = await Service.updatePayment(id,data);
    else
      resp = await Service.postPayment(data);
   
    if(resp){
      return redirect(`/fms/payments`)
    }
} 
// Load Data of Single 
export async function loader({ params }){
   let data = { id: 0 };
  
   const id = params?.studentId || 0;
   if(id != 0)
     data = await Service.fetchPayment(id)
   return { data }
}

function PgFMSPaymentForm({}: Props) {
  
  const navigate = useNavigate()
  const { data }: any = useLoaderData();
  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle title={`${data?.id ? 'Edit':'Create'} Payment`} page="Payment" />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
         <section className="flex md:space-x-6">
           <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
              <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary/70">{data?.id ? 'Edit':'Create'} Payment</h1>
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
                    <span className="text-sm md:text-base text-gray-500 font-medium">Student ID</span>
                    <input arial-label="studentId" name="studentId" defaultValue={data?.studentId} required className="focus:ring-0 border focus:border-slate-300 border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm md:text-base text-gray-500 font-medium">Payment Currency</span>
                    <select arial-label="currency" name="currency" defaultValue={data?.currency} className="focus:ring-0 border focus:border-slate-300 border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                      <option selected disabled>-- Choose --</option>
                      <option value="GHC">GHC</option>
                      <option value="USD">USD</option>
                    </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                    <span className="text-sm md:text-base text-gray-500 font-medium">Payment Amount</span>
                    <input arial-label="amount" name="amount" defaultValue={data?.amount} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  
               </div>
             </div>

             <div className="p-3 md:py-6 md:pb-10 md:px-6 w-full border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Payment Date</span>
                      <input arial-label="createdAt" name="createdAt" type="datetime-local" defaultValue={data?.createdAt} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Bank Transaction ID</span>
                      <input arial-label="transtag" name="transtag" type="text" defaultValue={data?.transtag} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>

                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Payment Reference</span>
                      <input arial-label="reference" name="reference" type="text" defaultValue={data?.reference} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
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

export default PgFMSPaymentForm