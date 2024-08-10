import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


<<<<<<< HEAD
=======
// Your web app's Firebase configuration

console.log("FIREBASE API KEY: ", process.env.REACT_APP_FIREBASE_API_KEY)

>>>>>>> 0fd02a56758079b3b637be484ecbad7847963266
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "airbnb-ai-support.firebaseapp.com",
  projectId: "airbnb-ai-support",
  storageBucket: "airbnb-ai-support.appspot.com",
  messagingSenderId: "502082914348",
  appId: "1:502082914348:web:3f9602a6cce1b56652a989"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}
