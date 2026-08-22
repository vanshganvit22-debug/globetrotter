import React, { useState } from 'react';
import { Logo } from '../Logo';
import { Search, Bell, Plus, Compass, LogOut, Shield, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { user, navigateTo, currentScreen, globalSearch, setGlobalSearch } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Your Tuscany Itinerary has been saved.', time: '10m ago' },
    { id: 2, text: 'Elena liked your travel recommendation.', time: '2h ago' },
    { id: 3, text: 'Kyoto autumn leaves forecast updated.', time: '1d ago' },
  ];

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <div onClick={() => navigateTo('dashboard')} className="navbar-logo-btn">
          <Logo />
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="navbar-search">
        <Search className="w-4 h-4 search-icon" />
        <input
          type="text"
          placeholder="Search destinations, trips, activities..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          className="search-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigateTo('city-search');
            }
          }}
        />
      </div>

      {/* Right Action Icons & Profile */}
      <div className="navbar-right">
        <button
          onClick={() => navigateTo('create-trip')}
          className="btn-nav-action"
        >
          <Plus className="w-4 h-4" />
          <span>New Trip</span>
        </button>

        {/* Notifications */}
        <div className="relative-wrap">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="icon-circle-btn"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="notif-dot"></span>
          </button>

          {notificationsOpen && (
            <div className="dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-title">Notifications</span>
                <span className="badge-sm">3 New</span>
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <span className="notif-text">{n.text}</span>
                    <span className="notif-time">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative-wrap">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="user-profile-trigger"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user?.name}
              className="user-avatar-img"
            />
            <div className="user-info-text">
              <span className="user-display-name">{user?.name || 'Traveler'}</span>
              <span className="user-role-badge">Explorer</span>
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="dropdown-menu profile-dropdown">
              <div className="dropdown-user-header">
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigateTo('profile');
                }}
                className="dropdown-item"
              >
                <UserIcon className="w-4 h-4" />
                <span>My Profile & Settings</span>
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigateTo('admin');
                }}
                className="dropdown-item"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
              <div className="dropdown-divider"></div>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigateTo('auth');
                }}
                className="dropdown-item dropdown-logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
