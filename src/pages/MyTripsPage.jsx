import React, { useState } from 'react';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Compass,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TripCard } from '../components/cards/TripCard';
import { TripCardSkeleton } from '../components/ui/Skeleton';

export const MyTripsPage = () => {
  const { trips, navigateTo, isPageLoading } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ongoing' | 'upcoming' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'budget' | 'duration'

  // Filter by tab
  const tabFiltered = trips.filter((trip) => {
    if (activeTab === 'all') return true;
    return trip.status === activeTab;
  });

  // Filter by search
  const searchFiltered = tabFiltered.filter((trip) => {
    const q = searchQuery.toLowerCase();
    return (
      trip.title.toLowerCase().includes(q) ||
      trip.destination.toLowerCase().includes(q) ||
      trip.description?.toLowerCase().includes(q)
    );
  });

  // Sort
  const sortedTrips = [...searchFiltered].sort((a, b) => {
    if (sortBy === 'budget') return (b.budget || 0) - (a.budget || 0);
    if (sortBy === 'duration') return (b.days || 0) - (a.days || 0);
    return new Date(a.startDate) - new Date(b.startDate);
  });

  const ongoingCount = trips.filter((t) => t.status === 'ongoing').length;
  const upcomingCount = trips.filter((t) => t.status === 'upcoming').length;
  const completedCount = trips.filter((t) => t.status === 'completed').length;

  return (
    <div className="page-container my-trips-view">
      {/* Header */}
      <div className="my-trips-header">
        <div>
          <span className="section-eyebrow">Travel Vault</span>
          <h1 className="section-heading">My Curated Journeys</h1>
          <p className="section-subtitle">
            Manage your ongoing itineraries, upcoming escapes, and past travel memories.
          </p>
        </div>
        <button
          onClick={() => navigateTo('create-trip')}
          className="btn-primary-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Control Bar: Tabs & Search/Sort */}
      <div className="trips-controls-bar">
        {/* Tabs */}
        <div className="trips-tab-group">
          <button
            onClick={() => setActiveTab('all')}
            className={`trip-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            <span>All Journeys</span>
            <span className="tab-count">{trips.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`trip-tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
          >
            <span>Ongoing</span>
            <span className="tab-count">{ongoingCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`trip-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          >
            <span>Upcoming</span>
            <span className="tab-count">{upcomingCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`trip-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          >
            <span>Completed</span>
            <span className="tab-count">{completedCount}</span>
          </button>
        </div>

        {/* Search & Sort Filters */}
        <div className="trips-filters-group">
          <div className="search-pill-wrapper">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by city or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-pill-input"
            />
          </div>

          <div className="sort-select-wrapper">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="budget">Sort by Budget</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trips Grid / Skeletons / Empty State */}
      {isPageLoading ? (
        <div className="cards-responsive-grid">
          <TripCardSkeleton />
          <TripCardSkeleton />
          <TripCardSkeleton />
        </div>
      ) : sortedTrips.length > 0 ? (
        <div className="cards-responsive-grid">
          {sortedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state-card">
          <div className="empty-icon-wrap">
            <Compass className="w-10 h-10 text-[#caa560]" />
          </div>
          <h3 className="empty-title">No matching journeys found</h3>
          <p className="empty-desc">
            {searchQuery
              ? `We couldn't find any trips matching "${searchQuery}". Try a different keyword.`
              : 'Your next great adventure starts here. Plan a custom trip with tailored itineraries.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
              navigateTo('create-trip');
            }}
            className="btn-primary-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Your First Trip</span>
          </button>
        </div>
      )}
    </div>
  );
};
