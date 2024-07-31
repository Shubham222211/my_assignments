
import {Link} from "react-router-dom"
import Logo from "../Pages/Logo"


function RoutesNavbar(){
    return(
      <div class="Navbar">
      <Link to="/Logo"><Logo/></Link>
        <Link to="/">Home</Link>
       
        <Link to="/Men">Men</Link>
        <Link to="/Kids">Kids</Link>
        <Link to="/Products">Product & Accesories</Link>
        <Link to="/Login">Login</Link>
        
        

        
        
      </div>
    ) 
  }

  export default RoutesNavbar