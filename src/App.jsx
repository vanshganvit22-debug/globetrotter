import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { MobileNav } from './components/navigation/MobileNav';
import { ToastContainer } from './components/ui/Toast';
import { Modal } from './components/ui/Modal';

// Screens
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateTripPage } from './pages/CreateTripPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { ItineraryBuilderPage } from './pages/ItineraryBuilderPage';
import { ItineraryViewPage } from './pages/ItineraryViewPage';
import { CitySearchPage } from './pages/CitySearchPage';
import { ActivitySearchPage } from './pages/ActivitySearchPage';
import { BudgetPage } from './pages/BudgetPage';
import { CalendarPage } from './pages/CalendarPage';
import { PublicItineraryPage } from './pages/PublicItineraryPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';

import './App.css';

const MainAppContent = () => {
  const { currentScreen } = useApp();

  // If Auth screen is active
  if (currentScreen === 'auth') {
    return (
      <>
        <AuthPage />
        <ToastContainer />
        <Modal />
      </>
    );
  }

  // Render main application shell
  return (
    <div className="globetrotter-app-root">
      <Navbar />

      <div className="app-body-layout">
        <Sidebar />

        <main className="app-main-viewport">
          {currentScreen === 'dashboard' && <DashboardPage />}
          {currentScreen === 'my-trips' && <MyTripsPage />}
          {currentScreen === 'create-trip' && <CreateTripPage />}
          {currentScreen === 'itinerary-builder' && <ItineraryBuilderPage />}
          {currentScreen === 'itinerary-view' && <ItineraryViewPage />}
          {currentScreen === 'city-search' && <CitySearchPage />}
          {currentScreen === 'activity-search' && <ActivitySearchPage />}
          {currentScreen === 'budget' && <BudgetPage />}
          {currentScreen === 'calendar' && <CalendarPage />}
          {currentScreen === 'public-itinerary' && <PublicItineraryPage />}
          {currentScreen === 'profile' && <ProfilePage />}
          {currentScreen === 'community' && <CommunityPage />}
          {currentScreen === 'admin' && <AdminPage />}
        </main>
      </div>

      <MobileNav />
      <ToastContainer />
      <Modal />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
