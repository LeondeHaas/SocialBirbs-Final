import './Styles/App.css'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';

function App() {
  return (
    <div className="App">
     <SignIn />
     <SignUp />
     <AuthDetails />
    </div>
  );
}

export default App;
