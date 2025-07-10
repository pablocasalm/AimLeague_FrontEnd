import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Award, 
  MapPin, 
  ArrowLeft, 
  MessageSquare, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Match {
  equipoA: string;
  equipoB: string;
  resultado: string;
  fecha?: string;
  hora?: string;
}

interface TournamentData {
  id: string;
  nombre: string;
  estado: 'Activo' | 'Finalizado' | 'Próximamente';
  fecha: string;
  descripcion: string;
  modalidad: string;
  premio: string;
  discord: string;
  equiposParticipantes: number;
  enfrentamientos: Match[];
  reglas?: string[];
  organizador?: string;
}

const TournamentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched based on the ID
  const getTournamentData = (tournamentId: string): TournamentData | null => {
    const tournaments: Record<string, TournamentData> = {
      'torneo-julio-2025': {
        id: 'torneo-julio-2025',
        nombre: 'Torneo Julio 2025',
        estado: 'Próximamente',
        fecha: '25 de julio de 2025',
        descripcion: 'Competencia abierta de CS2 para jugadores amateurs. Este torneo promete ser uno de los más emocionantes del año con equipos de toda Latinoamérica.',
        modalidad: 'Eliminación directa',
        premio: 'Premios en efectivo + medallas digitales',
        discord: 'https://discord.gg/aimleague',
        equiposParticipantes: 32,
        enfrentamientos: [
          { equipoA: 'Team Alpha', equipoB: 'Team Bravo', resultado: 'Por jugar', fecha: '25 Jul', hora: '18:00' },
          { equipoA: 'Team Charlie', equipoB: 'Team Delta', resultado: 'Por jugar', fecha: '25 Jul', hora: '19:00' },
          { equipoA: 'Fire Storm', equipoB: 'Ice Breakers', resultado: 'Por jugar', fecha: '25 Jul', hora: '20:00' },
          { equipoA: 'Shadow Hunters', equipoB: 'Thunder Bolts', resultado: 'Por jugar', fecha: '25 Jul', hora: '21:00' }
        ],
        reglas: [
          'Formato: Best of 3 (BO3) en todas las rondas',
          'Mapas: Mirage, Inferno, Dust2, Cache, Overpass',
          'Cada equipo debe tener 5 jugadores titulares + 1 suplente',
          'Prohibido el uso de software externo o modificaciones',
          'Tiempo límite: 15 minutos de retraso máximo'
        ],
        organizador: 'Aim League Staff'
      },
      'cs2-clash-julio': {
        id: 'cs2-clash-julio',
        nombre: 'CS2 Clash - Julio',
        estado: 'Activo',
        fecha: '20 de julio de 2025',
        descripcion: 'Competencia mensual abierta a nuevos equipos. Actualmente en fase de grupos.',
        modalidad: 'Liga Regular',
        premio: '$500 USD',
        discord: 'https://discord.gg/aimleague',
        equiposParticipantes: 24,
        enfrentamientos: [
          { equipoA: 'Elite Squad', equipoB: 'Pro Gamers', resultado: '16-12', fecha: '20 Jul', hora: 'Finalizado' },
          { equipoA: 'Night Wolves', equipoB: 'Cyber Ghosts', resultado: '14-16', fecha: '20 Jul', hora: 'Finalizado' },
          { equipoA: 'Storm Riders', equipoB: 'Phantom Strike', resultado: 'En curso', fecha: '20 Jul', hora: '19:30' },
          { equipoA: 'Blaze Fury', equipoB: 'Thunder Team', resultado: 'Por jugar', fecha: '21 Jul', hora: '18:00' }
        ],
        reglas: [
          'Formato: Best of 1 (BO1) en fase de grupos',
          'Playoffs: Best of 3 (BO3)',
          'Sistema de puntos: 3 pts victoria, 1 pt empate, 0 pts derrota',
          'Clasifican los 8 mejores equipos a playoffs'
        ],
        organizador: 'Aim League Staff'
      },
      'academy-cup-agosto': {
        id: 'academy-cup-agosto',
        nombre: 'Academy Cup Agosto',
        estado: 'Finalizado',
        fecha: '10 de agosto de 2025',
        descripcion: 'Torneo exclusivo para miembros de la Academy. ¡Felicitaciones a todos los participantes!',
        modalidad: 'Doble Eliminación',
        premio: '$200 USD',
        discord: 'https://discord.gg/aimleague',
        equiposParticipantes: 12,
        enfrentamientos: [
          { equipoA: 'Academy Stars', equipoB: 'Rising Phoenix', resultado: '16-8', fecha: '10 Ago', hora: 'Final' },
          { equipoA: 'Future Legends', equipoB: 'Dream Team', resultado: '16-14', fecha: '10 Ago', hora: 'Semifinal' },
          { equipoA: 'New Generation', equipoB: 'Young Guns', resultado: '12-16', fecha: '10 Ago', hora: 'Semifinal' },
          { equipoA: 'Academy Stars', equipoB: 'Future Legends', resultado: '16-10', fecha: '10 Ago', hora: 'Final' }
        ],
        reglas: [
          'Solo para miembros de Aim League Academy',
          'Formato: Best of 3 (BO3) en todas las rondas',
          'Doble eliminación: segunda oportunidad para todos',
          'Mapas seleccionados por los capitanes'
        ],
        organizador: 'Academy Staff'
      }
    };

    return tournaments[tournamentId] || null;
  };

  const tournament = getTournamentData(id || '');

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Torneo no encontrado</h2>
          <p className="text-gray-400 mb-6">El torneo que buscas no existe o ha sido eliminado.</p>
          <Link 
            to="/tournaments" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Ver Todos los Torneos
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (estado: TournamentData['estado']) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Finalizado':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Próximamente':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (estado: TournamentData['estado']) => {
    switch (estado) {
      case 'Activo':
        return <Clock className="w-5 h-5" />;
      case 'Finalizado':
        return <CheckCircle className="w-5 h-5" />;
      case 'Próximamente':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getMatchStatusColor = (resultado: string) => {
    if (resultado === 'Por jugar') return 'text-blue-400';
    if (resultado === 'En curso') return 'text-yellow-400';
    if (resultado.includes('-')) return 'text-green-400';
    return 'text-gray-400';
  };

  const handleRegisterClick = () => {
    navigate(`/register/${tournament.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/tournaments" 
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Torneos</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Detalles del <span className="text-cyan-400">Torneo</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tournament Header */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{tournament.nombre}</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  {tournament.descripcion}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <span className={`px-4 py-2 rounded-full text-lg font-medium border flex items-center space-x-2 ${getStatusColor(tournament.estado)}`}>
                  {getStatusIcon(tournament.estado)}
                  <span>{tournament.estado}</span>
                </span>
              </div>
            </div>

            {/* Tournament Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">Fecha</p>
                  <p className="text-white font-semibold">{tournament.fecha}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">Equipos</p>
                  <p className="text-white font-semibold">{tournament.equiposParticipantes} equipos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">Modalidad</p>
                  <p className="text-white font-semibold">{tournament.modalidad}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-sm">Premio</p>
                  <p className="text-white font-semibold">{tournament.premio}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Matches and Results */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bracket/Matches Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {tournament.estado === 'Finalizado' ? 'Resultados del Torneo' : 'Enfrentamientos'}
                </h3>
                <div className="space-y-4">
                  {tournament.enfrentamientos.map((match, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                          <div className="text-white font-semibold">{match.equipoA}</div>
                          <span className="text-gray-400">vs</span>
                          <div className="text-white font-semibold">{match.equipoB}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {match.fecha && match.hora && (
                            <div className="text-gray-400 text-sm">
                              {match.fecha} - {match.hora}
                            </div>
                          )}
                          <div className={`font-semibold ${getMatchStatusColor(match.resultado)}`}>
                            {match.resultado}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules Section */}
              {tournament.reglas && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Reglas del Torneo</h3>
                  <ul className="space-y-3">
                    {tournament.reglas.map((regla, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{regla}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Actions and Info */}
            <div className="space-y-6">
              {/* Registration Button */}
              {tournament.estado === 'Próximamente' && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-4">¡Inscríbete Ahora!</h4>
                  <p className="text-gray-300 mb-6">
                    Las inscripciones están abiertas. No pierdas la oportunidad de participar.
                  </p>
                  <button 
                    onClick={handleRegisterClick}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Inscribirse al Torneo
                  </button>
                </div>
              )}

              {/* Discord Link */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4">Únete al Discord</h4>
                <p className="text-gray-300 mb-4">
                  Conecta con otros participantes y mantente al día con las novedades del torneo.
                </p>
                <a 
                  href={tournament.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Unirse al Discord</span>
                </a>
              </div>

              {/* Tournament Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4">Información Adicional</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Organizador</p>
                    <p className="text-white font-semibold">{tournament.organizador}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Formato</p>
                    <p className="text-white font-semibold">{tournament.modalidad}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Participantes</p>
                    <p className="text-white font-semibold">{tournament.equiposParticipantes} equipos registrados</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4">¿Necesitas Ayuda?</h4>
                <p className="text-gray-300 mb-4 text-sm">
                  Si tienes preguntas sobre el torneo, contacta a nuestro equipo de soporte.
                </p>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 text-sm">
                  Contactar Soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;