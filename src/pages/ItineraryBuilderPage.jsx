import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Layers,
  ArrowRight,
  Eye,
  Sparkles,
  Edit2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ItineraryBuilderPage = () => {
  const { activeTrip, addActivityToStop, navigateTo, openModal, showToast } = useApp();

  const [activeStopId, setActiveStopId] = useState(activeTrip?.stops?.[0]?.id || null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  // New Stop State
  const [newStop, setNewStop] = useState({
    city: '',
    country: '',
    arrivalDate: '2026-09-12',
    departureDate: '2026-09-15',
  });

  // New Activity State
  const [newActivity, setNewActivity] = useState({
    title: '',
    time: '10:00 AM',
    location: '',
    cost: 45,
    category: 'Culture',
    period: 'Morning',
    notes: '',
  });

  if (!activeTrip) {
    return (
      <div className="page-container">
        <div className="empty-state-card">
          <h3 className="empty-title">No Active Trip Selected</h3>
          <p className="empty-desc">Select a trip from My Trips to build its itinerary.</p>
          <button onClick={() => navigateTo('my-trips')} className="btn-primary-lg">
            Go to My Trips
          </button>
        </div>
      </div>
    );
  }

  const stops = activeTrip.stops || [];
  const currentStop = stops.find((s) => s.id === activeStopId) || stops[0];

  const handleCreateStop = (e) => {
    e.preventDefault();
    if (!newStop.city) return;
    const stopObj = {
      id: `stop-${Date.now()}`,
      city: newStop.city,
      country: newStop.country || 'Destination',
      arrivalDate: newStop.arrivalDate,
      departureDate: newStop.departureDate,
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop',
      activities: []
    };
    activeTrip.stops.push(stopObj);
    activeTrip.destinationsCount = activeTrip.stops.length;
    setActiveStopId(stopObj.id);
    setShowAddStopModal(false);
    showToast(`Added stop "${newStop.city}" to itinerary!`);
    setNewStop({ city: '', country: '', arrivalDate: '2026-09-12', departureDate: '2026-09-15' });
  };

  const handleCreateActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title || !currentStop) return;
    addActivityToStop(currentStop.id, newActivity);
    setShowAddActivityModal(false);
    setNewActivity({
      title: '',
      time: '10:00 AM',
      location: '',
      cost: 45,
      category: 'Culture',
      period: 'Morning',
      notes: '',
    });
  };

  const handleDeleteActivity = (stopId, actId) => {
    const stop = activeTrip.stops.find((s) => s.id === stopId);
    if (stop) {
      const act = stop.activities.find((a) => a.id === actId);
      stop.activities = stop.activities.filter((a) => a.id !== actId);
      if (act?.cost) activeTrip.spent = Math.max(0, (activeTrip.spent || 0) - act.cost);
      showToast('Activity removed.');
    }
  };

  return (
    <div className="page-container builder-view">
      {/* Trip Header Banner */}
      <div className="builder-header-card">
        <div className="builder-header-left">
          <span className="section-eyebrow">Itinerary Builder</span>
          <h1 className="builder-trip-title">{activeTrip.title}</h1>
          <div className="builder-meta-tags">
            <span className="meta-pill">
              <Calendar className="w-3.5 h-3.5 text-[#caa560]" />
              {activeTrip.startDate} &bull; {activeTrip.endDate} ({activeTrip.days} Days)
            </span>
            <span className="meta-pill">
              <MapPin className="w-3.5 h-3.5 text-[#caa560]" />
              {stops.length} Stops &bull; {activeTrip.destination}
            </span>
            <span className="meta-pill">
              <DollarSign className="w-3.5 h-3.5 text-[#caa560]" />
              ₹{activeTrip.spent?.toLocaleString('en-IN')} spent / ₹{activeTrip.budget?.toLocaleString('en-IN')} target
            </span>
          </div>
        </div>

        <div className="builder-header-actions">
          <button
            onClick={() => navigateTo('itinerary-view', activeTrip.id)}
            className="btn-primary-lg"
          >
            <Eye className="w-4 h-4" />
            <span>View Timeline</span>
          </button>
        </div>
      </div>

      {/* Builder 2-Column Workspace */}
      <div className="builder-workspace">
        {/* Left Stops Sidebar */}
        <div className="stops-manager-pane">
          <div className="pane-header-row">
            <div>
              <h3 className="pane-title">Trip Destinations</h3>
              <span className="pane-subtitle">{stops.length} Cities / Stops</span>
            </div>
            <button
              onClick={() => setShowAddStopModal(true)}
              className="btn-circle-gold"
              title="Add destination stop"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="stops-list">
            {stops.map((stop, index) => {
              const isSelected = stop.id === activeStopId;
              return (
                <div
                  key={stop.id}
                  onClick={() => setActiveStopId(stop.id)}
                  className={`stop-card-item ${isSelected ? 'selected' : ''}`}
                >
                  <div className="stop-index-circle">{index + 1}</div>
                  <div className="stop-info-wrap">
                    <h4 className="stop-city">{stop.city}</h4>
                    <span className="stop-country">{stop.country}</span>
                    <span className="stop-dates">{stop.arrivalDate} &bull; {stop.departureDate}</span>
                  </div>
                  <div className="stop-acts-count">
                    <span>{stop.activities?.length || 0} Acts</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowAddStopModal(true)}
            className="btn-add-stop-dashed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Destination Stop</span>
          </button>
        </div>

        {/* Right Activities Workspace */}
        <div className="activities-manager-pane">
          {currentStop ? (
            <>
              <div className="stop-active-header">
                <div>
                  <span className="section-eyebrow">Managing Stop</span>
                  <h2 className="section-heading-sm">
                    {currentStop.city}, {currentStop.country}
                  </h2>
                  <p className="stop-date-range">
                    {currentStop.arrivalDate} to {currentStop.departureDate} &bull;{' '}
                    {currentStop.activities?.length || 0} scheduled experiences
                  </p>
                </div>
                <button
                  onClick={() => setShowAddActivityModal(true)}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity</span>
                </button>
              </div>

              {/* Activity Cards List */}
              <div className="builder-activities-list">
                {currentStop.activities?.length > 0 ? (
                  currentStop.activities.map((act) => (
                    <div key={act.id} className="builder-act-card">
                      <div className="act-time-pill">
                        <Clock className="w-3.5 h-3.5 text-[#b08a3e]" />
                        <span>{act.time}</span>
                      </div>
                      <div className="act-main-info">
                        <div className="act-top-row">
                          <span className="act-category-tag">{act.category}</span>
                          <span className="act-period-tag">{act.period}</span>
                        </div>
                        <h4 className="act-name">{act.title}</h4>
                        <div className="act-loc-row">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{act.location || currentStop.city}</span>
                        </div>
                        {act.notes && <p className="act-notes-text">&ldquo;{act.notes}&rdquo;</p>}
                      </div>
                      <div className="act-right-controls">
                        <span className="act-cost-label">
                          {act.cost === 0 ? 'Free' : `₹${Number(act.cost).toLocaleString('en-IN')}`}
                        </span>
                        <button
                          onClick={() => handleDeleteActivity(currentStop.id, act.id)}
                          className="btn-icon-danger"
                          title="Remove activity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-activities-box">
                    <Sparkles className="w-8 h-8 text-[#caa560] mb-2" />
                    <p className="font-semibold text-navy">No experiences scheduled yet for {currentStop.city}</p>
                    <p className="text-sm text-slate-500 mb-3">Add tailored tours, dining reservations, or secret spots.</p>
                    <button
                      onClick={() => setShowAddActivityModal(true)}
                      className="btn-primary"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add First Activity</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="empty-activities-box">
              <p>Select or create a destination stop on the left to add activities.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Stop Modal */}
      {showAddStopModal && (
        <div className="modal-backdrop" onClick={() => setShowAddStopModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Destination Stop</h3>
            </div>
            <form onSubmit={handleCreateStop} className="modal-form">
              <div className="form-group">
                <label className="form-label">City Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rome"
                  value={newStop.city}
                  onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  placeholder="e.g. Italy"
                  value={newStop.country}
                  onChange={(e) => setNewStop({ ...newStop, country: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Arrival Date</label>
                  <input
                    type="date"
                    value={newStop.arrivalDate}
                    onChange={(e) => setNewStop({ ...newStop, arrivalDate: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Departure Date</label>
                  <input
                    type="date"
                    value={newStop.departureDate}
                    onChange={(e) => setNewStop({ ...newStop, departureDate: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddStopModal(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Add Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="modal-backdrop" onClick={() => setShowAddActivityModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Activity for {currentStop?.city}</h3>
            </div>
            <form onSubmit={handleCreateActivity} className="modal-form">
              <div className="form-group">
                <label className="form-label">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Private Gondola Tour at Sunset"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    placeholder="05:30 PM"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Period</label>
                  <select
                    value={newActivity.period}
                    onChange={(e) => setNewActivity({ ...newActivity, period: e.target.value })}
                    className="form-input"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={newActivity.category}
                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="Culture">Culture</option>
                    <option value="Food">Food & Wine</option>
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Nature">Nature</option>
                    <option value="Relaxation">Relaxation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cost (₹ INR)</label>
                  <input
                    type="number"
                    placeholder="1200"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity({ ...newActivity, cost: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location / Address</label>
                <input
                  type="text"
                  placeholder="e.g. Grand Canal, Venice"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Notes or Voucher info</label>
                <textarea
                  rows={2}
                  placeholder="Meeting point details, dress codes, or booking reference..."
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                  className="form-textarea"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-confirm">
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
