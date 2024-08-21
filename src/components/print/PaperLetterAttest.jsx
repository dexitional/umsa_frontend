import React, { useState, useEffect, useRef } from "react";
import "../admission/FormPrint.css";
import Logo from "../../assets/img/logo.png";
import Signature from "../../assets/img/signature.png";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import moment from "moment";
import ReactHtml from "html-react-parser";
import { ToWords } from "to-words";

const PaperLetterAttest = () => {
  const { sso } = useSelector((state) => state);
  const { modal } = sso;
  const [data, setData] = useState({});
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const output = `<div style="font-family:serif,times,helvetica;font-size:14pt">
    <p><u class="sbody" style="text-transform:uppercase;font-size:14pt">ATTESTATION LETTER IN RESPECT OF ::name <br/>
    INDEX NUMBER: ::indexno </u></p>
    <p><span style="text-transform:capitalize;color:#333;">::name</span> is ::academic_status student of the <span style="text-transform:capitalize;color:#333;">::program_name</span> programme at the African University College of Communications (AUCC).</p>
    <p>He was admitted to the University College in ::admit_year Academic year and completed the programme in ::complete_year.</p>
    <p>Any assistance you can offer ::person will be very much appreciated.</p>
    <p>Please do not hesitate to contact us for further clarification.</p>
    <p>Yours faithfully,</p>
    <p>&nbsp;</p>
    </p>::signature</p>
    </p>::signatory</p>
    </div>
    `;
  const loadPlacerData = (dt) => {
    dt = dt.replace(/::name/g, data.student?.name.toLowerCase());
    dt = dt.replace(/::academic_status/g, data.student?.complete_status ? "a past":"currently an active");
    dt = dt.replace("::start_level",
      data && Math.ceil(data.start_semester % 2) * 100
    );
    dt = dt.replace(/::program_name/g, data.student?.program_name_long.toLowerCase());
    dt = dt.replace(/::admit_year/g, `${moment(data.student?.doa).format('YYYY')}/${moment(data.student?.doa).add(1,'year').format('YYYY')}`);
    dt = dt.replace(/::complete_year/g, data.student?.doc ? moment(data.student?.doc).format("MMMM, YYYY") : "the respective period");
    dt = dt.replace("::signatory", data.letter?.signatory);
    dt = dt.replace(/::indexno/g, data.student?.indexno);
    dt = dt.replace(/::person/g, data.student?.gender == 'M' ? 'him':'her');
    dt = dt.replace(
      "::signature",
      `<img src="${
        (data && data.letter?.signature) || Signature
      }" width='150px' height='50px' />`
    );
   
    return dt;
  };

  useEffect(() => {
    modal.content && setData({ ...modal.content.data });
  }, []);

  return (
    <>
      <div className="row">
        <div
          className="Box small-12 columns"
          style={{
            width: "900px",
            margin: "0px auto",
            float: "none",
            overflow: "hidden",
          }}
        >
          <div className="small-12 columns u-pr-0 right">
            <button
              onClick={handlePrint}
              className="Button u-floatRight u-mb-2"
            >
              &nbsp;&nbsp;Print &nbsp;&nbsp;
            </button>
          </div>
        </div>
      </div>
      <div className="print" ref={printRef}>
        <div
          className="fade-bg"
          style={{
            background: `url(${Logo}) center 50% / 650px 650px no-repeat`,
            display: "block",
            zIndex: 10,
          }}
        ></div>
        <div className="cover">
          <br />
          <br />
          <header>
            <div className="left-head">
              <img src={Logo} className="logo" />
              <div className="left-cover">
                <h2>
                  <span
                    style={{
                      fontSize: "27.5px",
                      color: "#b76117",
                      letterSpacing: "0.07em",
                    }}
                  >
                    AFRICAN UNIVERSITY
                  </span>
                  <br />
                  COLLEGE OF COMMUNICATIONS
                </h2>
                <h2>
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      letterSpacing: "0.35em",
                      top: "-30px",
                    }}
                  >
                    LETTER OF ATTESTATION
                  </span>
                </h2>
              </div>
            </div>
            <div className="right-head address">
              {/*
                <address>
                    School of Graduate Studies<br/>
                    Private Mail Bag<br/>
                    University Post Office<br/>
                    Kumasi-Ghana<br/><br/>

                    Tel:+233 3220 60331<br/>
                    Fax:+233 3220 60137<br/>
                    Email: graduatestudies@knust.edu.gh<br/><br/>
                    <span className="small">30/10/2020</span>
                </address>
                */}
              <address>
                Registrar's Office
                <br />
                African University
                <br />
                College of Communications <br />
                Postal Box LG 510
                <br />
                Adabraka, Accra
                <br />
                &nbsp;
                <span style={{ float: "left", direction: "ltr" }}>
                  +233 307016193
                </span>
                <br />
                registrar@aucc.edu.gh
              </address>
            </div>
          </header>
          <content>
            <div>
              <table className="ptable" style={{ marginTop:'120px' }}>
                <tbody>
                  <tr rowspan="2">
                    <td style={{ minwidth: "200px" }} colSpan={2}>
                      <p
                        className=""
                        style={{ 
                          fontSize: "20px",
                          fontFamily:'serif',
                          fontWeight:600,
                          color: "#333",
                          marginBottom:"30px"
                       }}
                      >
                        Ref. #: {data?.student?.indexno}
                      </p>
                      <p>
                        <span
                          style={{
                            color: "#333",
                            fontSize: "14pt",
                            fontWeight:'bold',
                            fontFamily:'serif'
                          }}
                        >
                          TO WHOM IT MAY CONCERN
                        </span>
                      </p>
                      <br />
                      <span
                        className="shead"
                        style={{
                          fontFamily: "serif",
                          fontSize: "14pt",
                        }}
                      >
                        Dear Sir/Madam,
                      </span>
                      <br />
                      <br />
                    </td>
                    <td align="right">
                      <p className="title" style={{  
                          fontFamily: "serif",
                          fontSize: "14pt"
                       }}>
                        {moment(data && data.created_at).format(
                          "MMMM DD, YYYY"
                        )}
                      </p>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="shead maincontent" colSpan={3}>
                      {/* {ReactHtml(loadPlacerData((data && data.letter?.template) || ""))} */}
                      {/* {ReactHtml(loadPlacerData(output || ""))} */}
                      {ReactHtml(loadPlacerData(data.letter?.template || output))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </content>
        </div>
      </div>
    </>
  );
};

export default PaperLetterAttest;
