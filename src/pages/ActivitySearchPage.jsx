import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Compass,
  Star,
  Clock,
  DollarSign,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/cards/ActivityCard';

export const ActivitySearchPage = () => {
  const { mockActivities, isPageLoading, activeTrip } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCostRange, setSelectedCostRange] = useState('All');

  const categories = ['All', 'Culture', 'Food', 'Adventure', 'Sightseeing', 'Nature'];

  const filteredActivities = mockActivities.filter((act) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      act.title.toLowerCase().includes(q) ||
      act.city.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;

    const matchesCost =
      selectedCostRange === 'All' ||
      (selectedCostRange === 'Free' && act.cost === 0) ||
      (selectedCostRange === '< ₹1,000' && act.cost < 1000) ||
      (selectedCostRange === '₹1,000 - ₹3,000' && act.cost >= 1000 && act.cost <= 3000) ||
      (selectedCostRange === '₹3,000+' && act.cost > 3000);

    return matchesSearch && matchesCategory && matchesCost;
  });

  return (
    <div className="page-container activity-search-page">
      <div className="search-page-header">
        <span className="section-eyebrow">Experience Catalog</span>
        <h1 className="section-heading">Discover Tailored Activities</h1>
        <p className="section-subtitle">
          Browse private tours, culinary masterclasses, outdoor expeditions, and sacred heritage walks.
        </p>

        {/* Big Search Input */}
        <div className="big-search-box">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities (e.g. Taj Mahal VIP, Hot air balloon, Langar seva)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="big-search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search-btn">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="search-filters-bar">
        <div className="filter-group-row">
          <span className="filter-group-label">Category:</span>
          <div className="filter-chips-list">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group-row-secondary">
          <div className="filter-inline">
            <span className="filter-group-label">Cost:</span>
            <div className="filter-chips-list">
              {['All', 'Free', '< ₹1,000', '₹1,000 - ₹3,000', '₹3,000+'].map((cost) => (
                <button
                  key={cost}
                  onClick={() => setSelectedCostRange(cost)}
                  className={`filter-chip-sm ${selectedCostRange === cost ? 'active' : ''}`}
                >
                  {cost}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="search-results-info">
        <span>Showing {filteredActivities.length} handpicked activities &bull; Target Trip: <strong>{activeTrip?.title}</strong></span>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="activities-responsive-grid">
          {filteredActivities.map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <Compass className="w-10 h-10 text-[#caa560]" />
          <h3 className="empty-title">No activities found</h3>
          <p className="empty-desc">Try searching for other experiences or reset your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedCostRange('All');
            }}
            className="btn-outline-gold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
