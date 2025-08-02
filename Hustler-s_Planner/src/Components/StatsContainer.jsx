import React from 'react';

function StatItem({ number, label, isHighlighted }) {
  return (
    <div className={`stat-item ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function StatsContainer({ stats }) {
  const { total, active, completed, percentage } = stats;

  return (
    <div className="stats">
      <StatItem 
        number={total} 
        label="Total" 
        isHighlighted={total > 0}
      />
      <StatItem 
        number={active} 
        label="Active" 
        isHighlighted={active > 0}
      />
      <StatItem 
        number={completed} 
        label="Completed" 
        isHighlighted={completed > 0 && percentage === 100}
      />
    </div>
  );
}

export default StatsContainer;