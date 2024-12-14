// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getFirebase} from'firebase/firestore'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjTPkN-SM9rXpSewYEQhXEEirv3YWdgk0",
  authDomain: "travelo-d6d09.firebaseapp.com",
  projectId: "travelo-d6d09",
  storageBucket: "travelo-d6d09.firebasestorage.app",
  messagingSenderId: "1018462227042",
  appId: "1:1018462227042:web:e2dfc54374a2e664851f3b",
  measurementId: "G-5CCR51LFL9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);

