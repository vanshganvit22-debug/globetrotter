import React from 'react';
import { Calendar, MapPin, DollarSign, ArrowRight, MoreVertical, Trash2, Edit3, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TripCard = ({ trip }) => {
  const { navigateTo, openModal, deleteTrip } = useApp();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return <span className="trip-status-badge status-ongoing">Ongoing</span>;
      case 'upcoming':
        return <span className="trip-status-badge status-upcoming">Upcoming</span>;
      case 'completed':
        return <span className="trip-status-badge status-completed">Completed</span>;
      default:
        return null;
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    openModal({
      title: 'Delete Trip',
      content: `Are you sure you want to delete "${trip.title}"? All associated itineraries and activities will be permanently removed.`,
      confirmText: 'Delete Trip',
      cancelText: 'Keep Trip',
      isDanger: true,
      onConfirm: () => deleteTrip(trip.id),
    });
  };

  const progressPercent = Math.min(100, Math.round(((trip.spent || 0) / (trip.budget || 1)) * 100));

  return (
    <div className="trip-card" onClick={() => navigateTo('itinerary-view', trip.id)}>
      {/* Cover Image Header */}
      <div className="trip-card-cover">
        <img src={trip.coverImage} alt={trip.title} className="trip-cover-img" />
        <div className="trip-card-overlay"></div>
        <div className="trip-card-top-tags">
          {getStatusBadge(trip.status)}
          <span className="trip-days-badge">{trip.days} Days</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="trip-card-body">
        <div className="trip-destination-row">
          <MapPin className="w-3.5 h-3.5 text-[#b08a3e]" />
          <span>{trip.destination}</span>
        </div>

        <h3 className="trip-card-title">{trip.title}</h3>

        <div className="trip-date-row">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{trip.startDate} &bull; {trip.endDate}</span>
        </div>

        {/* Budget Progress Bar */}
        <div className="trip-budget-progress">
          <div className="budget-labels">
            <span className="budget-spent">${trip.spent?.toLocaleString() || 0} spent</span>
            <span className="budget-total">of ${trip.budget?.toLocaleString()}</span>
          </div>
          <div className="progress-track">
            <div
              className={`progress-fill ${progressPercent > 90 ? 'progress-alert' : ''}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="trip-card-footer">
          <div className="destinations-pill">
            <span>{trip.destinationsCount || trip.stops?.length || 1} Stops</span>
          </div>
          <div className="trip-footer-actions">
            <button
              onClick={handleDelete}
              className="trip-action-icon-btn text-rose-500 hover:bg-rose-50"
              title="Delete trip"
              aria-label="Delete trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('itinerary-builder', trip.id);
              }}
              className="trip-view-btn"
            >
              <span>Build</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
