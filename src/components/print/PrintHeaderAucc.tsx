import moment from 'moment'
import React from 'react'
import Logo from '../../assets/img/logo/aucc/logo.png'

type Props = {}

function PrintHeaderAucc({}: Props) {
  return (
    <div className="hidden print:flex md:flex flex-col">
                <span className="m-0 p-0 text-[3.5rem] print:text-[2.9rem] text-primary-dark font-roboto font-semibold tracking-widest md:leading-[4rem] text-center">AFRICAN UNIVERSITY </span>
                <span className="m-0 print:-mt-3 p-0 text-[2.1rem] print:text-[1.5rem] text-primary-accent font-bold font-roboto tracking-wider text-center leading-0">OF COMMUNICATIONS AND BUSINESS</span><br/><br/>
                <div className="my-6 mx-auto print:-mt-6 print:mb-6 w-full max-w-4xl flex flex-row justify-center">
                    <div className="flex-1 space-y-4  print:space-y-2 print:text-xs">
                        <div className="flex space-x-5 text-sm print:text-xs">
                            <div className="">
                                <p>TELEPHONE:</p>
                                {/* <p>DIRECT:</p> */}
                                {/* <p>FAX:</p> */}
                            </div>
                            <div className="font-semibold">
                                {/* <p>233-3321-32480-3 Ext. 208/219</p> */}
                                <p>233-3070-16193</p>
                                {/* <p>233-3321-32484</p> */}
                            </div>
                        </div>
                        <div className="flex space-x-10 text-sm print:text-xs">
                            <div className="">
                                <p>E-MAIL:</p>
                                <p>WEBSITE:</p>
                            </div>
                            <div className="font-medium">
                                <p>info@aucb.edu.gh</p>
                                <p>www.aucb.edu.gh</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-48 print:w-48 flex item-center justify-center">
                        <img 
                          className="h-32 print:h-[7rem]"
                          src={Logo}
                        />
                    </div>
                    <div className="flex-1 space-y-6 print:space-y-4 print:text-xs">
                        <div className="flex justify-end font-semibold text-slate-900 tracking-wider">
                            <p className="print:m-0 print:leading-[17px] text-sm print:text-xs text-left leading-[1.2rem]">Registrar's Office<br/>Postal Box LG 510<br/>Legon, Accra<br/>Ghana.</p>
                        </div>
                        <div className="flex justify-center">
                            <p className="pl-44 print:pr-0 print:m-0 print:leading-[17px] font-medium text-sm print:text-xs text-right leading-[1.2rem]">{ moment().format("Do MMMM, YYYY")}</p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default PrintHeaderAucc