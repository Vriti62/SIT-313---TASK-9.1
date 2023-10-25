import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth'
import {getFirestore, doc,  getDoc, setDoc} from 'firebase/firestore'
    
const firebaseConfig = {
  apiKey: "AIzaSyC_yZcCY8JqfPca4olvy682htNVUV0yQR0",
  authDomain: "task-7-1cbf6.firebaseapp.com",
  projectId: "task-7-1cbf6",
  storageBucket: "task-7-1cbf6.appspot.com",
  messagingSenderId: "97834423968",
  appId: "1:97834423968:web:38e818dc87387a22925bc5",
  measurementId: "G-PXWJLJ7KD1"
};

  const firebaseapp = initializeApp(firebaseConfig);
  const provider= new GoogleAuthProvider();
 
  provider.setCustomParameters({
  prompt:"select_account"
});
  
  export const auth=getAuth();
  export const signInWithGooglePopup =()=> signInWithPopup(auth,provider)
  export const db =getFirestore();
  export const createuserdocfromAuth = async(userAuth, additionalInformation ={}) =>

{
  if(!userAuth.email) return;

  const userDocRef=doc (db, 'users', userAuth.uid);
  console.log(userDocRef)

  

const userSnapShots = await getDoc(userDocRef);
console.log(userSnapShots)
console.log(userSnapShots.exists())

if(!userSnapShots.exists())
{
   const {displayName, email} =userAuth
   const createdAt = new Date();
   try{
    await setDoc(userDocRef,{
   displayName,
   email,
   createdAt,
   ...additionalInformation
    })
  }
    catch(error){
    console.log('error in creating', error.message)
    }

   }
   return userDocRef;
}

export async function createAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await createUserWithEmailAndPassword(auth,email,password)
}

export async function signinAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await signInWithEmailAndPassword(auth,email,password)
}

export function logout(){
  signOut(auth);
}
