import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  // Updated admin emails
  const ADMIN_EMAILS = [
    'anjalikashyap9608@gmail.com',
    'anjali.official7061@gmail.com'
  ];

  const handleGoogleSuccess = (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Logged in user:", decoded.email);

      // Check if attempting admin login but not an admin email
      if (isAdminLogin && !ADMIN_EMAILS.includes(decoded.email)) {
        throw new Error('You are not authorized as an admin');
      }

      // Check if the logged-in email is in the admin list
      const isAdminUser = ADMIN_EMAILS.includes(decoded.email);

      // Store user information
      localStorage.setItem('authToken', credentialResponse.credential);
      localStorage.setItem('userName', decoded.name);
      localStorage.setItem('userEmail', decoded.email);
      localStorage.setItem('userPicture', decoded.picture);
      localStorage.setItem('userRole', isAdminUser ? 'admin' : 'user');

      // Show role-specific welcome message
      if (isAdminUser) {
        alert(`Welcome Admin ${decoded.name}! You have full access to read and write.`);
      } else {
        alert(`Welcome ${decoded.name}! You have read-only access.`);
      }
      
      navigate('/employees');
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    alert('Login failed. Please try again.');
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary text-white text-center py-2">
                <h3 className="fw-bold">EmployeeBundle</h3>
                <p className="mb-0">Employee Management System</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                <h4 className="card-title text-center mb-4">
                  {isAdminLogin ? 'Admin Login' : 'User Login'}
                </h4>
                
                <div className="d-flex flex-column align-items-center gap-1">
                  {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-3">
                        <p className="text-muted">Sign in with your Google account</p>
                        <div className={`alert ${isAdminLogin ? 'alert-warning' : 'alert-info'}`}>
                          <h6 className="mb-2">Current Mode:</h6>
                          <small className="d-block fw-bold">
                            {isAdminLogin ? 'Admin Login (Full Access)' : 'User Login (Read-only)'}
                          </small>
                        </div>
                      </div>
                      
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                      />

                      <button 
                        className={`btn ${isAdminLogin ? 'btn-warning' : 'btn-outline-secondary'} mt-3`}
                        onClick={() => setIsAdminLogin(!isAdminLogin)}
                      >
                        {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
                      </button>
                    </>
                  )}
                </div>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}