import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ score, label }) => {
  const circleRadius = 45; // Radius for the circle
  const circumference = 2 * Math.PI * circleRadius; // Circle's circumference
  const offset = circumference - (score / 100) * circumference; // Offset for score

  // Function to determine color based on score
  const getScoreColor = (score) => {
    if (score <= 30) return '#ff4d4d'; // Red
    if (score <= 70) return `rgb(${255 - (score - 30) * 5.5}, 204, 0)`; // Transition from red to yellow
    return `rgb(${102 - (score - 70) * 1.5}, 204, ${102 - (score - 70) * 2})`; // Transition from yellow to green
  };

  return (
    <div className="progress-circle">
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke="#e0e0e0"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={getScoreColor(score)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="progress-text">
        <span>{score}%</span>
        <small>{label}</small>
      </div>
    </div>
  );
};

export default ProgressCircle;
