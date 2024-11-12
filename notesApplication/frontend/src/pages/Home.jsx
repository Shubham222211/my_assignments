// import React from "react";
import "./Home.css";  // Import the CSS file for styling
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate=useNavigate()
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Our Notes Application</h1>
        <p>Your journey to a better experience begins here, and Make important Notes ! </p>
        
        <div className="button-container">
          <button onClick={()=>navigate('./register')} className="home-button register-button">Register</button>
          <button onClick={()=>navigate('./login')} className="home-button login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
