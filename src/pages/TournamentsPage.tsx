import React, { useState } from 'react';
import { Trophy, Calendar, Users, Award, Clock, MapPin, ArrowLeft, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tournament {
  id: string;
  nombre: string;
  fecha: string;
  estado: 'Activo' | 'Finalizado' | 'Próximamente';
  descripcion: string;
  equipos?: number;
  premio?: string;
  tipo?: string;
}

const TournamentsPage = () => {
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Activo' | 'Finalizado' | 'Próximamente'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for tournaments
  const tournaments: Tournament[] = [
    {
      id: 'academy-cup-agosto',
      nombre: "Aim League Open #3",
      fecha: "15 de junio de 2025",
      estado: "Finalizado",
      descripcion: "Torneo amateur con más de 16 equipos participantes.",
      equipos: 16,
      premio: "$300 USD",
      tipo: "Eliminación Directa"
    },
    {
      id: 'cs2-clash-julio',
      nombre: "CS2 Clash - Julio",
      fecha: "20 de julio de 2025",
      estado: "Activo",
      descripcion: "Competencia mensual abierta a nuevos equipos.",
      equipos: 24,
      premio: "$500 USD",
      tipo: "Liga Regular"
    },
    {
      id: 'torneo-julio-2025',
      nombre: "Academy Cup Agosto",
      fecha: "10 de agosto de 2025",
      estado: "Próximamente",
      descripcion: "Torneo exclusivo para miembros de la Academy.",
      equipos: 12,
      premio: "$200 USD",
      tipo: "Doble Eliminación"
    },
    {
      id: 'liga-primavera-2024',
      nombre: "Liga de Primavera 2024",
      fecha: "15 - 30 de marzo de 2025",
      estado: "Finalizado",
      descripcion: "Liga estacional con formato de grupos y playoffs.",
      equipos: 32,
      premio: "$800 USD",
      tipo: "Liga + Playoffs"
    },
    {
      id: 'torneo-relampago-septiembre',
      nombre: "Torneo Relámpago Septiembre",
      fecha: "5 de septiembre de 2025",
      estado: "Próximamente",
      descripcion: "Torneo de un día con partidas rápidas.",
      equipos: 16,
      premio: "$150 USD",
      tipo: "Eliminación Directa"
    },
    {
      id: 'copa-verano-2025',
      nombre: "Copa de Verano 2025",
      fecha: "1 - 15 de junio de 2025",
      estado: "Activo",
      descripcion: "El torneo más grande del año con equipos de toda Latinoamérica.",
      equipos: 64,
      premio: "$1000 USD",
      tipo: "Doble Eliminación"
    },
    {
      id: 'clasificatorio-regional',
      nombre: "Clasificatorio Regional",
      fecha: "25 de mayo de 2025",
      estado: "Finalizado",
      descripcion: "Torneo clasificatorio para la Copa de Verano.",
      equipos: 20,
      premio: "Clasificación",
      tipo: "Swiss System"
    },
    {
      id: 'torneo-novatos',
      nombre: "Torneo de Novatos",
      fecha: "15 de octubre de 2025",
      estado: "Próximamente",
      descripcion: "Torneo especial para jugadores nuevos en la plataforma.",
      equipos: 24,
      premio: "$100 USD",
      tipo: "Liga Regular"
    }
  ];

  const getStatusColor = (estado: Tournament['estado']) => {
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

  const getStatusIcon = (estado: Tournament['estado']) => {
    switch (estado) {
      case 'Activo':
        return <Clock className="w-4 h-4" />;
      case 'Finalizado':
        return <Trophy className="w-4 h-4" />;
      case 'Próximamente':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesFilter = activeFilter === 'Todos' || tournament.estado === activeFilter;
    const matchesSearch = tournament.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFilterCount = (filter: Tournament['estado'] | 'Todos') => {
    if (filter === 'Todos') return tournaments.length;
    return tournaments.filter(t => t.estado === filter).length;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Trophy className="w-10 h-10 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                <span className="text-cyan-400">Torneos</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explora todos los torneos disponibles, inscríbete y compite por premios increíbles
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar torneos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors duration-300"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
                {(['Todos', 'Activo', 'Finalizado', 'Próximamente'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      activeFilter === filter
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{filter}</span>
                    <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">
                      {getFilterCount(filter)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tournament Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <div 
                key={tournament.id} 
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
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
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{tournament.fecha}</span>
                  </div>
                  
                  {tournament.equipos && (
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-sm">{tournament.equipos} equipos</span>
                    </div>
                  )}
                  
                  {tournament.premio && (
                    <div className="flex items-center text-gray-300">
                      <Award className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-sm">{tournament.premio}</span>
                    </div>
                  )}
                  
                  {tournament.tipo && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-sm">{tournament.tipo}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {tournament.descripcion}
                </p>

                {/* Action Button */}
                <Link 
                  to={`/tournaments/${tournament.id}`}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center ${
                  tournament.estado === 'Activo'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : tournament.estado === 'Próximamente'
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {tournament.estado === 'Activo' && 'Más Información'}
                  {tournament.estado === 'Próximamente' && 'Inscribir Equipo'}
                  {tournament.estado === 'Finalizado' && 'Ver Resultados'}
                </Link>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTournaments.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No se encontraron torneos
              </h3>
              <p className="text-gray-500">
                Intenta cambiar los filtros o el término de búsqueda
              </p>
            </div>
          )}

          {/* Tournament Info Section */}
          <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ¿Cómo Participar en los Torneos?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-400 font-bold">1</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Forma tu Equipo</h4>
                <p className="text-gray-400 text-sm">Reúne a 5 jugadores y elige un capitán para el registro.</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-400 font-bold">2</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Inscripción</h4>
                <p className="text-gray-400 text-sm">Completa el formulario de inscripción antes de la fecha límite.</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-400 font-bold">3</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Compite</h4>
                <p className="text-gray-400 text-sm">Participa en las fechas programadas según el bracket del torneo.</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-400 font-bold">4</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Gana Premios</h4>
                <p className="text-gray-400 text-sm">Los mejores equipos reciben premios y puntos para el ranking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;