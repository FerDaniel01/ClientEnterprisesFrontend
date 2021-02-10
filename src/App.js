import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastame] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState(0);
  const [adress, setAdress] = useState("");
  const [documenttype, setDocumentType] = useState("");
  const [documentnumber, setDocumentNumber] = useState(0);
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");


  // estas siguientes son para actualizar 

  const [newFirstname, setNewFirstname] = useState([]);
  const [newLastname, setNewLastname] = useState([]);
  const [newGender, setNewGender] = useState([]);
  const [newEmail, setNewEmail] = useState([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState([]);
  const [newAdress, setNewAdress] = useState([]);
  const [newDocumenttype, setDocumenttype] = useState([]);
  const [newDocumentnumber, setDocumentnumber] = useState([]);

  //Array para almacenar empleados

  const [EmployeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('https://enterprises-add.herokuapp.com/create', {

      firstname: firstname,
      lastname: lastname,
      gender: gender,
      email: email,
      phonenumber: phonenumber,
      adress: adress,
      documenttype: documenttype,
      documentnumber: documentnumber,
      created: created,
      updated: updated,


    }).then(() => {
      setEmployeeList([

        ...EmployeeList,
        {
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          email: email,
          phonenumber: phonenumber,
          adress: adress,
          documenttype: documenttype,
          documentnumber: documentnumber,
          created: created,
          updated: updated,

        },
      ]);

    });

  };

  const getEmployees = () => {
    Axios.get("https://enterprises-add.herokuapp.com/employees").then((response) => {
      setEmployeeList(response.data);

    });
    
  };

  const updateEmployeePhone = (employeeid) => {
    Axios.put("https://enterprises-add.herokuapp.com/update", {
      firstname: newFirstname,
      lastname: newLastname,
      gender: newGender,
      email: newEmail,
      phonenumber: newPhoneNumber,
      adress: newAdress,
      documenttype: newDocumenttype,
      documentnumber: newDocumentnumber,
      employeeid: employeeid
    }).then(
      (response) => {
        setEmployeeList(
          EmployeeList.map((val) => {
            return val.employeeid == employeeid ? {
              employeeid: val.employeeid,
              firstname: val.firstname,
              lastname: val.lastname,
              gender: val.gender,
              email: val.email,
              phonenumber: val.phonenumber,
              adress: val.adress,
              documenttype: val.documenttype,
              documentnumber: val.documentnumber,
              created: val.created,
              updated: val.updated,



              //estas para catualizar
              firstname: newFirstname,
              lastname: newLastname,
              gender: newGender,
              email: newEmail,
              phonenumber: newPhoneNumber,
              adress: newAdress,
              documenttype: newDocumenttype,
              documentnumber: newDocumentnumber,
              //podria pensar en poner la fecha de actualizado aquí
            }
              : val;

          }))
        alert("update");

      });


  };

  const deleteEmployee = (employeeid) => {
    Axios.delete(`https://enterprises-add.herokuapp.com/delete/${employeeid}`).then((response) => {

      setEmployeeList(
        EmployeeList.filter((val) => {
          return val.employeeid != employeeid
        }))
    });

  };
  return (
    <div className="App">
      <div className="informatio">

        <label>firstName: </label>

        <input type="text"
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
        />

        <label>Lastname: </label>

        <input type="text"
          onChange={(event) => {
            setLastame(event.target.value);
          }}
        />

        <label>Gender: </label>

        <input type="text"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />

        <label>Email: </label>

        <input type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />




        <label>Phone Number: </label>
        <input type="number" onChange={(event) => {
          setPhoneNumber(event.target.value);
        }} />

        <label>Adress: </label>
        <input type="text" onChange={(event) => {
          setAdress(event.target.value);
        }} />

        <label>Document type: </label>
        <input type="text" onChange={(event) => {
          setDocumentType(event.target.value);
        }} />

        <label>Document Number: </label>
        <input type="number" onChange={(event) => {
          setDocumentNumber(event.target.value);
        }} />

        <button onClick={addEmployee} >Add Employee</button>
      </div>
      <hr />

      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {EmployeeList.map((val, key) => {
          return (<div className="employee">
            <div>
              <h3>Firstname:  {val.firstname}</h3>
              <h3>Lastname: {val.lastname}</h3>
              <h3>Phone Number:{val.phonenumber}</h3>
              <h3>Document:{val.documentnumber}</h3>

            </div>


            <div>
              <h3>Firstname: </h3>
              <input type="text"   placeholder={val.firstname} defaultValue={val.firstname}
               onMouseMove={(event) => {
                   
                  setNewFirstname(event.target.value);
                }}
              />

              <h3>Lastname: </h3>
              <input type="text"   placeholder={val.lastname} defaultValue={val.lastname}
                onMouseMove={(event) => {
                  setNewLastname(event.target.value);
                }}
              />

              <h3>Gender: </h3>
              <input type="text" defaultValue={val.gender}
                onMouseMove={(event) => {
                  setNewGender(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Email: </h3>
              <input type="text" defaultValue={val.email}
                onMouseMove={(event) => {
                  setNewEmail(event.target.value);
                }}
              />

              <h3>Phone Number: </h3>
              <input type="number" defaultValue={val.phonenumber}
                onMouseMove={(event) => {
                  setNewPhoneNumber(event.target.value);
                }}
              />


              <h3>Adres: </h3>
              <input type="text" defaultValue={val.adress}
              onMouseMove={(event) => {
                  setNewAdress(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Document Type : </h3>
              <input type="text" defaultValue={val.documenttype}
                onMouseMove={(event) => {
                  setDocumenttype(event.target.value);
                }}
              />

              <h3>Document Number : </h3>
              <input type="number" defaultValue={val.documentnumber}
                onMouseMove ={(event) => {
                  setDocumentnumber(event.target.value);
                }}
              />
            </div>
            <button
              onClick={() => {
                updateEmployeePhone(val.employeeid);
              }}
            >
              Update
                  </button>

            <button
              onClick={() => {
                deleteEmployee(val.employeeid);
              }}
            >
              Delete
                  </button>

          </div>

          );
        })}
      </div>
    </div>
  );

}

export default App;
