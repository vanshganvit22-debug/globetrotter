import React from 'react';
import { Logo } from './Logo';
import { LogOut, MapPin, Compass, Calendar, Award, Sparkles, Plane } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Dashboard = ({ user, onLogout }) => {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log('Signed out');
    }
    if (onLogout) onLogout();
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Traveler';

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dashboard-header">
        <Logo />
        <div className="user-profile-bar">
          <div className="user-avatar-badge">
            <span className="avatar-initial">{displayName.charAt(0).toUpperCase()}</span>
            <div className="user-meta">
              <span className="user-greeting">Welcome,</span>
              <span className="user-name">{displayName}</span>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn-logout" title="Log Out">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-overlay"></div>
        <div className="dashboard-hero-content">
          <div className="trip-tag">
            <Sparkles className="w-4 h-4 text-[#e2c382]" />
            <span>Curated Destination</span>
          </div>
          <h1 className="dashboard-hero-title">Tuscany, Italy</h1>
          <p className="dashboard-hero-desc">
            Your personalized itinerary is ready. Explore sun-drenched vineyards, historical castles, and private wine tastings.
          </p>
          <div className="dashboard-stats">
            <div className="stat-pill">
              <Compass className="w-4 h-4 text-[#caa560]" />
              <span>4 Days &bull; 3 Nights</span>
            </div>
            <div className="stat-pill">
              <MapPin className="w-4 h-4 text-[#caa560]" />
              <span>Val d'Orcia & Florence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <section className="destinations-section">
        <div className="section-head">
          <h2 className="section-title">Explore Next Adventures</h2>
          <p className="section-subtitle">Handpicked escapes based on your preferences</p>
        </div>

        <div className="cards-grid">
          <div className="dest-card">
            <div className="dest-img dest-1">
              <span className="dest-badge">Trending</span>
            </div>
            <div className="dest-info">
              <h3>Santorini, Greece</h3>
              <p>Cliffside villas & Aegean sunsets</p>
              <div className="dest-foot">
                <span className="price">from $1,250</span>
                <button className="dest-btn">View Itinerary</button>
              </div>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-img dest-2">
              <span className="dest-badge">Featured</span>
            </div>
            <div className="dest-info">
              <h3>Kyoto, Japan</h3>
              <p>Ancient temples & bamboo groves</p>
              <div className="dest-foot">
                <span className="price">from $1,890</span>
                <button className="dest-btn">View Itinerary</button>
              </div>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-img dest-3">
              <span className="dest-badge">Adventure</span>
            </div>
            <div className="dest-info">
              <h3>Banff, Canada</h3>
              <p>Glacial lakes & Rocky Mountain peaks</p>
              <div className="dest-foot">
                <span className="price">from $980</span>
                <button className="dest-btn">View Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
