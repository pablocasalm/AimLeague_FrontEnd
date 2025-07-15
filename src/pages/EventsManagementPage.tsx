import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2,
  Trophy,
  Target,
  MessageSquare,
  Users,
  Clock,
  GraduationCap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import { agendaService } from '../../services/agendaService';

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;    //PARSE DATE
  duration: number; // en minutos
  eventType: 'None' | 'Partido' | 'Entrenamiento' | 'Reunión' | 'Torneo' | 'Otro';
  teams: Team[];
  location: string;
  additional: string;
  createdBy: string;
}

interface Team {
  id: number;
  name: string;
}

interface AgendaEventResult {
  success: boolean;
  agendaEvents: Event[];
  Error?: string;
}

const EventsManagementPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'coach1';
  const userRole = localStorage.getItem('role') || 'Entrenador';
  
  const [events, setEvents] = useState<Event[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [eventData, setEventData] = useState<Event>({
    id: '',
    title: '',
    description: '',
    eventDate: '',
    duration: 0,
    eventType: 'None',
    teams: [],
    location: '',
    additional: '',
    createdBy: username
  });

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
    
    // Initialize events data
    loadAgendaEvents();
  }, [navigate, userRole]);

  const [isLoading, setIsLoading] = useState(false);

  const loadAgendaEvents = async () => {
    setIsLoading(true);
    try {
      const result: AgendaEventResult = await agendaService.getAgendaEventByUserId();
      if (result.success) {
        setEvents(result.agendaEvents);
      } else {
        console.error('Error loading events:', result.Error);
      }
    } catch (error) {
      console.error('Error fetching agenda events:', error);
    } finally {
      setIsLoading(false);
    }
  }



  const getEventIcon = (tipo: Event['eventType']) => {
    switch (tipo) {
      case 'Partido':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'Entrenamiento':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Reunión':
        return <MessageSquare className="w-5 h-5 text-green-400" />;
      case 'Otro':
        return <Calendar className="w-5 h-5 text-gray-400" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEventColor = (tipo: Event['eventType']) => {
    switch (tipo) {
      case 'Partido':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'Entrenamiento':
        return 'border-cyan-500/30 bg-cyan-500/10';
      case 'Reunión':
        return 'border-green-500/30 bg-green-500/10';
      case 'Otro':
        return 'border-gray-500/30 bg-gray-500/10';
      default:
        return 'border-gray-500/30 bg-gray-500/10';
    }
  };

  const getBadgeColor = (tipo: Event['eventType']) => {
    switch (tipo) {
      case 'Partido':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Entrenamiento':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Reunión':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Otro':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

const handleDeleteEvent = async (eventId: string) => {
  try {
    // Llamada al backend
    const response = await agendaService.deleteAgendaEvent(eventId);

    if (response.success) {
      // Si el backend responde OK, actualiza la lista local
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      console.log(`Evento ${eventId} ha sido eliminado`);
    } else {
      console.error(`Error al eliminar el evento ${eventId}`, response);
    }
  } catch (error) {
    console.error(`Error en la petición de eliminación del evento ${eventId}`, error);
  } finally {
    setShowDeleteConfirm(null);
  }
};

  const confirmDelete = (eventId: string) => {
    setShowDeleteConfirm(eventId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  if (userRole !== 'Entrenador') {
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
                <Calendar className="w-8 h-8 text-cyan-400" />
                <h1 className="text-3xl font-bold text-white">Administración de Eventos</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Gestiona todos los eventos creados para tus equipos de la academia
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
              <h2 className="text-xl font-bold text-white">Panel de Gestión de Eventos</h2>
            </div>
            <p className="text-gray-300">
              Desde aquí puedes crear, editar y eliminar eventos para todos tus equipos. Los eventos aparecerán automáticamente en la agenda de los jugadores correspondientes.
            </p>
          </div>

          {/* Create Event Button */}
          {events.length > 0 && (
          <div className="mb-8">
            <Link
              to="/dashboard/eventos/crear"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              <span>Crear nuevo evento</span>
            </Link>
          </div>
          )}
          {/* Events List */}
          {events.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Eventos Creados</h3>
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className={`border rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 ${getEventColor(event.eventType)}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Event Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-gray-800 p-2 rounded-lg">
                          {getEventIcon(event.eventType)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-xl font-bold text-white">{event.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeColor(event.eventType)}`}>
                              {event.eventType}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{event.description}</p>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300 text-sm">{formatDate(event.eventDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300 text-sm">{formatTime(event.eventDate)}</span>
                          {event.duration && <span className="text-gray-400 text-sm">({event.duration} minutos)</span>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300 text-sm">{event.teams.map((team: any) => team.name).join(', ')}</span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {(event.location || event.additional) && (
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-4">
                          {event.location && (
                            <div className="mb-2">
                              <span className="text-gray-400 text-sm font-semibold">Ubicación: </span>
                              <span className="text-gray-300 text-sm">{event.location}</span>
                            </div>
                          )}
                          {event.additional && (
                            <div>
                              <span className="text-gray-400 text-sm font-semibold">Notas: </span>
                              <span className="text-gray-300 text-sm">{event.additional}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 lg:ml-6">
                      <Link
                        to={`/dashboard/eventos/editar/${event.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar</span>
                      </Link>
                      <button
                        onClick={() => confirmDelete(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                No has creado eventos aún
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Comienza creando tu primer evento para tus equipos. Los eventos aparecerán automáticamente en la agenda de los jugadores.
              </p>
              <Link
                to="/dashboard/eventos/crear"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto w-fit"
              >
                <Plus className="w-5 h-5" />
                <span>Crear primer evento</span>
              </Link>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Confirmar Eliminación</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDeleteEvent(showDeleteConfirm)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Gestión Eficiente de Eventos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Consejos para Eventos:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Programa eventos con al menos 24h de anticipación</li>
                  <li>• Incluye ubicación clara (Discord, servidor, etc.)</li>
                  <li>• Añade notas importantes para los jugadores</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Gestión de Equipos:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Los eventos aparecen automáticamente en las agendas</li>
                  <li>• Puedes asignar múltiples equipos a un evento</li>
                  <li>• Edita eventos para actualizar información</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsManagementPage;