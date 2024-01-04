import '../styles/MyProduct.css'
import Loader from './Loader'
import React, { useContext} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {doc, deleteDoc} from "firebase/firestore";
import {ref, deleteObject } from "firebase/storage";


export default function MyProducts() {
  const {auth, firestore, storage} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <Loader/>
  }
  
  const [products, loader] = useCollectionData(
    firestore.collection('products')
      .where('uid', '==', user.uid)
      .orderBy('date', 'desc')
  )

  /*
  const prod = firestore.collection('products').where('uid', '==', user.uid).orderBy('date', 'desc').get()
  console.log(prod)
  */

  if (loader) {
    <Loader/>
  }

  const removeProduct = async (productId, photoURL) => {

    const desertRef = ref(storage, photoURL);
    const docRef = doc(firestore, "products", productId);

    deleteObject(desertRef)
    deleteDoc(docRef)
   
  }

  return (
    <div>
     {products?.map(product =>
        <div class='wrapper_2'>
            <div class='myproductcard'>
              <div class='Myname'>
                <p>Product name:</p>
                <div class='namefield'>
                   <p class='Mynametext'>{product.name}</p>
                </div>
              </div>
              <div class='mygridpart'>
                <div class='MyphotoPrice'>
                  <div className="Myphohotofield">
                    <img src={product.photoURL} alt=""  class='Myphoto'/>
                  </div>
                  <div class='Myprice'>
                    <p class='priceperunit'>Price per unit:</p>
                    <p class='Mypricetext'>{product.price} $</p>
                  </div>
                </div>
                <div class='Mycharacteristics'>
                  <h5>Characteristics:</h5>
                  <p>{product.characteristics}</p>
                </div>
                <div class='Mydescription'>
                  <h5>Description:</h5>
                  <p>{product.description}</p>
                </div>
                <input class='deleteproductbutton' type='button' onClick={() => removeProduct(product.id, product.photoURL)} value="DELETE PRODUCT"/>
              </div>
            </div>
        </div>
     )}
    </div>
  );
}