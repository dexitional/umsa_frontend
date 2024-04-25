import axios from 'axios';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;

class DricService {
    
    /* FUNDERS */

    async fetchFunders(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/funders`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchFunder(funderId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/funders/${funderId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postFunder(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/funders`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateFunder(funderId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/funders/${funderId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteFunder(funderId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/funders/${funderId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* PAYMENTS */

    async fetchPayments(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/payments`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchPayment(paymentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/payments/${paymentId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postPayment(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/payments`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updatePayment(paymentId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/payments/${paymentId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deletePayment(paymentId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/payments/${paymentId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* CLAIMS */

    async fetchClaims(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/claims`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchClaim(claimId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/claims/${claimId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postClaim(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/claims`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateClaim(claimId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/claims/${claimId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteClaim(claimId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/claims/${claimId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    /* PROJECTS */

    async fetchProjects(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/projects`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchProject(projectId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/projects/${projectId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postProject(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/projects`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateProject(projectId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/projects/${projectId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteProject(projectId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/projects/${projectId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


     /* PHASES */

    //  async fetchPhases(projectId){
    //     try {
    //         const res = await axios.get(`${REACT_APP_API_URL}/dric/${projectId}/phases`)
    //         if(res.status == 200 || res.status == 204)
    //           return res.data
    //         else throw new(res.data.message)
        
    //     } catch (error) { 
    //         toast.error(error.message)
    //     }
    // }

    async fetchPhase(phaseId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/phases/${phaseId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postPhase(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/phases`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updatePhase(phaseId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/phases/${phaseId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deletePhase(phaseId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/phases/${phaseId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* ACTIVITIES */

    async fetchActivities(phaseId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/phases/${phaseId}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchActivity(activityId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/activities/${activityId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postActivity(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/activities`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateActivity(activityId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/activities/${activityId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteActivity(activityId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/activities/${activityId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* INVESTIGATORS */

    async fetchInvestigators(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/investigators`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchInvestigator(InvestigatorId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/investigators/${InvestigatorId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postInvestigator(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/investigators`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateInvestigator(InvestigatorId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/investigators/${InvestigatorId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteInvestigator(InvestigatorId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/investigators/${InvestigatorId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* PERSONNELS */

    async fetchPersonels(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/personels`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchPersonel(personelId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/personels/${personelId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postPersonel(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/personels`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updatePersonel(personelId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/personels/${personelId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deletePersonel(personelId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/personels/${personelId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* ROLES */

    async fetchRoles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/roles?appId=6`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchRole(roleId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/roles/${roleId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postRole(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/dric/roles`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateRole(roleId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/dric/roles/${roleId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteRole(roleId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/dric/roles/${roleId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* COUNTRIES */

    async fetchCountries(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/countries`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    /* DASHBOARD */

    async fetchDashboard(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/dric/dashboard`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /** LETACABIN SYSTEM ***/

    
}

export default new DricService();