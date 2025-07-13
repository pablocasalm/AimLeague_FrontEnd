import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  Crown, 
  Settings, 
  UserPlus, 
  Trophy, 
  Award, 
  TrendingUp,
  Users,
  Plus,
  Trash2,
  Edit,
  Upload,
  AlertCircle,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import {teamService} from '../../services/teamService';
import { getNumber, setNumber } from '../utils/storageNumber';
import { UserRole } from '../utils/roleMapping';
import { mapRole} from '../utils/teamRoleMapping';


interface Team {
  teamId: number;
  teamName: string;
  members: TeamMember[];
  ImageUrl?: string;
  membersRole: MembersRole[];
  wins: number;
  tournamentsPlayed: number;
  matchesPlayed: number;
}

interface TeamMember{
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  teamRole: string;
}

interface MembersRole {
  userId: number;
  role: string;
}

interface CreateTeam {
  TeamName: string;
  TeamRole: Number;
  ImageUrl?: string;
}

interface CreateTeamResult {
  TeamId: number,
  Message: string,
  Success: boolean,
}

const TeamPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams<{ teamId: string }>();
  const username = localStorage.getItem('username') || 'user1';
  const userRole = localStorage.getItem('userRole') || 'Usuario';
  const userTeamRole = localStorage.getItem('userTeamRole') || 'Jugador';

  // Check if user should have access to this page
  const hasTeamAccess = userRole === 'Jugador' || userRole === 'Usuario' || userRole === 'Coach';

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Check if user has team access
    if (!hasTeamAccess) {
      navigate('/dashboard');
      return;
    }

    const load = async () => {
      try {
        
          const data = await teamService.getTeamInfo(getNumber('teamid'));
          setTeamData(data);
          mapMemberRoleToTeamRole(data.members, data.membersRole);
          setHasTeam(true);
          
        
      } catch (e: any) {
        console.error('Error loading team data:', e);
        setError('Error al cargar los datos del equipo');
      } finally {
        setIsLoading(false);
      }

    };

    load();
  }, [navigate, hasTeamAccess]);

  const mapMemberRoleToTeamRole = (TeamMembers: TeamMember[], MembersRole: MembersRole[]): void => {
    MembersRole.forEach(roleMember => {
      const member = TeamMembers.find(m => m.userId === roleMember.userId);
      if (member) {
        member.teamRole = mapRole(roleMember.role);
        if (localStorage.getItem('username') === member.username) {
              localStorage.setItem('userTeamRole', member.teamRole);    // MAY REDUNDANT SOMETIMES
        }
      }
    })
  }



  // Determine team state based on username
  const getTeamState = (specificTeamId?: string) => {
    // If teamId is provided (from URL), load specific team for coach
    if (specificTeamId && userRole === 'Coach') {
      return getCoachTeamData(specificTeamId);
    }
    
    // Default behavior for non-coach users
    switch (username) {
      case 'user1':
        return {
          hasTeam: true,
          teamData: {
            nombre: "Team Básico",
            logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            miembros: [
              { nombre: "user1", rol: "Capitán" as const, discord: "@user1" },
              { nombre: "Carlos López", rol: "Jugador" as const, discord: "@carlos_lopez" },
              { nombre: "Ana García", rol: "Jugador" as const, discord: "@ana_garcia" },
              { nombre: "Miguel Torres", rol: "Suplente" as const, discord: "@miguel_torres" }
            ],
            soyCapitan: true,
            soyCoach: false,
            tieneManagement: true
          }
        };
      
      case 'player1':
        return {
          hasTeam: true,
          teamData: {
            nombre: "Team Pro",
            logo: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            miembros: [
              { nombre: "player1", rol: "Jugador" as const, discord: "@player1" },
              { nombre: "Roberto Silva", rol: "Jugador" as const, discord: "@roberto_silva" },
              { nombre: "Laura Martín", rol: "Jugador" as const, discord: "@laura_martin" },
              { nombre: "Diego Fernández", rol: "Jugador" as const, discord: "@diego_fernandez" },
              { nombre: "Carmen Ruiz", rol: "Suplente" as const, discord: "@carmen_ruiz" },
              { nombre: "coach1", rol: "Coach" as const, discord: "@coach1" }
            ],
            soyCapitan: false,
            soyCoach: false,
            tieneManagement: false
          }
        };
      
      case 'coach1':
        return {
          hasTeam: true,
          teamData: {
            nombre: "Team Pro",
            logo: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            miembros: [
              { nombre: "player1", rol: "Jugador" as const, discord: "@player1" },
              { nombre: "Roberto Silva", rol: "Jugador" as const, discord: "@roberto_silva" },
              { nombre: "Laura Martín", rol: "Jugador" as const, discord: "@laura_martin" },
              { nombre: "Diego Fernández", rol: "Jugador" as const, discord: "@diego_fernandez" },
              { nombre: "Carmen Ruiz", rol: "Suplente" as const, discord: "@carmen_ruiz" },
              { nombre: "coach1", rol: "Coach" as const, discord: "@coach1" }
            ],
            soyCapitan: false,
            soyCoach: true,
            tieneManagement: true
          }
        };
      
      default:
        return {
          hasTeam: false,
          teamData: null
        };
    }
  };

  // Get specific team data for coaches
  const getCoachTeamData = (teamId: string) => {
    const coachTeams = {
      'team-pro': {
        hasTeam: true,
        teamData: {
          nombre: "Team Pro",
          logo: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
          miembros: [
            { nombre: "player1", rol: "Jugador" as const, discord: "@player1" },
            { nombre: "Roberto Silva", rol: "Jugador" as const, discord: "@roberto_silva" },
            { nombre: "Laura Martín", rol: "Jugador" as const, discord: "@laura_martin" },
            { nombre: "Diego Fernández", rol: "Jugador" as const, discord: "@diego_fernandez" },
            { nombre: "Carmen Ruiz", rol: "Suplente" as const, discord: "@carmen_ruiz" },
            { nombre: "coach1", rol: "Coach" as const, discord: "@coach1" }
          ],
          soyCapitan: false,
          soyCoach: true,
          tieneManagement: true
        }
      },
      'team-sigma': {
        hasTeam: true,
        teamData: {
          nombre: "Team Sigma",
          logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
          miembros: [
            { nombre: "Alex Moreno", rol: "Jugador" as const, discord: "@alex_moreno" },
            { nombre: "Sofia Herrera", rol: "Jugador" as const, discord: "@sofia_herrera" },
            { nombre: "Pablo Jiménez", rol: "Jugador" as const, discord: "@pablo_jimenez" },
            { nombre: "Elena Castro", rol: "Jugador" as const, discord: "@elena_castro" },
            { nombre: "coach1", rol: "Coach" as const, discord: "@coach1" }
          ],
          soyCapitan: false,
          soyCoach: true,
          tieneManagement: true
        }
      },
      'team-alpha': {
        hasTeam: true,
        teamData: {
          nombre: "Team Alpha",
          logo: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
          miembros: [
            { nombre: "Mario Vega", rol: "Jugador" as const, discord: "@mario_vega" },
            { nombre: "Lucia Ramos", rol: "Jugador" as const, discord: "@lucia_ramos" },
            { nombre: "Andrés Peña", rol: "Jugador" as const, discord: "@andres_pena" },
            { nombre: "Natalia Ortiz", rol: "Suplente" as const, discord: "@natalia_ortiz" },
            { nombre: "coach1", rol: "Coach" as const, discord: "@coach1" }
          ],
          soyCapitan: false,
          soyCoach: true,
          tieneManagement: true
        }
      }
    };

    return coachTeams[teamId as keyof typeof coachTeams] || { hasTeam: false, teamData: null };
  };

  const { hasTeam: initialHasTeam, teamData: initialTeamData } = getTeamState(teamId);
  const [hasTeam, setHasTeam] = useState(initialHasTeam);
  const [teamData, setTeamData] = useState<Team | null>({
    teamId: -1,
    teamName: '',
    members: [],
    ImageUrl: '',
    membersRole: [],
    wins: 0,
    tournamentsPlayed: 0,
    matchesPlayed: 0,
  });
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [Error, setError] = useState<string | null>(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [CreateTeamData, setCreateTeamData] = useState<CreateTeam>({
    TeamName: '',
    TeamRole: userRole == 'coach' ? 2 : 1,
    ImageUrl: '',
  });

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    const name = CreateTeamData.TeamName.trim();
    if (!name) {
      setError('El nombre del equipo no puede estar vacío');
      return;
    }
    setIsLoading(true);
    try{
        const result = await teamService.createTeam({
          TeamName: CreateTeamData.TeamName,
          TeamRole: CreateTeamData.TeamRole,
        }) as CreateTeamResult;

        if (!result.Success) {
          setError(result.Message || 'Error al crear el equipo');
        } else {
          setNumber('teamid', result.TeamId);
          setHasTeam(true);
          setIsCreatingTeam(false);
        }
    } catch (err: any) {
      console.error('CreateTeam error:', err);
      setError(err.message || 'Error de red al crear el equipo');
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleInputChange = (field: keyof CreateTeam, value: string) => {
    setCreateTeamData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const handleInvitePlayer = () => {
    alert('Funcionalidad de invitar jugador - próximamente');
  };

  const handleRemovePlayer = async (memberId: number) => {
    if (!teamData) return;
    setIsLoading(true);
    try {
      await teamService.removeMember({ TeamId: teamData.teamId, UserId: memberId });
      // recargo lista
      const data = await teamService.getTeamInfo(teamData.teamId);
      setTeamData(data);
    } catch (e: any) {
      setError(e.message || 'Error eliminando miembro');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTeam = () => {
    alert('Funcionalidad de editar equipo - próximamente');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Capitán':
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 'Coach':
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      default:
        return null;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Capitán':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'Coach':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'Suplente':
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
    }
  };

  const getManagementMessage = (role: string) => {
    if (role === 'Capitán') {
      return null; // No message needed for captains
    }
    if (role === 'Coach') {
      return null; // No message needed for coaches
    }
    return "No puedes realizar cambios en el equipo.";
  };

  // Determine back link based on user role and context
  const getBackLink = () => {
    if (userRole === 'Coach' && teamId) {
      return '/dashboard/mis-equipos';
    }
    return '/dashboard';
  };

  const getBackText = () => {
    if (userRole === 'Coach' && teamId) {
      return 'Volver a Mis Equipos';
    }
    return 'Volver al Dashboard';
  };

  if (!hasTeamAccess) {
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
                <h1 className="text-3xl font-bold text-white">Mi Equipo</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Gestiona tu equipo y coordina con tus compañeros
              </p>
            </div>
            <Link 
              to={getBackLink()}
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{getBackText()}</span>
            </Link>
          </div>

          {/* No Team State */}
          {!hasTeam && !isCreatingTeam && (
            <div className="text-center py-16">
              <Shield className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                Actualmente no formas parte de ningún equipo.
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Crea tu propio equipo o únete a uno existente para comenzar a competir en torneos.
              </p>
              <button
                onClick={() => setIsCreatingTeam(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Crear Equipo</span>
              </button>
            </div>
          )}

          {/* Create Team Form */}
          {isCreatingTeam && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Crear Nuevo Equipo</h3>
              <form onSubmit={handleCreateTeam} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre del Equipo *
                  </label>
                  <input
                    type="text"
                    value={CreateTeamData.TeamName}
                    onChange={(e) => handleInputChange('TeamName', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                    placeholder="Ej: Fire Dragons"
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
                      value={CreateTeamData.ImageUrl}
                      onChange={(e) => handleInputChange('ImageUrl', e.target.value)}
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

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-semibold mb-2">Información importante:</p>
                      <ul className="text-blue-300 text-sm space-y-1">
                        <li>• Serás automáticamente el capitán del equipo</li>
                        <li>• Podrás invitar hasta 4 jugadores más</li>
                        <li>• El nombre del equipo no se puede cambiar después</li>
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
                    onClick={handleCreateTeam}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Team Management */}
          {hasTeam && teamData && (
            <div className="space-y-8">
              {/* Team Header */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <img 
                      src={teamData.ImageUrl || 'https://via.placeholder.com/100'} 
                      alt="Team Logo" 
                      className="w-20 h-20 rounded-lg object-cover border-2 border-cyan-500/30"
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-white">{teamData.teamName}</h2>
                      <p className="text-gray-400">{teamData.members.length} miembros</p>
                      <div className="flex items-center space-x-4 mt-2">
                        {userTeamRole === "Capitán" && (
                          <div className="flex items-center space-x-2">
                            <Crown className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">Eres el capitán</span>
                          </div>
                        )}
                        {userTeamRole === 'Coach' && (
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-5 h-5 text-purple-400" />
                            <span className="text-purple-400 font-semibold">Eres el entrenador</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {userTeamRole === 'Coach' || userTeamRole === 'Capitán' && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleInvitePlayer}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span>Invitar Jugador</span>
                      </button>
                      <button
                        onClick={handleEditTeam}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Edit className="w-5 h-5" />
                        <span>Editar Equipo</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Miembros del Equipo</h3>
                <div className="space-y-4">
                  {teamData.members.map((miembro, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {miembro.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <span className="text-white font-semibold text-lg">{miembro.username}</span>
                              {getRoleIcon(miembro.teamRole)}
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getRoleBadgeColor(miembro.teamRole)}`}>
                                {miembro.teamRole}
                              </span>
                            </div>
                            <p className="text-gray-400">{miembro.firstName} {miembro.lastName}</p>
                          </div>
                        </div>
                        
                        {(userTeamRole === 'Capitán' || userTeamRole === 'Coach') && miembro.teamRole !== 'Capitán' && miembro.teamRole !== 'Coach' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleRemovePlayer(miembro.userId)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors duration-300"
                              title="Eliminar jugador"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                              title="Configurar jugador"
                            >
                              <Settings className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {userTeamRole === 'None' && (
                  <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-400 text-center">
                      {getManagementMessage(userTeamRole)}
                    </p>
                  </div>
                )}  
              </div>

              {/* Team Statistics */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Estadísticas del Equipo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                    <Trophy className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      {teamData.tournamentsPlayed}
                    </div>
                    <div className="text-gray-300 font-semibold">Torneos Jugados</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                    <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      {teamData.wins}
                    </div>
                    <div className="text-gray-300 font-semibold">Victorias</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors duration-300">
                    <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      {teamData.matchesPlayed}
                    </div>
                    <div className="text-gray-300 font-semibold">Partidos Jugados</div>
                  </div>
                </div>
              </div>

              {/* Team Actions */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  ¿Listo para competir?
                </h3>
                <p className="text-gray-300 text-center mb-6">
                  Tu equipo está {teamData.tournamentsPlayed > 5 ? "experimentado y" : ""} listo para participar en torneos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/tournaments"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Ver Torneos</span>
                  </Link>
                  <Link
                    to="/dashboard/agenda"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Ver Agenda</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;