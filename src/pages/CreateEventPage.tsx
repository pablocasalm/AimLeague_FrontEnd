import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ArrowLeft, 
  Plus, 
  Clock,
  Users,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  Trophy,
  Target,
  MessageSquare,
  Settings,
  GraduationCap,
  Sword
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { User, userService } from '../../services/userService';
import { agendaService } from '../../services/agendaService';
import { getEventTypeLabel } from '../utils/eventTypeMapping';


interface EventFormData {
  Title: string;
  Description: string;
  EventDate: string;
  EventTime: string;
  Duration: string;
  TeamId: number[];
  EventType: string;
  Location: string;
  Additional: string;
  
}

interface Team {
  id: number;
  name: string;
}

interface UserTeams {
  teams: Team[];
  success: boolean;
}

const CreateEventPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'coach1';
  const userRole = localStorage.getItem('role') || 'Entrenador';

  const [formData, setFormData] = useState<EventFormData>({
    Title: '',
    Description: '',
    EventDate: '',
    EventTime: '',
    Duration: '',
    TeamId: [],
    EventType: '0',
    Location: '',
    Additional: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Only coaches should access this page
    if (userRole !== 'Entrenador') {
      navigate('/dashboard');
      return;
    }

    getCoachTeams();
  }, [navigate, userRole]);

  const [coachTeams, setCoachTeams] = useState<Team[]>([]);

  // Get coach's teams
  const getCoachTeams = async () => {
    try {
    const teams = await userService.getUserTeams() as { teams: Team[], success: boolean };
    if (teams.success) {
    setCoachTeams(teams.teams);
    }
  } catch (error) {
    console.error('Error fetching coach teams:', error);
  }
  };


const handleInputChange = <K extends keyof EventFormData>(
  field: K,
  value: EventFormData[K]
) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};


  const handleTeamSelection = (teamid: number, isChecked: boolean) => {
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        TeamId: [...prev.TeamId, teamid]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        TeamId: prev.TeamId.filter(team => team !== teamid)
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Title.trim()) {
      newErrors.title = 'El Título del evento es obligatorio';
    }
    if (!formData.Description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    if (!formData.EventDate) {
      newErrors.eventDate = 'La fecha es obligatoria';
    }
    if (!formData.EventTime) {
      newErrors.eventTime = 'La hora es obligatoria';
    }
    if (formData.TeamId.length === 0) {
      newErrors.teamId = 'Debes seleccionar al menos un equipo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);
    
    try{
      const payload = {
        ...formData,
        EventType: getEventTypeLabel(formData.EventType), // ← convertir aquí
      };

      const result = await agendaService.createAgendaEvent(payload);

      if (result.success) {
        console.log('Evento creado exitosamente:', result.data);
      } else {
        console.error('Error al crear el evento:', result.message);
        alert('Error al crear el evento. Por favor, inténtalo de nuevo.');
        return;
      }
    } catch (error) {
      console.error('Error al crear el evento:', error);
    } finally {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
      setShowSuccess(false);
      navigate('/dashboard/eventos');
      }, 3000);
      setFormData({
        Title: '',
        Description: '',
        EventDate: '',
        EventTime: '',
        Duration: '',
        TeamId: [],
        EventType: '0',
        Location: '',
        Additional: ''
      });
      setIsSubmitting(false);
    }
  };

const getEventTypeIcon = (tipo: EventFormData['EventType']) => {
  switch (tipo) {
    case 'Partido': // Partido
      return <Sword className="w-5 h-5 text-red-400" />;

    case 'Entrenamiento': // Entrenamiento
      return <Target className="w-5 h-5 text-cyan-400" />;

    case 'Reunión': // Reunión
      return <MessageSquare className="w-5 h-5 text-green-400" />;

    case 'Torneo': // Torneo
      return <Trophy className="w-5 h-5 text-yellow-400" />;

    case 'Otro': // Otro
      return <Settings className="w-5 h-5 text-gray-400" />;

    default: // None u otro
      return <Calendar className="w-5 h-5 text-gray-400" />;
  }
};


  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Plus className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Crear Evento</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Programa entrenamientos, partidos y reuniones para tus equipos
              </p>
            </div>
            <Link 
              to="/dashboard/eventos"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a administrar eventos</span>
            </Link>
          </div>

          {/* Coach Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Panel de Entrenador</h2>
            </div>
            <p className="text-gray-300">
              Crea eventos que aparecerán automáticamente en la agenda de todos los jugadores de los equipos seleccionados.
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Evento creado con éxito.</span>
            </div>
          )}

          {/* Event Creation Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Información Básica</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre del Evento *
                  </label>
                  <input
                    type="text"
                    value={formData.Title}
                    onChange={(e) => handleInputChange('Title', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.nombre ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Ej: Entrenamiento de Estrategias - Team Pro"
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.nombre}</span>
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.Description}
                    onChange={(e) => handleInputChange('Description', e.target.value)}
                    rows={3}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 resize-none ${
                      errors.descripcion ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Describe el objetivo y contenido del evento..."
                  />
                  {errors.descripcion && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.descripcion}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Tipo de Evento *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.EventType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleInputChange('EventType', e.target.value)
                      }

                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 appearance-none"
                    >
                      <option value="Entrenamiento">Entrenamiento</option>
                      <option value="Partido">Partido</option>
                      <option value="Reunión">Reunión</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getEventTypeIcon(formData.EventType)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Duración en minutos (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.Duration}
                    onChange={(e) => handleInputChange('Duration', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                    placeholder="Ej: 2 horas, 90 minutos"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Fecha y Hora</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={formData.EventDate}
                    onChange={(e) => handleInputChange('EventDate', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.fecha ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.fecha && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.fecha}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={formData.EventTime}
                    onChange={(e) => handleInputChange('EventTime', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 ${
                      errors.hora ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.hora && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.hora}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Team Selection */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Seleccionar Equipos</h3>
              </div>
              
              <div className="space-y-4">
                {coachTeams.map((team) => (
                  <label key={team.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.TeamId.includes(team.id)}
                      onChange={(e) => handleTeamSelection(team.id, e.target.checked)}
                      className="w-5 h-5 text-cyan-500 bg-gray-900 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {team.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-white font-semibold">{team.name}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.equipos && (
                <p className="text-red-400 text-sm mt-4 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.equipos}</span>
                </p>
              )}
              
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <strong>Nota:</strong> El evento aparecerá en la agenda de todos los jugadores de los equipos seleccionados.
                </p>
              </div>
            </div>

            {/* Location and Additional Info */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Ubicación y Notas</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Ubicación o Enlace
                  </label>
                  <input
                    type="text"
                    value={formData.Location}
                    onChange={(e) => handleInputChange('Location', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                    placeholder="Ej: Discord - Sala de Entrenamiento, https://meet.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Notas Adicionales (Opcional)
                  </label>
                  <textarea
                    value={formData.Additional}
                    onChange={(e) => handleInputChange('Additional', e.target.value)}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 resize-none"
                    placeholder="Información adicional, preparación requerida, materiales necesarios..."
                  />
                </div>
              </div>
            </div>

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
                    <span>Creando evento...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Crear Evento</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Consejos para Crear Eventos Efectivos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Entrenamientos:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Define objetivos claros para cada sesión</li>
                  <li>• Incluye tiempo para calentamiento y práctica</li>
                  <li>• Programa descansos regulares</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Partidos:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Confirma disponibilidad del equipo contrario</li>
                  <li>• Establece reglas y formato claramente</li>
                  <li>• Programa tiempo para análisis post-partido</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;