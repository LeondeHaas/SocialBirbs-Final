// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
