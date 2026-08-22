import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Compass,
  ArrowRight,
  Sparkles,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreateTripPage = () => {
  const { addTrip, navigateTo, showToast } = useApp();

  const curatedCovers = [
    { label: 'Tuscan Villa', url: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Kyoto Temple', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Santorini Sunset', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Amalfi Coast', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop' },
  ];

  const travelPreferencesList = [
    'Culture & Heritage',
    'Culinary & Wine',
    'Scenic Road Trip',
    'Adventure & Hiking',
    'Luxury & Wellness',
    'Photography',
    'Secret Spots & Coastlines'
  ];

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '2026-09-15',
    endDate: '2026-09-22',
    budget: 3200,
    description: '',
    coverImage: curatedCovers[0].url,
    travelStyle: ['Culture & Heritage', 'Culinary & Wine'],
    status: 'upcoming'
  });

  const [error, setError] = useState('');

  const handleTogglePreference = (pref) => {
    if (formData.travelStyle.includes(pref)) {
      setFormData((prev) => ({
        ...prev,
        travelStyle: prev.travelStyle.filter((p) => p !== pref)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        travelStyle: [...prev.travelStyle, pref]
      }));
    }
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 7;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      setError('Please provide a trip title and destination.');
      return;
    }
    setError('');
    const days = calculateDays();
    addTrip({
      ...formData,
      days,
      stops: [
        {
          id: `stop-${Date.now()}`,
          city: formData.destination.split(',')[0].trim(),
          country: formData.destination.split(',')[1]?.trim() || 'Worldwide',
          arrivalDate: formData.startDate,
          departureDate: formData.endDate,
          image: formData.coverImage,
          activities: []
        }
      ]
    });
  };

  const handleSaveDraft = () => {
    if (!formData.title) {
      setError('Please provide at least a title to save a draft.');
      return;
    }
    addTrip({
      ...formData,
      title: `${formData.title} (Draft)`,
      days: calculateDays(),
      status: 'upcoming'
    });
    showToast('Trip saved as draft in My Trips.', 'info');
  };

  return (
    <div className="page-container create-trip-view">
      <div className="create-trip-header">
        <span className="section-eyebrow">Itinerary Architect</span>
        <h1 className="section-heading">Plan Your Next Adventure</h1>
        <p className="section-subtitle">
          Design your custom travel itinerary, set budgets, and tailor every stop to your style.
        </p>
      </div>

      {error && (
        <div className="alert-box alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="create-trip-layout">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="create-trip-form">
          {/* Trip Name & Destination */}
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="trip-title">
                Trip Name *
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Compass className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="trip-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Tuscan Vineyards & Medieval Castles"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="trip-destination">
                Primary Destination *
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="trip-destination"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Florence, Italy"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dates & Budget */}
          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label" htmlFor="trip-start">
                Start Date
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="trip-start"
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="trip-end">
                End Date
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Calendar className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="trip-end"
                  type="date"
                  className="form-input"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="trip-budget">
                Estimated Budget (₹ INR)
              </label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="trip-budget"
                  type="number"
                  className="form-input"
                  placeholder="50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="trip-desc">
              Trip Description & Travel Notes
            </label>
            <textarea
              id="trip-desc"
              rows={3}
              className="form-textarea"
              placeholder="What makes this journey special? Notes on pacing, must-see landmarks, or travel partners..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Cover Photo Selection */}
          <div className="form-group">
            <label className="form-label">
              Select Cover Photography
            </label>
            <div className="curated-covers-grid">
              {curatedCovers.map((cover, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, coverImage: cover.url })}
                  className={`cover-thumbnail-item ${formData.coverImage === cover.url ? 'selected' : ''}`}
                >
                  <img src={cover.url} alt={cover.label} />
                  <span className="cover-thumb-label">{cover.label}</span>
                  {formData.coverImage === cover.url && (
                    <div className="cover-check-badge">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Travel Style Preferences */}
          <div className="form-group">
            <label className="form-label">
              Travel Preferences & Style Tags
            </label>
            <div className="preferences-tags-cloud">
              {travelPreferencesList.map((pref) => {
                const selected = formData.travelStyle.includes(pref);
                return (
                  <button
                    type="button"
                    key={pref}
                    onClick={() => handleTogglePreference(pref)}
                    className={`pref-tag-btn ${selected ? 'active' : ''}`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 mr-1" />}
                    <span>{pref}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="form-actions-row">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn-outline-navy"
            >
              <FileText className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button
              type="submit"
              className="btn-primary-lg"
            >
              <span>Create Trip & Start Building</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Live Trip Preview Card */}
        <div className="create-trip-preview-sidebar">
          <div className="preview-card-sticky">
            <span className="preview-sticky-title">Live Trip Preview</span>
            <div className="trip-card">
              <div className="trip-card-cover">
                <img
                  src={formData.coverImage || curatedCovers[0].url}
                  alt="Preview"
                  className="trip-cover-img"
                />
                <div className="trip-card-overlay"></div>
                <div className="trip-card-top-tags">
                  <span className="trip-status-badge status-upcoming">Upcoming</span>
                  <span className="trip-days-badge">{calculateDays()} Days</span>
                </div>
              </div>
              <div className="trip-card-body">
                <div className="trip-destination-row">
                  <MapPin className="w-3.5 h-3.5 text-[#b08a3e]" />
                  <span>{formData.destination || 'Destination'}</span>
                </div>
                <h3 className="trip-card-title">{formData.title || 'Untitled Journey'}</h3>
                <div className="trip-date-row">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formData.startDate} &bull; {formData.endDate}</span>
                </div>
                <div className="destinations-pill mt-3">
                  <span>₹{formData.budget?.toLocaleString('en-IN') || 0} Target Budget</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
