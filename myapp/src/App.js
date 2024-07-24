import './App.css';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const[mode,setmode]=useState('light');

  const toggleMode=()=>{
    if(mode==='light'){
      setmode('dark');
      document.body.style.backgroundColor='#092f68';
    }else{
      setmode('light');
      document.body.style.backgroundColor='gray';

    }
  }
  return (
    <>
      <Router>
      <Navbar title="AnjaliHub" mode={mode} toggleMode={toggleMode} />
      <div className="container mt-5">
        <Routes>
          <Route path="/home" element={<TextForm heading="Write about your thought below " mode={mode} />} />
          <Route path="/about" element={<About heading1='About Text' mode={mode} />} />
          <Route path="/contact"element={<ContactUs Heading2="Contact me for More details"mode={mode}/>}/>
        </Routes>
      </div>
      </Router>

    </>
  );
}

export default App;
