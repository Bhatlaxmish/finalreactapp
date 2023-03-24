import React,{useState,useEffect, useCallback} from 'react'


let logouttimer;
const Authcontext=React.createContext({

    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

const calculateRemainingTime=(expirationtime)=>{
    const currentTime=new Date().getTime();/* convert the time to milisecond */
    const adjustExtime=new Date(expirationtime).getTime();/* convert the time to milisecond */
    const reamainingtime=adjustExtime-currentTime;
    return reamainingtime;
}


const retriveStoredtoken=()=>{
    const storedToken=localStorage.getItem('token');
    const storedExpirationDate=localStorage.getItem('expiretime');
    const remainingtime=calculateRemainingTime(storedExpirationDate);
    if(remainingtime<=3600)
    {
        localStorage.removeItem('token');
        localStorage.removeItem('expiretime');
return null;
    }
    return {
        token:storedToken,
        duration:remainingtime,
    }
}

 export const AuthContextProvider=(props)=>{



const tokendata=retriveStoredtoken();
let initialToken;
if(tokendata)
{

    initialToken=tokendata.token;
}
const [token,settoken]=useState(initialToken);


const userlogginornot=!!token;/* it return true or false  */



const loginHandler=(token,expiretime)=>{

settoken(token);

localStorage.setItem('token',token);/* its a browser api which stores some data here first 
                                                  key can be anything value must be specific it is used to 
                                                  stop logout after refresh*/

localStorage.setItem('expiretime',expiretime);


 const remainingtime=calculateRemainingTime(expiretime);  
  logouttimer=setTimeout(logoutHandler,remainingtime);     
  
  

};



const logoutHandler= useCallback(()=>{


settoken(null);

localStorage.removeItem('token');
localStorage.removeItem('expiretime');

if(logouttimer)
{
    clearTimeout(logouttimer);
}


},[]);

useEffect(()=>{
if(tokendata)
{
    logouttimer=setTimeout(logoutHandler,tokendata.duration);
}
},[tokendata,logoutHandler]);

const contextvalue={

    token:token,
    isLoggedIn:userlogginornot,
    login:loginHandler,
    logout:logoutHandler,
};


    return <Authcontext.Provider>{props.childen}</Authcontext.Provider>


}/* whenever a component is wrapped around Authcontext they can also use the Authcontextdata */

export default Authcontext;