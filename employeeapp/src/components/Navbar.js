import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleLogout = () => {
    // Add confirmation dialog
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      navigate('/');
    }
  };

  const isAuthenticated = !!localStorage.getItem('authToken');
  const userName = localStorage.getItem('userName') || 'User';
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-people-fill me-2 fs-4"></i>
          <span className="fw-bold">EmployeeBundle</span>
        </Link>
        
        {isAuthenticated && (
          <>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link 
                    to="/employees" 
                    className={`nav-link ${location.pathname === '/employees' ? 'active fw-bold' : ''}`}
                  >
                    <i className="bi bi-list-ul me-1"></i> Employees
                  </Link>
                </li>
              </ul>
              
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center" 
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    aria-expanded={showDropdown}
                  >
                    <div 
                      className="bg-white text-primary rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{ width: "28px", height: "28px" }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="d-none d-md-inline">{userName}</span>
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`}>
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="bi bi-person-circle me-2"></i> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="dropdown-item">
                        <i className="bi bi-gear me-2"></i> Settings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item text-danger">
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}