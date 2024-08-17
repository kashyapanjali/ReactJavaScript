import React, { useEffect } from "react";
import "./App.css";
import Checkout from "./Checkout.js";
import Header from "./Header.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import { auth } from "./firebase.js";

function App() {
  useEffect(() => {
    //will only run once when the app components loads.....
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);
    });
    if (authUser) {
      //user just loggged in / the user was logged in
    } else {
      //the user is logged out
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
                <h1>Login page</h1>
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
