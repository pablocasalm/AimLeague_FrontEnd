import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Calendar, 
  ArrowLeft, 
  Save, 
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
  GraduationCap
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';

interface EventFormData {
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  duracion: string;
  equipos: string[];
  tipo: 'Partido' | 'Entrenamiento' | 'Reunión' | 'Otro';
  ubicacion: string;
  notas: string;
}

const EditEventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const username = localStorage.getItem('username') || 'coach1';
  const userRole = localStorage.getItem('userRole') || 'Coach';

  const [formData, setFormData] = useState<EventFormData>({
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    duracion: '',
    equipos: [],
    tipo: 'Entrenamiento',
    ubicacion: '',
    notas: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [eventNotFound, setEventNotFound] = useState(false);

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

    // Load event data
    if (eventId) {
      loadEventData(eventId);
    }
  }, [navigate, userRole, eventId]);

  // Mock function to load event data
  const loadEventData = (id: string) => {
    // Mock events data - in real app this would come from API
    const mockEvents = [
      {
        id: 'event-001',
        nombre: 'Entrenamiento de Estrategias - Team Pro',
        descripcion: 'Sesión enfocada en mejorar las tácticas de equipo y coordinación en mapas competitivos.',
        fecha: '2025-07-15',
        hora: '20:00',
        duracion: '2 horas',
        tipo: 'Entrenamiento' as const,
        equipos: ['Team Pro'],
        ubicacion: 'Discord - Sala de Entrenamiento',
        notas: 'Traer demos de partidas anteriores para análisis'
      },
      {
        id: 'event-002',
        nombre: 'Scrimmage vs Team External',
        descripcion: 'Partido de práctica contra equipo externo para preparar el próximo torneo.',
        fecha: '2025-07-18',
        hora: '19:30',
        duracion: '1.5 horas',
        tipo: 'Partido' as const,
        equipos: ['Team Sigma'],
        ubicacion: 'Servidor privado CS2',
        notas: 'Confirmar disponibilidad de todos los jugadores'
      },
      {
        id: 'event-003',
        nombre: 'Reunión de Feedback Semanal',
        descripcion: 'Revisión del rendimiento de la semana y planificación de objetivos.',
        fecha: '2025-07-20',
        hora: '18:00',
        duracion: '45 minutos',
        tipo: 'Reunión' as const,
        equipos: ['Team Pro', 'Team Alpha'],
        ubicacion: 'Discord - Sala Principal',
        notas: 'Preparar estadísticas de la semana'
      }
    ];

    const event = mockEvents.find(e => e.id === id);
    if (event) {
      setFormData({
        nombre: event.nombre,
        descripcion: event.descripcion,
        fecha: event.fecha,
        hora: event.hora,
        duracion: event.duracion,
        equipos: event.equipos,
        tipo: event.tipo,
        ubicacion: event.ubicacion,
        notas: event.notas
      });
    } else {
      setEventNotFound(true);
    }
  };

  // Get coach's teams
  const getCoachTeams = () => {
    if (username === 'coach1') {
      return [
        { id: 'team-pro', name: 'Team Pro' },
        { id: 'team-sigma', name: 'Team Sigma' },
        { id: 'team-alpha', name: 'Team Alpha' }
      ];
    }
    return [];
  };

  const coachTeams = getCoachTeams();

  const handleInputChange = (field: keyof EventFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamSelection = (teamName: string, isChecked: boolean) => {
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        equipos: [...prev.equipos, teamName]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        equipos: prev.equipos.filter(team => team !== teamName)
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del evento es obligatorio';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    }
    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es obligatoria';
    }
    if (!formData.hora) {
      newErrors.hora = 'La hora es obligatoria';
    }
    if (formData.equipos.length === 0) {
      newErrors.equipos = 'Debes seleccionar al menos un equipo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Event updated:', { id: eventId, ...formData });
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard/eventos');
      }, 2000);

    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error al actualizar el evento. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEventTypeIcon = (tipo: EventFormData['tipo']) => {
    switch (tipo) {
      case 'Partido':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'Entrenamiento':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Reunión':
        return <MessageSquare className="w-5 h-5 text-green-400" />;
      case 'Otro':
        return <Settings className="w-5 h-5 text-gray-400" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  if (userRole !== 'Coach') {
    return null;
  }

  if (eventNotFound) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="w-24 h-24 text-red-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Evento no encontrado</h1>
            <p className="text-gray-400 mb-8">
              El evento que intentas editar no existe o ha sido eliminado.
            </p>
            <Link
              to="/dashboard/eventos"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Volver a Eventos
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <Save className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Editar Evento</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Modifica los detalles del evento para tus equipos
              </p>
            </div>
            <Link 
              to="/dashboard/eventos"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Eventos</span>
            </Link>
          </div>

          {/* Coach Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Editando Evento</h2>
            </div>
            <p className="text-gray-300">
              Los cambios se aplicarán automáticamente en la agenda de todos los jugadores de los equipos seleccionados.
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Evento actualizado con éxito. Redirigiendo...</span>
            </div>
          )}

          {/* Event Edit Form */}
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
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
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
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
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
                      value={formData.tipo}
                      onChange={(e) => handleInputChange('tipo', e.target.value as EventFormData['tipo'])}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 appearance-none"
                    >
                      <option value="Entrenamiento">Entrenamiento</option>
                      <option value="Partido">Partido</option>
                      <option value="Reunión">Reunión</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {getEventTypeIcon(formData.tipo)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Duración (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.duracion}
                    onChange={(e) => handleInputChange('duracion', e.target.value)}
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
                    value={formData.fecha}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
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
                    value={formData.hora}
                    onChange={(e) => handleInputChange('hora', e.target.value)}
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
                      checked={formData.equipos.includes(team.name)}
                      onChange={(e) => handleTeamSelection(team.name, e.target.checked)}
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
                    value={formData.ubicacion}
                    onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300"
                    placeholder="Ej: Discord - Sala de Entrenamiento, https://meet.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Notas Adicionales (Opcional)
                  </label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => handleInputChange('notas', e.target.value)}
                    rows={3}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-300 resize-none"
                    placeholder="Información adicional, preparación requerida, materiales necesarios..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Guardando cambios...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
                
                <Link
                  to="/dashboard/eventos"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;