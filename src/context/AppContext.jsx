import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTrips, mockDestinations, mockActivities, mockCommunityPosts } from '../data/mockData';
import { supabase } from '../supabaseClient';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('auth');
  
  // Persisted or initial user state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('globetrotter_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.warn('Error reading saved user', e);
    }
    return {
      name: 'Vansh Ganvit',
      email: 'vansh.ganvit@globetrotter.io',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
      currency: 'INR (₹)',
      language: 'English (India)',
      homeAirport: 'BOM - Chhatrapati Shivaji Maharaj Intl, Mumbai',
      role: 'Lead Explorer'
    };
  });

  // Save user changes to localStorage
  const updateUserProfile = (newProps) => {
    setUser((prev) => {
      const updated = { ...prev, ...newProps };
      try {
        localStorage.setItem('globetrotter_user', JSON.stringify(updated));
      } catch (e) {
        console.warn('Error saving user to localStorage', e);
      }
      return updated;
    });
  };

  const updateUserAvatar = (avatarDataUrl) => {
    updateUserProfile({ avatar: avatarDataUrl });
  };

  const formatINR = (amt) => {
    if (amt === undefined || amt === null || isNaN(Number(amt))) return '₹0';
    return `₹${Number(amt).toLocaleString('en-IN')}`;
  };
  
  const [trips, setTrips] = useState(initialTrips);
  const [activeTripId, setActiveTripId] = useState('trip-1');
  const [savedDestinations, setSavedDestinations] = useState(['dest-1', 'dest-4', 'dest-2']);
  const [communityPosts, setCommunityPosts] = useState(mockCommunityPosts);
  
  // Skeletons / Loading State
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Search queries & filters
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);
  
  // Active Modal state
  const [modalConfig, setModalConfig] = useState(null);

  // Supabase Auth listener
  useEffect(() => {
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser((prev) => ({
            ...prev,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          }));
        }
      });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser((prev) => ({
            ...prev,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          }));
        }
      });
      return () => subscription?.unsubscribe();
    } catch (e) {
      console.log('Auth check ready');
    }
  }, []);

  const navigateTo = (screen, tripId = null) => {
    setIsPageLoading(true);
    if (tripId) setActiveTripId(tripId);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsPageLoading(false);
    }, 450);
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openModal = (config) => {
    setModalConfig(config);
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  // Trip operations
  const addTrip = (newTrip) => {
    const trip = {
      ...newTrip,
      id: `trip-${Date.now()}`,
      spent: 0,
      destinationsCount: newTrip.stops?.length || 1,
      stops: newTrip.stops || []
    };
    setTrips((prev) => [trip, ...prev]);
    setActiveTripId(trip.id);
    showToast(`Trip "${trip.title}" created successfully!`);
    navigateTo('my-trips');
  };

  const deleteTrip = (tripId) => {
    const tripToDelete = trips.find((t) => t.id === tripId);
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    if (activeTripId === tripId) {
      const remaining = trips.filter((t) => t.id !== tripId);
      if (remaining.length > 0) setActiveTripId(remaining[0].id);
    }
    showToast(`Deleted trip "${tripToDelete?.title || 'Trip'}"`, 'info');
    closeModal();
  };

  const toggleSaveDestination = (destId) => {
    if (savedDestinations.includes(destId)) {
      setSavedDestinations((prev) => prev.filter((id) => id !== destId));
      showToast('Removed destination from saved places.', 'info');
    } else {
      setSavedDestinations((prev) => [...prev, destId]);
      showToast('Destination saved to your bucket list!', 'success');
    }
  };

  const addStopToActiveTrip = (stopData) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === activeTripId) {
          const updatedStops = [...(trip.stops || []), { ...stopData, id: `stop-${Date.now()}`, activities: [] }];
          return {
            ...trip,
            stops: updatedStops,
            destinationsCount: updatedStops.length
          };
        }
        return trip;
      })
    );
    showToast(`Added ${stopData.city} to your itinerary!`);
  };

  const addActivityToStop = (stopId, activity) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === activeTripId) {
          const updatedStops = trip.stops.map((stop) => {
            if (stop.id === stopId) {
              return {
                ...stop,
                activities: [...(stop.activities || []), { ...activity, id: `act-${Date.now()}` }]
              };
            }
            return stop;
          });
          const addedCost = Number(activity.cost) || 0;
          return {
            ...trip,
            stops: updatedStops,
            spent: (trip.spent || 0) + addedCost
          };
        }
        return trip;
      })
    );
    showToast(`Added "${activity.title}" to activities!`);
  };

  const likeCommunityPost = (postId) => {
    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1, userLiked: true } : post
      )
    );
  };

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0];

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        user,
        setUser,
        updateUserProfile,
        updateUserAvatar,
        formatINR,
        trips,
        activeTrip,
        activeTripId,
        setActiveTripId,
        addTrip,
        deleteTrip,
        savedDestinations,
        toggleSaveDestination,
        addStopToActiveTrip,
        addActivityToStop,
        communityPosts,
        likeCommunityPost,
        isPageLoading,
        setIsPageLoading,
        globalSearch,
        setGlobalSearch,
        toasts,
        showToast,
        removeToast,
        modalConfig,
        openModal,
        closeModal,
        mockDestinations,
        mockActivities
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
