import React, { useState } from 'react';
import {
  Shield,
  Users,
  Map,
  TrendingUp,
  Search,
  MoreVertical,
  Activity,
  Compass,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { mockAdminStats } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AdminPage = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'destinations'
  const [searchUser, setSearchUser] = useState('');

  const stats = mockAdminStats;

  const filteredUsers = stats.recentUsersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="page-container admin-page">
      {/* Header */}
      <div className="admin-header-bar">
        <div>
          <div className="admin-badge-wrap">
            <Shield className="w-4 h-4 text-[#caa560]" />
            <span className="admin-badge-label">Executive Console</span>
          </div>
          <h1 className="section-heading">Platform Administration & Analytics</h1>
          <p className="section-subtitle">
            Global metrics, community growth, curated destination popularity, and system users ledger.
          </p>
        </div>

        <div className="admin-quick-status">
          <span className="status-indicator-dot"></span>
          <span className="status-text">All Services Operational</span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="admin-kpis-grid">
        <div className="admin-kpi-card">
          <div className="kpi-icon-circle">
            <Users className="w-5 h-5 text-navy" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Total Registered Users</span>
            <span className="kpi-big-num">{stats.totalUsers}</span>
            <span className="kpi-trend text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% this month
            </span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-circle">
            <Map className="w-5 h-5 text-[#b08a3e]" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Total Trips Created</span>
            <span className="kpi-big-num">{stats.totalTrips}</span>
            <span className="kpi-trend text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +21.8% vs last month
            </span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-circle">
            <Activity className="w-5 h-5 text-navy" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Active Monthly Explorers</span>
            <span className="kpi-big-num">{stats.activeUsers}</span>
            <span className="kpi-trend text-slate-500">62% engagement rate</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-circle">
            <Compass className="w-5 h-5 text-[#b08a3e]" />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Avg Trip Duration</span>
            <span className="kpi-big-num">{stats.avgTripDuration}</span>
            <span className="kpi-trend text-slate-500">Across all itineraries</span>
          </div>
        </div>
      </div>

      {/* Analytics Growth Bars Section */}
      <div className="admin-analytics-grid">
        <div className="analytics-card">
          <h3 className="section-heading-sm mb-4">Monthly Trip Creation Volume</h3>
          <div className="growth-bars-row">
            {stats.tripsGrowth.map((item, idx) => (
              <div key={idx} className="growth-bar-col">
                <span className="bar-val">{(item.count / 1000).toFixed(1)}k</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: `${(item.count / 50000) * 100}%` }}
                  ></div>
                </div>
                <span className="bar-month">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="section-heading-sm mb-4">Top Destination Hotspots</h3>
          <div className="popular-cities-list">
            {stats.popularCities.map((city, idx) => (
              <div key={idx} className="popular-city-row">
                <div className="city-rank">{idx + 1}</div>
                <div className="city-info">
                  <h4 className="font-semibold text-navy text-sm">{city.name}</h4>
                  <span className="text-xs text-slate-500">{city.country}</span>
                </div>
                <div className="city-trips-stat">
                  <span className="font-bold text-navy">{city.trips.toLocaleString()} trips</span>
                  <span className="text-xs text-emerald-600 font-semibold">{city.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Management Data Table */}
      <div className="admin-table-card">
        <div className="table-header-flex">
          <div>
            <h3 className="section-heading-sm">Registered Travelers Ledger</h3>
            <span className="text-sm text-slate-500">Manage user roles, trip quotas, and platform permissions</span>
          </div>

          <div className="table-search-box">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="table-search-input"
            />
          </div>
        </div>

        <div className="table-overflow">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Traveler</th>
                <th>Trips Created</th>
                <th>Date Joined</th>
                <th>Role Tier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="user-table-cell">
                      <div className="user-cell-avatar">{u.name.charAt(0)}</div>
                      <div>
                        <div className="user-cell-name">{u.name}</div>
                        <div className="user-cell-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold text-navy">{u.tripsCount} Journeys</span>
                  </td>
                  <td className="text-slate-500 text-sm">{u.joined}</td>
                  <td>
                    <span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => showToast(`Opening profile for ${u.name}`)}
                      className="btn-table-action"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
