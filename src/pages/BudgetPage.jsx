import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  PieChart,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BudgetPage = () => {
  const { activeTrip, navigateTo, showToast } = useApp();

  if (!activeTrip) {
    return (
      <div className="page-container">
        <div className="empty-state-card">
          <h3 className="empty-title">No Active Trip Selected</h3>
          <p className="empty-desc">Choose a trip from My Trips to analyze its budget breakdown.</p>
          <button onClick={() => navigateTo('my-trips')} className="btn-primary-lg">
            View My Trips
          </button>
        </div>
      </div>
    );
  }

  const budget = activeTrip.budget || 3000;
  const spent = activeTrip.spent || 0;
  const remaining = budget - spent;
  const percentUsed = Math.min(100, Math.round((spent / budget) * 100));

  const getBudgetStatus = () => {
    if (spent > budget) {
      return { label: 'Over Budget', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', icon: AlertCircle };
    }
    if (spent >= budget * 0.85) {
      return { label: 'Near Budget Target', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: AlertCircle };
    }
    return { label: 'Under Budget & Healthy', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 };
  };

  const status = getBudgetStatus();
  const StatusIcon = status.icon;

  const categories = [
    { name: 'Accommodation & Villas', spent: Math.round(spent * 0.42), target: Math.round(budget * 0.40), color: '#17365D' },
    { name: 'Experiences & Activities', spent: Math.round(spent * 0.28), target: Math.round(budget * 0.25), color: '#B08A3E' },
    { name: 'Culinary & Dining', spent: Math.round(spent * 0.18), target: Math.round(budget * 0.20), color: '#D6B76A' },
    { name: 'Transportation & Trains', spent: Math.round(spent * 0.12), target: Math.round(budget * 0.15), color: '#4B6B94' },
  ];

  const dailyAvg = activeTrip.days > 0 ? Math.round(spent / activeTrip.days) : 0;
  const dailyTarget = activeTrip.days > 0 ? Math.round(budget / activeTrip.days) : 0;

  return (
    <div className="page-container budget-page">
      {/* Header */}
      <div className="budget-header-card">
        <div>
          <span className="section-eyebrow">Financial Ledger</span>
          <h1 className="section-heading">Trip Budget & Cost Breakdown</h1>
          <p className="section-subtitle">
            Track expenses, manage category limits, and ensure your itinerary stays within budget for <strong>{activeTrip.title}</strong>.
          </p>
        </div>

        <div className={`budget-status-pill ${status.bg}`}>
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <span className={`font-semibold ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="budget-kpis-grid">
        <div className="budget-kpi-card">
          <span className="kpi-label">Total Allocated Budget</span>
          <span className="kpi-value text-navy">${budget.toLocaleString()}</span>
          <span className="kpi-sub">${dailyTarget}/day planned allowance</span>
        </div>

        <div className="budget-kpi-card">
          <span className="kpi-label">Total Incurred Cost</span>
          <span className="kpi-value text-gold">${spent.toLocaleString()}</span>
          <span className="kpi-sub">${dailyAvg}/day average so far</span>
        </div>

        <div className="budget-kpi-card">
          <span className="kpi-label">Remaining Balance</span>
          <span className={`kpi-value ${remaining >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            ${remaining.toLocaleString()}
          </span>
          <span className="kpi-sub">{100 - percentUsed}% of funds available</span>
        </div>
      </div>

      {/* Overall Utilization Meter */}
      <div className="budget-meter-card">
        <div className="meter-header">
          <div>
            <h3 className="section-heading-sm">Total Budget Utilization</h3>
            <span className="text-sm text-slate-500">Calculated across all scheduled activities and stays</span>
          </div>
          <span className="meter-pct-badge">{percentUsed}%</span>
        </div>
        <div className="progress-track-lg">
          <div
            className={`progress-fill-lg ${percentUsed > 90 ? 'progress-alert' : ''}`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
      </div>

      {/* Category Breakdowns */}
      <div className="budget-breakdown-section">
        <div className="breakdown-left-card">
          <h3 className="section-heading-sm mb-4">Category Allocations</h3>
          <div className="category-bars-list">
            {categories.map((cat, idx) => {
              const catPercent = budget > 0 ? Math.round((cat.spent / budget) * 100) : 0;
              return (
                <div key={idx} className="category-bar-item">
                  <div className="cat-header-row">
                    <div className="cat-name-dot">
                      <span className="dot" style={{ backgroundColor: cat.color }}></span>
                      <span className="cat-name">{cat.name}</span>
                    </div>
                    <div className="cat-values">
                      <span className="cat-spent">${cat.spent.toLocaleString()}</span>
                      <span className="cat-target">/ ${cat.target.toLocaleString()} target</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min(100, (cat.spent / (cat.target || 1)) * 100)}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost per Destination Stop */}
        <div className="breakdown-right-card">
          <h3 className="section-heading-sm mb-4">Cost per Destination Stop</h3>
          <div className="stop-costs-list">
            {activeTrip.stops?.map((stop, sIdx) => {
              const stopTotal = stop.activities?.reduce((acc, a) => acc + (a.cost || 0), 0) || 0;
              return (
                <div key={stop.id} className="stop-cost-row">
                  <div className="stop-cost-name">
                    <span className="stop-num-tag">{sIdx + 1}</span>
                    <div>
                      <h4 className="font-semibold text-navy text-sm">{stop.city}</h4>
                      <span className="text-xs text-slate-500">{stop.activities?.length || 0} paid experiences</span>
                    </div>
                  </div>
                  <span className="stop-cost-amount">${stopTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
