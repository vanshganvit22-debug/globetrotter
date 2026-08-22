import React, { useState } from 'react';
import {
  User,
  Mail,
  Globe,
  DollarSign,
  Plane,
  Bookmark,
  Shield,
  Bell,
  Lock,
  Trash2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/cards/DestinationCard';

export const ProfilePage = () => {
  const { user, setUser, savedDestinations, mockDestinations, showToast, openModal } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alexander Wright',
    email: user?.email || 'alexander.wright@globetrotter.io',
    currency: user?.currency || 'USD ($)',
    language: user?.language || 'English (US)',
    homeAirport: user?.homeAirport || 'JFK - New York',
  });

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'saved' | 'security'

  const savedList = mockDestinations.filter((d) => savedDestinations.includes(d.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      ...formData
    }));
    showToast('Profile and preferences updated successfully!');
  };

  const handleDeleteAccount = () => {
    openModal({
      title: 'Delete Account',
      content: 'Are you sure you want to delete your GlobeTrotter account? This will permanently erase all created trips, saved itineraries, and preferences.',
      confirmText: 'Delete Forever',
      cancelText: 'Cancel',
      isDanger: true,
      onConfirm: () => {
        showToast('Account marked for deletion.', 'info');
      }
    });
  };

  return (
    <div className="page-container profile-page">
      {/* Header Profile Bar */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
            alt="Profile Avatar"
            className="profile-avatar-large"
          />
          <span className="profile-badge-pill">Explorer Level 4</span>
        </div>
        <div className="profile-hero-details">
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-email">{user?.email}</p>
          <div className="profile-tags-row">
            <span className="pref-tag-badge">Home: {user?.homeAirport || 'JFK'}</span>
            <span className="pref-tag-badge">Currency: {user?.currency || 'USD'}</span>
            <span className="pref-tag-badge">{savedDestinations.length} Bucket List Places</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs-bar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>General Preferences</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Bucket List ({savedList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
        >
          <Shield className="w-4 h-4" />
          <span>Security & Privacy</span>
        </button>
      </div>

      {/* Tab 1: General Preferences Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="profile-settings-card">
          <h3 className="section-heading-sm mb-4">Personal & Travel Preferences</h3>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <User className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Mail className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Preferred Currency</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                </span>
                <select
                  className="form-input"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Language</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Globe className="w-4 h-4 text-slate-400" />
                </span>
                <select
                  className="form-input"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="English (US)">English (US)</option>
                  <option value="French (FR)">Français</option>
                  <option value="Spanish (ES)">Español</option>
                  <option value="Italian (IT)">Italiano</option>
                  <option value="Japanese (JP)">日本語</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Home Departure Hub</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Plane className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  className="form-input"
                  value={formData.homeAirport}
                  onChange={(e) => setFormData({ ...formData, homeAirport: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn-primary">
              <Check className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Saved Destinations */}
      {activeTab === 'saved' && (
        <div className="saved-destinations-wrap">
          {savedList.length > 0 ? (
            <div className="cards-responsive-grid">
              {savedList.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <Bookmark className="w-8 h-8 text-[#caa560] mb-2" />
              <h3 className="empty-title">No Saved Places Yet</h3>
              <p className="empty-desc">Discover destinations in City Explore and save them to your bucket list.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Security & Danger Zone */}
      {activeTab === 'security' && (
        <div className="profile-settings-card">
          <h3 className="section-heading-sm mb-4">Security & Authentication</h3>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input type="password" placeholder="••••••••" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" placeholder="••••••••" className="form-input" />
            </div>
          </div>

          <div className="mt-4 mb-6">
            <button
              type="button"
              onClick={() => showToast('Password updated securely!')}
              className="btn-outline-navy"
            >
              Update Password
            </button>
          </div>

          <div className="danger-zone-box">
            <div>
              <h4 className="danger-title">Delete GlobeTrotter Account</h4>
              <p className="danger-desc">
                Permanently delete all trips, custom itineraries, and saved landmarks.
              </p>
            </div>
            <button onClick={handleDeleteAccount} className="btn-modal-danger">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
