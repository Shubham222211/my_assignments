import {Routes,Route} from "react-router-dom"
import Men from "../Pages/Men"
import Home from "../Pages/Home"
import Logo from "../Pages/Logo"
import Kids from "../Pages/Kids"
import Login from "../Pages/Login"
import Products from "../Pages/Products"


function AllRoutes(){

    return (
      <div>
  <Routes>
  
  <Route path="/Logo" element={<Logo/>}/>
    <Route path="/" element={<Home/>}/>
  <Route path="/Men" element={<Men/>}/>
  <Route path="/Kids" element={<Kids/>}/>
  <Route path="/Login" element={<Login/>}/>
  <Route path="/Products" element={<Products/>}/>
  
  
  
    
  
  </Routes>
  
      </div>
    )
  }
  
  export default AllRoutes