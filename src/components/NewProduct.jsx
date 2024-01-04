import '../styles/NewProduct.css'
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import Loader from './Loader';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";
import firebase from 'firebase/compat/app';



export default function NewProduct() {

  const {auth, firestore, storage} = useContext(Context)
  const [user, loading] = useAuthState(auth)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [characteristics, setCharacteristics] = useState(null)
  const [imageURL, setimageURL] = useState(null)
  const [price, setPrice] = useState(null)

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  
  if (loading) {
    <Loader/>
  }

  /*
  const [product, loader] = useCollectionData(
    firestore.collection('products') 
  )
  if (loader) {
    <Loader/>
  }*/

  const addProduct = async (downloadURL) =>{
    const docRef = firestore.collection('products').doc(); // отримуємо новий docRef без передачі id
    await docRef.set({
      name: name,
      photoURL: downloadURL,
      price: price,
      characteristics: characteristics,
      description: description,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      UserPhotoURL: user.photoURL,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      id: docRef.id // зберігаємо id документу як поле
    });
    /*
    await firestore.collection('products').add({
      name: name,
      downloadURL: downloadURL,
      price: price,
      characteristics: characteristics,
      description: description,
      uid: user.uid,
      displayName: user.displayName,
      UserPhotoURL: user.photoURL,
      date: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      console.log('Document added with ID:', docRef.id);
      product.id = docRef.id;
    })*/

    setName(null)
    setCharacteristics(null)
    setDescription(null)
    setPrice(null)
    setimageURL(null)

    document.location.href="/account"
  }

  const addData = async () => {

    if (name == null | price == null | description == null | characteristics == null | imageURL == null){
      alert('Please fill in all fields and add an image')
      return
    }

    setIsButtonDisabled(true)
    
    if (imageURL != null){
      const imageRef = ref(storage, `images/${imageURL.name + v4()}`);
      uploadBytes(imageRef, imageURL).then(snapshot => {
        return getDownloadURL(snapshot.ref)
      }).then(downloadURL => {
        addProduct(downloadURL)
      })
    }else{
      addProduct(null)
    }
  }




  let profilePic = document.getElementById('picture');
  let inputFile = document.getElementById('file');

  var loadFile  = function(e){
    try{
      profilePic.src = URL.createObjectURL(inputFile.files[0]);
      setimageURL(e.target.files[0])
      profilePic.className = 'uploadedphoto'
    }catch{
      profilePic.src = 'https://cdn-icons-png.flaticon.com/512/126/126477.png'
      setimageURL(null)
      profilePic.className = 'basicdphoto'
    }
    
  }


  return (
    <div class='wrapper_1'>
        <div class='card'>
            <div class='name'>
                <p>Product name:</p>
                <input class='nameinput' type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div class='gridpart'>
                <div class='photoPrice'>
                  <div className="phohotofield" id='imgbox'>
                    <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' alt=""  id='picture' class='basicdphoto'/>
                    <input type="file"  id='file' style={{display:'none'}} onChange={(e) =>loadFile(e)} />
                    <label for="file"></label>
                  </div>
                  <div class='price'>
                    <p>Price per unit:</p>
                    <input class='nameinput' type="text"  onChange={(e) =>setPrice(e.target.value)} />
                  </div>
                </div>
                <div class='characteristics'>
                  <h5>Characteristics:</h5>
                  <textarea  rows="10" cols="50" onChange={(e) =>setCharacteristics(e.target.value)}/>
                </div>
                <div class='description'>
                  <h5>Description:</h5>
                  <textarea  rows="10" cols="50" onChange={(e) =>setDescription(e.target.value)}/>
                </div>
                <input class='addproductbutton' disabled={isButtonDisabled} type='button' onClick={addData} value="ADD PRODUCT"/>
            </div>
        </div>
    </div>   
  );
}
