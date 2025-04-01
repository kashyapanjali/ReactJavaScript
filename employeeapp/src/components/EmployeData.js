import React, { useState, useEffect } from "react";

export default function EmployeData() {
	const [data, setData] = useState([]);
	const [employeeId, setEmployeeId] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [id, setId] = useState(null);
	const [age, setAge] = useState("");
	const [role, setRole] = useState("");
	const [contact, setContact] = useState("");
	const [profile, setProfile] = useState(null);
	const [profilePreview, setProfilePreview] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [userRole, setUserRole] = useState("");

	// On mount, load employees from API and get user role from localStorage
	useEffect(() => {
		fetchEmployees();
		const role = localStorage.getItem("userRole");
		setUserRole(role);
	}, []);

	const authToken = localStorage.getItem("authToken");

	// Fetch all employees from backend
	const fetchEmployees = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/employees", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			});
			const json = await response.json();
			if (json.success) {
				setData(json.data);
			} else {
				alert(json.error);
			}
		} catch (error) {
			console.error("Error fetching employees:", error);
			alert("Error fetching employees");
		}
	};

	// Role based access control
	const canEdit = userRole === "admin";
	const canDelete = userRole === "admin";
	const canAdd = userRole === "admin";

	// Edit an employee: populate form fields with employee data
	const handleEdit = (emp) => {
		setIsUpdate(true);
		setId(emp._id);
		setEmployeeId(emp.employeeId);
		setFirstName(emp.firstName);
		setLastName(emp.lastName);
		setAge(emp.age);
		setRole(emp.role);
		setContact(emp.contact || "");
		setProfilePreview(emp.profile || "");
	};

	// Delete an employee
	const handleDelete = async (empId) => {
		if (window.confirm("Are you sure you want to delete this employee?")) {
			try {
				const response = await fetch(
					`http://localhost:5000/api/employees/${empId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				const json = await response.json();
				if (json.success) {
					fetchEmployees(); // Refresh list after deletion
				} else {
					alert(json.error);
				}
			} catch (error) {
				console.error("Error deleting employee:", error);
				alert("Error deleting employee");
			}
		}
	};

	// Handle file selection and preview for profile image
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfile(file);
			const reader = new FileReader();
			reader.onload = () => {
				setProfilePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	// Save new employee (POST)
	const handleSave = async (e) => {
		e.preventDefault();
		let errors = [];
		if (!employeeId) errors.push("Employee ID is required");
		if (!firstName) errors.push("First Name is required");
		if (!lastName) errors.push("Last Name is required");
		if (!age || parseInt(age) <= 0) errors.push("Valid Age is required");
		if (!role) errors.push("Role is required");

		if (errors.length > 0) {
			alert(errors.join("\n"));
			return;
		}

		// Create a FormData object to send files
		const formData = new FormData();
		formData.append("employeeId", employeeId);
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("age", age);
		formData.append("role", role);
		formData.append("contact", contact);
		if (profile) {
			formData.append("profile", profile); // Append image file
		}

		try {
			const response = await fetch("http://localhost:5000/api/employees", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${authToken}`, // No need for 'Content-Type', fetch will auto set it for FormData
				},
				body: formData,
			});
			const json = await response.json();
			if (json.success) {
				fetchEmployees();
				handleClear();
			} else {
				alert(json.error);
			}
		} catch (error) {
			console.error("Error saving employee:", error);
			alert("Error saving employee");
		}
	};

	// Update employee (PUT)
	const handleUpdate = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("firstName", firstName);
		formData.append("lastName", lastName);
		formData.append("age", age);
		formData.append("role", role);
		formData.append("contact", contact);
		if (profile) {
			formData.append("profile", profile);
		}

		try {
			const response = await fetch(
				`http://localhost:5000/api/employees/${id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${authToken}`, // No Content-Type needed
					},
					body: formData,
				}
			);

			const json = await response.json();
			if (json.success) {
				fetchEmployees();
				handleClear();
			} else {
				alert(json.error);
			}
		} catch (error) {
			console.error("Error updating employee:", error);
			alert("Error updating employee");
		}
	};

	// Clear the form fields
	const handleClear = () => {
		setId(null);
		setEmployeeId("");
		setFirstName("");
		setLastName("");
		setAge("");
		setRole("");
		setContact("");
		setProfile(null);
		setProfilePreview("");
		setIsUpdate(false);
	};

	// Filter data based on search term and selected filter
	const filteredData = data.filter((item) => {
		const matchesSearch =
			item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.role.toLowerCase().includes(searchTerm.toLowerCase());
		if (selectedFilter === "all") return matchesSearch;
		if (selectedFilter === "young" && item.age < 25) return matchesSearch;
		if (selectedFilter === "senior" && item.age >= 25) return matchesSearch;
		return false;
	});

	return (
		<div className='bg-light min-vh-100 py-4'>
			<div className='container'>
				{/* Add/Update Form */}
				<div className='card shadow-lg mb-4'>
					<div className='card-header bg-primary text-white'>
						<h4 className='mb-0'>
							{isUpdate ? "Update Employee" : "Add New Employee"}
						</h4>
					</div>
					<div className='card-body'>
						{canAdd && (
							<form onSubmit={isUpdate ? handleUpdate : handleSave}>
								<div className='row g-3'>
									<div className='col-md-6 col-lg-3'>
										<label className='form-label'>Employee ID*</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter Employee ID'
											onChange={(e) => setEmployeeId(e.target.value)}
											value={employeeId}
											required
										/>
									</div>
									<div className='col-md-6 col-lg-3'>
										<label className='form-label'>First Name*</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter First Name'
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
											required
										/>
									</div>
									<div className='col-md-6 col-lg-3'>
										<label className='form-label'>Last Name*</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter Last Name'
											onChange={(e) => setLastName(e.target.value)}
											value={lastName}
											required
										/>
									</div>
									<div className='col-md-6 col-lg-2'>
										<label className='form-label'>Age*</label>
										<input
											type='number'
											className='form-control'
											placeholder='Enter Age'
											onChange={(e) => setAge(e.target.value)}
											value={age}
											min='18'
											required
										/>
									</div>
									<div className='col-md-6 col-lg-2'>
										<label className='form-label'>Role*</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter Role'
											onChange={(e) => setRole(e.target.value)}
											value={role}
											required
										/>
									</div>
									<div className='col-md-6 col-lg-2'>
										<label className='form-label'>Contact</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter Contact'
											onChange={(e) => setContact(e.target.value)}
											value={contact}
										/>
									</div>
									<div className='col-md-6 col-lg-4'>
										<label className='form-label'>Profile Image</label>
										<div className='input-group'>
											<input
												type='file'
												className='form-control'
												onChange={handleFileChange}
												accept='image/*'
											/>
										</div>
									</div>
									<div className='col-md-6 col-lg-2'>
										{profilePreview && (
											<img
												src={profilePreview}
												alt='Preview'
												className='img-thumbnail mt-2'
												style={{ maxHeight: "80px" }}
											/>
										)}
									</div>
									<div className='col-12 text-center mt-3'>
										<button
											type='submit'
											className={`btn ${isUpdate ? "btn-warning" : "btn-primary"} me-2`}>
											{isUpdate ? "Update" : "Save"}
										</button>
										<button
											type='button'
											className='btn btn-secondary'
											onClick={handleClear}>
											Clear
										</button>
									</div>
								</div>
							</form>
						)}
					</div>
				</div>

				{/* Search and Filter */}
				<div className='card shadow-lg mb-4'>
					<div className='card-body'>
						<div className='row align-items-center'>
							<div className='col-md-6 mb-3 mb-md-0'>
								<div className='input-group'>
									<span className='input-group-text'>
										<i className='bi bi-search'></i>
									</span>
									<input
										type='text'
										className='form-control'
										placeholder='Search employees...'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='d-flex justify-content-md-end'>
									<select
										className='form-select w-auto'
										value={selectedFilter}
										onChange={(e) => setSelectedFilter(e.target.value)}>
										<option value='all'>All Employees</option>
										<option value='young'>Age &lt; 25</option>
										<option value='senior'>Age &ge; 25</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Employee Table */}
				<div className='card shadow-lg'>
					<div className='card-header bg-primary text-white'>
						<h4 className='mb-0'>Employee List</h4>
						{!canEdit && (
							<small className='text-muted'>You are in read-only mode</small>
						)}
					</div>
					<div className='card-body p-0'>
						<div className='table-responsive'>
							<table className='table table-hover table-striped mb-0'>
								<thead className='table-light'>
									<tr>
										<th>#</th>
										<th>Employee ID</th>
										<th>Name</th>
										<th>Age</th>
										<th>Role</th>
										<th>Contact</th>
										<th>Profile</th>
										{canEdit && <th>Actions</th>}
									</tr>
								</thead>
								<tbody>
									{filteredData.length > 0 ?
										filteredData.map((item, index) => (
											<tr key={item._id || index}>
												<td>{index + 1}</td>
												<td>{item.employeeId}</td>
												<td>
													{item.firstName} {item.lastName}
												</td>
												<td>{item.age}</td>
												<td>
													<span className='badge bg-info text-dark'>
														{item.role}
													</span>
												</td>
												<td>{item.contact || "-"}</td>
												<td>
													{item.profile ?
														<img
															src={item.profile}
															alt='Profile'
															className='rounded-circle'
															width='40'
															height='40'
														/>
													:	<div
															className='bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white'
															style={{ width: "40px", height: "40px" }}>
															{item.firstName.charAt(0).toUpperCase()}
														</div>
													}
												</td>
												{canEdit && (
													<td>
														<button
															className='btn btn-warning btn-sm me-2'
															onClick={() => handleEdit(item)}>
															Edit
														</button>
														<button
															className='btn btn-danger btn-sm'
															onClick={() => handleDelete(item._id)}>
															Delete
														</button>
													</td>
												)}
											</tr>
										))
									:	<tr>
											<td
												colSpan={canEdit ? "8" : "7"}
												className='text-center py-3'>
												No employees found
											</td>
										</tr>
									}
								</tbody>
							</table>
						</div>
					</div>
					<div className='card-footer'>
						<small className='text-muted'>
							Showing {filteredData.length} of {data.length} employees
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
