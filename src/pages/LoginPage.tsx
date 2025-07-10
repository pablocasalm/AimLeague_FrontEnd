import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Target, User, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  // Get success message from navigation state (from registration)
  const successMessage = location.state?.message;
  const messageType = location.state?.type;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Define user accounts with roles
    const userAccounts = [
      {
        username: import.meta.env.VITE_USER1_USERNAME,
        password: import.meta.env.VITE_USER1_PASSWORD,
        role: 'Usuario',
        displayName: 'user1'
      },
      {
        username: import.meta.env.VITE_PLAYER1_USERNAME,
        password: import.meta.env.VITE_PLAYER1_PASSWORD,
        role: 'Jugador',
        displayName: 'player1'
      },
      {
        username: import.meta.env.VITE_COACH1_USERNAME,
        password: import.meta.env.VITE_COACH1_PASSWORD,
        role: 'Coach',
        displayName: 'coach1'
      },
      {
        username: import.meta.env.VITE_ADMIN1_USERNAME,
        password: import.meta.env.VITE_ADMIN1_PASSWORD,
        role: 'Admin',
        displayName: 'admin1'
      }
    ];

    // Find matching user account
    const matchedUser = userAccounts.find(
      user => user.username === formData.username && user.password === formData.password
    );

    if (matchedUser) {
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', matchedUser.displayName);
      localStorage.setItem('userRole', matchedUser.role);
      
      // Redirect after success message
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Login Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <Target className="w-10 h-10 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                Aim <span className="text-cyan-400">League</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-gray-400">Accede a tu cuenta para continuar</p>
          </div>

          {/* Success Message */}
          {successMessage && messageType === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              ¿No tienes una cuenta?{' '}
              <Link 
                to="/register" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Regístrate aquí
              </Link>
            </p>
            <div className="border-t border-gray-700 pt-4">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>

          {/* Test Credentials Info */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm text-center">
              <strong>Credenciales de prueba:</strong><br />
              user1/user1 (Usuario) | player1/player1 (Jugador)<br />
              coach1/coach1 (Coach) | admin1/admin1 (Admin)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;