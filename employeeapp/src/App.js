import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginSignUp from "./components/LoginSignUp";
import Navbar from "./components/Navbar";
import EmployeData from "./components/EmployeData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<GoogleOAuthProvider clientId='1063857098990-7p7mv1knkiks2i0h975984dnesbiantl.apps.googleusercontent.com'>
			<div>
				<Router>
					{/* it is fixed Navbar */}
					<Navbar />
					<div className='container'>
						<Routes>
							<Route
								path='/logout'
								element={<LoginSignUp />}
							/>
							<Route
								path='/'
								element={<LoginSignUp />}
							/>
							<Route
								path='/login'
								element={<LoginSignUp />}
							/>
							<Route
								path='/employees'
								element={
									<ProtectedRoute>
										<EmployeData />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</div>
				</Router>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
