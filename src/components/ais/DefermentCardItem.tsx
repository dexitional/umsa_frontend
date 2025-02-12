import React from 'react'
// @ts-ignore
import moment from 'moment'
import { BiInfoCircle } from 'react-icons/bi'
import { CgCalendarDates } from 'react-icons/cg'
import { FaFolder } from 'react-icons/fa6'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import { MdEditDocument } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo/aucc/logo.png'
const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function DefermentCardItem({ data }: Props) {
  console.log(data)

  return (
  <div className="p-4 md:p-6 min-h-max border border-primary/20 rounded-xl bg-slate-50/50 hover:bg-slate-100 space-y-4 md:group">
    <h2 className="text-base md:text-base font-semibold font-noto text-gray-500 uppercase">{data?.student?.indexno}</h2>
    <div className="w-full flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
          <div className="text-sm md:text-sm text-primary-dark/70 font-bold font-roboto capitalize">{(data?.student?.fname+' '+(data?.student?.mname ? data?.student?.mname+' ': '')+data?.student?.lname).toUpperCase()}</div>
          <div className="py-0.5 px-2 text-sm rounded bg-primary/60 text-white font-bold">{data?.student?.gender}</div>
      </div>
      <img src={`${REACT_APP_API_URL}/auth/photos/?tag=${data?.student?.id}` || Logo} className="p-1 h-12 w-12 border rounded-md bg-white object-contain" />
    </div>
    <div className="w-full space-y-2 font-roboto">
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data?.student?.program?.longName ? 'text-gray-500':'text-red-500'} text-xs  font-bold capitalize`}>{data?.student?.program?.longName || 'Not assigned' }</span>
        </div>
        <div className="flex items-center space-x-4">
            <HiMiniAcademicCap className="shrink-0 h-5 w-5 text-primary/70" />
            <span className={`${data?.session?.title ? 'text-gray-500':'text-red-500'} text-xs  font-bold capitalize`}>{data?.session?.title} {data?.session?.tag == 'SUB' ? ', JANUARY': 'MAIN'}</span>
        </div>
        <div className="flex items-center space-x-4">
            <CgCalendarDates className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">STARTS:&nbsp;&nbsp;&nbsp;&nbsp; {data?.start && moment(data?.start).format("MMM DD, YYYY").toUpperCase() || 'NOT SET'}</span>
        </div>
        <div className="flex items-center space-x-4">
            <CgCalendarDates className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">ENDS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {data?.end && moment(data?.end).format("MMM DD, YYYY").toUpperCase() || 'NOT SET'}</span>
        </div><hr/>
        <div className="flex items-center space-x-4">
            <BiInfoCircle className="h-4 w-5 text-primary/70" />
            <span className="text-xs text-gray-500 font-semibold tracking-wider">{data?.reason }</span>
        </div><hr/>
       <div className="flex justify-between">
          <div className="flex items-center space-x-1">
                <span className="px-2 py-0 bg-green-50 rounded border font-bold text-sm text-gray-500">YEAR: {Math.ceil(data?.semesterNum/2)}</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="px-2 py-0 bg-green-50 rounded border font-bold text-sm text-gray-500">SEMESTER:  &nbsp;{data?.semesterNum%2 == 0 ? 2: 1}</span>
            </div>
       </div>
        
        
    </div>
    <div className="flex flex-col space-y-1">
        <div className="px-3 py-2 opacity-80 md:opacity-100 md:hidden flex rounded-md border bg-blue-50/30 items-center md:justify-between space-x-2 md:group">
          <div className="flex group-hover:hidden items-center justify-center space-x-3 text-center">
              <span className={`bg-green-950/60 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>YEAR</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{Math.ceil(data?.semesterNum/2)}</span>
          </div>
        </div>
        <div className="px-3 py-2 opacity-80 md:opacity-100 hidden md:flex rounded-md border bg-white items-center justify-between space-x-2 group">
         {/* <div className="hidden md:flex items-center justify-center space-x-3 text-center">
              <span className={`${!data?.completeStatus ? 'bg-primary-dark/60':'bg-primary-accent/60'} py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>YEAR</span>
              <span className="font-semibold font-roboto text-base text-primary/60">{Math.ceil(data?.semesterNum/2)}</span>
          </div> */}
           <Link to={`${encodeURIComponent(data?.id)}`} className="py-0.5 px-2 rounded flex md:flex items-center space-x-1.5 bg-primary/60">
            <FaFolder className="h-4 w-4 text-amber-200"/>
            <span className="text-sm text-white font-semibold">View</span>
           </Link>
           <Link to={`${encodeURIComponent(data?.id)}/edit`} className="py-0.5 px-2 rounded flex items-center space-x-1.5 bg-primary/60">
            <MdEditDocument className="h-4 w-4 text-green-200"/>
            <span className="text-sm text-white font-semibold">Edit</span>
          </Link>
          <div className="hidden md:flex items-center justify-center space-x-3 text-center">
              <span className={`bg-green-700/60 py-0.5 px-2 rounded flex items-center space-x-1.5 text-sm text-white font-semibold`}>{data?.status}</span>
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default DefermentCardItem