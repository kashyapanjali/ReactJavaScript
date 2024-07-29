import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }else if
      (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Simulate authentication
    localStorage.setItem('authToken', 'your-auth-token'); // Set auth token
    navigate('/employees');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-3 rounded-5 shadow-lg" style={{ width: '20rem' }}>
        <h2 className="text-center mb-3">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 rounded-3">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button className="btn btn-link mt-2 w-100" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
