// src/components/DashboardHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, User, LogOut } from 'lucide-react';
import NotificationButton from './NotificationButton';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Usuario';
  const userRole = localStorage.getItem('userRole') || 'Usuario';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">
              Panel de <span className="text-cyan-400">Control</span>
            </h1>
          </div>

          {/* User Info, Notifications & Logout */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5" />
              <div className="flex flex-col">
                <span>Bienvenido, {username}</span>
                <span className="text-xs text-cyan-400">({userRole})</span>
              </div>
            </div>

            {/* Notifications Button (Message Icon) */}
            {/* Notifications */}
            <NotificationButton />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;