import React from 'react';
import { Star, Plus, Bookmark, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DestinationCard = ({ destination }) => {
  const { savedDestinations, toggleSaveDestination, addStopToActiveTrip, activeTrip } = useApp();
  const isSaved = savedDestinations.includes(destination.id);

  const handleAddCity = (e) => {
    e.stopPropagation();
    addStopToActiveTrip({
      city: destination.city,
      country: destination.country,
      arrivalDate: '2026-10-01',
      departureDate: '2026-10-04',
      image: destination.image,
      activities: []
    });
  };

  return (
    <div className="destination-card">
      <div className="dest-card-media">
        <img src={destination.image} alt={destination.city} className="dest-img-cover" />
        <div className="dest-media-overlay"></div>
        <div className="dest-top-badges">
          <span className="dest-cost-pill">{destination.costIndex} &bull; ${destination.avgDailyCost}/day</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveDestination(destination.id);
            }}
            className={`dest-save-btn ${isSaved ? 'saved' : ''}`}
            aria-label="Save to bucket list"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#caa560] text-[#caa560]' : 'text-white'}`} />
          </button>
        </div>
        <div className="dest-rating-pill">
          <Star className="w-3.5 h-3.5 fill-[#caa560] text-[#caa560]" />
          <span>{destination.rating}</span>
        </div>
      </div>

      <div className="dest-card-content">
        <div className="dest-title-row">
          <div>
            <h3 className="dest-name">{destination.city}</h3>
            <span className="dest-country">{destination.country}</span>
          </div>
          <span className="dest-popularity-badge">{destination.popularity}% match</span>
        </div>

        <p className="dest-description">{destination.description}</p>

        <div className="dest-tags-row">
          {destination.tags?.map((tag, idx) => (
            <span key={idx} className="dest-tag-pill">{tag}</span>
          ))}
        </div>

        <div className="dest-card-bottom">
          <div className="dest-season-info">
            <span className="season-label">Best Season</span>
            <span className="season-val">{destination.bestSeason}</span>
          </div>
          <button onClick={handleAddCity} className="btn-add-destination">
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
