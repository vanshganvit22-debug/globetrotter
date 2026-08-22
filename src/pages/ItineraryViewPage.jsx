import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Share2,
  Edit,
  Sparkles,
  Layers,
  List,
  CheckCircle2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TimelineDaySkeleton } from '../components/ui/Skeleton';

export const ItineraryViewPage = () => {
  const { activeTrip, navigateTo, isPageLoading, showToast } = useApp();
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'list'

  if (!activeTrip) {
    return (
      <div className="page-container">
        <div className="empty-state-card">
          <h3 className="empty-title">No Active Journey Selected</h3>
          <p className="empty-desc">Choose a trip from your library to view its day-by-day itinerary.</p>
          <button onClick={() => navigateTo('my-trips')} className="btn-primary-lg">
            View My Trips
          </button>
        </div>
      </div>
    );
  }

  const stops = activeTrip.stops || [];

  return (
    <div className="page-container itinerary-view-page">
      {/* Trip Hero Header */}
      <div className="itinerary-hero-banner">
        <div className="banner-bg" style={{ backgroundImage: `url(${activeTrip.coverImage})` }}></div>
        <div className="banner-overlay"></div>
        <div className="itinerary-banner-content">
          <div className="banner-top-tag">
            <span className="badge-featured">{activeTrip.status.toUpperCase()}</span>
            <span className="badge-days">{activeTrip.days} Days &bull; {stops.length} Cities</span>
          </div>
          <h1 className="itinerary-title">{activeTrip.title}</h1>
          <p className="itinerary-subtitle">{activeTrip.description}</p>

          <div className="itinerary-stat-pills">
            <div className="stat-pill">
              <Calendar className="w-4 h-4 text-[#caa560]" />
              <span>{activeTrip.startDate} &rarr; {activeTrip.endDate}</span>
            </div>
            <div className="stat-pill">
              <MapPin className="w-4 h-4 text-[#caa560]" />
              <span>{activeTrip.destination}</span>
            </div>
            <div className="stat-pill">
              <DollarSign className="w-4 h-4 text-[#caa560]" />
              <span>₹{activeTrip.spent?.toLocaleString('en-IN')} Spent &bull; ₹{activeTrip.budget?.toLocaleString('en-IN')} Budget</span>
            </div>
          </div>

          <div className="itinerary-actions-row">
            <button
              onClick={() => navigateTo('itinerary-builder', activeTrip.id)}
              className="btn-banner-primary"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Stops & Activities</span>
            </button>
            <button
              onClick={() => navigateTo('public-itinerary', activeTrip.id)}
              className="btn-banner-secondary"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Travel Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher & Day Navigation */}
      <div className="itinerary-toolbar">
        <div className="toolbar-left">
          <h2 className="section-heading-sm">Day-by-Day Master Plan</h2>
          <span className="text-slate-500 text-sm">Organized chronologically by morning, afternoon, and evening</span>
        </div>

        <div className="view-mode-toggle">
          <button
            onClick={() => setViewMode('timeline')}
            className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
          >
            <Layers className="w-4 h-4" />
            <span>Timeline View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Day by Day Sections */}
      {isPageLoading ? (
        <div className="timeline-loading-wrap">
          <TimelineDaySkeleton />
          <TimelineDaySkeleton />
          <TimelineDaySkeleton />
        </div>
      ) : stops.length > 0 ? (
        <div className="days-timeline-container">
          {stops.map((stop, stopIdx) => (
            <div key={stop.id} className="timeline-stop-block">
              {/* Destination Stop Header Card */}
              <div className="stop-header-badge-card">
                <div className="stop-badge-num">Stop {stopIdx + 1}</div>
                <div className="stop-badge-details">
                  <h3 className="stop-badge-city">{stop.city}, {stop.country}</h3>
                  <span className="stop-badge-dates">{stop.arrivalDate} to {stop.departureDate}</span>
                </div>
                <button
                  onClick={() => navigateTo('itinerary-builder', activeTrip.id)}
                  className="btn-outline-sm"
                >
                  Edit Stop
                </button>
              </div>

              {/* Activities within this stop */}
              <div className="stop-activities-flow">
                {stop.activities?.length > 0 ? (
                  stop.activities.map((act, actIdx) => (
                    <div key={act.id} className="timeline-activity-node">
                      <div className="node-marker">
                        <div className="node-dot"></div>
                        {actIdx < stop.activities.length - 1 && <div className="node-line"></div>}
                      </div>

                      <div className="node-card">
                        <div className="node-card-top">
                          <div className="node-time-badge">
                            <Clock className="w-3.5 h-3.5 text-[#b08a3e]" />
                            <span>{act.time}</span>
                            <span className="node-period-pill">{act.period}</span>
                          </div>
                          <span className="node-category-pill">{act.category}</span>
                        </div>

                        <h4 className="node-title">{act.title}</h4>

                        <div className="node-meta-row">
                          <div className="meta-loc">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{act.location || stop.city}</span>
                          </div>
                          <div className="meta-cost">
                            <span className="cost-tag">
                              {act.cost === 0 ? 'Free Experience' : `₹${Number(act.cost).toLocaleString('en-IN')}`}
                            </span>
                          </div>
                        </div>

                        {act.notes && (
                          <div className="node-notes-callout">
                            <p>{act.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-acts-box">
                    <p>No scheduled activities yet for {stop.city}.</p>
                    <button
                      onClick={() => navigateTo('itinerary-builder', activeTrip.id)}
                      className="btn-text-gold"
                    >
                      + Add experiences for this stop
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <Compass className="w-10 h-10 text-[#caa560]" />
          <h3 className="empty-title">Your Itinerary is Empty</h3>
          <p className="empty-desc">Add destination stops and experiences to construct your dream itinerary.</p>
          <button
            onClick={() => navigateTo('itinerary-builder', activeTrip.id)}
            className="btn-primary-lg"
          >
            Launch Itinerary Builder
          </button>
        </div>
      )}
    </div>
  );
};
