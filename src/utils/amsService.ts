import axios from 'axios';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;

class Service {
    
    /* Sessions */
    async fetchSessionList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/sessions/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }
     
    async fetchSessions(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/sessions?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchSession(sessionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/sessions/${sessionId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postSession(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/sessions`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateSession(sessionId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/sessions/${sessionId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteSession(sessionId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/sessions/${sessionId}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Vouchers */
    async fetchVouchers(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/vouchers?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchVoucher(voucherId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/vouchers/${voucherId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postVoucher(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/vouchers`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async sellVoucher(voucherId,data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/vouchers/${voucherId}/sell`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               const dt = res.data;
               toast(`Voucher sold to ${data.applicantName}!\n\n\t\tSerial: ${dt.serial}\n\t\tPin: \t${dt.pin}`,{ duration: 10000, className:'border-2 border text-lg font-medium' })
               //toast.success("Voucher sold!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async recoverVoucher(voucherId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/vouchers/${voucherId}/recover`, { serial: voucherId } ,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               const dt = res.data;
               toast(`Voucher sold to ${dt.applicantName}!\n\n\t\tSerial: ${dt.serial}\n\t\tPin: \t${dt.pin}`,{ duration: 10000, className:'border-2 border text-lg font-medium' })
                //toast.success("Voucher recovered!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateVoucher(voucherId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/vouchers/${voucherId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteVoucher(voucherId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/vouchers/${voucherId}`)
            if(res.status == 200){
               toast.success(`Voucher ${voucherId} was reset !`)
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Letters */
    async fetchLetterList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/letters/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

    async fetchLetters(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/letters?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchLetter(letterId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/letters/${letterId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postLetter(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/letters`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateLetter(letterId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/letters/${letterId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteLetter(letterId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/vouchers/${letterId}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

     /* Applicants */
     async fetchApplicants(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/applicants?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchApplicant(applicantId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/applicants/${applicantId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchApplicantPreview(applicantId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/applicants/${applicantId}/preview`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postApplicant(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/applicants`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateApplicant(applicantId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/applicants/${applicantId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async Applicant(applicantId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/applicants/${applicantId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteApplicant(applicantId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/applicants/${applicantId}`)
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Shortlists */
    async fetchShortlists(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/shortlists?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchShortlist(shortlistId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/shortlists/${shortlistId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postShortlist(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/shortlists`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Applicant shortlisted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            // toast.error(error.message)
            toast("Applicant already in shortlist")
        }
    }

    async updateShortlist(shortlistId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/shortlists/${shortlistId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteShortlist(shortlistId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/shortlists/${shortlistId}`)
            if(res.status == 200){
               toast.success("Applicant unlisted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Matriculants */
    async fetchMatriculants(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/matriculants?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchMatriculant(matriculantId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/matriculants/${matriculantId}`,)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postMatriculant(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/matriculants`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateMatriculant(matriculantId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ams/matriculants/${matriculantId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteMatriculant(matriculantId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ams/matriculants/${matriculantId}`)
            if(res.status == 200){
               toast.success("Admission revoked!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    /* Helpers */
    async fetchStages(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/stages/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchApplytypes(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/applytypes/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }

     async fetchAmsPrices(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/prices/list`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
     }


    /* Application Step */

    // Applicant Configuration 
    async fetchStepApplicant(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/applicant/${encodeURIComponent(serial)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepApplicant(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/applicant`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               //toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async getNextPageUrl(serial,tag = 'configure'){
        try {
            if(tag == 'configure') return { prevUrl: null, nextUrl: `/amsp/profile` }
            
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/applicant/${encodeURIComponent(serial)}`)
            if(res.status == 200 || res.status == 204){
               const data = res?.data;
               const currentStepMeta = data?.meta?.find(r => r?.tag == tag);
               const nextStepMeta = data?.meta?.find(r => r?.num == (Math.min(data?.meta?.length,currentStepMeta?.num+1)));
               const prevStepMeta = data?.meta?.find(r => r?.num == (Math.max(1,currentStepMeta?.num-1)));
               return { prevUrl: `/amsp/${prevStepMeta?.tag}`, nextUrl: `/amsp/${nextStepMeta?.tag}` }
            
            }  else throw new(res.data.message)
        
        } catch (error) {
            console.error(error.message)
        }
    }
    

    // Profile
    async fetchStepProfile(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/profile/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepProfile(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/profile`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               //toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    // Guardian
    async fetchStepGuardian(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/guardian/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepGuardian(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/guardian`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               //toast.success("Record saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    // Education
    async fetchStepEducation(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/education/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepEducation(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/education`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    // Education
    async fetchStepResult(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/result/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepResult(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/result`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    // Choice
    async fetchStepChoice(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/choice/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepChoice(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/choice`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    // Documents
    async fetchStepDocument(serial){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ams/step/document/${serial}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async saveStepDocument(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/document`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    // Review & Completion
   
    async saveStepReview(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ams/step/review`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* Admission helpers */
    async fetchInstituteCategories(){
      try {
        const res = await axios.get(`${REACT_APP_API_URL}/ams/institutes/list`)
        if(res.status == 200 || res.status == 204)
            return res.data
        else throw new(res.data.message)
    
      } catch (error) { 
        toast.error(error.message)
      }
    }

    async fetchCertCategories(){
        try {
          const res = await axios.get(`${REACT_APP_API_URL}/ams/certificates/list`)
          if(res.status == 200 || res.status == 204)
              return res.data
          else throw new(res.data.message)
      
        } catch (error) { 
          toast.error(error.message)
        }
    }

    async fetchDocumentCategories(){
        try {
          const res = await axios.get(`${REACT_APP_API_URL}/ams/documents/list`)
          if(res.status == 200 || res.status == 204)
              return res.data
          else throw new(res.data.message)
      
        } catch (error) { 
          toast.error(error.message)
        }
    }

    async fetchGradeWeights(){
        try {
          const res = await axios.get(`${REACT_APP_API_URL}/ams/gradeweights/list`)
          if(res.status == 200 || res.status == 204)
              return res.data
          else throw new(res.data.message)
      
        } catch (error) { 
          toast.error(error.message)
        }
    }

    async fetchSubjects(){
        try {
          const res = await axios.get(`${REACT_APP_API_URL}/ams/subjects/list`)
          if(res.status == 200 || res.status == 204)
              return res.data
          else throw new(res.data.message)
      
        } catch (error) { 
          toast.error(error.message)
        }
    }

}

export default new Service();