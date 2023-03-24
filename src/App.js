import { Switch, Route,Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Authcontext from './store/Authcontext';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {

  const authcontext=useContext(Authcontext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact> 
          <HomePage />
        </Route>
        { !authcontext.isLoggedIn&&<Route path='/auth'>
          <AuthPage />
        </Route>}
       { authcontext.isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
