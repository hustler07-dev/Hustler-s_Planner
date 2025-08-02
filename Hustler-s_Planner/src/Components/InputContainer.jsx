import React, { useState, useRef } from 'react'

function InputContainer({ inputVal, setInputVal, addTodo }) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    const success = addTodo();
    
    if (!success) {
      // Show error state
      setIsError(true);
      if (inputRef.current) {
        inputRef.current.placeholder = 'Please enter a task! 😊';
      }
      setTimeout(() => {
        setIsError(false);
        if (inputRef.current) {
          inputRef.current.placeholder = 'What needs to be done today? 🚀';
        }
      }, 2000);
    } else {
      // Show success state
      setIsSuccess(true);
      if (buttonRef.current) {
        buttonRef.current.style.transform = 'scale(1.1)';
        buttonRef.current.innerHTML = '✅';
      }
      setTimeout(() => {
        setIsSuccess(false);
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(1)';
          buttonRef.current.innerHTML = '➕';
        }
      }, 500);
    }
  };

  return (
    <div className="input-container">
      <input 
        ref={inputRef}
        type="text" 
        placeholder="What needs to be done today? 🚀" 
        value={inputVal}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        maxLength={100}
        style={{
          borderColor: isError ? '#f7a4a4' : '#d2c6b2'
        }}
      />
      <button 
        ref={buttonRef}
        onClick={handleAddTodo}
        className={isSuccess ? 'success' : ''}
      >
        ➕
      </button>
    </div>
  );
}

export default InputContainer;