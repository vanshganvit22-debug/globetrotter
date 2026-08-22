import React from 'react';
import { ShieldCheck, Globe, Heart } from 'lucide-react';

export const FeatureHighlights = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#9e7a3f]" />,
      title: 'Secure & Safe',
      subtitle: 'Your data is protected',
    },
    {
      icon: <Globe className="w-5 h-5 text-[#9e7a3f]" />,
      title: 'Personalized Trips',
      subtitle: 'Tailored just for you',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#9e7a3f]" />,
      title: 'Explore More',
      subtitle: 'Discover new places',
    },
  ];

  return (
    <div className="features-row">
      {features.map((feat, idx) => (
        <div key={idx} className="feature-item">
          <div className="feature-icon-wrapper">
            {feat.icon}
          </div>
          <div className="feature-text">
            <span className="feature-title">{feat.title}</span>
            <span className="feature-subtitle">{feat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
