import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import GoogleIcon from './Google__G__logo.svg.png'; // Correct path to the image

const LoginSignUp = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-4 border rounded shadow bg-dark text-white" style={{ width: '400px' }}>
        <div className="mb-4">
          <h2>Create a new account</h2>
        </div>
        
        <Button
          className="w-100 d-flex align-items-center justify-content-center mb-4"
          style={{
            backgroundColor: 'transparent', 
            color: 'white',
            border: 'none', 
            boxShadow: 'none',
            padding: '8px 16px', 
            textAlign: 'center', 
          }}
        >
          <img 
            src={GoogleIcon} 
            alt="Google icon" 
            style={{ width: '24px', height: '24px', marginRight: '8px' }} 
          />
          Sign Up with Google
        </Button>

        
        <Button variant="primary" className="w-95 mb-4">
          Create an Account
        </Button>

        <Row className="d-flex justify-content-center align-items-center">
          <Col xs="auto" className="d-flex align-items-center">
            <p className="mb-0 me-2">Already have an account?</p>
            <Button
              variant="link"
              className="text-light p-0"
              style={{ textDecoration: 'none' }} // Remove underline
            >
              Sign In
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginSignUp;
