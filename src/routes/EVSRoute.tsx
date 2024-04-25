import React from 'react'
import EVSDashPage, { loader as dashLoader } from '../pages/evs/EVSDashPage';
import EVSPage, { loader as pageLoader } from '../pages/evs/EVSPage';
import { useUserStore } from '../utils/authService';
import PgResult from '../components/evs/PgResult';
import PgControl from '../components/evs/PgControl';
import PgCandidate,{ loader as candiateLoader} from '../components/evs/PgCandidate';
import PgRegister, { loader as registerLoader } from '../components/evs/PgRegister';
import PgPublic from '../components/evs/PgPublic';
import PgStrongroom from '../components/evs/PgStrongroom';
import EVSLayout from '../components/evs/EVSLayout';
import PgVoting from '../components/evs/PgVoting';

const user = useUserStore.getState().user
const evsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'evs')

const EVSRoute:any =  {
   path: "evs",
   element: <EVSLayout />,
   //action: chosenAction,
   children: [
      // Dashboard
      {  path:'dash', 
         element: <EVSDashPage />,
         loader: dashLoader,
         index:true
      },
      
      // Election Page
      {  path:':eid',
         element: <EVSPage />,
         loader: pageLoader,
         children: [
            {  
               path:'vip',
               element: <PgStrongroom />, 
               loader: candiateLoader,
            },
            {  
               path:'public',
               element: <PgPublic />, 
               loader: candiateLoader,
            },
            {  
               path:'register',
               element: <PgRegister />, 
               loader: registerLoader,
               index: true
            },
            {  
               path:'candidate',
               element: <PgCandidate />, 
               loader: candiateLoader,
            },
            {  
               path:'control',
               element: <PgControl />, 
               loader: pageLoader,
            },
            {  
               path:'result',
               element: <PgResult />, 
               loader: candiateLoader,
            },
            
            // Voting Simulation
            {  path:'voting', 
               element: <PgVoting />,
               loader: candiateLoader,
            },
         ] 
      },
      
      
      // { 
      //    path:'profile/:profileId/edit', 
      //    element: <PgAISPProfileForm />, 
      //    loader: aispProfileFormLoader,
      //    action: aispProfileAction
      // },

      
      

   ]
}

export default EVSRoute