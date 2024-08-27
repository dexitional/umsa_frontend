import moment from 'moment';
import React from 'react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsCalendarRange } from 'react-icons/bs';
import { FaPhoneAlt, FaTransgender } from 'react-icons/fa';
import { FaRegAddressCard, FaRegCalendar } from 'react-icons/fa6';
import { ImProfile } from 'react-icons/im';
import { MdOutlineFiberPin, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiCommunityLine } from 'react-icons/ri';
import { TbHomeCheck } from 'react-icons/tb';
import { useLoaderData } from 'react-router';
import AISPBioCard from '../../components/aisp/AISPBioCard';
import Service from '../../utils/aisService';


type Props = {}

export async function loader({ params }){
   const data = await Service.fetchStudent(params.studentId)
   return { data }
}

function PgAISStudentProfile({}: Props) {
  const { data } :any = useLoaderData();
  
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row space-between space-y-2 md:space-y-0 md:space-x-10">
    <div className="flex-1 space-y-2">
      <AISPBioCard label="Full Name" value={`${data?.fname} ${data?.mname ? data?.mname+' ':''}${data?.lname}`} Icon={ImProfile} />
      <AISPBioCard label="Gender" value={data?.gender == 'M' ? 'MALE':'FEMALE'} Icon={FaTransgender} />
      <AISPBioCard label="Date of Birth" value={data?.dob && moment(data?.dob).format('MMMM DD, YYYY').toUpperCase() || 'Not Set'} Icon={FaRegCalendar} />
      <AISPBioCard label="Hometown" value={data?.hometown || 'Not Set'} Icon={TbHomeCheck} />
      <AISPBioCard label="Phone Number" value={data?.phone || 'Not Set'} Icon={FaPhoneAlt} />
      <AISPBioCard label="Email Address" value={data?.email?.toUpperCase() || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
      <AISPBioCard label="Residential Address" value={data?.address?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
      <AISPBioCard label="Residential Status" value={data?.residentialStatus?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
      <AISPBioCard label="Guardian Name" value={data?.guardianName || 'Not Set'} Icon={MdOutlineFiberPin} />
      <AISPBioCard label="Guardian Contact" value={data?.guardianPhone || 'Not Set'} Icon={BsCalendarRange} />
      <AISPBioCard label="Region" value={data?.region?.title || 'Not Set'} Icon={BiMoneyWithdraw} />
      <AISPBioCard label="Country" value={data?.country?.longName || 'Not Set'} Icon={RiCommunityLine} />
      <AISPBioCard label="Religion" value={data?.religion?.title || 'Not Set'} Icon={BiMoneyWithdraw} />
    </div>
    <div className="flex-1 space-y-2">
       <AISPBioCard label="Disability" value={data?.disability?.title || 'None'} Icon={BiMoneyWithdraw} />
       <AISPBioCard label="Student Number" value={`${data?.id}`} Icon={ImProfile} />
      <AISPBioCard label="Index Number" value={data?.indexno || 'Not Set'} Icon={TbHomeCheck} />
      <AISPBioCard label="Programme" value={data?.program?.longName || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
      <AISPBioCard label="Major" value={data?.major?.longName || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
      <AISPBioCard label="Level" value={Math.ceil(data?.semesterNum/2)*100 ? (Math.ceil(data?.semesterNum/2)*100).toString() : 'COMPLETED' || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
      <AISPBioCard label="Study Mode" value={data?.studyMode == 'W' ? 'WEEKEND': data?.studyMode == 'E' ? 'EVENING':'MORNING' || 'Not Set'} Icon={MdOutlineMarkEmailUnread} />
      <AISPBioCard label="Department" value={data?.program?.department?.title || 'Not Set'} Icon={FaPhoneAlt} />
      <AISPBioCard label="Institutional Email" value={data?.instituteEmail?.toUpperCase() || 'Not Set'} Icon={FaRegAddressCard} />
      <AISPBioCard label="Ghana Card Number" value={data?.ghcardNo || 'Not Set'} Icon={BsCalendarRange} />
      <AISPBioCard label="Date of Admission" value={data?.entryDate && moment(data?.entryDate).format('MMMM DD, YYYY').toUpperCase() || 'Not Set'} Icon={FaRegCalendar} />
      <AISPBioCard label="Student Category" value={data?.entryGroup == 'GH' ? 'GHANAIAN': 'INTERNATIONAL'} Icon={MdOutlineFiberPin} />
      <AISPBioCard label="Academic Status" value={data?.completeStatus ? 'COMPLETED': 'ACTIVE STUDENT'} Icon={MdOutlineFiberPin} />
    </div>
    </div>
  )
}

export default PgAISStudentProfile