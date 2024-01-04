import Loader from './Loader'
import React, { useContext} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import '../styles/MainPage.css'
import { Link } from 'react-router-dom';

export default function MainPage() {

  const {auth, firestore} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <Loader/>
  }

  const [products, loader] = useCollectionData(
    firestore.collection('products').orderBy('date', 'desc')
  )

  if (loader) {
    <Loader/>
  }

  return (
    <div>
    {products?.map(product =>
       <div class='wrapper_3'>
           <div class='MainPageproductcard'>
             <div class='MainPagename'>
                <p>Product name:</p>
                <div class='MainPagenamefield'>
                   <p class='MainPagenametext'>{product.name}</p>
                </div>
             </div>
             <div class='MainPagegridpart'>
               <div class='MainPagephotoPrice'>
                 <div className="MainPagephohotofield">
                   <img src={product.photoURL} alt=""  class='MainPagephoto'/>
                 </div>
                 <div class='MainPageprice'>
                   <p>Price per unit:</p>
                   <p class='MainPagepricetext'>{product.price}</p>
                 </div>
               </div>
               <div class='MainPagecharacteristics'>
                 <h5>Characteristics:</h5>
                 <p>{product.characteristics}</p>
               </div>
               <div class='MainPagedescription'>
                 <h5>Description:</h5>
                 <p>{product.description}</p>
               </div>
               {user ? (
                <Link class='orderproductbutton' to={'/makeorder'} state={{data:product}}>
                    ORDER
                </Link>
               ):('')}
                
             </div>
           </div>
       </div>
    )}
   </div>
  );
}
  