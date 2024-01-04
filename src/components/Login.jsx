import React, { useContext } from 'react';
import '../styles/Login.css'
import { Context } from '../index';
import firebase from 'firebase/compat/app';


export default function Login() {
  
  const {auth} = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
  }

  return (
    <div class='login'>
      <input type='button' class='loginbutton' onClick={login} value="Log in with Google"/>
    </div>
  );
}
  