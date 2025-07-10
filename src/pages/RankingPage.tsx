import React from 'react';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RankingPage = () => {
  // Mock data for players
  const players = [
    { id: 1, name: "EliteSniper", points: 2450 },
    { id: 2, name: "ShadowHunter", points: 2380 },
    { id: 3, name: "FireStorm", points: 2290 },
    { id: 4, name: "IceBreaker", points: 2150 },
    { id: 5, name: "ThunderBolt", points: 2080 },
    { id: 6, name: "NightWolf", points: 1950 },
    { id: 7, name: "CyberGhost", points: 1890 },
    { id: 8, name: "BlazeFury", points: 1820 },
    { id: 9, name: "StormRider", points: 1750 },
    { id: 10, name: "PhantomStrike", points: 1680 }
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankStyle = (position: number) => {
    if (position <= 3) {
      return "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30";
    }
    return "bg-gray-800 border-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Trophy className="w-10 h-10 text-cyan-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Ranking de <span className="text-cyan-400">Jugadores</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre quiénes son los mejores jugadores de la comunidad Aim League
            </p>
          </div>

          {/* Stats Overview */}
          {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-300 font-semibold">Jugadores Activos</div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">150+</div>
                <div className="text-gray-300 font-semibold">Equipos Registrados</div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-gray-300 font-semibold">Torneos Completados</div>
              </div>
            </div>
          </div>*7}

          {/* Ranking Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Top 10 Jugadores</h2>
              <p className="text-gray-400 text-sm mt-1">Clasificación basada en puntos acumulados en torneos</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Nombre del Jugador
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Puntos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {players.map((player, index) => {
                    const position = index + 1;
                    return (
                      <tr 
                        key={player.id} 
                        className={`${getRankStyle(position)} border hover:bg-gray-700/50 transition-colors duration-300`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <span className={`text-lg font-bold ${position <= 3 ? 'text-cyan-400' : 'text-gray-300'}`}>
                              {position}
                            </span>
                            {getRankIcon(position)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-bold text-sm">
                                {player.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className={`font-semibold ${position <= 3 ? 'text-white' : 'text-gray-300'}`}>
                              {player.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`text-lg font-bold ${position <= 3 ? 'text-cyan-400' : 'text-gray-300'}`}>
                            {player.points.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">pts</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-3">¿Cómo funciona el sistema de puntos?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="mb-2">• <strong className="text-cyan-400">Victoria en torneo:</strong> +100 puntos</p>
                <p className="mb-2">• <strong className="text-cyan-400">Segundo lugar:</strong> +75 puntos</p>
                <p>• <strong className="text-cyan-400">Tercer lugar:</strong> +50 puntos</p>
              </div>
              <div>
                <p className="mb-2">• <strong className="text-cyan-400">Participación:</strong> +10 puntos</p>
                <p className="mb-2">• <strong className="text-cyan-400">MVP del torneo:</strong> +25 puntos extra</p>
                <p>• <strong className="text-cyan-400">Racha de victorias:</strong> Bonificación x1.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;