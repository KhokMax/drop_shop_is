import React, { useContext } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { MAIN_ROUTE} from '../utils/consts';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './Loader'

const AppRouter = () => {
  
  const {auth} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <Loader/>
  }
  console.log(user)
  return user ? 
  (
    <Routes>
      {privateRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact={true}/>
      )}
      <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
    </Routes>
    
  )
  :
  (
    <Routes>
      {publicRoutes.map(({path, Component}) => 
         <Route key={path} path={path} element={<Component/>} exact={true}/>
      )}
      <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
    </Routes>
  )
}

export default AppRouter