import React, { useState } from 'react'

function BmiCalculator() {
    const[age,setAge]=useState("")
    const[height,setHeight]=useState("")
    const[weight,setWeight]=useState("")
    const [gender, setGender] = useState('');
    const[result,setResult]=useState("")
   
    const calculateRresult=(height,weight)=>{
        let heightMeter=height/100
        let healthBmiPrime=25
        let bmi=(weight/(heightMeter*heightMeter)).toFixed(1)
        let bmiPrime=(bmi/healthBmiPrime).toFixed(2)
        let lowerLimit=(18.5*Math.pow(heightMeter,2)).toFixed(1)
        let upperLimit=(25*Math.pow(heightMeter,2)).toFixed(1)
        let ponderalIndex=(weight/Math.pow(heightMeter,3)).toFixed(1)
        setResult({bmi,bmiPrime,lowerLimit,upperLimit,ponderalIndex})
    }

 const handleCalculate=(e)=>{
    if (age && height && weight && gender) {
        calculateRresult(height, weight);
      } else {
        setResult(''); 
      }
 }
 const handleClear=(e)=>{
    setResult("")
    setHeight("")
    setWeight("")
    setAge("")
    setGender("")
 }
  return (
    <div>
        <h1>BMI Calculator</h1>
        <div className='calorie-container'>
        <div>
            <label>Age:</label>
            <input type='number' placeholder='enter your age' onChange={(e)=>setAge(e.target.value)} value={age} required/>
        </div>
        <div>
        <label>
            Gender:
            <input
              type="radio"
              name="gender"value="male" onChange={(e) => setGender(e.target.value)}
              checked={gender === 'male'}
            /> Male
            <input
              type="radio"name="gender"
              value="female"onChange={(e) => setGender(e.target.value)}
              checked={gender === 'female'} /> Female
          </label>
        </div>
    <div>
        <label>Height(in CM)</label>
        <input type='number' placeholder='height' onChange={(e)=>setHeight(e.target.value)} value={height} required/>
    </div>
    <div>
        <label>Weight</label>
        <input type='number' placeholder='Weight' onChange={(e)=>setWeight(e.target.value)} value={weight} required/>
      
    </div>
    <button onClick={handleCalculate}>Calculate</button>
    <button onClick={handleClear}>Clear</button>
    </div>
    {result &&(
        <div>
    <p>BMI={`${result.bmi}kg/m2`}</p>
    <p>Healthy BMI range: 18.5 kg/m2 - 25 kg/m2</p>
    <p> Healthy weight for the height: {`${result.lowerLimit}kg/m2-${result.upperLimit}kg/m2`}</p>
    <p>BMI Prime: {result.bmiPrime}</p> 
    <p>Ponderal Index: {`${result.ponderalIndex}kg/m3`}</p></div>
)}
    </div>
  )
}

export default BmiCalculator