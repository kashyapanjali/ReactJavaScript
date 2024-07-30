import React, { useState, useEffect } from 'react';
import { EmployeDetails } from './EmployeDetails';
export default function EmployeData() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState(0);
  const [age, setAge] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeDetails);
  }, []);
   
  //handle the edit of data
  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  }

    // handle the delete of data
  const handleDelete = (id) => {
    if (id > 0 && window.confirm("Are you sure to delete this item")) {
      const dt = data.filter(item => item.id !== id);
      setData(dt);
    }
  }
   
  //handle the save of data
  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (!firstName) error += 'First Name is required, ';
    if (!lastName) error += 'Last Name is required, ';
    if (age <= 0) error += 'Age is required.';

    if (!error) {
      const newObject = {
        id: data.length + 1,
        firstName,
        lastName,
        age
      }
      setData([...data, newObject]);
      handleClear();
    } else {
      alert(error);
    }
  }

   //handle the updation of data
  const handleUpdate = () => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      const dt = [...data];
      dt[index] = { id, firstName, lastName, age };
      setData(dt);
      handleClear();
    }
  }

   // clear the data
  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge(0);
    setIsUpdate(false);
  }

  return (
    <div style={{ background: '#e5e4ef', minHeight: 'calc(100vh - 56px)', padding: '30px ' }}>
      <div className="container">
        {/* user input  */}
        <div className="d-flex flex-column align-items-center">
          <div className="row justify-content-center mb-4 w-100">
            <div className="col-12 col-md-3 my-2">
              <label>
              <div className='text-center text-info'>FirstName</div>
              <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter your First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </label>
            </div>
            <div className="col-12 col-md-3 my-2">
              <label>
              <div className='text-center text-info'>Last Name</div>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Enter your Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>
            </div>
            <div className="col-12 col-md-3 my-2">
              <label>
                <div className='text-center text-info'>Age</div>
                <input
                  type="number"
                  className="form-control rounded-pill"
                  placeholder="Enter Age"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            {!isUpdate ? (
              <button className="btn border-dark btn-primary" onClick={handleSave}>Save</button>
            ) : (
              <button className="btn border-dark btn-primary" onClick={handleUpdate}>Update</button>
            )}
            <button className="btn border-dark btn-warning mx-1 text-white" onClick={handleClear}>Clear</button>
          </div>
        </div>

        {/* table form of data */}
        <div className="table-responsive ms-auto">
          <table className="table table-hover my-5">
            <thead>
            {/* shows the data here */}
              <tr>
                <th>Sr.No</th>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Profile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {/* increase the data */}
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>{item.contact}
                    <input 
                    className="form-control rounded mt-2" 
                    type="text" 
                    name="contact" 
                    id="contact"
                    style={{ maxWidth: '100px' }} // Adjust the width as needed
                    />
                  </td>
                  <td>{item.profile}
                    <div className="input-group mb-3">
                        <input type="file" name="file" id="inputfile" style={{ display: 'none' }}
                        />
                        <label className="btn btn-primary" htmlFor="inputfile" style={{ cursor: 'pointer',borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}>
                          Choose
                        </label>
                        <button className="btn btn-secondary" onClick={() => alert('Upload functionality here')}>
                          Upload
                        </button>
                    </div>
                  </td>
                  <td>
                    <button className='btn btn-primary border-dark mx-1 my-1' onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className='btn btn-danger border-dark' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
