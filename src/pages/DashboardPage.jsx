import React from 'react';
import {
  Plus,
  Compass,
  Calendar as CalendarIcon,
  Map,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TripCard } from '../components/cards/TripCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { TripCardSkeleton, DestinationCardSkeleton } from '../components/ui/Skeleton';

export const DashboardPage = () => {
  const { user, trips, activeTrip, navigateTo, isPageLoading, mockDestinations } = useApp();

  const totalPlannedBudget = trips.reduce((acc, t) => acc + (t.budget || 0), 0);
  const totalSpent = trips.reduce((acc, t) => acc + (t.spent || 0), 0);
  const remainingBudget = Math.max(0, totalPlannedBudget - totalSpent);
  const budgetRatio = totalPlannedBudget > 0 ? Math.round((totalSpent / totalPlannedBudget) * 100) : 0;

  return (
    <div className="page-container dashboard-view">
      {/* Header Greeting */}
      <section className="dashboard-hero-greeting">
        <div className="greeting-text-wrap">
          <span className="greeting-badge">
            <Sparkles className="w-4 h-4 text-[#caa560]" />
            <span>Curated Travel Concierge</span>
          </span>
          <h1 className="greeting-title">Good morning, {user?.name?.split(' ')[0] || 'Traveler'}</h1>
          <p className="greeting-subtitle">Ready to plan your next wanderlust adventure?</p>
        </div>

        {/* Quick Action Grid */}
        <div className="quick-actions-bar">
          <button
            onClick={() => navigateTo('create-trip')}
            className="btn-quick-action primary-action"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
          <button
            onClick={() => navigateTo('my-trips')}
            className="btn-quick-action"
          >
            <Map className="w-4 h-4 text-[#b08a3e]" />
            <span>My Trips ({trips.length})</span>
          </button>
          <button
            onClick={() => navigateTo('city-search')}
            className="btn-quick-action"
          >
            <Compass className="w-4 h-4 text-[#b08a3e]" />
            <span>Explore Cities</span>
          </button>
          <button
            onClick={() => navigateTo('calendar')}
            className="btn-quick-action"
          >
            <CalendarIcon className="w-4 h-4 text-[#b08a3e]" />
            <span>View Calendar</span>
          </button>
        </div>
      </section>

      {/* Featured Active Itinerary Banner */}
      {activeTrip && (
        <section className="featured-trip-banner">
          <div className="banner-bg" style={{ backgroundImage: `url(${activeTrip.coverImage})` }}></div>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <div className="banner-top-tag">
              <span className="badge-featured">Active Itinerary</span>
              <span className="badge-days">{activeTrip.days} Days &bull; {activeTrip.destinationsCount || 1} Destinations</span>
            </div>
            <h2 className="banner-title">{activeTrip.title}</h2>
            <p className="banner-desc">{activeTrip.description}</p>
            <div className="banner-meta-row">
              <div className="meta-pill">
                <MapPin className="w-4 h-4 text-[#caa560]" />
                <span>{activeTrip.destination}</span>
              </div>
              <div className="meta-pill">
                <DollarSign className="w-4 h-4 text-[#caa560]" />
                <span>${activeTrip.spent?.toLocaleString()} of ${activeTrip.budget?.toLocaleString()} Budget</span>
              </div>
            </div>
            <div className="banner-actions">
              <button
                onClick={() => navigateTo('itinerary-view', activeTrip.id)}
                className="btn-banner-primary"
              >
                <span>View Full Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('itinerary-builder', activeTrip.id)}
                className="btn-banner-secondary"
              >
                <span>Edit Stops & Activities</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2-Column Stats & Budget Row */}
      <section className="dashboard-grid-section">
        {/* Budget Highlight Card */}
        <div className="dash-budget-card">
          <div className="card-header-flex">
            <div>
              <span className="section-eyebrow">Financial Overview</span>
              <h3 className="section-heading-sm">Travel Budget Status</h3>
            </div>
            <button onClick={() => navigateTo('budget')} className="link-text-gold">
              Breakdown &rarr;
            </button>
          </div>

          <div className="budget-numbers-grid">
            <div className="budget-stat-item">
              <span className="stat-label">Total Planned</span>
              <span className="stat-value">${totalPlannedBudget.toLocaleString()}</span>
            </div>
            <div className="budget-stat-item">
              <span className="stat-label">Amount Spent</span>
              <span className="stat-value text-navy">${totalSpent.toLocaleString()}</span>
            </div>
            <div className="budget-stat-item">
              <span className="stat-label">Remaining</span>
              <span className="stat-value text-gold">${remainingBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="budget-meter-container">
            <div className="meter-label-row">
              <span>Overall Utilization</span>
              <span className="font-semibold">{budgetRatio}%</span>
            </div>
            <div className="progress-track-lg">
              <div
                className="progress-fill-lg"
                style={{ width: `${Math.min(100, budgetRatio)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Travel Quick Stats */}
        <div className="dash-stats-card">
          <div className="card-header-flex">
            <div>
              <span className="section-eyebrow">Your Milestones</span>
              <h3 className="section-heading-sm">Explorer Passport</h3>
            </div>
          </div>
          <div className="passport-stats-grid">
            <div className="passport-box">
              <span className="passport-num">{trips.length}</span>
              <span className="passport-lbl">Trips Created</span>
            </div>
            <div className="passport-box">
              <span className="passport-num">8</span>
              <span className="passport-lbl">Cities Explored</span>
            </div>
            <div className="passport-box">
              <span className="passport-num">24</span>
              <span className="passport-lbl">Curated Stops</span>
            </div>
            <div className="passport-box">
              <span className="passport-num">4.9</span>
              <span className="passport-lbl">Avg Trip Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming & Ongoing Trips Section */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Upcoming Adventures</span>
            <h2 className="section-heading">My Planned Journeys</h2>
          </div>
          <button onClick={() => navigateTo('my-trips')} className="btn-outline-gold">
            <span>View All Trips</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isPageLoading ? (
          <div className="cards-responsive-grid">
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </div>
        ) : (
          <div className="cards-responsive-grid">
            {trips.slice(0, 3).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </section>

      {/* Recommended Destinations */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Handpicked For You</span>
            <h2 className="section-heading">Trending Destinations</h2>
          </div>
          <button onClick={() => navigateTo('city-search')} className="btn-outline-gold">
            <span>Explore All Cities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isPageLoading ? (
          <div className="cards-responsive-grid">
            <DestinationCardSkeleton />
            <DestinationCardSkeleton />
            <DestinationCardSkeleton />
          </div>
        ) : (
          <div className="cards-responsive-grid">
            {mockDestinations.slice(0, 3).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
