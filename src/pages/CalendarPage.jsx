import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalendarPage = () => {
  const { activeTrip, navigateTo } = useApp();
  const [selectedDay, setSelectedDay] = useState(12);

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Marked trip days (e.g. 10 to 18 September)
  const tripDays = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  const currentStop = activeTrip?.stops?.[0];

  return (
    <div className="page-container calendar-page">
      {/* Header */}
      <div className="calendar-header-bar">
        <div>
          <span className="section-eyebrow">Temporal Itinerary</span>
          <h1 className="section-heading">Trip Calendar & Timeline</h1>
          <p className="section-subtitle">
            Synchronize your scheduled tours, train connections, and dinner reservations on a month view.
          </p>
        </div>

        <div className="calendar-month-selector">
          <button className="month-nav-btn" aria-label="Previous month">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="current-month-label">September 2026</span>
          <button className="month-nav-btn" aria-label="Next month">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="calendar-layout-grid">
        {/* Main Monthly Calendar Grid */}
        <div className="calendar-grid-card">
          {/* Weekday Labels */}
          <div className="weekdays-row">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Cells */}
          <div className="calendar-days-grid">
            {/* Empty offset days */}
            <div className="calendar-day-cell empty"></div>
            <div className="calendar-day-cell empty"></div>

            {daysInMonth.map((day) => {
              const isTripDay = tripDays.includes(day);
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`calendar-day-cell ${isTripDay ? 'in-trip' : ''} ${isSelected ? 'selected' : ''}`}
                >
                  <span className="day-number">{day}</span>
                  {isTripDay && (
                    <div className="day-event-pill">
                      <span className="event-dot"></span>
                      <span className="event-label">
                        {day <= 13 ? 'Florence' : day <= 16 ? 'Siena' : 'San Gimignano'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda Drawer */}
        <div className="day-agenda-card">
          <div className="agenda-header">
            <div>
              <span className="agenda-date-label">September {selectedDay}, 2026</span>
              <h3 className="agenda-title">
                {selectedDay <= 13
                  ? 'Florence Renaissance Arts'
                  : selectedDay <= 16
                  ? 'Val d’Orcia Vineyards'
                  : 'San Gimignano Towers'}
              </h3>
            </div>
            <span className="agenda-day-badge">Day {Math.max(1, selectedDay - 9)}</span>
          </div>

          <div className="agenda-activities-list">
            <div className="agenda-item">
              <div className="agenda-time">09:00 AM</div>
              <div className="agenda-details">
                <h4>Uffizi Gallery VIP Tour</h4>
                <p className="text-xs text-slate-500">Piazzale degli Uffizi &bull; Skip-the-line pass</p>
                <span className="badge-cat-sm">Culture</span>
              </div>
            </div>

            <div className="agenda-item">
              <div className="agenda-time">01:30 PM</div>
              <div className="agenda-details">
                <h4>Tuscan Pasta Workshop</h4>
                <p className="text-xs text-slate-500">Trattoria Mario &bull; Lunch included</p>
                <span className="badge-cat-sm">Food</span>
              </div>
            </div>

            <div className="agenda-item">
              <div className="agenda-time">06:30 PM</div>
              <div className="agenda-details">
                <h4>Sunset over Florence</h4>
                <p className="text-xs text-slate-500">Piazzale Michelangelo &bull; Free panoramic view</p>
                <span className="badge-cat-sm">Sightseeing</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('itinerary-builder', activeTrip?.id)}
            className="btn-primary w-full mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event for This Day</span>
          </button>
        </div>
      </div>
    </div>
  );
};
