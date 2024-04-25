import React, { useEffect, useRef, useState } from 'react'
import SubPageTitle from '../../components/ais/SubPageTitle'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Helper from '../../utils/aisService'
import Service from '../../utils/amsService'
import moment from 'moment'
import { EditorState } from 'draft-js';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast'

type Props = {}

// Save Form
export async function action({ request, params }){
   const id = params?.letterId || 0;
   const formData = await request.formData()
   const signature = formData.get('signature');
   
   if (signature?.size && !signature?.type?.match("image.*")) {
     toast("Please upload an image file as signature!",{ className:'text-red-400 font-medium'});
     return false;
   } 
   
   let data = Object.fromEntries(formData)
       //data.signature = signature; // File Upload to Server
       if(signature?.size) data.signature = await Helper.convertBase64(signature) // Base64 conversion
       if(!signature?.size) delete data.signature;
       console.log(data)
   let resp;
    if(id != 0) 
      resp = await Service.updateLetter(id,data);
    else
      resp = await Service.postLetter(data);
   
    if(resp){
      // return redirect(`/ais/courses/${encodeURIComponent(resp.id)}/profile`)
      return redirect(`/ams/letters`)
    }
} 
// Load Data of Single 
export async function loader({ params }){
   const categories = await Helper.fetchCategories()
   let data = { id: '' }
   const id = params?.letterId || 0;
   if(id != 0) data = await Service.fetchLetter(id)
   return { data,categories }
}

function PgAMSLetterForm({}: Props) {
  const navigate = useNavigate()
  const { data,categories }: any = useLoaderData();
  const signRef:any = useRef(null);
  const tempRef:any = useRef(null);
  const fileRef:any = useRef(null);
  const [ file, setFile ] = useState(data?.signature);
  
  const signChange = (value) => signRef.current.value = value;
  const tempChange = (value) => tempRef.current.value = value;
  
  const fileChange = async (e) => {
    const f = e.target.files[0];
    if (f && f.type.match("image.*")) {
      try {
        const base64:any = await Helper.convertBase64(f);
        setFile(base64);
      } catch (err) {
        console.log(err);
      }
    }
  } 

  useEffect(() => {
    signRef.current.value = data?.signatory;
    tempRef.current.value = data?.template;
  },[])

  return (
    <main className="md:pl-10 p-2 md:p-6 space-y-4 md:space-y-10">
      <SubPageTitle title={`${data?.id ? 'Edit':'Create'} Letter`} page="Letters" />
      <div className="p-2 md:p-6 border bg-slate-50/50 rounded-xl space-y-6">
         <section className="flex md:space-x-6">
           <div className="flex-1 flex flex-col space-y-1 md:space-y-3">
              <h1 className="text-lg md:text-2xl tracking-wide font-semibold text-primary-accent/80">{data?.id ? 'Edit':'Create'} Letter</h1>
              <div className="flex items-center space-x-2 text-zinc-400 text-base">
                 <span className="text-xs md:text-base tracking-wider">Please provide neccessary information</span>
              </div>
            </div>
         </section>

         <Form method="post" className="grid gap-y-2 md:gap-y-0 md:gap-x-4" encType='multipart/form-data'>
             {/* Record */}
             <div className="p-3 md:py-6 md:pb-10 md:px-6 border rounded-lg md:rounded-xl bg-white space-y-3 md:space-y-6">
               <h1 className="py-0.5 px-2 md:px-4 w-fit text-xs md:text-base font-semibold rounded-md bg-primary-dark/60 text-white tracking-widest uppercase -skew-x-6">General Information</h1>
               <div className="md:pl-6 space-y-4">
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Title</span>
                      <input arial-label="title" name="title" defaultValue={data?.title} className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Letter Category</span>
                      <select arial-label="categoryId" name="categoryId" defaultValue={data?.categoryId} required className="focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md">
                        <option selected disabled>-- Choose --</option>
                        { categories && categories?.map((row:any) => (
                          <option key={row.id} value={row.id}>{row.title?.toUpperCase()}</option>
                        ))}
                      </select>
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Signature</span>
                      <div className="flex items-center space-x-4">
                        <input arial-label="title" name="signature" type="file" onChange={fileChange} className="flex-1 focus:ring-0 border focus:border-slate-300  border-primary-dark/10 bg-primary-dark/5 text-sm md:text-base text-gray-500 rounded-md" />
                        <div className="w-36 border rounded">
                          <img src={file} className="h-8 w-full object-cover" />
                        </div>
                      </div>
                  </label>
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Signatory</span>
                      <input type="hidden" ref={signRef} name="signatory" />
                      <ReactQuill theme="snow" value={data?.signatory} onChange={signChange} className="focus:ring-0 border focus:border-slate-300 border-primary-dark/10 bg-white/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  
                  <label className="flex flex-col space-y-2">
                      <span className="text-sm md:text-base text-gray-500 font-medium">Letter Template</span>
                      <input type="hidden" ref={tempRef} name="template" />
                      <ReactQuill theme="snow" value={data?.template} onChange={tempChange} className="focus:ring-0 border focus:border-slate-300 border-primary-dark/10 bg-white/5 text-sm md:text-base text-gray-500 rounded-md" />
                  </label>
                  <div className="flex items-center">
                    <button className="mr-4 py-1 px-4 w-4/5 rounded-md bg-primary-accent/80 text-white font-semibold" type="submit">SAVE</button>
                    <button onClick={() => { if(confirm('Cancel')) navigate(-1) }} className="py-1 px-4 rounded-md  bg-slate-50 border text-sm text-gray-600" type="button">CANCEL</button>
                  </div>
                 
                 
               </div>
             </div>

            
         </Form>
        
      </div>
    </main>
  )
}

export default PgAMSLetterForm