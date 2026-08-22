import React from 'react';

export const TravelIllustration = () => {
  return (
    <div className="illustration-wrapper">
      <svg
        className="travel-hero-svg"
        viewBox="0 0 200 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3ede2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e5dcce" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id="suitcaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#756447" />
            <stop offset="100%" stopColor="#4f412c" />
          </linearGradient>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a38965" />
            <stop offset="100%" stopColor="#796342" />
          </linearGradient>
          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d3120" />
            <stop offset="100%" stopColor="#291f13" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1e1810" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Faint Background Globe */}
        <circle cx="100" cy="65" r="48" fill="url(#globeGrad)" />
        
        {/* Globe continent outlines */}
        <path
          d="M72 45 C78 40, 85 43, 90 48 C94 52, 92 58, 86 60 C80 62, 73 55, 72 45 Z"
          fill="#d8cca9"
          opacity="0.6"
        />
        <path
          d="M105 38 C115 35, 125 40, 130 50 C125 58, 118 60, 110 55 C104 50, 100 42, 105 38 Z"
          fill="#d8cca9"
          opacity="0.6"
        />
        <path
          d="M80 75 C85 70, 95 72, 100 78 C95 85, 86 86, 80 80 Z"
          fill="#d8cca9"
          opacity="0.6"
        />

        {/* Floating Clouds */}
        {/* Left Cloud */}
        <g opacity="0.85">
          <path
            d="M48 64 C48 60, 52 57, 56 57 C58 53, 63 52, 67 55 C70 53, 75 55, 76 59 C79 59, 81 62, 80 65 C80 68, 77 70, 74 70 L52 70 C49 70, 48 67, 48 64 Z"
            fill="#b0bcc7"
            opacity="0.75"
          />
        </g>
        
        {/* Right Cloud */}
        <g opacity="0.85">
          <path
            d="M135 66 C135 62, 138 60, 142 60 C143 56, 148 55, 152 57 C154 55, 159 56, 160 60 C163 60, 165 63, 164 66 C164 69, 161 71, 158 71 L139 71 C136 71, 135 68, 135 66 Z"
            fill="#b8c3cd"
            opacity="0.75"
          />
        </g>

        {/* Vintage Suitcase */}
        <g filter="url(#softShadow)">
          {/* Suitcase Body */}
          <rect x="80" y="44" width="40" height="52" rx="4" fill="url(#suitcaseGrad)" stroke="#3f3220" strokeWidth="1" />
          
          {/* Suitcase Handle */}
          <path
            d="M93 44 L93 37 C93 35, 107 35, 107 37 L107 44"
            fill="none"
            stroke="#2e2315"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="91" y="42" width="4" height="3" rx="1" fill="#c49b55" />
          <rect x="105" y="42" width="4" height="3" rx="1" fill="#c49b55" />

          {/* Suitcase Straps */}
          <rect x="87" y="44" width="4" height="52" fill="url(#strapGrad)" />
          <rect x="109" y="44" width="4" height="52" fill="url(#strapGrad)" />

          {/* Brass buckles */}
          <rect x="86.5" y="58" width="5" height="4" rx="1" fill="#d4af37" />
          <rect x="108.5" y="58" width="5" height="4" rx="1" fill="#d4af37" />
          <rect x="86.5" y="78" width="5" height="4" rx="1" fill="#d4af37" />
          <rect x="108.5" y="78" width="5" height="4" rx="1" fill="#d4af37" />

          {/* Brass Corner Protectors */}
          <path d="M80 48 L80 44 L84 44" fill="none" stroke="#d4af37" strokeWidth="2" />
          <path d="M120 48 L120 44 L116 44" fill="none" stroke="#d4af37" strokeWidth="2" />
          <path d="M80 92 L80 96 L84 96" fill="none" stroke="#d4af37" strokeWidth="2" />
          <path d="M120 92 L120 96 L116 96" fill="none" stroke="#d4af37" strokeWidth="2" />
          
          {/* Subtle luggage seam */}
          <line x1="80" y1="70" x2="120" y2="70" stroke="#332717" strokeWidth="1" strokeDasharray="2,2" />
        </g>

        {/* Traveler Fedora / Safari Hat */}
        <g filter="url(#softShadow)">
          {/* Hat Crown */}
          <path
            d="M120 94 C118 84, 134 82, 138 94 Z"
            fill="url(#hatGrad)"
            stroke="#5c482f"
            strokeWidth="0.8"
          />
          {/* Hat Band */}
          <path
            d="M121 91 C125 90, 133 90, 137 91 L137 93 C133 92, 125 92, 121 93 Z"
            fill="#2c2114"
          />
          {/* Hat Brim */}
          <ellipse cx="129" cy="95" rx="16" ry="4" fill="url(#hatGrad)" stroke="#5c482f" strokeWidth="0.8" />
        </g>
        
        {/* Ground shadow */}
        <ellipse cx="104" cy="98" rx="38" ry="3" fill="#1f180d" opacity="0.15" />
      </svg>
    </div>
  );
};
