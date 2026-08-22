import React from 'react';
import {
  Share2,
  Copy,
  Calendar,
  MapPin,
  DollarSign,
  Heart,
  Compass,
  Check,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PublicItineraryPage = () => {
  const { activeTrip, user, navigateTo, showToast, addTrip } = useApp();

  if (!activeTrip) {
    return (
      <div className="page-container">
        <div className="empty-state-card">
          <h3 className="empty-title">No Travel Story Found</h3>
          <p className="empty-desc">Select an active trip to preview its public story view.</p>
          <button onClick={() => navigateTo('dashboard')} className="btn-primary-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCopyTrip = () => {
    addTrip({
      ...activeTrip,
      title: `${activeTrip.title} (Forked)`,
      status: 'upcoming'
    });
    showToast('Itinerary copied to your personal trips library!');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Public travel link copied to clipboard!');
  };

  return (
    <div className="page-container public-story-page">
      {/* Top Floating Control Bar */}
      <div className="story-top-nav">
        <button onClick={() => navigateTo('itinerary-view')} className="btn-back-link">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Planner</span>
        </button>

        <div className="story-nav-actions">
          <button onClick={handleCopyLink} className="btn-outline-sm">
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </button>
          <button onClick={handleCopyTrip} className="btn-primary-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Copy Itinerary to My Trips</span>
          </button>
        </div>
      </div>

      {/* Hero Editorial Header */}
      <article className="story-article-card">
        <div className="story-hero-media">
          <img src={activeTrip.coverImage} alt={activeTrip.title} className="story-cover-img" />
          <div className="story-hero-gradient"></div>
          <div className="story-hero-overlay-content">
            <div className="story-traveler-chip">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt="Author"
                className="story-avatar"
              />
              <div>
                <span className="story-author-name">Curated by {user?.name || 'Alexander Wright'}</span>
                <span className="story-verified-tag">&bull; Verified Globetrotter</span>
              </div>
            </div>
            <h1 className="story-title">{activeTrip.title}</h1>
            <p className="story-desc">{activeTrip.description}</p>
          </div>
        </div>

        {/* Trip Meta Overview Ribbon */}
        <div className="story-meta-ribbon">
          <div className="meta-ribbon-item">
            <Calendar className="w-4 h-4 text-[#caa560]" />
            <div>
              <span className="meta-sub">Duration</span>
              <span className="meta-val">{activeTrip.days} Days &bull; {activeTrip.startDate}</span>
            </div>
          </div>
          <div className="meta-ribbon-item">
            <MapPin className="w-4 h-4 text-[#caa560]" />
            <div>
              <span className="meta-sub">Destinations</span>
              <span className="meta-val">{activeTrip.stops?.length || 1} Cities Explored</span>
            </div>
          </div>
          <div className="meta-ribbon-item">
            <DollarSign className="w-4 h-4 text-[#caa560]" />
            <div>
              <span className="meta-sub">Estimated Budget</span>
              <span className="meta-val">${activeTrip.budget?.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        {/* Story Stops & Activity Highlights */}
        <div className="story-content-body">
          <h2 className="story-section-title">The Curated Route</h2>
          <div className="story-timeline-flow">
            {activeTrip.stops?.map((stop, sIdx) => (
              <div key={stop.id} className="story-stop-item">
                <div className="story-stop-badge">
                  <span>Stop {sIdx + 1}</span>
                  <h3>{stop.city}, {stop.country}</h3>
                </div>

                <div className="story-activities-grid">
                  {stop.activities?.map((act) => (
                    <div key={act.id} className="story-act-card">
                      <div className="story-act-header">
                        <span className="story-act-time">{act.time}</span>
                        <span className="story-act-cat">{act.category}</span>
                      </div>
                      <h4 className="story-act-title">{act.title}</h4>
                      <p className="story-act-loc">{act.location || stop.city}</p>
                      {act.notes && <p className="story-act-notes">&ldquo;{act.notes}&rdquo;</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
