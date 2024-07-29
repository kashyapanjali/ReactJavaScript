import './App.css';
import LoginSignUp from './components/LoginSignUp';
import Navbar from './components/Navbar';
import EmployeData from './components/EmployeData';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
      {/* it is fixed Navbar */}
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/logout" element={<LoginSignUp />}/>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/employees" element={<EmployeData />} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
