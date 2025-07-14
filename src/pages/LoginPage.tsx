import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Target, User, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { userService } from '../../services/userService';
import { getRoleLabel } from '../utils/roleMapping';
import { setNumber, getNumber } from '../utils/storageNumber';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResult {
  Success: boolean;
  Token?: string;
  UserName?: string;
  Error?: string;
  Role: string;
  TournamentsPlayed: number,
  Wins: number,
  Points: number,
  Ranking: number,
  TeamId: number;
  UserId: number;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mensaje de éxito desde registro
  const successMessage = location.state?.message;
  const messageType = location.state?.type;

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = (await userService.login({
        EmailOrUsername: formData.username,
        Password: formData.password
      })) as LoginResult;

      if (!result.Success) {
        setError(result.Error || 'Error al iniciar sesión');
      } else {
        localStorage.setItem('token', result.Token!);
        localStorage.setItem('username', result.UserName!);
        localStorage.setItem('role', getRoleLabel(result.Role)!);
        setNumber('tournamentsplayed', result.TournamentsPlayed);
        setNumber('wins', result.Wins);
        setNumber('points', result.Points);
        setNumber('ranking', result.Ranking);
        setNumber('userid', result.UserId);
        //setNumber('teamid', result.TeamId);
        if (result.TeamId !== 0 || getNumber('teamid') !== result.TeamId) {
          setNumber('teamid', result.TeamId);
        } else {
          localStorage.removeItem('teamid');  // Eliminar teamId si es 0
        }
        localStorage.setItem('isLoggedIn', 'true');     //POSIBLE ERROR
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error desconocido al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        style={{ opacity: 0.2 }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10" />
      
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
  
          {/* Success & Error Messages */}
          {successMessage && messageType === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">{successMessage}</span>
            </div>
          )}
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
                Usuario o email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={e => handleInputChange('username', e.target.value)}
                  placeholder="Ingresa tu usuario o email"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
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
                  onChange={e => handleInputChange('password', e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
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