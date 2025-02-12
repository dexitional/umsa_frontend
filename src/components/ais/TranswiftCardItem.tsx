import React from 'react'
import { FaFolder, FaTrash } from 'react-icons/fa'
import { MdEditDocument } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
// @ts-ignore
import moment from 'moment'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaFile, FaFilePdf } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'

type Props = {
  data: any;
}

function TranswiftCardItem({ data }: Props) {
  return (
    <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-4 md:group">
    <h2 className="text-base md:text-base font-semibold font-noto text-gray-500 uppercase">{data?.student.fname} {data?.student.mname ? data?.student.mname+' ':''}{data?.student.fname}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="w-full flex items-center justify-between space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{data?.studentId}</div>
          <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">{data?.quantity}</div>
      </div>
    </div>
    <div className="space-y-2 font-roboto">
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`text-gray-500 text-xs  font-bold capitalize`}>{data?.student?.program?.longName?.toUpperCase()}</span>
        </div>
        <div className="flex items-center space-x-4">
            <FaFile className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">DOCUMENT VERSION: {data?.version || 'Not Set'}</span>
        </div> <div className="flex items-center space-x-4">
            <FaFile className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">RECIPIENT: {data?.recipient || 'Not Set'}</span>
        </div>
        <div className="flex items-center space-x-4">
            <CiDeliveryTruck className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">DELIVERY MODE: {data?.mode || 'Not Set'}</span>
        </div>
       
        <div className="flex items-center space-x-4">
            <FaFilePdf className="h-4 w-5 text-primary/70" />
            <Link to={data?.nss_form} className="px-2 py-0 bg-green-50 rounded border text-sm text-gray-500"><span className="font-bold">{data?.transact?.transtype?.title}</span></Link>
        </div>
    </div>
    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${moment(data?.start_date).format("YYYY") == moment().format("YYYY") ? 'bg-green-950/60':'bg-red-950/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>STATUS</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{data?.status}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center md:justify-between space-x-2 group">
          <Link to={`${encodeURIComponent(data?.id)}`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            {/* <FcViewDetails className="h-4 w-4 text-white"/> */}
            <FaFolder className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">View</span>
          </Link>
          <Link to={`${encodeURIComponent(data?.id)}/edit`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            <MdEditDocument className="h-4 w-4 text-green-200"/>
            <span className="text-sm text-white font-semibold">Edit</span>
          </Link>
          <Form method="post" action={`${data?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary-accent/60">
            <FaTrash className="h-3 w-4 text-pink-100" />
            <button type="submit" className="text-sm text-white font-semibold">Delete</button>
          </Form>
          <div className="hidden md:flex md:group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${!data?.completeStatus ? 'bg-primary-dark/60':'bg-primary-accent/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>STATUS</span>
              <span className="font-semibold font-roboto text-sm text-primary/60">{data?.status}</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default TranswiftCardItem