// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ6-aX2ukAe8ePSwjj4F_UxcV_qedOlq8",
  authDomain: "blood-12d8c.firebaseapp.com",
  projectId: "blood-12d8c",
  storageBucket: "blood-12d8c.appspot.com",
  messagingSenderId: "606689170405",
  appId: "1:606689170405:web:647fba5e73db437635d50c",
  measurementId: "G-2ZMEECGSKE",
  // apiKey: "AIzaSyDRMbit7EyBUfBDNcMHhFA0wygXzZVyGpQ",
  // authDomain: "blool-a3d57.firebaseapp.com",
  // projectId: "blool-a3d57",
  // storageBucket: "blool-a3d57.appspot.com",
  // messagingSenderId: "985603380908",
  // appId: "1:985603380908:web:33cbf9c3a416b2cd4df109",
  // measurementId: "G-T81N575YQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
