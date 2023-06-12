import "./Styles/App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
// import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Welcome to SocialBirbs!</h1>
        <br></br>
        <SignIn />
        <button className="google-sign-in">Sign in using Google</button>
        <br></br>
        <SignUp />
        <br></br>
        <AuthDetails />
      </div>
    </div>
  );
}

// import {getDocs, collection, databaseDoc, doc} from 'firebase/firestore'
// import { db } from '../firebase-config';

// const [getTitle, setTitle] = useState("");
// const [getTask, setTask] = useState("");
// const [getStatus, setStatus] = useState("");
// const [getTaskList, getTaskList] = useState([]);
// cosnt jobCollectionRef = collection(db, "tasks");

// useEffect(() => {
// const getTasks = async () => {
// const data = await getDocs(jobCollectionRef);
// setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
// }
// getTasks();
// },[])

// const createJob = async () => {
//   await addDoc(jocCollecionRef, {
//     title: getTitle,
//     task: getTask,
//     date: getDate,
//     status: getStatus,
//     author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
//   });
//   navigate("/");
// };

// useEffect(()=> {
//   const getTasks = async () => {
//     const data = await getDocs(jobCollectionRef);
//     setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
//   }
//   getTasks();
// },[])

// const deletePost = async (id) => {
//   const postDoc = doc(db, "tasks", id);
//   await deleteDoc(postDoc);
// };

export default App;
