import React, { useContext, useState } from 'react';
import '../styles/Orders.css'
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
      .where('ManufacturerUID', '==', user.uid)
      .orderBy('date', 'desc')
  )

  
  const prod = firestore.collection('orders').where('ManufacturerUID', '==', user.uid).orderBy('date', 'desc').get()
  console.log(prod)
  

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
        <div class='wrapper_6'>
          <div class='Orderscard'>
              <div class='Orders'>
                <p id='Ordersname'>Product name:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.productName}</p>
                </div>
              </div>
              <div class='Orders'>
                <p>Customer's name:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.customerName}</p>
                </div>
              </div>
              <div class='Orders'>
                <p id='Mymail'>Customer's mail:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.customerEmail}</p>
                </div>
              </div>
              <div class='Orders'>
                <p id='Ordersadress'>Novaposhta address:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.novaposhtaAddress}</p>
                </div>
              </div>
              <div class='Orders'>
                <p id='Ordersmethod'>Payment method:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.payMethod}</p>
                </div>
              </div>
              <div class='Orders'>
                <p id='Ordersunits_'>Order units:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.units}</p>
                </div>
              </div>
              <div class='Orders'>
                <p>Order price:</p>
                <div class='Ordersfield'>
                  <p class='Orderstext'>{order.orderPrice}$</p>
                </div>
              </div>
              <div class='Orders'>
              <input class='Ordersproductbutton' type='button' onClick={() => removeOrder(order.id)} value="DELETE ORDER"/>
              </div>
          </div>
      </div>
      )}
    </div>
    );
  }