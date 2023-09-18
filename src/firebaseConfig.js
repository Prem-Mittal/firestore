// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLIH8Ico-XYjR8YHiFmRMnzjht7sYX4IY",
  authDomain: "learn-firebase-99961.firebaseapp.com",
  projectId: "learn-firebase-99961",
  storageBucket: "learn-firebase-99961.appspot.com",
  messagingSenderId: "625267579608",
  appId: "1:625267579608:web:f2e8e36ba5a8baa44715ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);