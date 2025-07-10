import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TournamentsSection from './components/TournamentsSection';
import AcademySection from './components/AcademySection';
import FeaturesSection from './components/FeaturesSection';
import JoinCommunitySection from './components/JoinCommunitySection';
import Footer from './components/Footer';
import RankingPage from './pages/RankingPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import TournamentRegistrationPage from './pages/TournamentRegistrationPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AgendaPage from './pages/AgendaPage';
import TeamPage from './pages/TeamPage';
import TeamsListPage from './pages/TeamsListPage';
import AvailableTournamentsPage from './pages/AvailableTournamentsPage';
import CreateEventPage from './pages/CreateEventPage';
import EventsManagementPage from './pages/EventsManagementPage';
import EditEventPage from './pages/EditEventPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TournamentsSection />
      <AcademySection />
      <FeaturesSection />
      <JoinCommunitySection />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
        <Route path="/register/:id" element={<TournamentRegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/agenda" element={<AgendaPage />} />
        <Route path="/dashboard/equipo" element={<TeamPage />} />
        <Route path="/dashboard/mis-equipos" element={<TeamsListPage />} />
        <Route path="/dashboard/equipo/:teamId" element={<TeamPage />} />
        <Route path="/dashboard/torneos-disponibles" element={<AvailableTournamentsPage />} />
        <Route path="/dashboard/eventos" element={<EventsManagementPage />} />
        <Route path="/dashboard/eventos/crear" element={<CreateEventPage />} />
        <Route path="/dashboard/eventos/editar/:eventId" element={<EditEventPage />} />
      </Routes>
    </div>
  );
};

export default App;