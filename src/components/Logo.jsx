import React from 'react';

export const Logo = ({ light = false, className = '' }) => {
  return (
    <div className={`brand-logo-container ${className}`}>
      {/* Golden Compass Rose Icon */}
      <svg
        className="brand-compass-icon"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="#c09a56" strokeWidth="1.5" strokeDasharray="1.5 2" />
        <circle cx="20" cy="20" r="15" stroke="#b88f48" strokeWidth="1.2" />
        
        {/* Main 4 Compass Points */}
        <polygon points="20,4 23,17 20,20 17,17" fill="#caa560" />
        <polygon points="20,4 20,20 17,17" fill="#8c6a2d" />
        
        <polygon points="36,20 23,23 20,20 23,17" fill="#caa560" />
        <polygon points="36,20 20,20 23,17" fill="#8c6a2d" />

        <polygon points="20,36 17,23 20,20 23,23" fill="#caa560" />
        <polygon points="20,36 20,20 23,23" fill="#8c6a2d" />

        <polygon points="4,20 17,17 20,20 17,23" fill="#caa560" />
        <polygon points="4,20 20,20 17,23" fill="#8c6a2d" />

        {/* Secondary 4 Points */}
        <polygon points="31,9 22,18 20,20 20,20" fill="#caa560" opacity="0.85" />
        <polygon points="31,9 20,20 20,20 22,18" fill="#8c6a2d" opacity="0.85" />
        <polygon points="31,31 22,22 20,20 20,20" fill="#caa560" opacity="0.85" />
        <polygon points="31,31 20,20 20,20 22,22" fill="#8c6a2d" opacity="0.85" />
        <polygon points="9,31 18,22 20,20 20,20" fill="#caa560" opacity="0.85" />
        <polygon points="9,31 20,20 20,20 18,22" fill="#8c6a2d" opacity="0.85" />
        <polygon points="9,9 18,18 20,20 20,20" fill="#caa560" opacity="0.85" />
        <polygon points="9,9 20,20 20,20 18,18" fill="#8c6a2d" opacity="0.85" />

        {/* Center Pivot */}
        <circle cx="20" cy="20" r="2.8" fill="#ffffff" stroke="#caa560" strokeWidth="1.5" />
      </svg>
      
      <span className={`brand-name-text ${light ? 'text-white' : 'text-navy'}`}>
        GlobeTrotter
      </span>
    </div>
  );
};

