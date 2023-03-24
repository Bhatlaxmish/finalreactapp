import { useState, useRef ,useContext} from 'react'
import Authcontext from '../../store/Authcontext';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css'

const AuthForm = () => {
  const history=useHistory();
  const email = useRef()
  const password = useRef();

const authcontext=useContext(Authcontext);

  const [isloading,setisloading]=useState(false);
  /* using useRef :- declare like above go to perticular tag and insert ref={the name given here(email) then by using email.current.value you can get the enterd value} */

  const [isLogin, setIsLogin] = useState(true)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const OnsubmitHandler = (event) => {
    event.preventDefault();
setisloading(true);
    const enteredemail = email.current.value
    const enterdpassword = password.current.value
    // console.log(enteredemail,enterdpassword);
    if (isLogin) {
fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbMylXKKv96IDHVR5JwtxL_Qx48emTb5w',{

method:'POST',
body:JSON.stringify({
email:enteredemail,
password:enterdpassword,
returnSecureToken:true,

}),
headers:{
'content-Type':'application/json'
}
}).then(res=>{
  setisloading(false);
  if(res.ok)
  {
return res.json();
  }

  else{

  
 return res.json.then(data=>{
    let errormessage='authentication failed';
    if(data&&data.error&&data.error.message)
    {
      errormessage=data.error.message;
    }
    // alert(errormessage);
    throw new Error(errormessage);
  })
}
}).then((data)=>{
/* if success */
// console.log(data);
const expiretime=new Date(new Date().getTime()+(+data.expiresIn*1000));/* expiresIn is value will be in brower firebase 
                                                                               defines it  */
authcontext.login(data.idToken,data.expiretime.toISOString());/* idtoken is like value will be in browser */
history.replace('/');
})
/* if failed */
.catch((error)=>{
  alert(error.message);
});











    }
    
    else {
      /* the fetch api is provided by firebase itself get from firebase rest api and there at signup  */
      /* go to firebase go to project settings which is at project overview copy web api from there and paste it here infront of key= */
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbMylXKKv96IDHVR5JwtxL_Qx48emTb5w',
        {
          method: 'POST',
          body: JSON.stringify({
            /* the fetch to send data method should be 'POST' body must be in the json format  JSON.stringify converts the data to json and the json file shold include email password and returnsecuretoken as  for firebase assign these respective data to them  */

            email: enteredemail,
            password: enterdpassword,
            returnSecureToken: true,
          }),
          headers: {
            'content-Type':
              'application/json' /* it tells firebase that some json data is coming */,
          },
        },
      ).then((res) => {
        setisloading(false);
        if (res.ok) {
return res.json();
        } else {
          /* res.json to get data */
          return res.json().then((data) => {
            let errormessage = 'authentication failed'
            if (data && data.error && data.error.message) {
              errormessage =
                data.error
                  .message /* like event.target.value the data contains error and message */
            }
            // alert(errormessage);
            throw new Error (errormessage);
          })
        }
      }).then((data)=>{
// console.log(data);
authcontext.login(data.idToken);
      }).catch((error)=>{
        alert(error.message);
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={OnsubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input  type="email" id="email" required  ref={email}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required   ref={password}/>
        </div>
        <div className={classes.actions}>

          {!isloading&& <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isloading && <p>loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
