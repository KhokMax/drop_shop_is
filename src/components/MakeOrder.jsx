import React, { useContext, useState } from 'react';
import '../styles/MakeOrder.css'
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import Loader from './Loader'


export default function MakeOrder() {
  const location = useLocation();
  const product = location.state?.data
  const {auth, firestore, firebase} = useContext(Context)
  const [user, loading] = useAuthState(auth)
  const [address, setAddress] = useState(null)
  const [paymethod, setPaymethod] = useState('Prepayment')
  const [units, setUnits] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  if (loading) {
    <Loader/>
  }

  const addProduct = async () =>{
    const docRef = firestore.collection('orders').doc(); // отримуємо новий docRef без передачі id
    await docRef.set({
      productName: product.name,
      ManufacturerUID: product.uid,
      ManufacturerName: product.displayName,
      ManufacturerEmail: product.email,
      customerUID: user.uid,
      customerName: user.displayName,
      customerEmail: user.email,
      novaposhtaAddress: address,
      payMethod: paymethod,
      units: units,
      orderPrice: Number(units) * Number(product.price),
      date: firebase.firestore.FieldValue.serverTimestamp(),
      id: docRef.id // зберігаємо id документу як поле
    });

    setAddress(null)
    setPaymethod(null)
    setUnits(null)

    document.location.href="/mainpage"
  }


  const Submit = async () => {

    if (!Number.isInteger(Number(units))){
      alert('Enter number of units')
      document.getElementById("units").value = null;
    }
    else if(address == null || units == null){
      alert('Fill all fields')
    }
    else{
      setIsButtonDisabled(true)
      addProduct()
    }
  }

  
    
    return (
      <div class='wrapper_4'>
          <div class='MakeOrdercard'>
              <div class='MakeOrder'>
                <p id='name'>Product name:</p>
                <div class='MakeOrderfield'>
                  <p class='MakeOrdertext'>{product.name}</p>
                </div>
              </div>
              <div class='MakeOrder'>
                <p>Manufacturer's name:</p>
                <div class='MakeOrderfield'>
                  <p class='MakeOrdertext'>{product.displayName}</p>
                </div>
              </div>
              <div class='MakeOrder'>
                <p id='mail'>Your mail:</p>
                <div class='MakeOrderfield'>
                  <p class='MakeOrdertext'>{user.email}</p>
                </div>
              </div>
              <div class='MakeOrder'>
                <p id='adress'>Novaposhta address:</p>
                <input class='poshtainput' type="text" onChange={(e) => setAddress(e.target.value)}/>
              </div>
              <div class='MakeOrder'>
                <p id='method'>Payment method:</p>
                <select class='paymethod' onChange={(e) => setPaymethod(e.target.value)}>
                  <option>Prepayment</option>
                  <option>C.O.D</option>
                </select>
              </div>
              <div class='MakeOrder'>
                <p id='units_'>Order units:</p>
                <input id='units' class='unitinput' type="text" onChange={(e) => setUnits(e.target.value)}/>
              </div>
              <div class='MakeOrder'>
                <p>Order price:</p>
                <p class='MakeOrdertext'> {(Number(units) * Number(product.price))?(Number(units) * Number(product.price)):('--')}$ </p>
              </div>
              <div class='MakeOrder'>
                <input class='ORDERproductbutton' disabled={isButtonDisabled} onClick={Submit}  type='button'  value="ORDER"/>
              </div>
          </div>
      </div> 
    );
  }
