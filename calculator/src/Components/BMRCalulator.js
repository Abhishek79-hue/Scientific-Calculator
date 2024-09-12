import React, { useState } from 'react'
import "./BMRCalulator.css"
function BMRCalulator() {
    const[data,setData]=useState({
        age:"",
        gender:"",
        height:"",
        weight:"",
        result:""
    })

    const handleChange=(e)=>{
        const{name,value}=e.target
    setData((prevData)=>({
        ...prevData,
        [name]:value
    }))
    }
    
    const calculateBmr=()=>{
        const{gender,age,height,weight}=data
        
        let bmr;
     if (gender === 'male') {
          bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
        } else if (gender === 'female') {
          bmr = 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;
        }
 setData((prevData)=>({
    ...prevData,
    result: age && gender && height && weight 
        ? `Your BMR is: ${bmr.toFixed(2)} calories/day` 
        : "Please fill in all fields"       
 }))
    }
  return (
    <div>
   
      <h1>BMR Calculator</h1>
      <div className='Bmr-conatiner'>
      <div>
        <label>Age   </label>
        <input
          type="number"
          value={data.age}
          name='age'
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Gender</label>
        <input
          type="radio"
          value="male"
          name='gender'
          checked={data.gender === "male"}
          onChange={handleChange}
        /> Male
        <input
          type="radio"
          value="female"
          name='gender'
          checked={data.gender === "female"}
          onChange={handleChange}
        /> Female
      </div>
      <div>
        <label>Height (cm)</label>
        <input
          type="number"
          value={data.height}
          name='height'
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Weight (kg)</label>
        <input
          type="number"
          value={data.weight}  
          name='weight'       
          onChange={handleChange}
        />
      </div>
      <button onClick={calculateBmr} className='bmr-btn'>Calculate</button>
     </div>
    <p>{data.result}</p>
    </div>
  )
}

export default BMRCalulator