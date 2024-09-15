import LoginSignUp from './component/LoginSignUp';
import Navbar from './component/Navbar';
import React from 'react';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <LoginSignUp/>
    </div>
  );
}

export default App;
