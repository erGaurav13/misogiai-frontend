import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCESS, LOGOUT, SIGNUP_FAILED, SIGNUP_REQUEST, SIGNUP_SUCESS } from "./Auth.Action.Types"

const localStorageToken=(localStorage.getItem("token")) || null;
const localStorageAcess=JSON.parse(localStorage.getItem("coAdmin")) || null
 
const init={
    isAuth:localStorageToken!==null?true:false,
    coAdmin:localStorageAcess||[],
    token:localStorageToken,
    login_loading:false,
    signup_loading:false,
}


export const AuthReducer=(state=init,action)=>{

  

    switch(action.type){

        case LOGIN_REQUEST:{
            return  {...state, login_loading:true}
          }
        
          case LOGIN_SUCESS:{
            
            localStorage.setItem("token", action.payload )
            return  {...state, login_loading:false,isAuth:true,token:action.payload}
          }      
 
          case LOGIN_FAILED:{
            localStorage.setItem("token",null)
            localStorage.removeItem('token')
            return  {...state, login_loading:false,isAuth:false,token:null}
          }
           
        
         case SIGNUP_REQUEST:{
             return {...state,signup_loading:true}
         }  

         
         case SIGNUP_SUCESS:{
            return {...state,signup_loading:false}
         }
        
         case SIGNUP_FAILED:{
            return {...state,signup_loading:false}
         
         }

         case LOGOUT:{
          // console.log("Logiout ckick")
          localStorage.setItem("token",null)
          localStorage.removeItem('token')
          localStorage.removeItem('role'); 
          localStorage.removeItem('coAdmin'); 
       
          return {...state,isAuth:false,token:null}
       
       }

       default: return state 
    }
 

}