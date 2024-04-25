import React from 'react'
import Logo from '../../assets/img/logo/mlk/logo.png'
import moment from 'moment'

type Props = {}

function PrintHeader({}: Props) {
  return (
    <div className="hidden print:flex md:flex flex-col">
                <span className="m-0 p-0 text-[2.44rem] print:text-[1.8rem] text-primary-dark font-serif font-semibold tracking-wider leading-[2.2rem] text-center">MARTIN LUTHER HEALTH TRAINING SCHOOL</span>
                <span className="m-0 p-0 text-[1.75rem] print:text-xl text-primary-accent font-bold font-serif tracking-wider text-center leading-0">OFFICE OF ACADEMIC AFFAIRS</span>
                <div className="my-8 mx-auto print:my-4 w-full max-w-4xl flex flex-row justify-center">
                    <div className="flex-1 space-y-4  print:space-y-2 print:text-xs">
                        <div className="flex space-x-14 text-sm print:text-xs">
                            <div className="">
                                <p>TELEPHONE:</p>
                                {/* <p>DIRECT:</p> */}
                                {/* <p>FAX:</p> */}
                            </div>
                            <div className="font-medium">
                                {/* <p>233-3321-32480-3 Ext. 208/219</p> */}
                                <p>233-3321-35987</p>
                                <p>233-3321-32484</p>
                            </div>
                        </div>
                        <div className="flex space-x-20 text-sm print:text-xs">
                            <div className="">
                                <p>E-MAIL:</p>
                                <p>WEBSITE:</p>
                            </div>
                            <div className="font-medium">
                                <p>info@mlkinstitute.edu.gh</p>
                                <p>www.mlkinstitute.edu.gh</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-48 print:w-48 flex item-center justify-center">
                        <img 
                          className="h-32 print:h-[5rem]"
                          src={Logo}
                        />
                    </div>
                    <div className="flex-1 space-y-6 print:space-y-4 print:text-xs">
                        <div className="flex justify-end font-semibold text-slate-900 tracking-wider">
                            <p className="print:m-0 print:leading-[17px] text-sm print:text-xs text-left leading-[1.2rem]">Registrar's Office<br/>Martin Luther Training School<br/>Kintampo</p>
                        </div>
                        <div className="flex justify-center">
                            <p className="pl-8 print:pr-8 print:m-0 print:leading-[17px] font-medium text-sm print:text-xs text-right leading-[1.2rem]">{ moment().format("Do MMMM, YYYY")}</p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default PrintHeader