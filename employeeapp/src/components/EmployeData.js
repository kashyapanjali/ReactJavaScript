import React,{useState, useEffect}from 'react'
import { EmployeDetails } from './EmployeDetails';
export default function EmployeData() {

    const[data,setData]=useState([]);
    const[firstName, setFirstName] =useState("");
    const[lastName, setLastName] =useState("");
    const[id, setId] = useState(0);
    const[age, setAge] = useState(0);
    const[isUpdate, setIsUpdate] = useState(false);
    
    // useeffect for dummy data
    useEffect(()=>{
        setData(EmployeDetails)
    },[]);
    
    // to edit data
    const handleEdit = (id) =>{
       const dt = data.filter(item => item.id === id);
       if(dt !== undefined){
         setIsUpdate(true);
         setId(id);
         setFirstName(dt[0].firstName);
         setLastName(dt[0].lastName);
         setAge(dt[0].age);
       }
    }
     //to delete data
    const handleDelete = (id) =>{
        if(id > 0){
            if(window.confirm("Are you sure to delete this item")){
                const dt = data.filter(item =>item.id !== id);
                setData(dt);
            }      
        }    
      }

    // to save data
    const handleSave=(e)=>{
         let error = '';
         
         if(firstName === '')
         error += 'First Name is required, ';

         if(lastName === '')
         error += 'Last Name is required, ';

         if(age <= 0)
         error += 'Age is required.';

           if(error === '')
             {
            e.preventDefault();
            const dt = [...data];
            const newObject = {
               id: EmployeDetails.length+1,
               firstName: firstName,
               lastName: lastName,
               age: age
            }
            dt.push(newObject);
            setData(dt);
            } 
           else{
             alert(error);
         }    
    }
    
    //updation
    const handleUpdate=()=>{
      const index = data.map((item) =>{
        return item.id
      }).indexOf(id);

      const dt = [...data];
      dt[index].firstName = firstName;
      dt[index].lastName = lastName;
      dt[index].age = age;
      
      setData(dt);
      handleClear();
    }
    
    // clear the details
    const handleClear=()=>{
        setId(0);
        setFirstName('');
        setLastName('');
        setAge('');
        setIsUpdate(false);
      }

  return (
    <>
    {/* <Navbar/> */}
    <div style={{ background: '#e5e4ef', minHeight: 'calc(100vh - 56px)', padding: '30px 0' }}>
                <div className="container">
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex flex-wrap justify-content-center mb-4">
                            <div className="mx-2">
                                <label>
                                    First Name:
                                    <input
                                        type="text"
                                        className="rounded-pill my-2"
                                        placeholder="Enter your First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                    />
                                </label>
                            </div>
                            <div className="mx-2">
                                <label>
                                    Last Name:
                                    <input
                                        type="text"
                                        className="rounded-pill my-2"
                                        placeholder="Enter your Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
                                    />
                                </label>
                            </div>
                            <div className="mx-2">
                                <label>
                                    Age:           
                                    <input
                                        type="number"
                                        style={{marginLeft:'45px'}}
                                        className="rounded-pill my-2"
                                        placeholder="Enter Age"
                                        onChange={(e) => setAge(e.target.value)}
                                        value={age}
                                    />
                                </label>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center mb-4">
                            {
                                !isUpdate ? (
                                    <button className="btn border-dark btn-primary" onClick={handleSave}>Save</button>
                                ) : (
                                    <button className="btn border-dark btn-primary" onClick={handleUpdate}>Update</button>
                                )
                            }
                            <button className="btn border-dark btn-warning mx-1 text-white" onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                    <table className="table table-hover my-5 ms-auto fixed">
                        <thead>
                            <tr>
                                <td><strong>Sr.No</strong></td>
                                <td><strong>Id</strong></td>
                                <td><strong>FirstName</strong></td>
                                <td><strong>LastName</strong></td>
                                <td><strong>Age</strong></td>
                                <td><strong style={{margin:'30px'}}>Actions</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.age}</td>
                                            <td>
                                                <button className='btn btn-primary border-dark  my-1'onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                                                <button className='btn btn-danger border-dark' onClick={() => handleDelete(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  );
}
