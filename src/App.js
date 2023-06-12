import './Styles/App.css'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import Homepage from './components/Homepage';


function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <h1>Welcome to SocialBirbs!</h1>
        <br></br>
        <SignIn />
        <button className='google-sign-in'>Sign in using Google</button>
        <br></br>
        <SignUp />
        <br></br>
        <AuthDetails />
      </div>
    </div>
  );
}

// const [getTaskList, getTaskList] = useState([]);
// cosnt jobCollectionRef = collection(db, "tasks");

// useEffect(() => {
// const getTasks = async () => {
// const data = await getDocs(jobCollectionRef);
// setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
// }
// getTasks();
// },[])

export default App;
