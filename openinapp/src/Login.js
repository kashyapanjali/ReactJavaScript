import React from "react";
import "./Login.css";
import imageIcon from "./imageIcon.jpg";

export default function Login() {
  return (
    <div className="login">
      <div className="leftLogin">
        <div className="insideLeftContainer">
          <div className="baseBox">
            <img src={imageIcon} className="baseBoxIcon" alt="Icon" />
            <p>Base</p>
          </div>
          <h1 className="h11">Generate detailed reports with just one click</h1>

          <div className="buttomBox">
            <button className="mode">Mode</button>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/27/22/21/girl-1284400_960_720.png"
              className="buttomBoxIcon"
              alt="Girl with Camera"
            />
          </div>
        </div>
      </div>

      <div className="rightlogin">
        <div className="insideRightContainer">
          <h1>Sign In</h1>
          <h4>Sign in to your account</h4>
          <div className="signWith">
            <div className="signWithGoogle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="googleIcon"
                alt="googleIcon"
              />
              <p>Sign in with Google</p>
            </div>
            <div className="signWithApple">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="appleIcon"
                alt="appleIcon"
              />
              <p>Sign in with Apple</p>
            </div>
          </div>

          <div className="signWithManualContainer">
            <form>
              <h5>Email address</h5>
              <input type="text" placeholder="Email" />
              <h5>Password</h5>
              <input type="password" placeholder="Password" />

              {/* Forgot Password Section (non-interactive) */}
              <p className="forgot-password-info">Forgot Password?</p>

              {/* Sign in Button */}
              <button type="submit" className="login_signInButton">
                Sign in
              </button>
            </form>
          </div>

          <p className="register">
            Don't have an account?<span> Register here</span>
          </p>

          {/* Add icon where sign with also GitHub, Twitter, LinkedIn, Discord */}
          <div className="additionalSignWith">
            <div className="signWithGitHub">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                className="icon"
                alt="GitHub Icon"
              />
            </div>
            <div className="signWithTwitter">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                className="icon"
                alt="Twitter Icon"
              />
            </div>
            <div className="signWithLinkedIn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                className="icon"
                alt="LinkedIn Icon"
              />
            </div>
            <div className="signWithDiscord">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
                className="icon"
                alt="Discord Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
