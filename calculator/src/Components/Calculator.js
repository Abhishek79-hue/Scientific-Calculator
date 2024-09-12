import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isNewInput, setIsNewInput] = useState(false);
  const [memoryStorage, setMemoryStorage] = useState(0);
  const [isScientific, setIsScientific] = useState(false);
  const [mode, setMode] = useState('Rad');

  const handleButtonClick = (content) => {
    const angle = parseFloat(display)
    const sinh = (x) => Math.sinh(x)
    const cosh = (x) => Math.cosh(x)
    const tanh = (x) => Math.tanh(x)
    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

    function factorial(n) {
      if (n < 0) return 'Error';
      if (n === 0) return 1;
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result *= i;
      }
      return result;
    }

    const num = parseFloat(display);
    let result;

    if (['x^y', 'EXP', 'y√x', "(", ")"].includes(content)) {
      setMemory(parseFloat(display));
      setOperator(content);
      setIsNewInput(true);
      return;
    }
    if (['+', '-', '*', '/'].includes(content)) {
      debugger
      if (memory !== null ) {
        switch (operator) {
          case '+':
            debugger
            result = memory +num;
            break;
          case '-':
            result = memory - num;
            break;
          case '*':
            result = memory * num;
            break;
          case '/':
            result = memory / num;
            break;
          default:
            break;
        }
        setDisplay(result.toString());
        setMemory(null);
        setOperator(content);
        setIsNewInput(true);
      } else {
        setMemory(parseFloat(display));
        setOperator(content);
        setIsNewInput(true);
      }
      return
    }
    if (content === '=') {
      if (operator === null) return;
      switch (operator) {
        case "+":
          result = memory + num
          break;
        case '-':
          result = memory - num;
          break;
        case '*':
          result = memory * num;
          break;
        case '/':
          result = memory / num;
          break;
        case '10^x':
          result = Math.pow(10, num);
          break;
        case 'x^y':
          result = Math.pow(memory, num);
          break;
        case 'EXP':
          result = memory * Math.pow(10, num)
          break;
        case 'y√x':
          result = Math.pow(num, 1 / memory);
          break;
        case "(":
          result = memory
          break;
        case ")":
          result = memory
          break;
        default:
          break;
      }
      setDisplay(result.toString());
      setMemory(null);
      setOperator(null);
  
      return;
    }
    switch (content) {
      case 'AC':
        setDisplay('0');
        setMemory(null);
        setOperator(null);
        setMemoryStorage(0);
        break;
      case '⌫':
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        break;
      case '%':
        setDisplay((parseFloat(display) / 100).toString());
        break;
      case '.':
        if (!display.includes('.')) {
          setDisplay(display + '.');
        }
        break;
      case "lg":
        setDisplay(Math.log10(parseFloat(display).toString()))
        break;
      case "1/x":
        setDisplay(1 / parseFloat(display).toString())
        break;
      case "x²":
        setDisplay(Math.pow(parseFloat(display), 2).toString());
        break;
      case "x³":
        setDisplay(Math.pow(parseFloat(display), 3).toString());
        break;
      case '10^x':
        setDisplay(Math.pow(10, parseFloat(display)).toString());
        break;
      case "√x":
        setDisplay(Math.sqrt(parseFloat(display)).toString());
        break;
      case '3√x':
        setDisplay(Math.cbrt(parseFloat(display)).toString());
        break;
      case 'e':
        setDisplay(Number(display) ? Math.E * parseFloat(display).toString() : Math.E.toString())
        break;
      case 'x!':
        setDisplay(factorial(parseFloat(display)).toString())
        break;
      case 'e^x':
        setDisplay(Math.exp(parseFloat(display)).toString());
        break;
      case "π":
        setDisplay(Number(display) ? Math.PI * parseFloat(display).toString() : Math.PI.toString())
        break;
      case "RAND":
        setDisplay(Math.random(parseFloat(display)).toString())
        break;
      case 'Rad':
        setMode('Rad');
        break;
      case 'Deg':
        setMode('Deg');
        break;
      case 'sin':
        const sinValue = mode === 'Deg' ? Math.sin(degreesToRadians(angle)) : Math.sin(angle);
        if (sinValue) {
          setDisplay(sinValue.toString());
        } else {
          setDisplay("Error")
        }
        break;
      case 'cos':
        const cosValue = mode === 'Deg' ? Math.cos(degreesToRadians(angle)) : Math.cos(angle);
        setDisplay(cosValue.toString());
        break;
      case 'tan':
        const angleInRadians = mode === 'Deg' ? Math.tan(degreesToRadians(angle)) : Math.tan(angle);
        setDisplay(angleInRadians.toString());
        break;
      case 'sinh':
        setDisplay(sinh(parseFloat(display)).toFixed(5));
        break;
      case 'cosh':
        setDisplay(cosh(parseFloat(display)).toString());
        break;
      case 'tanh':
        setDisplay(tanh(parseFloat(display)).toString());
        break;
      case 'ln':
        setDisplay(Math.log(parseFloat(display)).toString());
        break;
      case 'MR':
        setDisplay(memoryStorage.toString());
        setIsNewInput(true);
        break;
      case 'M+':
        setMemoryStorage(memoryStorage + parseFloat(display));
        setIsNewInput(true);
        break;
      case 'M-':
        setMemoryStorage(memoryStorage - parseFloat(display));
        setIsNewInput(true);
        break;
      default:
        if (isNewInput) {
          setDisplay(content);
          setIsNewInput(false);
        } else {
          setDisplay(display === '0' ? content : display + content);
        }
        break;
    }
  };
  const basicKeys = [
    "0",".","AC","⌫", "7", "8", "9", "=","4", "5", "6", "+","1", "2", "3", "-","EXP", "RAND", "%", "*","MR", "M+", "M-", "/",
  ];
  const scientificKeys = [
    "Rad","Deg", "x!", "e", "sinh", "cosh", "tanh","sin","cos", "tan", "ln",  "3√x", "y√x", "√x", "lg",
     "1/x", "x²", "x³", "x^y", 
    "π", "(", ")", "10^x", "e^x", 
  ];
  const toggleScientificMode = () => {
    setIsScientific(!isScientific);
  };
  return (
    <div>
    
    <div className='container'><button  className="toggle-btn" onClick={toggleScientificMode}>
        {isScientific ? "Scientific-Calculator" : "Simple-Calculator"}
      </button>
      <input
        type="text"
        value={display}
        readOnly
        className="calculator-input"
      />
      <div className="calculator-container">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item)}
            className={`${item === mode ? 'active' : ''} ${item === '=' ? 'equal' : ''}`}
          >
            {item}
          </button>
          
        ))}
         {isScientific && scientificKeys.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item)}
            className={`${item === mode ? 'active' : ''} ${item === '=' ? 'equal' : ''}`}
          >
            {item}
          </button>
          
        ))}
        
      </div>
    </div>
    </div>
  );
}
export default Calculator;