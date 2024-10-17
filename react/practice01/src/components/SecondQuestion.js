import React, { useEffect } from 'react'
import {useState} from 'react';

const useDebounce = (text, delay) => {
    const [debounce, setDebounce] = useState(text);
    // console.log(debounce);

    useEffect(()=> {
        const timer = setTimeout(() =>{
            setDebounce(text);
        },delay);

        return () =>{
            clearTimeout(timer);
        };
    }, [text,delay] );

    return debounce;
}

const SecondQuestion = () => {
    const [text, setText] = useState("");
    const debounceText =useDebounce(text, 1000); //1000ms delay

  return (
    <div>
        <h1>Debounce Hook Testing</h1>
        <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
        
        />
        <p>Debounce value {debounceText}</p>
        
    </div>
  )
}

export default SecondQuestion