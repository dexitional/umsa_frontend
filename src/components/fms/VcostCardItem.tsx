import React from 'react'
import { FaEnvelope, FaFolder, FaPhone, FaTrash } from 'react-icons/fa'
import { MdEditDocument } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
import moment from 'moment'
import { FaUserGroup } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { getTargetGroup } from '../../utils/util'

const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function VcostCardItem({ data }: Props) {
  return (
  <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-2 md:group">
    <h2 className="text-sm md:text-sm font-semibold font-noto text-gray-500 uppercase">{data?.title}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="w-full flex items-center justify-between space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{data?.category?.title?.toUpperCase()}</div>
          <div className="py-0.5 px-1 text-[0.65rem] rounded bg-primary/60 text-white font-bold">{data?.categoryId}</div>
      </div>
    </div>
    <div className="space-y-1.5 font-roboto">
      <div className="flex items-center space-x-4">
        <FaUserGroup className="h-4 w-4 text-primary/70" />
        <span className="text-xs text-gray-500 font-semibold">{data?.sellType == 2 ? 'INTERNATIONAL': data?.sellType == 1 ? 'MATURED':'GENERAL' }</span>
      </div>
    </div>
   

    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`bg-green-800/80 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>AMOUNT</span>
              <span className="font-bold font-roboto text-base text-primary/80">  {data.entryGroup == 'INT' ? 'USD':'GHC'} {data?.amount}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center md:justify-between space-x-2 group">
          <Link to={`${encodeURIComponent(data?.id)}/actions`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            {/* <FcViewDetails className="h-4 w-4 text-white"/> */}
            <FaFolder className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">View</span>
          </Link>
          { !data.posted && <>
          <Link to={`${encodeURIComponent(data?.id)}/edit`} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary/60">
            <MdEditDocument className="h-4 w-4 text-green-200"/>
            <span className="text-sm text-white font-semibold">Edit</span>
          </Link>
          
          <Form method="post" action={`${data?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }} className="py-0.5 px-2 rounded flex md:hidden group-hover:flex items-center space-x-1.5 bg-primary-accent/60">
            <FaTrash className="h-3 w-4 text-pink-100" />
            <button type="submit" className="text-sm text-white font-semibold">Delete</button>
          </Form>
          </>
          }
          <div className="hidden md:flex md:group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${data.posted ? 'bg-green-800/80': 'bg-primary-dark/60' } py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>COST</span>
              <span className="font-bold font-roboto text-base text-primary/60">{data.currency == 'GHC' ? 'GH₵': data.currency} {data.amount}</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default VcostCardItem