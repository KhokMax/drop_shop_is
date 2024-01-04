import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar'
import Loader from './components/Loader'
import AppRouter from './components/AppRouter'
import { Context } from './index';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {

  const {auth} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <Loader/>
  }

  return (
   <div>
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
   </div>
  );
};

export default App;
