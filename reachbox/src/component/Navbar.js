import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:"70px"}}>
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center w-100">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="navbar-logo me-2"
            style={{ height: '25px' }} // Adjust the logo size as needed
          />
          <a className="navbar-brand mb-0 h1 text-white" href="#">REACHINBOX</a>
        </div>
      </div>
    </nav>
  );
}
