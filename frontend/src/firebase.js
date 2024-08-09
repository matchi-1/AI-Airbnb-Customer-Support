// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiaQSWy-CjEzLrFa2kTW5qzO-nLFsUbVY",
  authDomain: "airbnb-ai-support.firebaseapp.com",
  projectId: "airbnb-ai-support",
  storageBucket: "airbnb-ai-support.appspot.com",
  messagingSenderId: "502082914348",
  appId: "1:502082914348:web:3f9602a6cce1b56652a989"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}
