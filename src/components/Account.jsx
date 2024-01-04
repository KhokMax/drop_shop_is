import React, { useContext, useState } from 'react';
import { Context } from '..';
import Loader from './Loader';
import MyProducts from './MyProducts';
import MyOrders from './MyOrders';
import Orders from './Orders';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/Account.css'


export default function Account() {
  
  const {auth} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <Loader/>
  }

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [toggleState, setToggleState] = useState(1);

  return (
  <div>
    <div class="wrapper">
      <div class='photo'>
        <ul class='infoul'>
          <li class='infoli'>
            <img class='personPhoto' src={user.photoURL} alt="My Awesome Image"/>
          </li>
          <li class='infoli'>
            <input class='newproductbutton' type='button' onClick={() => document.location.href="/newproduct"} value="NEW PRODUCT"/> 
          </li>
        </ul>
      </div>
      <div class='table'>
       <div class="infotable">
        <ul class='infoul'>
          <li class='infoli'>
            Name: {user.displayName}
          </li>
          <li class='infoli'>
            Mail: {user.email}
          </li>
          <li class='infoli'>
            Mail: {user.metadata.creationTime}
          </li>
          <li class='infoli'>
            <input class='logoutbutton' type='button' onClick={() => auth.signOut()} value="LOG OUT"/> 
          </li>
        </ul>
        </div>
        <div>
       </div>
      </div>
    </div>
    <hr/>
    <div className="container">
      <div className="bloc-tabs">
        <href className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>MY PRODUCTS</href>
        <href className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>MY ORDRS</href>
        <href className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>ORDERS</href>
      </div>
      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <MyProducts/>
        </div>
        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <MyOrders/>
        </div>
        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <Orders/>
        </div>
      </div>
    </div>
  </div>
  );
}