import React from 'react'
import { FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa'
import { MdEditDocument } from 'react-icons/md'
import { Form, Link } from 'react-router-dom'
// @ts-ignore
import Logo from '../../assets/img/logo/mlk/logo.png'
import moment from 'moment'
import { FaFilePdf, FaFolder, FaUserGroup } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { BsLightningChargeFill } from "react-icons/bs";
import { BiRefresh } from 'react-icons/bi'

const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function BillCardItem({ data }: Props) {
  return (
  <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-4 md:group">
    <h2 className="text-base font-semibold font-noto text-gray-500 uppercase">{data?.narrative}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="w-full flex items-center justify-between space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{data?.program?.shortName?.toUpperCase()}</div>
          {/* <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">{data?.gender}</div> */}
      </div>
    </div>
    <div className="space-y-1 font-roboto">
        {/* <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data.program?.longName ? 'text-gray-500':'text-red-500'} text-xs  font-bold capitalize`}>{data.program?.longName || 'Not assigned' }</span>
        </div> */}
        <div className="flex items-center space-x-4">
            <FaUserGroup className="rotate-90 h-4 w-5 text-primary/70" />
            <span className="text-sm text-gray-500 font-semibold">{data?.mainGroupCode}</span>
        </div>
        {/* <div className="flex items-center space-x-4">
            <AiOutlineFieldNumber className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">{data?.indexno || 'Not Set'}</span>
        </div> */}
        
    </div>
    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`${moment(data?.start_date).format("YYYY") == moment().format("YYYY") ? 'bg-green-950/60':'bg-red-950/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>Level</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{Math.ceil(data?.semesterNum/2) * 100}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 flex rounded-md border bg-white items-center md:justify-start space-x-2 group">
          <div className="hidden md:flex items-center justify-center space-x-3 text-center">
              <span className={`bg-green-800/80 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>AMOUNT</span>
              <span className="font-bold font-roboto text-base text-primary/80">  {data.entryGroup == 'INT' ? 'USD':'GHC'} {data?.amount}</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default BillCardItem