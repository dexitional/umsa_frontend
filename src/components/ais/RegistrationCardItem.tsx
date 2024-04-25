import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEditDocument } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import { FaFilePdf } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { LuFileSpreadsheet } from "react-icons/lu";
import { GrDocumentTime } from 'react-icons/gr'
import moment from 'moment'
import { CgCalendarDates } from 'react-icons/cg'

type Props = {
  data: any;
}

function RegistrationCardItem({ data }: Props) {
  return (
  <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-4 md:group">
    <h2 className="text-base md:text-lg font-semibold font-noto text-gray-500 uppercase">{data?.student?.id}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{(data?.student?.fname+' '+(data?.student?.mname && data?.student?.mname+' ')+data?.student?.lname).toUpperCase()}</div>
          <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">{data?.student?.gender}</div>
      </div>
      <img src={`https://cdn.ucc.edu.gh/photos/?tag=${data?.student?.id}` || Logo} className="p-1 h-12 w-12 border rounded-md bg-white object-contain" />
    </div>
    <div className="space-y-1 font-roboto">
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data?.student?.program?.longName ? 'text-gray-500':'text-red-500'} text-xs  font-bold capitalize`}>{data?.student?.program?.longName || 'Not assigned' }</span>
        </div>
        <div className="flex items-center space-x-4">
            <CgCalendarDates className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">{data?.createdAt && moment(data?.createdAt).format("MMM DD, YYYY").toUpperCase() || 'Not Set'}</span>
        </div>
       
        <div className="flex items-center space-x-4">
            <FaFilePdf className="h-4 w-5 text-primary/70" />
            <span className="px-2 py-0 bg-green-50 rounded border font-bold text-sm text-gray-500">Courses: {data?.courses}</span>
        </div>
        <div className="flex items-center space-x-4">
            <FaFilePdf className="h-4 w-5 text-primary/70" />
            <span className="px-2 py-0 bg-green-50 rounded border font-bold text-sm text-gray-500">Credits: {data?.credits}</span>
        </div>
        
    </div>
    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`bg-green-950/60 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>Level</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{Math.ceil(data?.student?.semesterNum/2) * 100}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center space-x-2 group">
          <Link to={`/print/registration/${encodeURIComponent(data?.student?.id)}`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            {/* <FcViewDetails className="h-4 w-4 text-white"/> */}
            <LuFileSpreadsheet className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">Slip</span>
          </Link>
          {/* <Link to={`${encodeURIComponent(data?.id)}/edit`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            <MdEditDocument className="h-4 w-4 text-green-200"/>
            <span className="text-sm text-white font-semibold">Edit</span>
          </Link> */}
          <Form method="post" action={`${encodeURIComponent(data?.student?.id)}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary-accent/60">
            <FaTrash className="h-3 w-4 text-pink-100" />
            <button type="submit" className="text-sm text-white font-semibold">Delete</button>
          </Form>
          <div className="hidden md:flex md:group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${!data?.completeStatus ? 'bg-primary-dark/60':'bg-primary-accent/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>LEVEL</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{(Math.ceil(data?.student?.semesterNum/2) * 100)}</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default RegistrationCardItem