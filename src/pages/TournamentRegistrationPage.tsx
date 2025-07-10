import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  ArrowLeft, 
  MessageSquare, 
  Plus, 
  Minus,
  User,
  Shield,
  Send,
  AlertCircle
} from 'lucide-react';

interface Player {
  nombre: string;
  steamId: string;
  discord: string;
}

interface TeamData {
  nombreEquipo: string;
  nombreCapitan: string;
  steamIdCapitan: string;
  discordCapitan: string;
  jugadores: Player[];
}

const TournamentRegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get tournament name from ID (mock data)
  const getTournamentName = (tournamentId: string): string => {
    const tournaments: Record<string, string> = {
      'torneo-julio-2025': 'Torneo Julio 2025',
      'cs2-clash-julio': 'CS2 Clash - Julio',
      'academy-cup-agosto': 'Academy Cup Agosto',
      'liga-primavera-2024': 'Liga de Primavera 2024',
      'torneo-relampago-septiembre': 'Torneo Relámpago Septiembre',
      'copa-verano-2025': 'Copa de Verano 2025',
      'clasificatorio-regional': 'Clasificatorio Regional',
      'torneo-novatos': 'Torneo de Novatos'
    };
    return tournaments[tournamentId] || 'Torneo Desconocido';
  };

  const [formData, setFormData] = useState<TeamData>({
    nombreEquipo: '',
    nombreCapitan: '',
    steamIdCapitan: '',
    discordCapitan: '',
    jugadores: [
      { nombre: '', steamId: '', discord: '' },
      { nombre: '', steamId: '', discord: '' },
      { nombre: '', steamId: '', discord: '' },
      { nombre: '', steamId: '', discord: '' }
    ]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tournamentName = getTournamentName(id || '');

  const handleInputChange = (field: keyof TeamData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
    setFormData(prev => ({
      ...prev,
      jugadores: prev.jugadores.map((player, i) => 
        i === index ? { ...player, [field]: value } : player
      )
    }));
    // Clear error when user starts typing
    const errorKey = `jugador_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addPlayer = () => {
    if (formData.jugadores.length < 5) {
      setFormData(prev => ({
        ...prev,
        jugadores: [...prev.jugadores, { nombre: '', steamId: '', discord: '' }]
      }));
    }
  };

  const removePlayer = (index: number) => {
    if (formData.jugadores.length > 4) {
      setFormData(prev => ({
        ...prev,
        jugadores: prev.jugadores.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate team data
    if (!formData.nombreEquipo.trim()) {
      newErrors.nombreEquipo = 'El nombre del equipo es obligatorio';
    }
    if (!formData.nombreCapitan.trim()) {
      newErrors.nombreCapitan = 'El nombre del capitán es obligatorio';
    }
    if (!formData.steamIdCapitan.trim()) {
      newErrors.steamIdCapitan = 'El SteamID del capitán es obligatorio';
    }
    if (!formData.discordCapitan.trim()) {
      newErrors.discordCapitan = 'El Discord del capitán es obligatorio';
    }

    // Validate players
    formData.jugadores.forEach((player, index) => {
      if (!player.nombre.trim()) {
        newErrors[`jugador_${index}_nombre`] = 'El nombre del jugador es obligatorio';
      }
      if (!player.steamId.trim()) {
        newErrors[`jugador_${index}_steamId`] = 'El SteamID del jugador es obligatorio';
      }
      if (!player.discord.trim()) {
        newErrors[`jugador_${index}_discord`] = 'El Discord del jugador es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      alert('¡Equipo registrado exitosamente! Recibirás más información por Discord.');
      navigate(`/tournaments/${id}`);
    } catch (error) {
      alert('Error al registrar el equipo. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to={`/tournaments/${id}`}
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al torneo</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Registro de <span className="text-cyan-400">Equipo</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tournament Info */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Registrando equipo para:</h2>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{tournamentName}</p>
            <p className="text-gray-300 mt-2">
              Completa todos los campos para registrar tu equipo en este torneo.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Data Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Datos del Equipo</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre del Equipo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombreEquipo}
                    onChange={(e) => handleInputChange('nombreEquipo', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.nombreEquipo ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Ej: Fire Dragons"
                  />
                  {errors.nombreEquipo && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.nombreEquipo}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre del Capitán *
                  </label>
                  <input
                    type="text"
                    value={formData.nombreCapitan}
                    onChange={(e) => handleInputChange('nombreCapitan', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.nombreCapitan ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Ej: Juan Pérez"
                  />
                  {errors.nombreCapitan && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.nombreCapitan}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    SteamID del Capitán *
                  </label>
                  <input
                    type="text"
                    value={formData.steamIdCapitan}
                    onChange={(e) => handleInputChange('steamIdCapitan', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.steamIdCapitan ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Ej: STEAM_0:1:123456789"
                  />
                  {errors.steamIdCapitan && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.steamIdCapitan}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Usuario de Discord del Capitán *
                  </label>
                  <input
                    type="text"
                    value={formData.discordCapitan}
                    onChange={(e) => handleInputChange('discordCapitan', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.discordCapitan ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Ej: usuario#1234"
                  />
                  {errors.discordCapitan && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.discordCapitan}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Players Data Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">Datos de los Jugadores</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={addPlayer}
                    disabled={formData.jugadores.length >= 5}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-400 text-sm">
                    {formData.jugadores.length}/5 jugadores
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {formData.jugadores.map((player, index) => (
                  <div key={index} className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-cyan-400" />
                        <h4 className="text-lg font-semibold text-white">
                          Jugador {index + 1}
                        </h4>
                      </div>
                      {formData.jugadores.length > 4 && (
                        <button
                          type="button"
                          onClick={() => removePlayer(index)}
                          className="text-red-400 hover:text-red-300 p-1 transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Nombre del Jugador *
                        </label>
                        <input
                          type="text"
                          value={player.nombre}
                          onChange={(e) => handlePlayerChange(index, 'nombre', e.target.value)}
                          className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                            errors[`jugador_${index}_nombre`] ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="Ej: Carlos López"
                        />
                        {errors[`jugador_${index}_nombre`] && (
                          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`jugador_${index}_nombre`]}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          SteamID *
                        </label>
                        <input
                          type="text"
                          value={player.steamId}
                          onChange={(e) => handlePlayerChange(index, 'steamId', e.target.value)}
                          className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                            errors[`jugador_${index}_steamId`] ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="STEAM_0:1:123456789"
                        />
                        {errors[`jugador_${index}_steamId`] && (
                          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`jugador_${index}_steamId`]}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Usuario de Discord *
                        </label>
                        <input
                          type="text"
                          value={player.discord}
                          onChange={(e) => handlePlayerChange(index, 'discord', e.target.value)}
                          className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                            errors[`jugador_${index}_discord`] ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="usuario#1234"
                        />
                        {errors[`jugador_${index}_discord`] && (
                          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors[`jugador_${index}_discord`]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <strong>Nota:</strong> Necesitas un mínimo de 4 jugadores (sin contar al Capitán) y un máximo de 5 (en caso de tener entrenador) para registrar tu equipo.
                </p>
              </div>
            </div>

            {/* Hidden Tournament ID */}
            <input type="hidden" value={id} />

            {/* Submit Button */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Registrando equipo...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Registrar Equipo</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Discord Section */}
          <div className="mt-8 bg-gradient-to-r from-[#5865F2]/10 to-[#4752C4]/10 border border-[#5865F2]/20 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              ¿No tienes equipo pero quieres jugar?
            </h3>
            <p className="text-gray-300 mb-6">
              Únete a nuestro Discord para encontrar compañeros:
            </p>
            <a
              href="https://discord.gg/aimleague"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Ir a Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentRegistrationPage;