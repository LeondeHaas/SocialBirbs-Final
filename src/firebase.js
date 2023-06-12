react;
import { initializaApp } from "firebase/App";
import { getFirestor } from "firebase/firestore";

//firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  datebaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

//initializa firebase
const App = initializaApp(firebaseConfig);
//initializa firestore (de connectie)
export const db = getFirestore(app);
