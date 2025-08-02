import React, { useState, useEffect } from 'react';
import InputContainer from './Components/InputContainer';
import FilterContainer from './Components/FilterContainer';
import TodoContainer from './Components/TodoContainer';
import StatsContainer from './Components/StatsContainer';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentQuote, setCurrentQuote] = useState('');

  const quotes = [
    "The way to get started is to quit talking and begin doing. - Disney",
    "Don't watch the clock, do what it does. Keep going. - Sam Levenson",
    "The future depends on what you do today. - Mahatma Gandhi",
  ];

  // Initialize app and set up quote rotation
  useEffect(() => {
    updateQuote();
    const quoteInterval = setInterval(updateQuote, 10000);
    return () => clearInterval(quoteInterval);
  }, []);

  const updateQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  const addTodo = () => {
    const text = inputVal.trim();
    
    if (text === '') {
      // Handle empty input validation in InputContainer
      return false;
    }

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInputVal('');
    return true;
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filterTodos = (filter) => {
    setCurrentFilter(filter);
  };

  const getFilteredTodos = () => {
    if (currentFilter === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, active, percentage };
  };

  return (
    <main>
      <h1>Hustler's Planner 🗿</h1>
      
      <div className="quote">
        {currentQuote}
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${getStats().percentage}%` }}></div>
      </div>
      <div className="progress-text">
        <span>{getStats().percentage}% Complete</span>
      </div>

      <InputContainer 
        inputVal={inputVal}
        setInputVal={setInputVal}
        addTodo={addTodo}
      />

      <FilterContainer 
        currentFilter={currentFilter}
        filterTodos={filterTodos}
      />

      <TodoContainer 
        todos={getFilteredTodos()}
        allTodos={todos}
        currentFilter={currentFilter}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      <StatsContainer stats={getStats()} />
    </main>
  );
}

export default App;