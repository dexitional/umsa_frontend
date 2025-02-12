import moment from 'moment'
import React from 'react'

function TranscriptHeader({ user,fgpa,cgpa }) {
  return (
    <div className="title-cover page-mono">
        <div className="title-group2" style={{ fontWeight:'bolder', letterSpacing:'0.06em',}}>
        <span>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{user.lname && user.lname.toUpperCase()}, {`${user.fname} ${user.mname || ''}`}<span style={{ textTransform:'capitalize' }}></span></b></span><br/>
        <span>Programme: &nbsp;<b style={{ fontSize:'18px' }}>{user.program_name && user.program_name.toUpperCase()}</b></span><br/>
        { user.major_name && <><span>Major: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{ user.major_name  || ' -- NONE --'}</b></span><br/></>}
        { user.stype == 2 
            ? <><span>CGPA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{cgpa?.toFixed(2) || '0.00'}</b></span><br/></>
            : <><span>FGPA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{fgpa?.toFixed(2) || '0.00'}</b></span><br/></>
        }
        </div>
        {/* <pre>{JSON.stringify(user,0,null)}</pre> */}
        <div className="title-group2" style={{ fontWeight:'600', letterSpacing:'0.06em',}}>
        <span>Student Number: &nbsp;<b style={{ fontSize:'18px' }}>{user.indexno} </b></span><br/>
        <span>Sex: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{user.gender ? user.gender == 'M' ? 'MALE':'FEMALE': ' -- NOT SET --'} </b></span><br/>
        <span>Date of Award: &nbsp;&nbsp;<b style={{ fontSize:'18px' }}>DECEMBER 2020</b></span><br/>
        <span>Date Printed: &nbsp;&nbsp;&nbsp;<b style={{ fontSize:'18px' }}>{moment().format('MMM DD, YYYY').toUpperCase()} </b></span><br/>
        </div>
    </div>
  )
}

export default TranscriptHeader