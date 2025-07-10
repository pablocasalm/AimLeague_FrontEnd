import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  AlertCircle,
  CheckCircle,
  Crown,
  GraduationCap,
  Shield,
  ChevronDown
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';

interface Tournament {
  id: string;
  nombre: string;
  fecha: string;
  fechaLimite: string;
  descripcion: string;
  equipos: number;
  maxEquipos: number;
  premio: string;
  tipo: string;
  estado: 'Inscripciones Abiertas' | 'Próximamente' | 'Cerrado';
}

const AvailableTournamentsPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user1';
  const userRole = localStorage.getItem('userRole') || 'Usuario';
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Mock tournaments data
  const tournaments: Tournament[] = [
    {
      id: 'torneo-agosto-2025',
      nombre: 'Torneo Agosto 2025',
      fecha: '15 de agosto de 2025',
      fechaLimite: '10 de agosto de 2025',
      descripcion: 'Competencia mensual abierta para equipos amateur. Formato eliminación directa con premios en efectivo.',
      equipos: 18,
      maxEquipos: 32,
      premio: '$600 USD',
      tipo: 'Eliminación Directa',
      estado: 'Inscripciones Abiertas'
    },
    {
      id: 'liga-septiembre-2025',
      nombre: 'Liga Septiembre 2025',
      fecha: '1 - 30 de septiembre de 2025',
      fechaLimite: '25 de agosto de 2025',
      descripcion: 'Liga mensual con sistema de puntos. Los mejores equipos clasifican a playoffs.',
      equipos: 12,
      maxEquipos: 24,
      premio: '$800 USD',
      tipo: 'Liga Regular',
      estado: 'Inscripciones Abiertas'
    },
    {
      id: 'copa-otono-2025',
      nombre: 'Copa de Otoño 2025',
      fecha: '15 de octubre de 2025',
      fechaLimite: '10 de octubre de 2025',
      descripcion: 'El torneo más grande del año con equipos de toda Latinoamérica.',
      equipos: 8,
      maxEquipos: 64,
      premio: '$1500 USD',
      tipo: 'Doble Eliminación',
      estado: 'Próximamente'
    },
    {
      id: 'torneo-relampago-agosto',
      nombre: 'Torneo Relámpago Agosto',
      fecha: '20 de agosto de 2025',
      fechaLimite: '18 de agosto de 2025',
      descripcion: 'Torneo de un día con partidas rápidas. Ideal para equipos nuevos.',
      equipos: 14,
      maxEquipos: 16,
      premio: '$200 USD',
      tipo: 'Eliminación Directa',
      estado: 'Inscripciones Abiertas'
    },
    {
      id: 'academy-championship',
      nombre: 'Academy Championship',
      fecha: '5 de septiembre de 2025',
      fechaLimite: '1 de septiembre de 2025',
      descripcion: 'Torneo exclusivo para equipos de la academia. Perfecto para demostrar el progreso.',
      equipos: 6,
      maxEquipos: 16,
      premio: '$300 USD',
      tipo: 'Swiss System',
      estado: 'Inscripciones Abiertas'
    }
  ];

  // Get user's team and role information
  const getUserTeamInfo = () => {
    switch (username) {
      case 'user1':
        return {
          hasTeam: true,
          teamName: 'Team Básico',
          isCapitan: true,
          hasCoach: false
        };
      case 'player1':
        return {
          hasTeam: true,
          teamName: 'Team Pro',
          isCapitan: false,
          hasCoach: true
        };
      case 'coach1':
        return {
          hasTeam: true,
          teamName: null, // Coaches manage multiple teams
          isCapitan: false,
          hasCoach: false,
          teams: [
            { id: 'team-pro', name: 'Team Pro' },
            { id: 'team-sigma', name: 'Team Sigma' },
            { id: 'team-alpha', name: 'Team Alpha' }
          ]
        };
      default:
        return {
          hasTeam: false,
          teamName: null,
          isCapitan: false,
          hasCoach: false
        };
    }
  };

  const userTeamInfo = getUserTeamInfo();

  // Determine button state and message based on user role and team status
  const getRegistrationInfo = () => {
    if (!userTeamInfo.hasTeam) {
      return {
        canRegister: false,
        buttonText: 'Sin Equipo',
        message: 'Necesitas formar parte de un equipo para inscribirte en torneos.',
        buttonClass: 'bg-gray-600 cursor-not-allowed'
      };
    }

    if (userRole === 'Coach') {
      return {
        canRegister: true,
        buttonText: 'Inscribir Equipo',
        message: 'Puedes inscribir a cualquiera de tus equipos al siguiente torneo.',
        buttonClass: 'bg-cyan-500 hover:bg-cyan-600',
        showTeamSelector: true
      };
    }

    if (userRole === 'Usuario' && userTeamInfo.isCapitan) {
      return {
        canRegister: true,
        buttonText: 'Inscribirse',
        message: 'Puedes inscribir a tu equipo a cualquier torneo.',
        buttonClass: 'bg-cyan-500 hover:bg-cyan-600'
      };
    }

    if (userRole === 'Usuario' && !userTeamInfo.isCapitan) {
      return {
        canRegister: false,
        buttonText: 'Solo Capitán',
        message: 'Solo el capitán del equipo puede inscribir al equipo a los torneos.',
        buttonClass: 'bg-gray-600 cursor-not-allowed'
      };
    }

    if (userRole === 'Jugador') {
      return {
        canRegister: false,
        buttonText: 'Solo Coach',
        message: 'Únicamente el coach puede inscribir al equipo a los torneos.',
        buttonClass: 'bg-gray-600 cursor-not-allowed'
      };
    }

    return {
      canRegister: false,
      buttonText: 'No Disponible',
      message: 'No tienes permisos para inscribir equipos.',
      buttonClass: 'bg-gray-600 cursor-not-allowed'
    };
  };

  const registrationInfo = getRegistrationInfo();

  const handleRegister = (tournamentId: string) => {
    if (!registrationInfo.canRegister) {
      return;
    }

    if (userRole === 'Coach' && !selectedTeam) {
      alert('Por favor selecciona un equipo para inscribir.');
      return;
    }

    const teamToRegister = userRole === 'Coach' ? selectedTeam : userTeamInfo.teamName;
    console.log(`Registering ${teamToRegister} for tournament ${tournamentId}`);
    alert(`¡Equipo ${teamToRegister} inscrito exitosamente en el torneo!`);
  };

  const getStatusColor = (estado: Tournament['estado']) => {
    switch (estado) {
      case 'Inscripciones Abiertas':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Próximamente':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Cerrado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (estado: Tournament['estado']) => {
    switch (estado) {
      case 'Inscripciones Abiertas':
        return <CheckCircle className="w-4 h-4" />;
      case 'Próximamente':
        return <Clock className="w-4 h-4" />;
      case 'Cerrado':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const isDeadlineSoon = (fechaLimite: string) => {
    // Mock logic - in real app would compare with current date
    return fechaLimite.includes('agosto');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Trophy className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Torneos Disponibles</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Inscríbete en los próximos torneos y compite por premios
              </p>
            </div>
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Dashboard</span>
            </Link>
          </div>

          {/* User Status Info */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg">
                {userRole === 'Coach' ? (
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                ) : userTeamInfo.isCapitan ? (
                  <Crown className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Shield className="w-6 h-6 text-cyan-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Estado de Inscripción</h3>
                <p className="text-gray-300 mb-3">{registrationInfo.message}</p>
                
                {userTeamInfo.hasTeam && (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Tu rol:</span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30">
                      {userRole === 'Coach' ? 'Entrenador' : userTeamInfo.isCapitan ? 'Capitán' : 'Jugador'}
                    </span>
                    {userTeamInfo.teamName && (
                      <>
                        <span className="text-gray-400">Equipo:</span>
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                          {userTeamInfo.teamName}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Selector for Coaches */}
          {registrationInfo.showTeamSelector && userTeamInfo.teams && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Seleccionar Equipo para Inscripción</h3>
              <div className="relative">
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 appearance-none"
                >
                  <option value="">Selecciona un equipo...</option>
                  {userTeamInfo.teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {tournaments.map((tournament) => (
              <div 
                key={tournament.id} 
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Tournament Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white line-clamp-2">
                    {tournament.nombre}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(tournament.estado)}`}>
                    {getStatusIcon(tournament.estado)}
                    <span>{tournament.estado}</span>
                  </span>
                </div>

                {/* Tournament Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{tournament.fecha}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">
                      Límite de inscripción: {tournament.fechaLimite}
                      {isDeadlineSoon(tournament.fechaLimite) && (
                        <span className="ml-2 bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                          ¡Pronto!
                        </span>
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{tournament.equipos}/{tournament.maxEquipos} equipos</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Award className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{tournament.premio}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{tournament.tipo}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {tournament.descripcion}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Equipos inscritos</span>
                    <span>{tournament.equipos}/{tournament.maxEquipos}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tournament.equipos / tournament.maxEquipos) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRegister(tournament.id)}
                    disabled={!registrationInfo.canRegister || tournament.estado !== 'Inscripciones Abiertas'}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 ${
                      tournament.estado === 'Inscripciones Abiertas' && registrationInfo.canRegister
                        ? registrationInfo.buttonClass
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>
                      {tournament.estado === 'Inscripciones Abiertas' 
                        ? registrationInfo.buttonText 
                        : tournament.estado === 'Próximamente' 
                        ? 'Próximamente' 
                        : 'Cerrado'
                      }
                    </span>
                  </button>
                  
                  <Link
                    to={`/tournaments/${tournament.id}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              ¿Necesitas ayuda con las inscripciones?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Para Capitanes:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Puedes inscribir directamente a tu equipo</li>
                  <li>• Asegúrate de tener al menos 5 jugadores</li>
                  <li>• Revisa las fechas límite de inscripción</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Para Jugadores:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Habla con tu capitán o entrenador</li>
                  <li>• Mantente al día con los entrenamientos</li>
                  <li>• Únete al Discord para coordinación</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a
                href="https://discord.gg/aimleague"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Únete a Discord</span>
              </a>
              <Link
                to={userRole === 'Coach' ? '/dashboard/mis-equipos' : '/dashboard/equipo'}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>{userRole === 'Coach' ? 'Gestionar Equipos' : 'Ver Mi Equipo'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTournamentsPage;