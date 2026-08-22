import React from 'react';

export const Skeleton = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) => {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export const TripCardSkeleton = () => {
  return (
    <div className="trip-card skeleton-card">
      <Skeleton height="190px" borderRadius="16px 16px 0 0" />
      <div className="trip-card-body" style={{ padding: '20px' }}>
        <Skeleton width="40%" height="14px" className="mb-2" />
        <Skeleton width="85%" height="22px" className="mb-3" />
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Skeleton width="28%" height="24px" borderRadius="9999px" />
          <Skeleton width="28%" height="24px" borderRadius="9999px" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
          <Skeleton width="30%" height="16px" />
          <Skeleton width="90px" height="36px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
};

export const DestinationCardSkeleton = () => {
  return (
    <div className="dest-card skeleton-card">
      <Skeleton height="210px" borderRadius="16px 16px 0 0" />
      <div style={{ padding: '20px' }}>
        <Skeleton width="60%" height="22px" className="mb-2" />
        <Skeleton width="90%" height="14px" className="mb-4" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width="35%" height="16px" />
          <Skeleton width="100px" height="34px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="stat-card skeleton-card" style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
      <Skeleton width="36px" height="36px" borderRadius="50%" className="mb-3" />
      <Skeleton width="40%" height="13px" className="mb-2" />
      <Skeleton width="70%" height="26px" />
    </div>
  );
};

export const TimelineDaySkeleton = () => {
  return (
    <div className="timeline-day-skeleton" style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Skeleton width="180px" height="24px" />
        <Skeleton width="90px" height="20px" borderRadius="9999px" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Skeleton width="70px" height="16px" />
          <Skeleton width="100%" height="60px" borderRadius="12px" />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Skeleton width="70px" height="16px" />
          <Skeleton width="100%" height="60px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
};
