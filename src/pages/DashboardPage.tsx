import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock,
  Target,
  MessageSquare,
  BarChart3,
  Shield,
  Settings,
  UserPlus,
  Crown,
  Plus
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { getNumber } from '../utils/storageNumber';
import { getRoleLabel } from '../utils/roleMapping';


const DashboardPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user1';
  const userRole = localStorage.getItem('role') || 'Usuario';
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Get role description based on user role
  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'Usuario':
        return 'Acceso a torneos activos.';
      case 'Jugador':
        return 'Acceso completo a torneos y academia.';
      case 'Entrenador':
        return 'Acceso a la agenda de entrenamientos y jugadores.';
      case 'Admin':
        return 'Acceso al panel de gestión de torneos.';
      default:
        return 'Acceso básico a la plataforma.';
    }
  };


  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      action: 'Te inscribiste en CS2 Open Julio',
      date: '2 días atrás',
      type: 'tournament'
    },
    {
      id: 2,
      action: 'Completaste una sesión de entrenamiento',
      date: '5 días atrás',
      type: 'training'
    },
    {
      id: 3,
      action: 'Tu equipo subió al puesto #15 en el ranking',
      date: '1 semana atrás',
      type: 'ranking'
    }
  ];

  // Check if user should see team section
  const shouldShowTeamSection = userRole === 'Jugador' || userRole === 'Usuario' || userRole === 'Entrenador';

  // Determine team card configuration based on role
  const getTeamCardConfig = () => {
      return {
        title: 'Mis Equipos',
        description: 'Gestiona todos los equipos bajo tu supervisión.',
        link: '/dashboard/mis-equipos',
        icon: Shield
      };
  };

  const teamCardConfig = getTeamCardConfig();

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">
                ¡Bienvenido de vuelta, {username}!
              </h2>
            </div>
            <p className="text-gray-300 text-lg">
              Desde tu panel de control puedes gestionar tu perfil, inscribirte en torneos, 
              consultar estadísticas y acceder a todas las funciones de Aim League.
            </p>
            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <p className="text-white">
                <span className="font-semibold">Rol asignado:</span> 
                <span className="text-cyan-400 font-semibold ml-2">{userRole}</span>
                <span className="text-gray-300 ml-2">— {getRoleDescription(userRole)}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${shouldShowTeamSection ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mb-8`}>

            {/* Administrar Torneos (solo Admin) */}
            {userRole === 'Administrador' && (
              <Link
                to="/dashboard/admin/torneos"
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                    <Trophy className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    Administrar Torneos
                  </h3>
                </div>
                <p className="text-gray-400">
                  Crea, edita y elimina torneos de la plataforma.
                </p>
              </Link>
            )}

            {/* Asignar Roles (solo Admin) */}
            {userRole === 'Administrador' && (
              <Link
                to="/dashboard/admin/roles"
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-lg group-hover:bg-yellow-500/30 transition-colors duration-300">
                    <Users className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    Asignar Roles
                  </h3>
                </div>
                <p className="text-gray-400">
                  Gestiona los roles y permisos de las cuentas de usuario.
                </p>
              </Link>
            )}
            <Link 
              to="/dashboard/torneos-disponibles"
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <Trophy className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Torneos</h3>
              </div>
              <p className="text-gray-400">
                Inscríbete en torneos disponibles y compite por premios.
              </p>
            </Link>

            <Link 
              to="/dashboard/agenda"
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Mi Agenda</h3>
              </div>
              <p className="text-gray-400">
                Próximas partidas y eventos programados para tus equipos.
              </p>
            </Link>

            {/* Conditional card based on user role */}
            {userRole === 'Entrenador' ? (
              <Link 
                to="/dashboard/eventos"
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Calendar className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Administración de Eventos</h3>
                </div>
                <p className="text-gray-400">
                  Gestiona todos los eventos creados para tus equipos de la academia.
                </p>
              </Link>
            ) : (
              <Link 
                to="/ranking"
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <TrendingUp className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Ranking</h3>
                </div>
                <p className="text-gray-400">
                  Consulta tu posición en el ranking y el progreso de otros jugadores.
                </p>
              </Link>
            )}

            {/* Mi Equipo Card - Only for Jugador and Usuario */}
            {shouldShowTeamSection && (
              <Link 
                to={teamCardConfig.link}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <teamCardConfig.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{teamCardConfig.title}</h3>
                </div>
                <p className="text-gray-400">
                  {teamCardConfig.description}
                </p>
              </Link>
            )}
          </div>

          {/* Dashboard Stats - Only for non-Entrenador users */}
          {userRole !== 'Entrenador' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Estadísticas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{getNumber('tournamentsplayed')}</div>
                  <div className="text-gray-300 font-semibold">Torneos Jugados</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{getNumber('wins')}</div>
                  <div className="text-gray-300 font-semibold">Victorias</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{getNumber('points')}</div>
                  <div className="text-gray-300 font-semibold">Puntos</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{getNumber('ranking') == 0 ? "-" : getNumber('ranking')}</div>
                  <div className="text-gray-300 font-semibold">Ranking</div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
            </div>
            
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-gray-900 border border-gray-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-cyan-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                          {activity.type === 'tournament' && <Trophy className="w-5 h-5 text-cyan-400" />}
                          {activity.type === 'training' && <Target className="w-5 h-5 text-cyan-400" />}
                          {activity.type === 'ranking' && <TrendingUp className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No hay actividad reciente</p>
                <p className="text-gray-500 text-sm mt-2">
                  Participa en torneos para ver tu actividad aquí
                </p>
              </div>
            )}
          </div>
          
          {/* Quick Links - Only for non-Entrenador users */}
          {userRole !== 'Entrenador' && (
            <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                ¿Necesitas ayuda o quieres conectar con otros jugadores?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/aimleague"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Únete a Discord</span>
                </a>
                <Link
                  to="/tournaments"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Ver Torneos</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;