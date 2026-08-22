import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { AuthCard } from '../components/AuthCard';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { WatermarkBackground } from '../components/WatermarkBackground';
import { Globe2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const { setUser, navigateTo } = useApp();

  const handleAuthSuccess = (authedUser) => {
    setUser((prev) => ({
      ...prev,
      email: authedUser.email,
      name: authedUser.user_metadata?.full_name || authedUser.email.split('@')[0]
    }));
    navigateTo('dashboard');
  };

  return (
    <div className="auth-page-container">
      {/* LEFT HERO PANE */}
      <div className="hero-pane">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>

        <div className="hero-header">
          <Logo />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            {mode === 'login' && 'Welcome Back!'}
            {mode === 'register' && 'Begin Your Journey!'}
            {mode === 'forgot' && 'Reset Access'}
          </h1>
          <p className="hero-subtitle">
            {mode === 'login' &&
              'Sign in to continue your journey and explore the world with GlobeTrotter.'}
            {mode === 'register' &&
              'Create an account to unlock tailored itineraries, secret spots, and wanderlust adventures.'}
            {mode === 'forgot' &&
              'Enter your email address and we will help you get back to exploring the globe.'}
          </p>
        </div>

        <div className="hero-footer-badge">
          <div className="badge-glass-pill">
            <div className="badge-icon-wrap">
              <Globe2 className="w-5 h-5 text-[#caa560]" />
            </div>
            <div className="badge-text-wrap">
              <span className="badge-main-text">
                {mode === 'login' ? 'Your next adventure' : 'Over 500k+ travelers'}
              </span>
              <span className="badge-sub-text">
                {mode === 'login' ? 'is just a sign in away.' : 'exploring worldwide.'}
              </span>
            </div>
          </div>
        </div>

        {/* S-Curve Divider */}
        <div className="curved-divider" aria-hidden="true">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="curved-divider-svg">
            <path
              d="M 100 0 C 15 250, 85 450, 10 700 C -35 860, 20 950, 100 1000 L 100 0 Z"
              fill="#f8f6f2"
            />
          </svg>
        </div>
      </div>

      {/* RIGHT FORM PANE */}
      <div className="form-pane">
        <WatermarkBackground />
        <div className="mobile-logo-bar">
          <Logo />
        </div>
        <main className="form-pane-main">
          <AuthCard
            mode={mode}
            setMode={setMode}
            onAuthSuccess={handleAuthSuccess}
          />
          <FeatureHighlights />
        </main>
      </div>
    </div>
  );
};
