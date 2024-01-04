import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";



  
const app = firebase.initializeApp({
    apiKey: "AIzaSyCgvnd_XZKpeTS9X8B_tgmPEZpVuhor6aQ",
    authDomain: "drop-shop-3b9cc.firebaseapp.com",
    projectId: "drop-shop-3b9cc",
    storageBucket: "drop-shop-3b9cc.appspot.com",
    messagingSenderId: "1075265574330",
    appId: "1:1075265574330:web:d5457de0756b2086dd7983"
  }
);


export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{firebase, firestore, auth, storage}}>
        <App />
    </Context.Provider>
    
);


