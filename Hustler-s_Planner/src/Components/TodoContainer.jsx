import React, { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <div 
      className={`todo ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
      style={{
        transform: isDeleting ? 'translateX(100%)' : 'translateY(0)',
        opacity: isDeleting ? '0' : '1',
        transition: 'transform 0.3s ease, opacity 0.3s ease'
      }}
    >
      <p>{todo.text}</p>
      <div className="actions">
        <input 
          type="checkbox" 
          checked={todo.completed}
          onChange={handleToggle}
        />
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

function TodoContainer({ todos, allTodos, currentFilter, toggleTodo, deleteTodo }) {
  const getEmptyMessage = () => {
    if (currentFilter === 'active' && allTodos.length > 0) {
      return "🎉 No active tasks! You're all caught up!";
    } else if (currentFilter === 'completed') {
      return "No completed tasks yet. Keep going! 💪";
    }
    return "Start by adding your first task above!";
  };

  if (todos.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          {getEmptyMessage()}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoContainer;