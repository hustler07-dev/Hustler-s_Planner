import React from 'react'

function FilterContainer({ currentFilter, filterTodos }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  const handleFilterClick = (filterKey) => {
    filterTodos(filterKey);
  };

  return (
    <div className="filter-container">
      {filters.map(filter => (
        <button 
          key={filter.key}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterContainer;