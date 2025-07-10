import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, Award, Clock, MapPin } from 'lucide-react';

const TournamentsSection = () => {
  const tournaments = [
    {
      name: "Liga de Primavera 2024",
      date: "15 - 30 Marzo",
      teams: "32 equipos",
      prize: "$500 USD",
      status: "Inscripciones Abiertas",
      type: "Liga Regular"
    },
    {
      name: "Torneo Relámpago",
      date: "8 Abril",
      teams: "16 equipos",
      prize: "$200 USD",
      status: "Próximamente",
      type: "Eliminación Directa"
    },
    {
      name: "Copa de Verano",
      date: "1 - 15 Junio",
      teams: "64 equipos",
      prize: "$1000 USD",
      status: "Próximamente",
      type: "Doble Eliminación"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <Trophy className="inline-block w-10 h-10 text-cyan-400 mr-3" />
            Torneos Activos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Participa en competiciones organizadas con brackets automáticos, 
            seguimiento de estadísticas y premios para los mejores equipos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tournaments.map((tournament, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tournament.status === 'Inscripciones Abiertas' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {tournament.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>{tournament.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>{tournament.teams}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Award className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>{tournament.prize}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>{tournament.type}</span>
                </div>
              </div>
              
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                {tournament.status === 'Inscripciones Abiertas' ? 'Inscribir Equipo' : 'Más Información'}
              </button>
            </div>
          ))}
        </div>
        
        {/* View All Tournaments Button */}
        <div className="text-center mb-12">
          <Link 
            to="/tournaments" 
            className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <Trophy className="w-5 h-5" />
            <span>Ver Todos los Torneos</span>
          </Link>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            ¿Cómo Funcionan Nuestros Torneos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-cyan-400 font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Registro Rápido</h4>
              <p className="text-gray-400 text-sm">Inscribe tu equipo en minutos con nuestro sistema automatizado.</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-cyan-400 font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Brackets Automáticos</h4>
              <p className="text-gray-400 text-sm">Los brackets se generan automáticamente según el nivel de los equipos.</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Seguimiento en Vivo</h4>
              <p className="text-gray-400 text-sm">Resultados actualizados en tiempo real con estadísticas detalladas.</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-cyan-400 font-bold">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Premios y Rankings</h4>
              <p className="text-gray-400 text-sm">Gana premios y sube en nuestro sistema de ranking global.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;