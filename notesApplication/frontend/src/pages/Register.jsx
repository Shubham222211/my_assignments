import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";  // Import the CSS file

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    gender: ""
  });

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://fullstacknotesapplication01.onrender.com/user/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      console.log(result);
      alert('User registered successfully!');
      navigate("/login");
    } catch (error) {
      alert(`Error in registration: ${error.message}`);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        <input placeholder="Name.." value={data.name} name="name" onChange={handleChange} />
        <input placeholder="Age.." value={data.age} name="age" onChange={handleChange} />
        <input placeholder="Gender.." value={data.gender} name="gender" onChange={handleChange} />
        <input placeholder="Email.." value={data.email} name="email" onChange={handleChange} />
        <input placeholder="Password.." type="password" value={data.password} name="password" onChange={handleChange} />
        
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
