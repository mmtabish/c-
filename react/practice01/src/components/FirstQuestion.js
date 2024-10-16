import React from 'react'
import {useState} from 'react'


const FirstQuestion = () => {
    const fruits = [
        "apple",
        "aopricot",
        "banana",
        "blueberry",
        "cherry",
        "canberry",
        "Fig",
        "Grape",
      ];
    
      const [fruitsData, setFruitsData] = useState(fruits);
      const [searchTerm, setSearchTerm] = useState("");
    
      const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
      }
    
    
    // compare and filtering
    
      const fruitsDataFilter = fruitsData.filter((fruits) =>  
        fruits.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );
    
      return (
        <div className="App">
          <input type="text" placeholder="Search here..." onChange={handleInputChange}></input>
          {fruitsDataFilter.map((fruits) => {
            return <p>{fruits}</p>
          } )}
    
      
        </div>
      );
}

export default FirstQuestion