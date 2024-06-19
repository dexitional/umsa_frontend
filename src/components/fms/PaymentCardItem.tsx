import React from 'react'
import { FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa'
import { MdEditDocument, MdOutlineDateRange } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import moment from 'moment'
import { FaFilePdf, FaFolder } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { BsLightningChargeFill } from "react-icons/bs";
import { BiRefresh } from 'react-icons/bi'
import { TbListNumbers } from 'react-icons/tb'
import { VscReferences } from "react-icons/vsc";

const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function PaymentCardItem({ data }: Props) {
  return (
  <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-2 md:group">
    <h2 className="text-base md:text-base font-semibold font-noto text-gray-500 uppercase">{data?.transtag}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="w-full flex items-center justify-between space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{(data?.student?.fname+' '+(data?.student?.mname ? data?.student?.mname+' ': '')+data?.student?.lname).toUpperCase()}</div>
          <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">{data?.student?.gender}</div>
      </div>
      <img crossOrigin="anonymous" src={`${REACT_APP_API_URL}/auth/photos/?tag=${data?.student?.id}` || Logo} className="p-1 h-12 w-12 border rounded-md bg-white object-contain" />
    </div>
    <div className="space-y-2 font-roboto">
        <div className="mb-4 px-4 py-1 w-fit flex items-center space-x-4 rounded bg-primary-dark/10">
            <span className={`text-gray-500 text-sm  font-bold capitalize`}>{data.transtype?.title || 'Not assigned' }</span>
        </div>
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data.student?.program?.longName ? 'text-gray-500':'text-red-500'} text-xs  font-bold capitalize`}>{data.student.program?.longName || 'Not assigned' }</span>
        </div>
        {/* <div className="flex items-center space-x-4">
            <TbListNumbers className="rotate-90 h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold">LEVEL: {(Math.ceil(data?.student?.semesterNum/2) * 100) || 'COMPLETED'}</span>
        </div> */}
        {/* <div className="flex items-center space-x-4">
            <FaPhone className="rotate-90 h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500">{data?.student.phone}</span>
        </div> */}
        <div className="flex items-center space-x-4">
            <AiOutlineFieldNumber className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wide">STUDENT ID:&nbsp;&nbsp; {data?.student?.id || 'Not Set'}</span>
        </div>
        {/* <div className="flex items-center space-x-4">
            <AiOutlineFieldNumber className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wide">INDEX NO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {data?.student?.indexno || 'Not Set'}</span>
        </div> */}
        <div className="mt-10 flex items-center space-x-4">
            <VscReferences className="h-4 w-5 text-primary/70" />
            <div className={`bg-green-50 px-2 py-0.5 rounded border text-xs font-semibold text-gray-500`}>REF:&nbsp;&nbsp;&nbsp; { data?.reference?.toUpperCase() }</div>
        </div>
        <div className="mt-10 flex items-center space-x-4">
            <MdOutlineDateRange className="h-4 w-5 text-primary/70" />
            <div className={`bg-green-50 px-2 py-0.5 rounded border text-xs font-semibold text-gray-500`}>{ data?.createdAt && moment(data?.createdAt).format("DD-MMM-YYYY h:mm a").toUpperCase() }</div>
        </div>
      
        
    </div>
    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${moment(data?.start_date).format("YYYY") == moment().format("YYYY") ? 'bg-green-950/60':'bg-red-950/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>Level</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{Math.ceil(data?.semesterNum/2) * 100}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center md:justify-start space-x-2 group">
          <Link to={`${encodeURIComponent(data?.id)}/profile`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            {/* <FcViewDetails className="h-4 w-4 text-white"/> */}
            <BiRefresh className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">Retire</span>
          </Link>
          <Form method="post" action={`${data?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Charge Late Registration Fine?")) e.preventDefault(); return false; }} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            <BsLightningChargeFill className="h-3 w-4 text-red-100" />
            <button type="submit" className="text-sm text-white font-semibold">Fine</button>
          </Form>
          <div className="hidden md:flex md:group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`bg-green-800/70 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>AMOUNT</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{ data?.amount }</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default PaymentCardItem