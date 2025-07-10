import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  Users, 
  Trophy, 
  Award, 
  TrendingUp,
  Crown,
  GraduationCap,
  ChevronRight,
  Calendar,
  Target,
  Plus,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';

interface TeamSummary {
  id: string;
  nombre: string;
  logo: string;
  miembros: number;
  ranking: string;
  torneos: number;
  victorias: number;
  proximoEvento?: {
    tipo: string;
    fecha: string;
  };
}

const TeamsListPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'coach1';
  const userRole = localStorage.getItem('userRole') || 'Coach';
  
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');
  const [teams, setTeams] = useState<TeamSummary[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Only coaches should access this page
    if (userRole !== 'Coach') {
      navigate('/dashboard');
      return;
    }
    
    // Initialize teams data
    setTeams(getCoachTeams());
  }, [navigate, userRole]);

  // Mock data for coach's teams
  const getCoachTeams = (): TeamSummary[] => {
    if (username === 'coach1') {
      return [
        {
          id: 'team-pro',
          nombre: 'Team Pro',
          logo: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          miembros: 6,
          ranking: '#8',
          torneos: 5,
          victorias: 3,
          proximoEvento: {
            tipo: 'Entrenamiento de Aim',
            fecha: '14/07/2025 20:00'
          }
        },
        {
          id: 'team-sigma',
          nombre: 'Team Sigma',
          logo: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          miembros: 5,
          ranking: '#15',
          torneos: 3,
          victorias: 1,
          proximoEvento: {
            tipo: 'Partido vs Team Delta',
            fecha: '16/07/2025 19:00'
          }
        },
        {
          id: 'team-alpha',
          nombre: 'Team Alpha',
          logo: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          miembros: 4,
          ranking: '#22',
          torneos: 2,
          victorias: 0,
          proximoEvento: {
            tipo: 'Análisis de Demos',
            fecha: '18/07/2025 18:00'
          }
        }
      ];
    }
    return [];
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTeamName.trim()) {
      return;
    }

    // Create new team
    const newTeam: TeamSummary = {
      id: `team-${newTeamName.toLowerCase().replace(/\s+/g, '-')}`,
      nombre: newTeamName,
      logo: teamLogo || "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      miembros: 1, // Just the coach initially
      ranking: '#--',
      torneos: 0,
      victorias: 0
    };

    // Add to teams list
    setTeams(prevTeams => [...prevTeams, newTeam]);
    
    // Reset form
    setIsCreatingTeam(false);
    setNewTeamName('');
    setTeamLogo('');
    
    console.log('Creating team:', newTeamName);
  };

  const getEventIcon = (tipo: string) => {
    if (tipo.includes('Entrenamiento') || tipo.includes('Análisis')) {
      return <Target className="w-4 h-4 text-cyan-400" />;
    }
    if (tipo.includes('Partido') || tipo.includes('Torneo')) {
      return <Trophy className="w-4 h-4 text-yellow-400" />;
    }
    return <Calendar className="w-4 h-4 text-gray-400" />;
  };

  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(' ');
    const [day, month] = date.split('/');
    return `${day}/${month} - ${time}`;
  };

  if (userRole !== 'Coach') {
    return null;
  }

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
                <Shield className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Mis Equipos</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Gestiona todos los equipos bajo tu supervisión
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

          {/* Coach Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Panel de Entrenador</h2>
            </div>
            <p className="text-gray-300">
              Desde aquí puedes gestionar todos los equipos en los que eres entrenador.
            </p>
          </div>

          {/* Create Team Button */}
          <div className="mb-8">
            <button
              onClick={() => setIsCreatingTeam(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Crear nuevo equipo</span>
            </button>
          </div>

          {/* Create Team Form */}
          {isCreatingTeam && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Crear Nuevo Equipo</h3>
              <form onSubmit={handleCreateTeam} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre del Equipo *
                  </label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                    placeholder="Ej: Team Omega"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Logo del Equipo (Opcional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={teamLogo}
                      onChange={(e) => setTeamLogo(e.target.value)}
                      className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                      placeholder="URL de la imagen del logo"
                    />
                    <button
                      type="button"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Subir</span>
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Puedes agregar un logo más tarde desde la configuración del equipo.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-purple-400 font-semibold mb-2">Como entrenador:</p>
                      <ul className="text-purple-300 text-sm space-y-1">
                        <li>• Tendrás control total sobre el equipo</li>
                        <li>• Podrás invitar y gestionar jugadores</li>
                        <li>• Programar entrenamientos y estrategias</li>
                        <li>• Inscribir el equipo en torneos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Crear Equipo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingTeam(false);
                      setNewTeamName('');
                      setTeamLogo('');
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Teams Grid */}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  to={`/dashboard/equipo/${team.id}`}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  {/* Team Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={team.logo} 
                        alt={`${team.nombre} Logo`} 
                        className="w-16 h-16 rounded-lg object-cover border-2 border-cyan-500/30"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {team.nombre}
                        </h3>
                        <p className="text-gray-400">{team.miembros} miembros</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{team.ranking}</div>
                      <div className="text-gray-400 text-sm">Ranking</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{team.torneos}</div>
                      <div className="text-gray-400 text-sm">Torneos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{team.victorias}</div>
                      <div className="text-gray-400 text-sm">Victorias</div>
                    </div>
                  </div>

                  {/* Next Event */}
                  {team.proximoEvento && (
                    <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        {getEventIcon(team.proximoEvento.tipo)}
                        <div>
                          <p className="text-white font-semibold text-sm">{team.proximoEvento.tipo}</p>
                          <p className="text-gray-400 text-xs">{formatDate(team.proximoEvento.fecha)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Shield className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No tienes equipos asignados
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Contacta con la administración para que te asignen equipos para entrenar.
              </p>
            </div>
          )}

          {/* Overall Statistics */}
          {teams.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Estadísticas Generales</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{teams.length}</div>
                  <div className="text-gray-300 font-semibold">Equipos</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {teams.reduce((total, team) => total + team.miembros, 0)}
                  </div>
                  <div className="text-gray-300 font-semibold">Jugadores</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <Trophy className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {teams.reduce((total, team) => total + team.torneos, 0)}
                  </div>
                  <div className="text-gray-300 font-semibold">Torneos</div>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                  <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {teams.reduce((total, team) => total + team.victorias, 0)}
                  </div>
                  <div className="text-gray-300 font-semibold">Victorias</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Herramientas de Entrenador
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard/agenda"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Ver Agenda Completa</span>
              </Link>
              <Link
                to="/tournaments"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Inscribir en Torneos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsListPage;