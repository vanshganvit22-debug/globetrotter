import React from 'react';
import { Shield, Globe, Heart } from 'lucide-react';

export const FeatureHighlights = () => {
  const features = [
    {
      icon: <Shield className="w-4 h-4 text-[#8a6b32]" />,
      title: 'Secure & Safe',
      subtitle: 'Your data is protected',
    },
    {
      icon: <Globe className="w-4 h-4 text-[#8a6b32]" />,
      title: 'Personalized Trips',
      subtitle: 'Tailored just for you',
    },
    {
      icon: <Heart className="w-4 h-4 text-[#8a6b32]" />,
      title: 'Explore More',
      subtitle: 'Discover new places',
    },
  ];

  return (
    <div className="feature-highlights-container">
      {features.map((feat, idx) => (
        <div key={idx} className="feature-pill">
          <div className="feature-icon-circle">
            {feat.icon}
          </div>
          <div className="feature-text-block">
            <span className="feature-title">{feat.title}</span>
            <span className="feature-sub">{feat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

