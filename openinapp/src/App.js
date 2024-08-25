import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Home />} />
          {/* Add other routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
