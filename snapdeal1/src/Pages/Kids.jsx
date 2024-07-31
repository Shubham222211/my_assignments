import { useState,useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../AuthContext/AuthContextProvider"
import LoadingIndicator from "./LoadingIndicator"
import { Navigate } from "react-router-dom"
import { useContext } from "react"

function Kids(){
const[Loading,setLoading]=useState(false)
  
  const[Movies,setMovies]=useState([])

  async function fetchMovies(){

    try {
      const response=await axios.get(`http://localhost:5000/movies`)
      setMovies(response.data)
      console.log(response.data)
    } catch (error) {
      
    }
  }
   useEffect(() => {

    
    fetchMovies()

},[])


const {isLoggedin}=useContext(AuthContext)

    if(!isLoggedin){
        return <Navigate to="/login"/>
    }



    if(Loading){
      return <LoadingIndicator/>
    }

    return(

        <div>
            

              
                
             <div>
    
    <div className="corporate">
      {Movies.map((d, i) => (
        <div key={i}>
          <div className="subcorporate">
            <img src={d.image} alt={d.name} />
            <p>Name: {d.name}</p>
            <h4>Price: {d.price}</h4>
            <h5>Rating: {d.rating}</h5>
            <p>Description: {d.description}</p>
            <button onClick={function(){
                return alert("Order Successfully !")
            }}>Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
        </div>
    )
}

export default Kids

