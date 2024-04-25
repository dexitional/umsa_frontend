import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../utils/authService';
import AMSLayout from '../components/ams/AMSLayout';
import PgAMSSessions, { loader as sessionsLoader, action as amsSessionDestroy } from '../pages/ams/PgAMSSessions';
import PgAMSSessionForm, { loader as amsSessionFormLoader, action as amsSessionFormAction } from '../pages/ams/PgAMSSessionForm';
import PgAMSLetters, { loader as lettersLoader, action as amsLetterDestroy } from '../pages/ams/PgAMSLetters';
import PgAMSLetter, { loader as amsLetterLoader } from '../pages/ams/PgAMSLetter';
import PgAMSLetterForm, { loader as amsLetterFormLoader, action as amsLetterFormAction } from '../pages/ams/PgAMSLetterForm';
import PgAMSVouchers, { loader as vouchersLoader, action as amsVoucherRecover } from '../pages/ams/PgAMSVouchers';
import PgAMSVoucherForm, { loader as amsVoucherFormLoader, action as amsVoucherFormAction } from '../pages/ams/PgAMSVoucherForm';
import PgAMSVoucherSellForm, { loader as amsVoucherSellFormLoader, action as amsVoucherSellFormAction } from '../pages/ams/PgAMSVoucherSellForm';
import PgAMSApplicants, { loader as applicantsLoader, action as amsApplicantDestroy } from '../pages/ams/PgAMSApplicants';
import PgAMSApplicantForm, { loader as amsApplicantFormLoader, action as amsApplicantFormAction } from '../pages/ams/PgAMSApplicantForm';
import PgAMSApplicant, { loader as applicantLoader, action as amsApplicantShortlist } from '../pages/ams/PgAMSApplicant';
import PgAMSShortlists, { loader as shortlistsLoader, action as amsShortlistDestroy } from '../pages/ams/PgAMSShortlists';
import PgAMSShortlist, { loader as shortlistLoader } from '../pages/ams/PgAMSShortlist';
import PgAMSShortlistForm, { loader as amsShortlistFormLoader, action as amsShortlistFormAction } from '../pages/ams/PgAMSShortlistForm';
import PgAMSMatriculants, { loader as matriculantsLoader, action as amsMatriculantDestroy } from '../pages/ams/PgAMSMatriculants';
import PgAMSMatriculant, { loader as amsMatriculantLoader } from '../pages/ams/PgAMSMatriculant';
import FMSLayout from '../components/fms/FMSLayout';

const user = useUserStore.getState().user
const amsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'ams')
  
const FMSRoute:any =  { 
   path: "fms",
   element: <FMSLayout />,
   // action: chosenAction,
   children: [
      /* Student Bills Module */
      { 
         path:'bills', 
         element: <PgAMSSessions />,
         loader: sessionsLoader,
         index: true
      },
      { 
         path:'bills/create', 
         element: <PgAMSSessionForm />,
         loader: amsSessionFormLoader,
         action: amsSessionFormAction
      },
      { 
         path:'bills/:billId/destroy', 
         action: amsSessionDestroy,
      },
      { 
         path:'bills/:billId/edit', 
         element: <PgAMSSessionForm />, 
         loader: amsSessionFormLoader,
         action: amsSessionFormAction
      },


      /* Student Charges Module */
      { 
         path:'charges', 
         element: <PgAMSLetters />,
         loader: lettersLoader,
      },
      { 
         path:'charges/create', 
         element: <PgAMSLetterForm />,
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },
      { 
         path:'charges/:chargeId', 
         element: <PgAMSLetter />,
         loader: amsLetterLoader,
      },
      { 
         path:'charges/:chargeId/destroy', 
         action: amsLetterDestroy,
      },
      { 
         path:'charges/:chargeId/edit', 
         element: <PgAMSLetterForm />, 
         loader: amsLetterFormLoader,
         action: amsLetterFormAction
      },

      /* Student Accounts Module */
      { 
         path:'accounts', 
         element: <PgAMSVouchers />,
         loader: vouchersLoader,
      },
      { 
         path:'accounts/create', 
         element: <PgAMSVoucherForm />,
         loader: amsVoucherFormLoader,
         action: amsVoucherFormAction
      },
      { 
         path:'accounts/:voucherId/sell', 
         element: <PgAMSVoucherSellForm />, 
         loader: amsVoucherSellFormLoader,
         action: amsVoucherSellFormAction
      },
      { 
         path:'accounts/:voucherId/recover', 
         action: amsVoucherRecover,
      },
      { 
         path:'accounts/:voucherId/reset', 
         action: amsVoucherRecover,
      },

      /* Student Debtors Module */
      { 
         path:'debtors', 
         element: <PgAMSApplicants />,
         loader: applicantsLoader,
      },
      { 
         path:'debtors/create', 
         element: <PgAMSApplicantForm />,
         loader: amsApplicantFormLoader,
         action: amsApplicantFormAction
      },
      { 
         path:'debtors/:debtorId', 
         element: <PgAMSApplicant />,
         loader: applicantLoader,
      },
      { 
         path:'debtors/:debtorId/shortlist', 
         action: amsApplicantShortlist,
      },
      { 
         path:'debtors/:debtorId/edit', 
         element: <PgAMSApplicantForm />, 
         loader: amsApplicantFormLoader,
         action: amsApplicantFormAction
      },


      /* Fees Payments Module */
      { 
         path:'payments', 
         element: <PgAMSShortlists />,
         loader: shortlistsLoader,
      },
      { 
         path:'payments/create', 
         element: <PgAMSShortlistForm />,
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },
      { 
         path:'payments/:paymentId', 
         element: <PgAMSShortlist />,
         loader: shortlistLoader,
      },
      { 
         path:'payments/:paymentId/destroy', 
         action: amsShortlistDestroy,
      },
      { 
         path:'payments/:paymentId/process', 
         element: <PgAMSShortlistForm />, 
         loader: amsShortlistFormLoader,
         action: amsShortlistFormAction
      },

       /* Other Payments Module */
       { 
         path:'transacts', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'transacts/:transactId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'transacts/:transactId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Service Costs Module */
      { 
         path:'services', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'services/:serviceId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'services/:serviceId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Voucher Costs Module */
      { 
         path:'vcosts', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'vcosts/:costId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'vcosts/:costId/destroy', 
         action: amsMatriculantDestroy,
      },

      /* Voucher Sales Module */
      { 
         path:'vsales', 
         element: <PgAMSMatriculants />,
         loader: matriculantsLoader,
      },
      { 
         path:'vsales/:saleId', 
         element: <PgAMSMatriculant />,
         loader: amsMatriculantLoader,
      },
      { 
         path:'vsales/:saleId/destroy', 
         action: amsMatriculantDestroy,
      }
   ]
}

export default FMSRoute