import React, { useState, useEffect } from "react";
import { EmployeDetails } from "./EmployeDetails";

export default function EmployeData() {
	const [data, setData] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [id, setId] = useState(0);
	const [age, setAge] = useState("");
	const [role, setRole] = useState("");
	const [contact, setContact] = useState("");
	const [profile, setProfile] = useState(null);
	const [profilePreview, setProfilePreview] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [userRole, setUserRole] = useState('');

	const ADMIN_EMAILS = [
		'anjalikashyap9608@gmail.com',
		'anjali.official7061@gmail.com'
	];

	useEffect(() => {
		setData(EmployeDetails);
		// Get user role from localStorage
		const role = localStorage.getItem('userRole');
		setUserRole(role);
	}, []);

	// Example of role-based access control
	const canEdit = userRole === 'admin';
	const canDelete = userRole === 'admin';
	const canAdd = userRole === 'admin';

	//handle the edit of data
	const handleEdit = (id) => {
		const dt = data.find((item) => item.id === id);
		if (dt) {
			setIsUpdate(true);
			setId(id);
			setFirstName(dt.firstName);
			setLastName(dt.lastName);
			setAge(dt.age);
			setRole(dt.role);
			setContact(dt.contact || "");
		}
	};

	// handle the delete of data
	const handleDelete = (id) => {
		if (id > 0) {
			const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
			if (confirmDelete) {
				const dt = data.filter((item) => item.id !== id);
				setData(dt);
			}
		}
	};

	// Handle file selection
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

	//handle the save of data
	const handleSave = (e) => {
		e.preventDefault();
		let errors = [];

		if (!firstName) errors.push("First Name is required");
		if (!lastName) errors.push("Last Name is required");
		if (!age || parseInt(age) <= 0) errors.push("Valid Age is required");
		if (!role) errors.push("Role is required");

		if (errors.length === 0) {
			const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
			const newObject = {
				id: newId,
				firstName,
				lastName,
				age: parseInt(age),
				role,
				contact,
				profile: profilePreview || null
			};
			setData([...data, newObject]);
			handleClear();
		} else {
			alert(errors.join("\n"));
		}
	};

	//handle the updation of data
	const handleUpdate = (e) => {
		e.preventDefault();
		const index = data.findIndex((item) => item.id === id);
		if (index !== -1) {
			const dt = [...data];
			dt[index] = { 
				...dt[index],
				firstName, 
				lastName, 
				age: parseInt(age), 
				role,
				contact,
				profile: profilePreview || dt[index].profile
			};
			setData(dt);
			handleClear();
		}
	};

	// clear the data
	const handleClear = () => {
		setId(0);
		setFirstName("");
		setLastName("");
		setAge("");
		setRole("");
		setContact("");
		setProfile(null);
		setProfilePreview("");
		setIsUpdate(false);
	};

	// Filter data based on search term and filter
	const filteredData = data.filter(item => {
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
		<div className="bg-light min-vh-100 py-4">
			<div className="container">
				<div className="card shadow-lg mb-4">
					<div className="card-header bg-primary text-white">
						<h4 className="mb-0">{isUpdate ? "Update Employee" : "Add New Employee"}</h4>
					</div>
					<div className="card-body">
						{canAdd && (
							<form onSubmit={isUpdate ? handleUpdate : handleSave}>
								<div className="row g-3">
									<div className="col-md-6 col-lg-3">
										<label className="form-label">First Name*</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter First Name"
											onChange={(e) => setFirstName(e.target.value)}
											value={firstName}
											required
										/>
									</div>
									<div className="col-md-6 col-lg-3">
										<label className="form-label">Last Name*</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Last Name"
											onChange={(e) => setLastName(e.target.value)}
											value={lastName}
											required
										/>
									</div>
									<div className="col-md-6 col-lg-2">
										<label className="form-label">Age*</label>
										<input
											type="number"
											className="form-control"
											placeholder="Enter Age"
											onChange={(e) => setAge(e.target.value)}
											value={age}
											min="18"
											required
										/>
									</div>
									<div className="col-md-6 col-lg-2">
										<label className="form-label">Role*</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Role"
											onChange={(e) => setRole(e.target.value)}
											value={role}
											required
										/>
									</div>
									<div className="col-md-6 col-lg-2">
										<label className="form-label">Contact</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Contact"
											onChange={(e) => setContact(e.target.value)}
											value={contact}
										/>
									</div>
									<div className="col-md-6 col-lg-4">
										<label className="form-label">Profile Image</label>
										<div className="input-group">
											<input
												type="file"
												className="form-control"
												onChange={handleFileChange}
												accept="image/*"
											/>
										</div>
									</div>
									<div className="col-md-6 col-lg-2">
										{profilePreview && (
											<img 
												src={profilePreview} 
												alt="Preview" 
												className="img-thumbnail mt-2" 
												style={{ maxHeight: "80px" }} 
											/>
										)}
									</div>
									<div className="col-12 text-center mt-3">
										<button
											type="submit"
											className={`btn ${isUpdate ? 'btn-warning' : 'btn-primary'} me-2`}
										>
											{isUpdate ? "Update" : "Save"}
										</button>
										<button
											type="button"
											className="btn btn-secondary"
											onClick={handleClear}
										>
											Clear
										</button>
									</div>
								</div>
							</form>
						)}
					</div>
				</div>

				{/* Search and Filter */}
				<div className="card shadow-lg mb-4">
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-6 mb-3 mb-md-0">
								<div className="input-group">
									<span className="input-group-text">
										<i className="bi bi-search"></i>
									</span>
									<input
										type="text"
										className="form-control"
										placeholder="Search employees..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="d-flex justify-content-md-end">
									<select 
										className="form-select w-auto"
										value={selectedFilter}
										onChange={(e) => setSelectedFilter(e.target.value)}
									>
										<option value="all">All Employees</option>
										<option value="young">Age &lt; 25</option>
										<option value="senior">Age &ge; 25</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Employee Table */}
				<div className="card shadow-lg">
					<div className="card-header bg-primary text-white">
						<h4 className="mb-0">Employee List</h4>
						{!canEdit && (
							<small className="text-muted">
								You are in read-only mode
							</small>
						)}
					</div>
					<div className="card-body p-0">
						<div className="table-responsive">
							<table className="table table-hover table-striped mb-0">
								<thead className="table-light">
									<tr>
										<th>#</th>
										<th>ID</th>
										<th>Name</th>
										<th>Age</th>
										<th>Role</th>
										<th>Contact</th>
										<th>Profile</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.length > 0 ? (
										filteredData.map((item, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{item.id}</td>
												<td>
													{item.firstName} {item.lastName}
												</td>
												<td>{item.age}</td>
												<td>
													<span className="badge bg-info text-dark">
														{item.role}
													</span>
												</td>
												<td>{item.contact || "-"}</td>
												<td>
													{item.profile ? (
														<img
															src={item.profile}
															alt="Profile"
															className="rounded-circle"
															width="40"
															height="40"
														/>
													) : (
														<div 
															className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white"
															style={{ width: "40px", height: "40px" }}
														>
															{item.firstName[0]}
														</div>
													)}
												</td>
												<td>
													{canEdit && (
														<button
															className="btn btn-warning btn-sm me-2"
															onClick={() => handleEdit(item.id)}
														>
															Edit
														</button>
													)}
													{canDelete && (
														<button
															className="btn btn-danger btn-sm"
															onClick={() => handleDelete(item.id)}
														>
															Delete
														</button>
													)}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="8" className="text-center py-3">
												No employees found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
					<div className="card-footer">
						<small className="text-muted">
							Showing {filteredData.length} of {data.length} employees
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}