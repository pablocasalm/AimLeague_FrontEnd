import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, LogIn } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  // Don't show main header on login page or dashboard pages
  if (location.pathname === '/login' || location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">
              Aim <span className="text-cyan-400">League</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link 
              to="/tournaments" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Torneos
            </Link>
            <Link 
              to="/ranking" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Ranking
            </Link>
          </nav>

          {/* Login Link */}
          <Link 
            to="/login" 
            className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            <LogIn className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;