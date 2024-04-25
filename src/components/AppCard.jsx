import React from 'react'
import { MdApps, MdDataset } from 'react-icons/md'
import { Link } from 'react-router-dom'

function AppCard({ title, desc, Icon, links }) {
  return (
    <div className="p-3 md:px-6 md:py-4 md:min-h-44 bg-white rounded border flex group">
        {/* <img src={Logo} alt="" className="w-40 h-20 object-contain" /> */}
        <div className="w-16 md:w-28 flex justify-center">
            { Icon 
                ? (<Icon className="w-12 h-12 md:w-20 md:h-20 text-primary-dark/50" />)
                : (<MdDataset className="w-16 h-16 md:w-20 md:h-20 text-zinc-500/80" />)
            }
            {/* <MdApps className="w-16 h-16 md:w-20 md:h-20 text-zinc-500/80" /> */}
            {/* <img src={Logo} alt="" className="w-20 h-20 object-contain" /> */}
        </div>
        <div className=" flex-1 space-y-3">
            <h1 className="text-base md:text-2xl text-primary-dark/60 font-medium font-sans">{title}</h1>
            <p className="text-gray-400 text-xs md:text-base">{desc}</p>
            <div className="flex w-fit md:w-full flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                { links.map( (l,i) => (
                     <Link to={l.url} key={i} className="py-1 px-2 md:py-2 md:px-3 rounded bg-zinc-100 group-hover:cursor-pointer group-hover:bg-red-100/80 text-xs md:text-sm text-zinc-500 font-medium">{l.title}</Link>
                )) }
            </div>
        </div>
    </div>
  )
}

export default AppCard