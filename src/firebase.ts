// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBpt4XGN_Gm6aOyykOTCNmhdQJ6b37wVI",
  authDomain: "chwitter-11344.firebaseapp.com",
  projectId: "chwitter-11344",
  storageBucket: "chwitter-11344.appspot.com",
  messagingSenderId: "646709867389",
  appId: "1:646709867389:web:0959afb3cf7e4363051214",
  measurementId: "G-TRGVFBP05B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)