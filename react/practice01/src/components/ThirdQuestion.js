import React from 'react'
import {useState, useRef, useEffect} from "react";

function PhoneNumberInput({maxLength = 10}){
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const carretPositionRef = useRef(0);

  const inputChange = (e) => {
    const target = e.target;
    const currentValue = target.value;
    const selectionStart = target.selectionStart;
    const numbers = currentValue.replace(/[^0-9]/g, "");
    const size = numbers.length;

    if(size > maxLength) return;

    const fromatedValue = [];
    for(let i=0; i<size; i++){
      if(i >3 && i===0){
        fromatedValue.push("(");
      }
      fromatedValue.push(numbers[i]);

      if(size > 6 && i === 5){
        fromatedValue.push("-")
      }

      if(size >3 && i === 2){
        fromatedValue.push(")")
      }

    }
    const diff = fromatedValue.length - currentValue.length;
    if (selectionStart){
      carretPositionRef.current =selectionStart + diff;
    }
    setInput(fromatedValue.join(""));

  };

  useEffect(()=>{
    if (inputRef.current){
      inputRef.current.setSelectionRange(
        carretPositionRef.current,
        carretPositionRef.current,
        // console.log("update value")
      );
    }
  }, [input]);

  return (

    <input
    value= {input}
    onChange = {inputChange}
    ref = {inputRef}
    data-testid = "phone-number-input"
    />

  );


}

const ThirdQuestion = () => {
  return (
    <>
    <PhoneNumberInput />
    </>
  )
} 

export default ThirdQuestion