import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;

// const instance = Axios.create(); 
// const axios = setupCache(instance)

class EvsService {
    
    async fetchElections(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchMyElections(tag){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/my/${tag}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchElection(electionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/${electionId}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchVotes(electionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/${electionId}/data`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async postVotes(electionId,data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/elections/${electionId}/data`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            console.log(res)
            if(res.status == 200){
               toast.success("Voted successfully!",{ className:'font-bold text-lg text-green-600'})
               return res.data
            }
            else if(res.status == 203 && res?.data?.message.toLowerCase() == 'elector already voted'){
               toast.error(res?.data?.message,{ className:'font-bold text-lg text-red-500'})
               return res?.data;
            }
            else return toast.error(res.data.message,{ className:'font-bold text-lg text-red-500'})
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchPortfolios(electionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/${electionId}/portfolios`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchVoters(electionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/${electionId}/voters`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchVoter(electionId,tag){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/elections/${electionId}/voters/${tag}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async postVoter(electionId,data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/elections/${electionId}/voters`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else return toast.error(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteVoter(electionId,tag){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/elections/${electionId}/voters/${tag}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    async fetchReceipt(electionId,tag){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/elections/${electionId}/receipt/${tag}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async postElection(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/elections`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else return toast.error(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateElection(electionId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/evs/elections/${encodeURIComponent(electionId)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteElection(electionId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/elections/${electionId}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

   
    /* PORTFOLIOS */

    async fetchRoles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/roles`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchPortfolio(portfolioId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/portfolios/${portfolioId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }


    async postPortfolio(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/portfolios`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updatePortfolio(portfolioId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/evs/portfolios/${portfolioId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deletePortfolio(portfolioId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/portfolios/${portfolioId}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


     /* CANDIDATES */

     async fetchCandidates(portfolioId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/portfolios/${portfolioId}/candidates`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchCandidate(candidateId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/candidates/${candidateId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }


    async postCandidate(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/candidates`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateCandidate(candidateId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/evs/candidates/${candidateId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteCandidate(candidateId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/candidates/${candidateId}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    
}

export default new EvsService();