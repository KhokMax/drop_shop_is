import React, { useContext, useState } from 'react';
import '../styles/MyOrders.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import Loader from './Loader'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {doc, deleteDoc} from "firebase/firestore";


export default function MyOrders() {
  const {auth, firestore, firebase} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <Loader/>
  }

  const [orders, loader] = useCollectionData(
    firestore.collection('orders')
      .where('customerUID', '==', user.uid)
      .orderBy('date', 'desc')
  )

  /*
  const prod = firestore.collection('orders').where('customerUID', '==', user.uid).orderBy('date', 'desc').get()
  console.log(prod)
  */

  if (loader) {
    <Loader/>
  }

  const removeOrder = async (orderId) => {

    const docRef = doc(firestore, "orders", orderId);
    deleteDoc(docRef);

  }

  return (
    <div>
        {orders?.map(order =>
        <div class='wrapper_5'>
          <div class='MyOrdercard'>
              <div class='MyOrder'>
                <p id='Myname'>Product name:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.productName}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p>Manufacturer's name:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.ManufacturerName}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p id='Mymail'>Manufacturer's mail:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{user.email}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p id='Myadress'>Novaposhta address:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.novaposhtaAddress}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p id='Mymethod'>Payment method:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.payMethod}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p id='Myunits_'>Order units:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.units}</p>
                </div>
              </div>
              <div class='MyOrder'>
                <p>Order price:</p>
                <div class='MyOrderfield'>
                  <p class='MyOrdertext'>{order.orderPrice}$</p>
                </div>
              </div>
              <div class='MyOrder'>
              <input class='deleteproductbutton' type='button' onClick={() => removeOrder(order.id)} value="DELETE ORDER"/>
              </div>
          </div>
      </div>
      )}
    </div>
    );
  }