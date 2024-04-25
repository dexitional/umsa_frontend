import React, { useRef } from 'react'
import { HiUserAdd } from "react-icons/hi";
import { GoPasskeyFill } from "react-icons/go";
import { FaMoneyCheckDollar, FaRegIdCard } from 'react-icons/fa6';
import Service from '../../utils/aisService'
import { useUserStore } from '../../utils/authService';
import { TbPhotoCancel, TbPhotoEdit } from 'react-icons/tb';
import { redirect, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

type Props = {
    data?: any;
    isUser: boolean;
}

function AISSheetAccountCard({ data,isUser }: Props) {
  const navigate = useNavigate()
  const fileRef:any = useRef<HTMLInputElement>()
  
  const stageAccess = async () => {
    const ok = window.confirm("Setup User Access ?")
    if(ok){
      alert(data?.staffNo)
      const resp = await Service.stageStaffAccess(data?.staffNo);
      toast(`Username: ${data?.staffNo}, Password: ${resp.password}`,{
          duration: 20000,
          className: "bg-green-50 border rounded text-base font-semibold text-primary-dark"
      })
    }
  }

  const resetAccess = async () => {
    const ok = window.confirm("Reset User Account Password ?")
    if(ok){
      await Service.resetStaffAccess(data?.staffNo);
    }
  }

  const clickPhoto = (e) => {
    fileRef.current.click();
  }

  const changePhoto = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
      formData.append('photo',file);
      formData.append('tag',data?.staffNo);
    const resp = await Service.changePhoto(formData);
    if(resp) setTimeout(() => navigate(0), 1000)
  }

  const removePhoto = async () => {
    const ok = window.confirm("Remove User photo ?")
    if(ok){
      const resp = await Service.removePhoto(data?.staffNo);
      if(resp) setTimeout(() => navigate(0), 1000)
    }
  }

  
  return (
    <div className="w-full rounded flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
       <section className="w-full grid md:grid-cols-3 gap-2 md:gap-4">
         
          {/* Stage Account */} 
          { !isUser && 
            <button onClick={stageAccess} className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-accent/5 border border-primary-accent/20 shadow">
              <HiUserAdd className="text-primary-accent/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary-accent/20 rounded-full" />
              <span className="font-semibold text-sm md:text-base text-primary-accent/70 font-noto">Setup User Account</span>
            </button>
          }
          
              {/* Reset Account */}
              <button onClick={resetAccess} className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-accent/5 border border-primary-accent/20 shadow">
                <GoPasskeyFill className="text-primary-accent/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary-accent/20 rounded-full" />
                <span className="font-semibold text-sm md:text-base text-primary-accent/70 font-noto">Reset User Account</span>
              </button>
              
              {/* Index Number
              <button onClick={!data?.indexno ? generateIndex : undefined } className={`p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 ${data?.indexno ? 'bg-primary/5 border-primary/20 cursor-not-allowed':'bg-primary-accent/5 border-primary-accent/20' } border shadow`}>
                <GoPasskeyFill className={`${data?.indexno ? 'text-primary/60 border-primary/20':'text-primary-accent/60 border-primary-accent/20'} h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 rounded-full`} />
                <span className={`font-semibold text-sm md:text-base ${data?.indexno ? 'text-primary/50':'text-primary-accent/70'} font-noto`}>{data?.indexno ? 'Index Number Activated':'Generate Index Number'}</span>
              </button> */}
          
              {/* Stage Account */}
              <form action="post" encType='multipart/form-data' className="w-full">
                <button type="button" onClick={clickPhoto} className="w-full p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-accent/5 border border-primary-accent/20 shadow">
                  <TbPhotoEdit className="text-primary-accent/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary-accent/20 rounded-full" />
                  <span className="font-semibold text-sm md:text-base text-primary-accent/70 font-noto">Change Profile Photo</span>
                </button>
                <input type="file" ref={fileRef} name="photo" onChange={changePhoto} className="hidden"/>
              </form>
              {/* Remove Photo */}
              <button onClick={removePhoto} className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-accent/5 border border-primary-accent/20 shadow">
                <TbPhotoCancel className="text-primary-accent/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary-accent/20 rounded-full" />
                <span className="font-semibold text-sm md:text-base text-primary-accent/70 font-noto">Remove Profile Photo</span>
              </button>
              
   

          {/* Reset Account */}
          {/* <button onClick={generateCard} className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-accent/5 border border-primary-accent/20 shadow">
            <FaRegIdCard className="text-primary-accent/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary-accent/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary-accent/70 font-noto">Generate ID Card</span>
          </button> */}
          {/* Pardon Registration */}
          {/* <button onClick={!data?.flagPardon ? activatePardon : undefined } className={`p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 ${data?.flagPardon ? 'bg-primary/5 border-primary/20 cursor-not-allowed':'bg-primary-accent/5 border-primary-accent/20' } border shadow`}>
            <FaMoneyCheckDollar className={`${data?.flagPardon ? 'text-primary/60 border-primary/20':'text-primary-accent/60 border-primary-accent/20'} h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 rounded-full`} />
            <span className={`font-semibold text-sm md:text-base ${data?.flagPardon ? 'text-primary/50':'text-primary-accent/70'} font-noto`}>{data?.flagPardon ? 'Pardon Activated':'Registration Pardon'}</span>
          </button> */}
       </section>
    </div>
  )
}

export default AISSheetAccountCard