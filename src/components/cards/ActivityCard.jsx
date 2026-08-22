import React from 'react';
import { Star, Clock, DollarSign, Plus, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ActivityCard = ({ activity, onAddActivity }) => {
  const { activeTrip, addActivityToStop } = useApp();

  const handleAdd = () => {
    if (onAddActivity) {
      onAddActivity(activity);
    } else if (activeTrip?.stops?.[0]?.id) {
      addActivityToStop(activeTrip.stops[0].id, {
        title: activity.title,
        location: activity.city,
        cost: activity.cost,
        category: activity.category,
        time: '10:00 AM',
        period: 'Morning',
        notes: activity.description
      });
    }
  };

  return (
    <div className="activity-card">
      <div className="activity-card-media">
        <img src={activity.image} alt={activity.title} className="activity-img" />
        <span className="activity-category-pill">{activity.category}</span>
        <div className="activity-rating-tag">
          <Star className="w-3.5 h-3.5 fill-[#caa560] text-[#caa560]" />
          <span>{activity.rating}</span>
          <span className="reviews-text">({activity.reviewsCount})</span>
        </div>
      </div>

      <div className="activity-card-body">
        <div className="activity-location-row">
          <MapPin className="w-3.5 h-3.5 text-[#b08a3e]" />
          <span>{activity.city}</span>
        </div>

        <h4 className="activity-title">{activity.title}</h4>
        <p className="activity-desc">{activity.description}</p>

        <div className="activity-meta-row">
          <div className="meta-item">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{activity.duration}</span>
          </div>
          <div className="meta-item cost-badge">
            <span>{activity.cost === 0 ? 'Free Entry' : `₹${Number(activity.cost).toLocaleString('en-IN')}/person`}</span>
          </div>
        </div>

        <div className="activity-card-footer">
          <button onClick={handleAdd} className="btn-add-activity">
            <Plus className="w-4 h-4" />
            <span>Add to Itinerary</span>
          </button>
        </div>
      </div>
    </div>
  );
};
