import React from 'react'
import { useUserStore } from '../utils/authService';
import PgAMSVouchers, {  action as amsVoucherRecover } from '../pages/ams/PgAMSVouchers';
import PgAMSShortlists, { loader as shortlistsLoader, action as amsShortlistDestroy } from '../pages/ams/PgAMSShortlists';
import PgAMSShortlist, { loader as shortlistLoader } from '../pages/ams/PgAMSShortlist';
import PgAMSShortlistForm, { loader as amsShortlistFormLoader, action as amsShortlistFormAction } from '../pages/ams/PgAMSShortlistForm';
import PgAMSMatriculants, { loader as matriculantsLoader, action as amsMatriculantDestroy } from '../pages/ams/PgAMSMatriculants';
import PgAMSMatriculant, { loader as amsMatriculantLoader } from '../pages/ams/PgAMSMatriculant';
import FMSLayout from '../components/fms/FMSLayout';
import PgFMSAccounts, { loader as accountsLoader } from '../pages/fms/PgFMSAccounts';
import PgFMSAccount from '../pages/fms/PgFMSAccount';
import PgFMSStudentFinance, { loader as accountLoader } from '../pages/fms/PgFMSStudentFinance';
import PgFMSDebts, { loader as debtsLoader } from '../pages/fms/PgFMSDebts';
import PgFMSPayments, { loader as paymentsLoader } from '../pages/fms/PgFMSPayments';
import PgFMSPaymentForm, { loader as paymentFormLoader, action as paymentFormAction} from '../pages/fms/PgFMSPaymentForm';
import PgFMSTransacts, { loader as transactsLoader } from '../pages/fms/PgFMSTransacts';
import PgFMSBills, { loader as billsLoader, action as billsDestroy } from '../pages/fms/PgFMSBills';
import PgFMSBillForm, { loader as billFormLoader, action as billFormAction } from '../pages/fms/PgFMSBillForm';
import PgFMSBill, { loader as billLoader, action as billAction } from '../pages/fms/PgFMSBill';
import PgFMSBillReceiver, { loader as fmsReceiverLoader } from '../pages/fms/PgFMSBillReceiver';
import PgFMSBillActivity, { loader as  fmsActivityLoader } from '../pages/fms/PgFMSBillActivity';
import PgFMSBillAccount, { loader as  fmsActionLoader } from '../pages/fms/PgFMSBillAccount';
import PgFMSCharges, { loader as chargesLoader, action as chargeDestroy } from '../pages/fms/PgFMSCharges';
import PgFMSChargeForm, { loader as chargeFormLoader, action as chargeFormAction } from '../pages/fms/PgFMSChargeForm';
import PgFMSVouchers, { loader as vouchersLoader } from '../pages/fms/PgFMSVouchers';
import PgFMSScosts, { loader as servicesLoader, action as serviceDestroy } from '../pages/fms/PgFMSScosts';
import PgFMSScostForm, { loader as serviceFormLoader, action as serviceFormAction } from '../pages/fms/PgFMSScostForm';
import PgFMSVcosts, { loader as vcostsLoader, action as vcostDestroy } from '../pages/fms/PgFMSVcosts';
import PgFMSVcostForm, { loader as vcostFormLoader, action as vcostFormAction } from '../pages/fms/PgFMSVcostForm';

const user = useUserStore.getState().user
const fmsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'fms')
  
const FMSRoute:any =  { 
   path: "fms",
   element: <FMSLayout />,
   // action: chosenAction,
   children: [
      /* Student Bills Module */
      { 
         path:'bills', 
         element: <PgFMSBills />,
         loader: billsLoader,
         //index: true
      },
      { 
         path:'bills/:billId', 
         id:'billId',
         element: <PgFMSBill />,
         loader: billLoader,
         children: [
            {
               path:'actions', 
               element: <PgFMSBillAccount />,
               loader: fmsActionLoader,
               index: true
            },
            {
               path:'receivers', 
               element: <PgFMSBillReceiver />,
               loader: fmsReceiverLoader,
            },
            {
               path:'activity', 
               element: <PgFMSBillActivity />,
               loader: fmsActivityLoader,
            }
         ]
      },
      { 
         path:'bills/create', 
         element: <PgFMSBillForm />,
         loader: billFormLoader,
         action: billFormAction
      },
      { 
         path:'bills/:billId/destroy', 
         action: billsDestroy,
      },
      { 
         path:'bills/:billId/edit', 
         element: <PgFMSBillForm />, 
         loader: billFormLoader,
         action: billFormAction
      },


      /* Student Charges Module */
      { 
         path:'charges', 
         element: <PgFMSCharges />,
         loader: chargesLoader,
      },
      { 
         path:'charges/create', 
         element: <PgFMSChargeForm />,
         loader: chargeFormLoader,
         action: chargeFormAction
      },
      { 
         path:'charges/:chargeId/destroy', 
         action: chargeDestroy,
      },
      { 
         path:'charges/:chargeId/edit', 
         element: <PgFMSChargeForm />,
         loader: chargeFormLoader,
         action: chargeFormAction
      },

      /* Student Accounts Module */
      { 
         path:'accounts', 
         element: <PgFMSAccounts />,
         loader: accountsLoader,
         index: true
      },
      { 
         path:'accounts/:accountId', 
         id:'accountSid',
         element: <PgFMSStudentFinance />,
         loader: accountLoader,
      },
      { 
         path:'accounts/:accountId/retire', 
         action: amsVoucherRecover,
      },
      { 
         path:'accounts/:accountId/fine', 
         action: amsVoucherRecover,
      },

      /* Student Debtors Module */
      { 
         path:'debtors', 
         element: <PgFMSDebts />,
         loader: debtsLoader,
      },
      
      /* Fees Payments Module */
      { 
         path:'payments', 
         element: <PgFMSPayments />,
         loader: paymentsLoader,
      },
      { 
         path:'payments/create', 
         element: <PgFMSPaymentForm />,
         loader: paymentFormLoader,
         action: paymentFormAction
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
         element: <PgFMSTransacts />,
         loader: transactsLoader,
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

      /* Voucher Payments/Sales Module */
      { 
         path:'vsales', 
         element: <PgFMSVouchers />,
         loader: vouchersLoader,
      },

      /* Service Costs Module */
      { 
         path:'services', 
         element: <PgFMSScosts />,
         loader: servicesLoader,
      },
      { 
         path:'services/create', 
         element: <PgFMSScostForm />,
         loader: serviceFormLoader,
         action: serviceFormAction
      },
      { 
         path:'services/:serviceId/destroy', 
         action: serviceDestroy,
      },
      { 
         path:'services/:serviceId/edit', 
         element: <PgFMSScostForm />,
         loader: serviceFormLoader,
         action: serviceFormAction
      },

      /* Voucher Costs Module */
      { 
         path:'vcosts', 
         element: <PgFMSVcosts />,
         loader: vcostsLoader,
      },
      { 
         path:'vcosts/create', 
         element: <PgFMSVcostForm />,
         loader: vcostFormLoader,
         action: vcostFormAction
      },
      { 
         path:'vcosts/:costId/edit', 
         element: <PgFMSVcostForm />,
         loader: vcostFormLoader,
         action: vcostFormAction
      },
      { 
         path:'vcosts/:costId/destroy', 
         action: vcostDestroy,
      }

      
   ]
}

export default FMSRoute