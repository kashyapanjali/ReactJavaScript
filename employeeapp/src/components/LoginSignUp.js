import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginSignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const [isAdminLogin, setIsAdminLogin] = useState(false);
	const navigate = useNavigate();

	const ADMIN_EMAILS = [
		"anjalikashyap9608@gmail.com",
		"anjali.official7061@gmail.com",
	];

	const handleGoogleSuccess = (credentialResponse) => {
		setIsLoading(true);
		try {
			const decoded = jwtDecode(credentialResponse.credential);
			if (isAdminLogin && !ADMIN_EMAILS.includes(decoded.email)) {
				throw new Error("You are not authorized as an admin");
			}
			const isAdminUser = ADMIN_EMAILS.includes(decoded.email);

			localStorage.setItem("authToken", credentialResponse.credential);
			localStorage.setItem("userName", decoded.name);
			localStorage.setItem("userEmail", decoded.email);
			localStorage.setItem("userPicture", decoded.picture);
			localStorage.setItem("userRole", isAdminUser ? "admin" : "user");

			alert(`Welcome ${isAdminUser ? "Admin " : ""}${decoded.name}!`);
			navigate("/employees");
		} catch (error) {
			alert(error.message || "Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-vh-100 d-flex justify-content-center align-items-center bg-light'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-6 col-lg-4'>
						<div className='card border-0 shadow rounded-3 overflow-hidden'>
							<div className='bg-primary text-white text-center py-2'>
								<h5 className='fw-bold mb-1'>EmployeeBundle</h5>
								<small>Employee Management</small>
							</div>

							<div className='card-body p-3 p-md-3'>
								<h6 className='text-center mb-2'>
									{isAdminLogin ? "Admin Login" : "User Login"}
								</h6>

								<div className='text-center mb-2'>
									<small
										className={`alert ${isAdminLogin ? "alert-warning" : "alert-info"} d-block p-1`}>
										<strong>Mode:</strong>{" "}
										{isAdminLogin ? "Admin (Full Access)" : "User (Read-only)"}
									</small>
								</div>

								<div className='d-flex flex-column align-items-center'>
									{isLoading ?
										<div
											className='spinner-border text-primary'
											role='status'>
											<span className='visually-hidden'>Loading...</span>
										</div>
									:	<>
											<GoogleLogin
												onSuccess={handleGoogleSuccess}
												onError={() => alert("Login failed. Try again.")}
												useOneTap
												theme='outline'
												size='small'
												text='signin_with'
											/>

											<button
												className={`btn ${isAdminLogin ? "btn-warning" : "btn-outline-secondary"} mt-2 btn-sm`}
												onClick={() => setIsAdminLogin(!isAdminLogin)}>
												{isAdminLogin ? "Switch to User" : "Switch to Admin"}
											</button>
										</>
									}
								</div>

								<div className='text-center mt-2'>
									<small className='text-muted'>
										By continuing, you agree to our Terms & Privacy Policy.
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
