// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf6ZfY0HsowxLgsWC8BMKM-qH_leSMKiA",
  authDomain: "socialbirbs-40d97.firebaseapp.com",
  projectId: "socialbirbs-40d97",
  storageBucket: "socialbirbs-40d97.appspot.com",
  messagingSenderId: "119200831280",
  appId: "1:119200831280:web:567e2b869fe0b7d830daf5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
