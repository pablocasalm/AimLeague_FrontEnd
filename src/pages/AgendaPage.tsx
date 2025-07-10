import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Trophy, 
  Target, 
  MessageSquare, 
  Clock,
  Users,
  ArrowLeft,
  AlertCircle,
  GraduationCap,
  Shield
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';

interface Event {
  id: number;
  tipo: 'Torneo' | 'Academia' | 'Feedback' | 'Entrenamiento';
  titulo: string;
  fecha: string;
  equipoAsignado: string;
  descripcion?: string;
}

const AgendaPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'user1';
  const userRole = localStorage.getItem('userRole') || 'Usuario';

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Get user's team name based on username
  const getUserTeam = (): string | null => {
    // For coaches, we need to get all their teams' events
    if (userRole === 'Coach' && username === 'coach1') {
      // Return a special identifier for coaches to see all their teams' events
      return 'COACH_ALL_TEAMS';
    }
    
    switch (username) {
      case 'user1':
        return 'Team Básico';
      case 'player1':
        return 'Team Pro';
      default:
        return null; // No team assigned
    }
  };

  const userTeam = getUserTeam();

  // Mock events data - now with team assignments
  const allEvents: Event[] = [
    {
      id: 1,
      tipo: 'Torneo',
      titulo: 'Partido vs Team Omega',
      fecha: '12/07/2025 18:00',
      equipoAsignado: 'Team Pro',
      descripcion: 'Semifinal del torneo CS2 Clash - Julio. Mapa: Mirage'
    },
    {
      id: 2,
      tipo: 'Academia',
      titulo: 'Entrenamiento de Aim',
      fecha: '14/07/2025 20:00',
      equipoAsignado: 'Team Pro',
      descripcion: 'Sesión grupal de entrenamiento de puntería y crosshair placement'
    },
    {
      id: 3,
      tipo: 'Feedback',
      titulo: 'Revisión de demo',
      fecha: '15/07/2025 17:00',
      equipoAsignado: 'Team Pro',
      descripcion: 'Análisis de la partida anterior con coach especializado'
    },
    {
      id: 4,
      tipo: 'Torneo',
      titulo: 'Final Copa de Verano',
      fecha: '18/07/2025 19:30',
      equipoAsignado: 'Team Básico',
      descripcion: 'Gran final del torneo más importante del año'
    },
    {
      id: 5,
      tipo: 'Entrenamiento',
      titulo: 'Estrategias de Equipo',
      fecha: '20/07/2025 21:00',
      equipoAsignado: 'Team Pro',
      descripcion: 'Tácticas avanzadas y coordinación grupal'
    },
    {
      id: 6,
      tipo: 'Academia',
      titulo: 'Análisis de Mapas',
      fecha: '22/07/2025 18:30',
      equipoAsignado: 'Team Básico',
      descripcion: 'Estudio detallado de callouts y posiciones en Dust2'
    },
    {
      id: 7,
      tipo: 'Torneo',
      titulo: 'Partido vs Team Delta',
      fecha: '25/07/2025 19:00',
      equipoAsignado: 'Team Básico',
      descripcion: 'Cuartos de final - Torneo Amateur League'
    },
    {
      id: 8,
      tipo: 'Entrenamiento',
      titulo: 'Scrimmage vs Team Alpha',
      fecha: '28/07/2025 20:30',
      equipoAsignado: 'Team Pro',
      descripcion: 'Partida de práctica para preparar el próximo torneo'
    },
    {
      id: 9,
      tipo: 'Entrenamiento',
      titulo: 'Sesión de Estrategias',
      fecha: '30/07/2025 19:00',
      equipoAsignado: 'Team Sigma',
      descripcion: 'Desarrollo de nuevas tácticas para el próximo torneo'
    },
    {
      id: 10,
      tipo: 'Academia',
      titulo: 'Entrenamiento Individual',
      fecha: '02/08/2025 18:00',
      equipoAsignado: 'Team Alpha',
      descripcion: 'Sesiones personalizadas de mejora técnica'
    }
  ];

  // Filter events based on user's team or coach status
  const filteredEvents = (() => {
    if (!userTeam) return [];
    
    if (userTeam === 'COACH_ALL_TEAMS') {
      // Coach sees events from all their teams
      const coachTeams = ['Team Pro', 'Team Sigma', 'Team Alpha'];
      return allEvents.filter(event => coachTeams.includes(event.equipoAsignado));
    }
    
    return allEvents.filter(event => event.equipoAsignado === userTeam);
  })();

  const getEventIcon = (tipo: Event['tipo']) => {
    switch (tipo) {
      case 'Torneo':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'Academia':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Feedback':
        return <MessageSquare className="w-5 h-5 text-green-400" />;
      case 'Entrenamiento':
        return <Users className="w-5 h-5 text-purple-400" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEventColor = (tipo: Event['tipo']) => {
    switch (tipo) {
      case 'Torneo':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'Academia':
        return 'border-cyan-500/30 bg-cyan-500/10';
      case 'Feedback':
        return 'border-green-500/30 bg-green-500/10';
      case 'Entrenamiento':
        return 'border-purple-500/30 bg-purple-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const getBadgeColor = (tipo: Event['tipo']) => {
    switch (tipo) {
      case 'Torneo':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Academia':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Feedback':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Entrenamiento':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    const dayName = dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
    const monthName = dateObj.toLocaleDateString('es-ES', { month: 'long' });
    
    return {
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      date: `${day} de ${monthName}`,
      time: time
    };
  };

  const isEventSoon = (dateString: string) => {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hours, minutes] = time.split(':');
    
    const eventDate = new Date(
      parseInt(year), 
      parseInt(month) - 1, 
      parseInt(day), 
      parseInt(hours), 
      parseInt(minutes)
    );
    
    const now = new Date();
    const diffHours = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return diffHours <= 24 && diffHours > 0;
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
                <Calendar className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Mi Agenda</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Eventos programados para tu equipo
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

          {/* Team Info */}
          {userTeam && userTeam !== 'COACH_ALL_TEAMS' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">Tu equipo:</span>
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30">
                  {userTeam}
                </span>
                <span className="text-gray-400 text-sm">
                  • Mostrando eventos de tu equipo
                </span>
              </div>
            </div>
          )}

          {/* Coach Teams Info */}
          {userTeam === 'COACH_ALL_TEAMS' && (
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Vista de Entrenador:</span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                  Todos mis equipos
                </span>
                <span className="text-gray-400 text-sm">
                  • Mostrando eventos de Team Pro, Team Sigma y Team Alpha
                </span>
              </div>
            </div>
          )}

          {/* No Team Message */}
          {!userTeam && (
            <div className="text-center py-16">
              <Calendar className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No tienes un equipo asignado
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Para ver eventos en tu agenda, primero debes formar parte de un equipo o crear uno nuevo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard/equipo"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Gestionar Equipo</span>
                </Link>
                <Link
                  to="/tournaments"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Ver Torneos</span>
                </Link>
              </div>
            </div>
          )}

          {/* Events List */}
          {userTeam && filteredEvents.length > 0 && (
            <div className="space-y-6">
              {filteredEvents.map((event) => {
                const dateInfo = formatDate(event.fecha);
                const isSoon = isEventSoon(event.fecha);
                
                return (
                  <div 
                    key={event.id} 
                    className={`border rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 ${getEventColor(event.tipo)}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Event Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="bg-gray-800 p-2 rounded-lg">
                            {getEventIcon(event.tipo)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-xl font-bold text-white">{event.titulo}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeColor(event.tipo)}`}>
                                {event.tipo}
                              </span>
                              {isSoon && (
                                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-medium border border-orange-500/30 flex items-center space-x-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>Próximo</span>
                                </span>
                              )}
                            </div>
                            {event.descripcion && (
                              <p className="text-gray-400 text-sm">{event.descripcion}</p>
                            )}
                          </div>
                        </div>

                        {/* Team Assignment */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-gray-400 text-sm">Equipo:</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium border border-cyan-500/30">
                            {event.equipoAsignado}
                          </span>
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="lg:text-right mt-4 lg:mt-0">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-w-[200px]">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold text-sm">Fecha y Hora</span>
                          </div>
                          <div className="text-white font-bold">{dateInfo.dayName}</div>
                          <div className="text-gray-300">{dateInfo.date}</div>
                          <div className="text-cyan-400 font-semibold text-lg">{dateInfo.time}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Events for Team */}
          {userTeam && userTeam !== 'COACH_ALL_TEAMS' && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No tienes eventos programados por ahora.
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Tu equipo <strong>{userTeam}</strong> no tiene eventos programados en este momento. 
                Inscríbete en torneos para ver tus próximos eventos aquí.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tournaments"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Ver Torneos</span>
                </Link>
                <a
                  href="https://discord.gg/aimleague"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Únete a Discord</span>
                </a>
              </div>
            </div>
          )}

          {/* No Events for Coach */}
          {userTeam === 'COACH_ALL_TEAMS' && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No hay eventos programados para tus equipos.
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Ninguno de tus equipos tiene eventos programados en este momento. 
                Programa entrenamientos o inscribe equipos en torneos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard/mis-equipos"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>Gestionar Equipos</span>
                </Link>
                <Link
                  to="/tournaments"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Ver Torneos</span>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {userTeam && filteredEvents.length > 0 && (
            <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                ¿Necesitas más información sobre tus eventos?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/aimleague"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Preguntar en Discord</span>
                </a>
                <Link
                  to={userRole === 'Coach' ? '/dashboard/mis-equipos' : '/dashboard/equipo'}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>{userRole === 'Coach' ? 'Gestionar Equipos' : 'Gestionar Equipo'}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Event Legend */}
          {userTeam && (
            <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-4">Tipos de Eventos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Torneo</div>
                    <div className="text-gray-400 text-sm">Partidas competitivas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Academia</div>
                    <div className="text-gray-400 text-sm">Entrenamientos técnicos</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-lg border border-green-500/30">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Feedback</div>
                    <div className="text-gray-400 text-sm">Revisiones y análisis</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Entrenamiento</div>
                    <div className="text-gray-400 text-sm">Práctica de equipo</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;