import { useState, useEffect } from "react";
import './App.css'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import StudentManage from "./StudentManage";

function App() {
  const [message, setMessage] = useState("loading...");
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clubName, setClubName] = useState("");  
  
  
 
    useEffect(() => {
        fetch("http://localhost:8000/")
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);

    const loadStudents = () => {
    fetch("http://localhost:8000/all/students")
        .then((res) => res.json())
        .then((data) => setStudents(data));
};
 
useEffect(() => {
    loadStudents();
}, []);
 const addStudent = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/create/student/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, clubName }), 
    }).then(() => {
      setName(""); setEmail(""); setClubName(""); 
      loadStudents();
    });
   };
const verifyStudent = (studentEmail) => {
    fetch("http://localhost:8000/update/isVerified", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: studentEmail, isVerified: true }),
    }).then(() => loadStudents());
};
const deleteStudent = (studentEmail) => {
    fetch("http://localhost:8000/delete/student", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: studentEmail }),
    }).then(() => loadStudents());
};


 
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manage" element={<StudentManage />} />
            </Routes>
        </BrowserRouter>
    );
}
 return (
    <div>
      <h1><i>Student Club Membership</i></h1>
      <p>Backend says: <b>{message}</b></p>

      {/* create form */}
     {/* create form */}
<form className="student-form" onSubmit={addStudent}>
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Name"
  />
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
  />
  <input
    value={clubName}
    onChange={(e) => setClubName(e.target.value)}
    placeholder="Club Name"
  />
  <button type="submit">Add Student</button>
</form>


{/* student list */}
   <div className="table-container">
  <table className="student-table">
    <thead>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Club Name</td>
        <td>Is Verification</td>
        <td>Delete</td>
      </tr>
    </thead>
    <tbody>
      {students.map((s) => (
        <tr key={s._id}>
          <td>{s.name}</td>
          <td>{s.email}</td>
          <td>{s.clubName}</td>
          <td>
            <button onClick={() => verifyStudent(s.email)}>
              {s.isVerified ? "Verified ✅" : "Verify"}
            </button>
          </td>
          <td>
            <button onClick={() => deleteStudent(s.email)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

 
export default App;