import React from 'react';
import {
  Compass,
  Map,
  PlusCircle,
  Calendar,
  DollarSign,
  Search,
  Sparkles,
  Users,
  User,
  Shield,
  Layers,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { currentScreen, navigateTo, activeTrip } = useApp();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'my-trips', label: 'My Trips', icon: Map },
    { id: 'create-trip', label: 'Plan New Trip', icon: PlusCircle },
    { id: 'city-search', label: 'Explore Cities', icon: Search },
    { id: 'activity-search', label: 'Activities', icon: Sparkles },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const tripNavItems = [
    { id: 'itinerary-view', label: 'Itinerary View', icon: Layers },
    { id: 'itinerary-builder', label: 'Trip Builder', icon: PlusCircle },
    { id: 'budget', label: 'Budget & Costs', icon: DollarSign },
    { id: 'calendar', label: 'Calendar & Timeline', icon: Calendar },
    { id: 'public-itinerary', label: 'Share Story', icon: Share2 },
  ];

  const settingsNavItems = [
    { id: 'profile', label: 'Profile & Settings', icon: User },
    { id: 'admin', label: 'Admin Panel', icon: Shield },
  ];

  return (
    <aside className="app-sidebar">
      {/* Active Trip Context Chip */}
      {activeTrip && (
        <div className="sidebar-trip-badge" onClick={() => navigateTo('itinerary-view')}>
          <div className="trip-badge-dot"></div>
          <div className="trip-badge-text">
            <span className="badge-label">Active Itinerary</span>
            <span className="badge-trip-name">{activeTrip.title}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="sidebar-section">
        <span className="sidebar-section-title">Navigation</span>
        <nav className="sidebar-nav">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 nav-icon" />
                <span>{item.label}</span>
                {isActive && <div className="active-pill-indicator"></div>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Trip Tools */}
      <div className="sidebar-section">
        <span className="sidebar-section-title">Trip Management</span>
        <nav className="sidebar-nav">
          {tripNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 nav-icon" />
                <span>{item.label}</span>
                {isActive && <div className="active-pill-indicator"></div>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Account & Administration */}
      <div className="sidebar-section sidebar-bottom-section">
        <span className="sidebar-section-title">Account</span>
        <nav className="sidebar-nav">
          {settingsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 nav-icon" />
                <span>{item.label}</span>
                {isActive && <div className="active-pill-indicator"></div>}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
