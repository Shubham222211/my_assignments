import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";  // Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch('https://fullstacknotesapplication01.onrender.com/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        alert('Login successful!');
        navigate('/notes');
      } else {
        alert(`Login failed: ${result.msg || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error in login: ${error.message}`);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input 
          type="text"
          value={loginData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input 
          type="password"
          value={loginData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
