import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";

//validate password function
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (!hasUppercase) {
    return "Password must include at least one uppercase letter.";
  }
  if (!hasLowercase) {
    return "Password must include at least one lowercase letter.";
  }
  if (!hasNumber) {
    return "Password must include at least one number.";
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character.";
  }
  return null;
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => alert(error.message));
    //some fancy firebase login shittttt.
  };

  const register = (e) => {
    e.preventDefault();
    // checking validpassword
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      alert(validationMessage);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        //succesfully created a new user with email and password
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
    //do some fancy firebase register shitttt.
  };

  // validate password value inserting
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const validationMessage = validatePassword(newPassword);
    setPasswordError(validationMessage);
  };

  ////toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error.code, error.message);
      alert("An error occurred during sign-in. Please try again.");
    }
  };

  // Sign in with Apple
  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error.code, error.message);
      alert("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {/* above link for clickable router and go to home */}

      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className={passwordVisible ? "password-visible" : "password-hidden"}
            onClick={togglePasswordVisibility} // Add onClick handler for visibility toggle
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          {/* for click the sign in button */}
          <button type="submit" onClick={signIn} className="login_signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login_registerButton">
          Create your Amazon Account
        </button>
        <div className="additionalSignWith">
          <img
            className="Icon"
            src="https://img.icons8.com/?size=48&id=17949&format=png"
            alt="google_icon"
            onClick={signInWithGoogle} // Trigger Google Sign-In
          />
          <img
            className="Icon"
            src="https://img.icons8.com/?size=48&id=bCu25JrJ39EB&format=png"
            alt="apple_icon"
            onClick={signInWithApple} // Trigger Apple Sign-In
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
