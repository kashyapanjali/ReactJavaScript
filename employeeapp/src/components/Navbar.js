import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth token
    navigate('/'); // Redirect to home page
  };

  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if authenticated
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-primary shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex flex-grow-1 justify-content-center">
          <Link to="/" className="navbar-brand mx-auto center" style={{ textAlign:'center'}}>
            <strong>EmployeeBundle</strong>
          </Link>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="btn btn-info opacity-25 border-dark my-1 btn-sm ms-auto">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
