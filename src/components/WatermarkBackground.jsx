import React from 'react';

export const WatermarkBackground = () => {
  return (
    <div className="watermark-container" aria-hidden="true">
      {/* Flight trajectory dashed line & airplane top right */}
      <svg className="watermark-flight" viewBox="0 0 300 200" fill="none">
        <path
          d="M20 180 C 120 160, 180 80, 260 40"
          stroke="#b8b2a8"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        {/* Airplane */}
        <g transform="translate(255, 30) rotate(18) scale(0.75)" opacity="0.4">
          <path
            d="M22 16.5L13.5 11V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V11L2 16.5V19L10.5 16.5V22L8.5 23.5V25L12 24L15.5 25V23.5L13.5 22V16.5L22 19V16.5Z"
            fill="#a39b8f"
          />
        </g>
      </svg>

      {/* Bottom right circular vintage passport stamp */}
      <svg className="watermark-stamp" viewBox="0 0 160 160" fill="none">
        <g transform="rotate(-15 80 80)" opacity="0.25">
          <circle cx="80" cy="80" r="70" stroke="#9a8e7e" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="62" stroke="#9a8e7e" strokeWidth="1.2" />
          <circle cx="80" cy="80" r="42" stroke="#9a8e7e" strokeWidth="1" />
          <path
            id="stampCurve"
            d="M 30,80 A 50,50 0 0,1 130,80"
            fill="none"
          />
          <text fill="#8c8070" fontSize="9" fontWeight="bold" letterSpacing="3">
            <textPath href="#stampCurve" startOffset="50%" textAnchor="middle">
              GLOBETROTTER &bull; PASSPORT
            </textPath>
          </text>
          <path
            d="M62 76 L80 60 L98 76 L80 92 Z"
            fill="none"
            stroke="#9a8e7e"
            strokeWidth="1.5"
          />
          <text x="80" y="83" fill="#8c8070" fontSize="8" fontWeight="bold" textAnchor="middle">
            VERIFIED
          </text>
          <text x="80" y="112" fill="#8c8070" fontSize="7" fontWeight="bold" letterSpacing="1" textAnchor="middle">
            OFFICIAL ENTRY
          </text>
        </g>
      </svg>
    </div>
  );
};
