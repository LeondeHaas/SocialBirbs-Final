import React, { useState } from 'react'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [username, setUserName] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                {
                    console.log(userCredential)
                }
            }).catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>CREATE ACCOUNT</h1>
                {/* <input type="text" placeholder='enter your username' value={username} onChange={(e) => setUserName(e.target.value)} /> */}
                <input type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default SignUp;