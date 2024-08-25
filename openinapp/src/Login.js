import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import girlImage from "./girlImage.png";

export default function Login() {
  return (
    <div className="login">
      <div className="leftLogin">
        <div className="insideLeftContainer">
          <div className="baseBox">
            <FontAwesomeIcon
              className="icon-style"
              icon={faCodepen}
              style={{ fontSize: "30px" }}
            />
            <p>Base</p>
          </div>
          <h1 className="h11">Generate detailed reports with just one click</h1>
          <div className="buttomBox">
            <button className="mode">mode</button>
            <img
              src={girlImage}
              className="buttomBoxIcon"
              alt="Girl with Camera"
            />
          </div>
        </div>
      </div>

      <div className="rightlogin">
        <div className="insideRightContainer">
          <div className="heading">
            <h1>Sign In</h1>
            <h4>Sign in to your account</h4>
          </div>
          <div className="signWith">
            <div className="signWithGoogle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="googleIcon"
                alt="Google Icon"
              />
              <p>Sign in with Google</p>
            </div>
            <div className="signWithApple">
              <FontAwesomeIcon
                icon={faApple}
                style={{ color: "#97999b", fontSize: "20px" }}
              />
              <p>Sign in with Apple</p>
            </div>
          </div>

          <div className="signWithManualContainer">
            <form>
              <h4>Email address</h4>
              <input type="text" placeholder="Email" />
              <h4>Password</h4>
              <input type="password" placeholder="Password" />

              {/* Forgot Password Section (non-interactive) */}
              <h4 className="forgot-password-info">Forgot Password?</h4>

              {/* Sign in Button */}
              <Link to="login">
                <button type="button" className="login_signInButton">
                  Sign in
                </button>
              </Link>
            </form>
          </div>

          <h4 className="register">
            Don't have an account?<span> Register here</span>
          </h4>

          {/* Additional Sign In Options */}
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
