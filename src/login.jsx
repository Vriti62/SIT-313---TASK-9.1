import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithGooglePopup,
  createuserdocfromAuth,
  signOut,
  signinAuthUserWithEmailAndPassword,
} from './firebase';
import Input from './input';

function Login() {
  const userlogGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createuserdocfromAuth(user);
  }

  const [contact, setContact] = useState({
    email: '',
    password: '',
  });

  const { email, password } = contact;

  async function handleClick(event) {
    try {
      const response = await signinAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      window.location.href = '/WelcomePage'; // Redirect to the home page
    } catch (error) {
      console.log('Error logging you in', error.message);
    }
  }

  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="header">
      EMAIL:
      <Input
        name="email"
        type="email"
        placeholder="email"
        onChange={handlepass}
      />
      <br></br>
      PASSWORD:
      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={handlepass}
      />
      <br></br>
      <button onClick={handleClick}>
        <Link to="/welcomePage
        ">Login</Link>
      </button>
      <br></br>
      <button onClick={userlogGoogle}>Login with Google</button>
      <br></br>
      {/* <button onClick={}>Sign Out</button> */}
      <br></br>
      <Link className="sign" to="/signup">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}

export default Login;
