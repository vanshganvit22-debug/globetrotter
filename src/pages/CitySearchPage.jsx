import React, { useState } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Compass,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/cards/DestinationCard';
import { DestinationCardSkeleton } from '../components/ui/Skeleton';

export const CitySearchPage = () => {
  const { mockDestinations, isPageLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  const regions = ['All', 'Europe', 'Asia', 'North America', 'Africa', 'Oceania'];
  const costFilters = ['All', '$', '$$', '$$$', '$$$$'];
  const styleFilters = ['All', 'Culture', 'Adventure', 'Romantic', 'Wellness', 'Nature'];

  const filteredDestinations = mockDestinations.filter((dest) => {
    // Search
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      dest.city.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      dest.description.toLowerCase().includes(q);

    // Region
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;

    // Cost
    const matchesCost = selectedCost === 'All' || dest.costIndex === selectedCost;

    // Style
    const matchesStyle =
      selectedStyle === 'All' || dest.tags?.some((t) => t.toLowerCase() === selectedStyle.toLowerCase());

    return matchesSearch && matchesRegion && matchesCost && matchesStyle;
  });

  return (
    <div className="page-container city-search-page">
      {/* Header */}
      <div className="search-page-header">
        <span className="section-eyebrow">Destination Catalog</span>
        <h1 className="section-heading">Explore World Destinations</h1>
        <p className="section-subtitle">
          Discover handpicked cities, coastal escapes, and cultural landmarks to add to your custom itinerary.
        </p>

        {/* Big Search Input */}
        <div className="big-search-box">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by city, country, or keyword (e.g. Florence, Greece, Temples)..."
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

      {/* Filter Chips Bar */}
      <div className="search-filters-bar">
        {/* Region Filter */}
        <div className="filter-group-row">
          <span className="filter-group-label">Region:</span>
          <div className="filter-chips-list">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`filter-chip ${selectedRegion === reg ? 'active' : ''}`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Cost & Style Filters */}
        <div className="filter-group-row-secondary">
          <div className="filter-inline">
            <span className="filter-group-label">Budget:</span>
            <div className="filter-chips-list">
              {costFilters.map((cost) => (
                <button
                  key={cost}
                  onClick={() => setSelectedCost(cost)}
                  className={`filter-chip-sm ${selectedCost === cost ? 'active' : ''}`}
                >
                  {cost}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-inline">
            <span className="filter-group-label">Travel Style:</span>
            <div className="filter-chips-list">
              {styleFilters.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`filter-chip-sm ${selectedStyle === style ? 'active' : ''}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="search-results-info">
        <span>Showing {filteredDestinations.length} curated destinations</span>
      </div>

      {/* Destinations Grid */}
      {isPageLoading ? (
        <div className="cards-responsive-grid">
          <DestinationCardSkeleton />
          <DestinationCardSkeleton />
          <DestinationCardSkeleton />
          <DestinationCardSkeleton />
        </div>
      ) : filteredDestinations.length > 0 ? (
        <div className="cards-responsive-grid">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <Compass className="w-10 h-10 text-[#caa560]" />
          <h3 className="empty-title">No destinations match your filters</h3>
          <p className="empty-desc">Try clearing some filter tags or search with different keywords.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('All');
              setSelectedCost('All');
              setSelectedStyle('All');
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
