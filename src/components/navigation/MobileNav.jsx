import React from 'react';
import { Compass, Map, PlusCircle, Search, Users, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav = () => {
  const { currentScreen, navigateTo } = useApp();

  const mobileItems = [
    { id: 'dashboard', label: 'Home', icon: Compass },
    { id: 'my-trips', label: 'Trips', icon: Map },
    { id: 'create-trip', label: 'Plan', icon: PlusCircle },
    { id: 'city-search', label: 'Explore', icon: Search },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
          >
            <Icon className="w-5 h-5 mobile-icon" />
            <span className="mobile-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
