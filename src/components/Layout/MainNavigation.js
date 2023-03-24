import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Authcontext from '../../store/Authcontext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const authcontext=useContext(Authcontext);
  const islogginornot=authcontext.islogginornot;

const logoutHandler=()=>{
  authcontext.logout()
}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!islogginornot&& ( <li>
            <Link to='/auth'>Login</Link>
          </li>)}
         
         {islogginornot &&( <li>
            <Link to='/profile'>Profile</Link>
          </li>)}
         {islogginornot &&(<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
