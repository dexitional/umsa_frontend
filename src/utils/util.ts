import moment from "moment";
import { ToWords } from "to-words";

export const awardClasses = [
  { id: 1, title: 'First Class' }, 
  { id: 2, title: 'Second Class (Upper Division)' }, 
  { id: 3, title: 'Second Class (Lower Division)' }, 
  { id: 4, title: 'Third Class' }, 
  { id: 5, title: 'Pass' }, 
  { id: 6, title: 'Fail' }, 
  { id: 7, title: 'Distinction' }, 
  { id: 8, title: 'N/A' }, 
]

export const monthList = [
  { id: 1, title: 'January' },
  { id: 2, title: 'February' },
  { id: 3, title: 'March' },
  { id: 4, title: 'April' },
  { id: 5, title: 'May' },
  { id: 6, title: 'June' },
  { id: 7, title: 'July' },
  { id: 8, title: 'August' },
  { id: 9, title: 'September' },
  { id: 10, title: 'October' },
  { id: 11, title: 'November' },
  { id: 12, title: 'December' },
]

export const getStudyMode = (tag) => {
   switch(tag){
      case 'M': return 'Morning'; break;
      case 'E': return 'Evening'; break;
      case 'W': return 'Weekend'; break;
      default : 'Moring'; break;
   }
}

export const defaultLetterTemplate = `
    <p><strong><u>ADMISSION TO THE ::program_name PROGRAMME (::admission_title)</u></strong></p><p><br></p><p>Congratulations!</p><p><br></p><p>I am pleased to inform you that, upon review of your application and, on the basis of your ::cert_condition, you have been offered admission to Level ::start_level of the <strong>::program_name</strong> programme for the ::session_year Academic year.</p><p><strong>Holders of Diploma/HND are to submit original copies of their certificate for verification, after which they may be exempted from the university of Ghana required course (offered at AUCC) for one semester. All other applicants will have to pass those required courses to complete their admission.</strong></p><p><br></p><p>Your field of specialisation will be confirmed at the end of Level 200 following an orientation session where you will learn about all the available specialisations and the possible career opportunities available in each specialisation.</p><p><br></p><p>The programme fee per semester is <strong>::fee_amount.</strong> However, with a discount of 15%, you are to pay <strong>::discount_amount</strong>. Please note that, the discount is for one academic year only. The fee must be paid through Cal Bank in the name of the <strong>African University College of Communications (AUCC) into account number ::bank_account at any branch of Cal Bank.</strong> After payment, the pay-in-slip must first be presented to the Accounts Officer at AUCC who will issue a receipt, a copy of which must be presented to the appropriate Secretariat of AUCC towards registration.</p><p><br></p><p><strong>Please note that registration will be on ::register_start to ::register_end, and lectures will begin on ::lecture_start. Orientation is on ::orient_start.</strong></p><p><br></p><p>Should you decide to withdraw from the programme within three weeks of registration, the University shall refund your fees to you less an administrative fee of 30%. No refunds will be made for withdrawals after the third week of registration.</p><p>All students are required to obey the rules and regulations of AUCC. A copy of the Student Handbook will be provided to you. Kindly note that AUCCs <strong>Weekend School is held on Fridays and Saturdays</strong>, and Management reserves the right to change sessions and courses when class sizes are not economically viable.</p><p><br></p><p>All correspondence in relation to your admission should be addressed to the Registrar and should include your reference number as above.</p><p>Congratulations once again. We look forward to personally welcoming you to our campus!</p><p><br></p><p>Yours faithfully,</p><p>::signature</p><p>::signatory</p>
`;


  export const loadPlacerData = (dt,data) => {
    console.log(data)
    dt = dt.replace("::cert_condition", data?.admission?.sortedApplicant[0]?.applyType?.letterCondition);
    dt = dt.replace("::start_level", Math.ceil(data?.semesterNum % 2) * 100);
    dt = dt.replace(/::program_name/g, data?.program?.longName);
    dt = dt.replace(/::session_year/g, data?.session?.year);
    dt = dt.replace("::signatory", data?.category?.admissionLetter[0]?.signatory);
    dt = dt.replace(/::bank_account/g, data?.bill?.banckacc?.bankAccount || 'of the institution');
    dt = dt.replace(/::admission_title/g, data?.admission?.title);
    dt = dt.replace(/::lecture_start/g, moment(data?.session?.lectureStart).format("dddd, Do MMMM, YYYY"));
    dt = dt.replace(/::register_start/g, moment(data?.session?.registerStart).format("dddd, Do MMMM,YYYY"));
    dt = dt.replace(/::register_end/g, moment(data?.session?.registerEnd).format("dddd, Do MMMM, YYYY"));
    dt = dt.replace(/::orient_start/g, moment(data?.session?.orientStart).format("dddd, Do MMMM, YYYY"));
    const toWords = new ToWords(
      data?.bill?.currency == "USD"
        ? {
            localeCode: "en-US",
            converterOptions: {
              currency: true,
              ignoreDecimal: false,
              ignoreZeroCurrency: false,
              doNotAddOnly: true,
            },
          }
        : {
            localeCode: "en-GH",
            converterOptions: {
              currency: true,
              ignoreDecimal: false,
              ignoreZeroCurrency: false,
              doNotAddOnly: true,
            },
          }
    );

    dt = dt.replace("::signature",`<img src="${(data?.category?.admissionLetter[0]?.signature)}" width='150px' height='40px' />`);
    dt = dt.replace(/::fee_amount/g,`${toWords.convert((data && data?.bill?.amount) || 0)} ${data?.bill?.currency == "USD" ? " ( $" + (!isNaN(data?.bill?.amount) ? data?.bill?.amount: 0) + " )" : " ( GH¢" + (!isNaN(data?.bill?.amount) ? data?.bill?.amount: 0) + " )"}` );
    dt = dt.replace(/::discount_amount/g, `${toWords.convert(((!isNaN(data?.bill?.amount) ? data?.bill?.amount: 0) - (data?.bill?.discount || 0)) || 0)} ${data?.bill?.currency == "USD" ? " ( $" + ((!isNaN(data?.bill?.amount) ? data?.bill?.amount: 0) - (data?.bill?.discount || 0)) + " )" : " ( GH¢" + ((!isNaN(data?.bill?.amount) ? data?.bill?.amount: 0) - (data?.bill?.discount || 0)) + " )"}`);
    
    return dt;
  };

  export const dummyAUCCApplicant = {
     semesterNum: 1,
     admission: { title:'2023 SEPTEMBER ADMISSIONS', examStart: moment(), examEnd: moment(), applyStart: moment(), applyEnd: moment(), sortedApplicant: [{ applyType: { letterCondition: 'WASSCE Certificate' }}] }, 
     program: { longName:'BACHELOR OF ARTS IN COMMUNICATION STUDIES' }, 
     bill: { narrative:'Academic Fees for Semester 1', currency:'GHC', amount: 1600, discount:100 }, 
     session: { title: '2022/2023 Academic Semester 1', year:'2023', semester: 1, orientStart: moment(), orientEnd: moment(), lectureStart: moment(), lectureEnd: moment(), registerStart: moment(), registerEnd: moment()}, 
     major: { title: '' }, 
     category: { 
       id: 'DP',
       admissionLetter: [{
         title:'Certificate Program Letter',
         signatory: '<p>Samuel Ogyiri Sackey (Mr.)</p><p>Business Development &amp; Admissions Manager</p><p>For Registrar (AUCC)</p>',
         template:'<p><strong><u>ADMISSION TO THE ::program_name PROGRAMME (::admission_title)</u></strong></p><p><br></p><p>Congratulations!</p><p><br></p><p>I am pleased to inform you that, upon review of your application and, on the basis of your ::cert_condition, you have been offered admission to Level ::start_level of the <strong>::program_name</strong> programme for the ::session_year Academic year.</p><p><strong>Holders of Diploma/HND are to submit original copies of their certificate for verification, after which they may be exempted from the university of Ghana required course (offered at AUCC) for one semester. All other applicants will have to pass those required courses to complete their admission.</strong></p><p><br></p><p>Your field of specialisation will be confirmed at the end of Level 200 following an orientation session where you will learn about all the available specialisations and the possible career opportunities available in each specialisation.</p><p><br></p><p>The programme fee per semester is <strong>::fee_amount.</strong> However, with a discount of 15%, you are to pay <strong>::discount_amount</strong>. Please note that, the discount is for one academic year only. The fee must be paid through Cal Bank in the name of the <strong>African University College of Communications (AUCC) into account number ::bank_account at any branch of Cal Bank.</strong> After payment, the pay-in-slip must first be presented to the Accounts Officer at AUCC who will issue a receipt, a copy of which must be presented to the appropriate Secretariat of AUCC towards registration.</p><p><br></p><p><strong>Please note that registration will be on ::register_start to ::register_end, and lectures will begin on ::lecture_start. Orientation is on ::orient_start.</strong></p><p><br></p><p>Should you decide to withdraw from the programme within three weeks of registration, the University shall refund your fees to you less an administrative fee of 30%. No refunds will be made for withdrawals after the third week of registration.</p><p>All students are required to obey the rules and regulations of AUCC. A copy of the Student Handbook will be provided to you. Kindly note that AUCCs <strong>Weekend School is held on Fridays and Saturdays</strong>, and Management reserves the right to change sessions and courses when class sizes are not economically viable.</p><p><br></p><p>All correspondence in relation to your admission should be addressed to the Registrar and should include your reference number as above.</p><p>Congratulations once again. We look forward to personally welcoming you to our campus!</p><p><br></p><p>Yours faithfully,</p><p>::signature</p><p>::signatory</p>'
       }] 
     } 
  }

  export const dummyMLKApplicant = {
    semesterNum: 1,
    admission: { title:'General Admission Session', examStart: moment(), examEnd: moment(), applyStart: moment(), applyEnd: moment(), sortedApplicant: [{ stage: { letterCondition: 'WASSCE Certificate' }}] }, 
    program: { longName:'HIGHER NATIONAL DIPLOMA (HND) IN MEDICAL LABORATORY ASSISTANT' }, 
    bill: { narrative:'Academic Fees for Semester 1', currency:'GHC', amount: 1600, discount:100 }, 
    session: { title: '2022/2023 Academic Semester 1', year:'2023', semester: 1, orientStart: moment(), orientEnd: moment(), lectureStart: moment(), lectureEnd: moment(), registerStart: moment(), registerEnd: moment()}, 
    major: { title: '' }, 
    category: { 
      id: 'DP',
      admissionLetter: [{
        title:'Certificate Program Letter',
        signatory: '<p>Samuel Ogyiri Sackey (Mr.)</p><p>Business Development &amp; Admissions Manager</p><p>For Registrar (AUCC)</p>',
        template:'<p><strong><u>ADMISSION TO THE ::program_name PROGRAMME (::admission_title)</u></strong></p><p><br></p><p>Congratulations!</p><p><br></p><p>I am pleased to inform you that, upon review of your application and, on the basis of your ::cert_condition, you have been offered admission to Level ::start_level of the <strong>::program_name</strong> programme for the ::session_year Academic year.</p><p><strong>Holders of Diploma/HND are to submit original copies of their certificate for verification, after which they may be exempted from the university of Ghana required course (offered at AUCC) for one semester. All other applicants will have to pass those required courses to complete their admission.</strong></p><p><br></p><p>Your field of specialisation will be confirmed at the end of Level 200 following an orientation session where you will learn about all the available specialisations and the possible career opportunities available in each specialisation.</p><p><br></p><p>The programme fee per semester is <strong>::fee_amount.</strong> However, with a discount of 15%, you are to pay <strong>::discount_amount</strong>. Please note that, the discount is for one academic year only. The fee must be paid through Cal Bank in the name of the <strong>African University College of Communications (AUCC) into account number ::bank_account at any branch of Cal Bank.</strong> After payment, the pay-in-slip must first be presented to the Accounts Officer at AUCC who will issue a receipt, a copy of which must be presented to the appropriate Secretariat of AUCC towards registration.</p><p><br></p><p><strong>Please note that registration will be on ::register_start to ::register_end, and lectures will begin on ::lecture_start. Orientation is on ::orient_start.</strong></p><p><br></p><p>Should you decide to withdraw from the programme within three weeks of registration, the University shall refund your fees to you less an administrative fee of 30%. No refunds will be made for withdrawals after the third week of registration.</p><p>All students are required to obey the rules and regulations of AUCC. A copy of the Student Handbook will be provided to you. Kindly note that AUCCs <strong>Weekend School is held on Fridays and Saturdays</strong>, and Management reserves the right to change sessions and courses when class sizes are not economically viable.</p><p><br></p><p>All correspondence in relation to your admission should be addressed to the Registrar and should include your reference number as above.</p><p>Congratulations once again. We look forward to personally welcoming you to our campus!</p><p><br></p><p>Yours faithfully,</p><p>::signature</p><p>::signatory</p>'
      }] 
    } 
 }