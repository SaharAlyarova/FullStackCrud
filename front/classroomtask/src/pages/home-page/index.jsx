import React, { useEffect } from "react";
import { useState } from "react";
import "./index.scss";
import axios from "axios";
import SearchInput from "../../components/input-search/index";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [data,setData]=useState([])

  const getData = async()=>{
    const response = await axios.get("http://localhost:8000/products");
    setData(await response.data)
  }
  useEffect(() => {
  getData();
  }, [])
  
const handleSort=()=>{
  // axios.get("http://localhost:8000/products").then((data)=>{
  //   let sort = data.data.sort((a,b)=>Number(a.price)-Number(b.price))
  //   setData([...sort])

  // }
  // )
  const sortedData = data.sort((a,b) => a.price - b.price)
  setData([...data], sortedData)
}

  return (
    <div className="data">
      <button onClick={()=>handleSort()}>Sort by Price</button>
  <SearchInput setData={setData}/>
  <div className="allcard">
    {data.map((element,i)=>{
      return(
        <Link to={`/add-products/${element.id}`}>
           <div className="card"  key={i}>
        <div className="image"><img src="https://picsum.photos/200/300"alt="" /></div>
        <div className="cardText">
          <h2>Products: {element.name}</h2>
          <h4>Price: {element.price}</h4>
          <h4>Descriptoion: {element.description}</h4>
          
        </div>
        </div>
        </Link>
       )
      })}
      </div>
    
    </div>
  );
};

export default HomePage;
