import React, { useState } from 'react';
import "./CalorieCalculator.css";

function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
  });

  const [calculatedData, setCalculatedData] = useState({
    maintainCalories: null,
    mildLossCalories: null,
    lossCalories: null,
    extremeLossCalories: null,
  });
  const[isCalculated,setCalculated]=useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel } = formData;
    let bmr;
    if (gender === 'male') {
      bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    } else if (gender === 'female') {
      bmr = 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;
    } else {
      return;
    }

    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
      case 'extra-active':
        activityMultiplier = 2.0; 
        break;
      default:
        activityMultiplier = 1;
    }

    const maintainCalories = bmr * activityMultiplier;
    const mildLossCalories = maintainCalories - 250;
    const lossCalories = maintainCalories - 500;
    const extremeLossCalories = maintainCalories - 1000;

    setCalculatedData({
      maintainCalories: maintainCalories.toFixed(),
      mildLossCalories: mildLossCalories.toFixed(),
      lossCalories: lossCalories.toFixed(),
      extremeLossCalories: extremeLossCalories.toFixed(),
    });
    setCalculated(true)
  };

  return (
    <div>
      <h1>Calorie Calculator</h1>
      <div className='calorie-container'>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <br/>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Activity Level:</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary: little or no exercise</option>
            <option value="light">Light: exercise 1-3 times/week</option>
            <option value="moderate">Moderate: exercise 4-5 times/week</option>
            <option value="active">Active: daily exercise or intense exercise 3-4 times/week</option>
            <option value="very-active">Very Active: intense exercise 6-7 times/week</option>
            <option value="extra-active">Extra Active: very intense exercise daily, or physical job</option>
          </select>
        </div>
        <button onClick={calculateCalories}>Calculate</button>
        </div>
      
      {isCalculated && (
        <div className='result'>
          <h2>Daily Calorie Needs</h2>
          <p>Maintain Weight: {calculatedData.maintainCalories} calories/day</p>
          <p>Mild Weight Loss (0.25 kg/week): {calculatedData.mildLossCalories} calories/day</p>
          <p>Weight Loss (0.5 kg/week): {calculatedData.lossCalories} calories/day</p>
          <p>Extreme Weight Loss: {calculatedData.extremeLossCalories} calories/day</p>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
