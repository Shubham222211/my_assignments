import { AuthContext } from "../AuthContext/AuthContextProvider"
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrderByPrice, setSortOrderByPrice] = useState("asc");

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`)
      .then(res => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    filterAndSort(event.target.value, sortOrderByPrice);
  };

  const filterAndSort = (searchText, sortOrder) => {
    let filteredData = data.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));

    if (sortOrder === "asc") {
      filteredData.sort((a, b) => a.price - b.price);
    } else {
      filteredData.sort((a, b) => b.price - a.price);
    }

    setRecords(filteredData);
  };

  const handleSortByPrice = () => {
    const newSortOrder = sortOrderByPrice === "asc" ? "desc" : "asc";
    setSortOrderByPrice(newSortOrder)
    filterAndSort(searchInput, newSortOrder)
  };



  const {isLoggedin}=useContext(AuthContext)

  if(!isLoggedin){
      return <Navigate to="/Login"/>
  }




  return (
    <>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search by title"
        className="serachinput"
      />
      <button onClick={handleSortByPrice} className="sortbutton">
        Sort by Price ({sortOrderByPrice === "asc" ? "Lower To Hight" : "High To Low"})
      </button>
        <div className="productaccess1">
          {records.map((product, index) => (
            <div className="productaccess2" key={index}>
              <img className="productimage" src={product.image} alt={product.title} />
              <h4>Name : {product.title}</h4>
              <p>Description : {product.description}</p>
              <p>Category : {product.category}</p>
              <h4>Price : Rs {product.price}.00</h4>
              <button onClick={function(){return alert("Ordered Successfully !")}}>Buy Now</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Products;
