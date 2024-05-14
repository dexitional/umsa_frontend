import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { FcViewDetails } from 'react-icons/fc'
import { MdEditDocument } from 'react-icons/md'
// @ts-ignore
import Logo from '../../assets/img/logo/ucc/logo.png';
import { Form, Link } from 'react-router-dom';
import ListHeading from './ListHeading';

type Props = {
    data: any;
    count: number
}

function DepartmentListItem({ data, count }: Props) {
  return (
    <div className="px-3 md:px-6 pb-4 md:pb-4 grid md:grid-cols-7 gap-y-4 md:gap-y-0 md:gap-x-2 md:place-items-center text-gray-500 border-b border-slate-200 hover:bg-slate-50/50 group">
        <div className="md:col-span-2 md:place-self-start flex flex-col space-y-2 md:space-y-0">
           <ListHeading title="Department Name"/>
           <span className="px-2 md:px-0 leading-5">{count+1}.&nbsp;&nbsp;{data?.title}</span>
        </div>
        <div className="md:col-span-2 md:place-self-start capitalize flex flex-col space-y-2 md:space-y-0">
          <ListHeading title="Faculty Name"/>
          <span className="px-2 md:px-0 leading-5">{data?.level1?.title}</span>
        </div>
        <div className="flex flex-col space-y-2  md:space-y-0 md:text-center">
          <ListHeading title="Programs" />
          <span className="px-2 md:px-0 capitalize">{data?._count?.program}</span>
        </div>
        <div className="capitalize flex flex-col space-y-2 md:space-y-0">
          <ListHeading title="Staff Capacity"/>
          <span className="px-2 md:px-0">{data?._count?.staff}</span>
        </div>
        <div className="flex flex-col space-y-2 md:space-y-0">
          <ListHeading title="Action"/>
          { false ? 
            <div className="px-2 md:px-0 md:ml-6 w-fit flex items-center justify-evenly space-x-2">
                <Link to={`${data?.id}/edit`} className="p-2 rounded-full flex items-center space-x-1.5 bg-blue-950/50">
                    <MdEditDocument className="h-4 w-4 text-green-100"/>
                    <span className="hidden text-sm text-white font-semibold">Edit</span>
                </Link>
                <Form method="post" action={`${data?.id}/destroy`} onSubmit={(e)=> { if(!confirm("Do you want to delete")) e.preventDefault(); return false; }}className="p-2 rounded-full flex items-center space-x-1.5 bg-blue-950/50">
                    <FaTrash className="h-4 w-4 text-pink-100" />
                    <button type="submit" className="hidden text-sm text-white font-semibold">Delete</button>
                </Form>
            </div>
          : 
            <div className="px-2 md:ml-6 w-fit flex flex-col items-center justify-center space-y-1">
                <span className="text-[0.65rem] italic text-center">&nbsp;</span>
            </div>
          }
        </div>
    </div>
  )
}

export default DepartmentListItem