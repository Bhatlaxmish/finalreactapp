import classes from './ProfileForm.module.css';
import {useRef,useContext} from 'react';
import Authcontext from '../../store/Authcontext';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
const history=useHistory();
  const newpassword=useRef();

const authcontext=useContext(Authcontext);

const changepasswordHandler=(event)=>{
  event.preventDefault();
const password=newpassword.current.value;

fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBbMylXKKv96IDHVR5JwtxL_Qx48emTb5w',{
  
method:'POST',
body:JSON.stringify(
  {
   idToken:authcontext.token,
   password:password,
  returnSecureToken:true,
  }
),
headers:{
  'content-Type':'application/json',
}
}).then(res=>{
  history.replace('/');
})

};


  return (
    <form className={classes.form} onSubmit={changepasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' id='new-password' ref={newpassword} />
      </div>
      <div className={classes.action}>
        <button >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
