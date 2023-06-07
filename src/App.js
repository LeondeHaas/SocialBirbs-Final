import './Styles/App.css'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/auth/AuthDetails';

function App() {
  return (
    <div className="App">

      <div className='wrapper'>
        <h1>Welcome to SocialBirbs!</h1>
        <br></br>
        <SignIn />
        <br></br>
        <SignUp />
        <br></br>
        <AuthDetails />
      </div>
    </div>
  );
}

export default App;
