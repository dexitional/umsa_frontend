import toast from 'react-hot-toast';
import { redirect } from 'react-router';
import { useUserStore } from './authService';
import axios from './axios';

const token = useUserStore.getState().token;

// const cookies = new Cookies({}, { path: '/' });
// const token = cookies.get("@Auth:token");

const { REACT_APP_API_URL } = import.meta.env;

const logout = useUserStore.getState().logout;
const isAuthenticated: any = useUserStore.getState().isAuthenticated;

const checkSession = (r) => {
   const status = r?.response?.status;
   if(!isAuthenticated){ // If session expires, Logout
     return redirect('/');
   } else if(status == 401){
     logout();
     return window.location.href='/';
   } else {
     console.log(r);
   }
}

class Service {
    
    /* Calendar */
    async fetchSessionList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions/list`,{
               headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async fetchSessions(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions?keyword=${keyword}&page=${page}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async fetchSession(sessionId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async activateSession(sessionId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sessions/activate`, { sessionId },{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async postSession(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sessions`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async updateSession(sessionId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async deleteSession(sessionId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/sessions/${encodeURIComponent(sessionId)}`,{
                headers: { "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }
    
    /* STUDENT */
    async fetchStudents(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students?keyword=${keyword}&page=${page}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async fetchStudent(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`,{
               headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchStudentFinance(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/finance`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchStudentTranscript(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/transcript`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchStudentActivity(studentId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}/activity`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async stageStudentAccess(studentId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/stage`,{ studentId },{
                headers: { "x-access-token" : token }
            })
            console.log(res.status)
            if(res.status == 200 || res.status == 202){
                return res.data
            } else if(res.status == 500){
              console.error("Portal account already staged")
            }
            else throw new(res.data.message)
        
        } catch (error) {
            console.log(error?.response)
            console.error(error?.response?.data)
        }
    }

    async resetStudentAccess(studentId,email){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/reset`,{ studentId },{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202){
                const data = res?.data
                console.log(data)
                toast(`Password changed to: \t${data?.password} for ${email}`,{ className:'rounded-full bg-green-100 shadow border-4 border-white text-base text-primary-dark font-semibold', duration: 15000 })
            }
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async changePhoto(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/auth/photos`,data,{
                headers: { 
                  "Content-Type" : "multipart/form-data",
                  "x-access-token" : token 
                }
            })
            if(res.status == 200 || res.status == 202){
               toast.success("Photo updated!")
               return res.data
            }
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async removePhoto(tag){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/auth/photos/${encodeURIComponent(tag)}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202){
                toast.success("Photo removed!");
                return res.data
            }
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async generateIndex(studentId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/indexgen`, { studentId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Index number generated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async generateEmail(studentId){
      try {
          const res = await axios.post(`${REACT_APP_API_URL}/ais/students/mailgen`, { studentId },{
              headers: { "Content-Type" : "application/json", "x-access-token" : token }
           })
          if(res.status == 200){
             const data = res.data;
             toast.success(`${studentId} password is ${data}`);
             return data;
          } 
          else throw new(res.data.message)
      
      } catch (error) { 
         return checkSession(error)
      }
  }

    async pardonStudent(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students/pardon`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Student pardon activated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }


    async postStudent(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/students`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async updateStudent(studentId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async deleteStudent(studentId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/students/${encodeURIComponent(studentId)}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

     /* COURSES */
     async fetchCourseList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses/list`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchCourses(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses?keyword=${keyword}&page=${page}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchCourse(courseId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`,{
                headers: { "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postCourse(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/courses`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateCourse(courseId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteCourse(courseId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/courses/${encodeURIComponent(courseId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     /* PROGRAMS */
     async fetchProgramList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchPrograms(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async fetchProgram(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchProgramStructure(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/curriculum`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchProgramStudent(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/students`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchProgramStatistics(programId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}/statistics`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async postProgram(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/programs`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async updateProgram(programId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async deleteProgram(programId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/programs/${encodeURIComponent(programId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    /* MAJORS */
    async fetchMajorList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/majors/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


    /* CURRICULUMS */
   
     async fetchCurriculums(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/curriculums?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchCurriculum(curriculumId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postCurriculum(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/curriculums`, data,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateCurriculum(curriculumId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteCurriculum(curriculumId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/curriculums/${encodeURIComponent(curriculumId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


    /* Schemes */
    async fetchSchemeList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchSchemes(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchScheme(schemeId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postScheme(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/schemes`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateScheme(schemeId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteScheme(schemeId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/schemes/${encodeURIComponent(schemeId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }



    /* Sheets */
    async fetchSheetList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchSheets(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchMySheets(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets/my?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchSheet(sheetId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async stageSheet(sessionId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/stage`, { sessionId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Scoresheets created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
          return checkSession(error)
        }
     }

     async loadSheet(sheetId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/load`, { sheetId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async saveSheet(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets/save`, data ,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               //toast.success("Sheet saved!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async postSheet(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/sheets`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateSheet(sheetId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async assignSheet(sheetId,assignStaffId){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`, { assignStaffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Sheet assigned!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async submitSheet(sheetId){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}/submit`, {},{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Sheet submited!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async closeSheet(sheetId){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}/close`, {},{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Sheet closed!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async publishSheet(sheetId){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}/publish`, {},{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("sheet published!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async unpublishSheet(sheetId){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}/unpublish`, {},{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Sheet unpublished!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteSheet(sheetId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/sheets/${encodeURIComponent(sheetId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


      /* Backlogs */
    async fetchBacklogList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/schemes/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data;
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchBacklogs(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/backlogs?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchBacklog(backlogId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/backlogs/${encodeURIComponent(backlogId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async approveBacklog(backlogId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/backlogs/approve`, { backlogId } ,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postBacklog(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/backlogs`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
             })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateBacklog(backlogId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/backlogs/${encodeURIComponent(backlogId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteBacklog(backlogId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/backlogs/${encodeURIComponent(backlogId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


      /* Deferments */
    
      async fetchDeferments(keyword,page){
         try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/deferments?keyword=${keyword}&page=${page}`,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
         
         } catch (error) { 
            return checkSession(error)
         }
      }

      async fetchDeferment(defermentId){
         try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/deferments/${encodeURIComponent(defermentId)}`,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
         
         } catch (error) {
            return checkSession(error)
         }
      }

      async approveDeferment(defermentId){
         try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/deferments/approve`, { defermentId } ,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
         
         } catch (error) {
            return checkSession(error)
         }
      }

      async postDeferment(data){
         try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/deferments`, data,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
         
         } catch (error) { 
            return checkSession(error)
         }
      }

      async updateDeferment(defermentId,data){
         try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/deferments/${encodeURIComponent(defermentId)}`, data,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
         
         } catch (error) { 
            return checkSession(error)
         }
      }

      async deleteDeferment(defermentId){
         try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/deferments/${encodeURIComponent(defermentId)}`,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
         
         } catch (error) { 
            return checkSession(error)
         }
      }

    
     /* Progressions */
    
     async fetchProgression(keyword,page){
         try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/progression?keyword=${keyword}&page=${page}`,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
         
         } catch (error) { 
            return checkSession(error)
         }
    }

    async progressStudents(sessionId){
         try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/progression`, { sessionId },{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            console.log(res.data)
            if(res.status == 200){
               toast.success("Progression completed!")
               return res.data
            } 
            else throw(res.data.message)
         
         } catch (error) { 
            toast.error("Progression incomplete !")
         }
    }

    async progressStudent(data){
         try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/progression/student`, data,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Student progressed!")
               return res.data
            } 
            else throw(res.data.message)
         
         } catch (error) { 
            toast.error("Student already progressed !")
         }
    }


    /* Registrations */
    async fetchRegistrationList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchRegistrations(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchRegistration(registrationId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async fetchRegistrationMount(registrationId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/registrations/mount/${encodeURIComponent(registrationId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postRegistration(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/registrations`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            console.log(res.data)
            if(res.status == 200){
               toast.success("Registration completed!")
               return res.data
            } 
            else if(res.status == 202){
                console.log(res)
                toast.success(res.data?.message)
            } 
            else throw(res.data.message)
        
        } catch (error) { 
            toast.success(error.message)
        }
     }

     async updateRegistration(registrationId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteRegistration(registrationId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/registrations/${encodeURIComponent(registrationId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Registration deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


     /* DEPARTMENTS */
     async fetchDepartments(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/departments`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     /* FACULTIES */
     async fetchFaculties(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/faculties`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     /* UNITS */

     async fetchUnitList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }
     
     async fetchUnits(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchUnit(unitId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postUnit(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/units`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateUnit(unitId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteUnit(unitId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/units/${encodeURIComponent(unitId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


      /* JOBS */

      async fetchJobList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }
     
     async fetchJobs(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchJob(jobId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postJob(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/jobs`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateJob(jobId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteJob(jobId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/jobs/${encodeURIComponent(jobId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


     /* USER */
     async isUser(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/checkuser`, { userId: staffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async checkUser(userId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/checkuser`, { userId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               return res.data
            } 
        } catch (error) { 
           return checkSession(error)
        }
     }

      
     /* USER ROLES */

     async fetchUserRolesById(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/uroles/list`, { staffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }
     
     async fetchUserRoles(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/uroles?keyword=${keyword}&page=${page}`,{
               headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchUserRole(roleId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
     }

     async postUserRole(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/uroles`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("New User Role Created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async updateUserRole(roleId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async deleteUserRole(roleId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/uroles/${encodeURIComponent(roleId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("User Role Removed!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


      /* APP ROLES */

      async fetchAppRoleList(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/aroles/list`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


      /* STAFF */
    async fetchStaffs(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/staff?keyword=${keyword}&page=${page}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async fetchStaff(staffId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async fetchStaffRole(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/role`,{ staffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }


    async stageStaffAccess(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/stage`,{ staffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            console.log(res.status)
            if(res.status == 200 || res.status == 202){
                return res.data
            } else if(res.status == 500){
              console.error("User account already staged")
            }
            else throw new(res.data.message)
        
        } catch (error) {
            console.log(error?.response)
            console.error(error?.response?.data)
        }
    }

    async resetStaffAccess(staffId){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff/reset`,{ staffId },{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202){
                const data = res?.data
                console.log(data)
                toast(`Password changed to: \t${data?.password}`,{ className:'rounded-full bg-green-100 shadow border-4 border-white text-base text-primary-dark font-semibold', duration: 15000 })
            }
            else throw new(res.data.message)
        
        } catch (error) {
           return checkSession(error)
        }
    }

    async postStaff(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/ais/staff`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record created!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async updateStaff(staffId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`, data,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record updated!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
    }

    async deleteStaff(staffId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/ais/staff/${encodeURIComponent(staffId)}`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200){
               toast.success("Record deleted!")
               return res.data
            } 
            else throw new(res.data.message)
        } catch (error) { 
           return checkSession(error)
        }
    }

    



     /* HELPERS */
     async fetchCountries(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/countries`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchRegions(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/regions`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchReligions(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/religions`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchDisabilities(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/disabilities`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchTitles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/titles`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchCategories(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/categories`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchMarital(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/marital`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchRelations(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/relations`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchCollectors(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/collectors`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }


     async fetchVendors(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/vendors`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async fetchAppRoles(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/ais/approles`,{
                headers: { "Content-Type" : "application/json", "x-access-token" : token }
            })
            if(res.status == 200 || res.status == 202)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
           return checkSession(error)
        }
     }

     async convertBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => resolve(fileReader.result)
          fileReader.onerror = error => reject(error)
        })
     }

     async base64ToUrl(base64){
       return base64;
     }

    
}

export default new Service();