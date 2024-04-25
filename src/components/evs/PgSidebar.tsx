import React from 'react'
import Logo from '../../assets/img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import EVSNavItem from './EVSNavItem'
const { REACT_APP_API_URL } = import.meta.env;

type Props = {
  data: any;
}

function PgSidebar({ data }: Props) {
  const { isAdmin } = data;
  return (
    <div className="p-4 md:py-6 md:px-3 w-full md:w-64 h-fit rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-6">
        <img src={`${REACT_APP_API_URL}/auth/pixo?eid=${data?.id}` || Logo} alt="" className="mx-auto w-28 h-28 object-contain"/>
        <Link to="../dash"><button className="mt-4 py-2 w-full rounded-lg bg-blue-950/90 font-bold text-sm text-amber-200 text-center">GOTO ELECTIONS PAGE</button></Link>
        <div className="py-3 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
            <h3 className="py-1 bg-blue-950/80 font-bold text-lg text-white text-center">VOTER TURNOUT</h3>
            <p className='text-2xl md:text-4xl text-center text-blue-950 font-bold'>{data?.turnout}</p>
        </div>
        <div className="p-3 rounded shadow-inner shadow-gray-500/20 bg-white space-y-2">{data.voteStatus && 'Test'}
            <EVSNavItem url="candidate" title="CANDIDATES VIEW" />
            <EVSNavItem url="register" title="VOTERS REGISTER" />
            { data.allowMonitor || (data.allowEcMonitor && isAdmin) ? <EVSNavItem url="public" title="PUBLIC MONITOR" /> : null }
            { data.allowVip || (data.allowEcVip && isAdmin) ? <EVSNavItem url="vip" title="STRONG ROOM" /> : null }
            { isAdmin ? <EVSNavItem url="control" title="ADMIN CONTROLS" /> : null }
            { data.allowResult || (data.allowEcResult && isAdmin) ? <EVSNavItem url="result" title="FINAL RESULTS" /> : null }
          </div>
    </div>
  )
}

export default PgSidebar