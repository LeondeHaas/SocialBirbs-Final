import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";

function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
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
