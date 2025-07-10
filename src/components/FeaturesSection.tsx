import React from 'react';
import { 
  UserPlus, 
  GitBranch, 
  BarChart3, 
  GraduationCap, 
  MessageCircle, 
  Shield,
  Clock,
  Trophy
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Registro Sencillo",
      description: "Proceso de inscripción rápido y sin complicaciones para jugadores y equipos."
    },
    {
      icon: GitBranch,
      title: "Brackets Automáticos",
      description: "Generación automática de brackets balanceados según el nivel de los participantes."
    },
    {
      icon: BarChart3,
      title: "Estadísticas y Rankings",
      description: "Seguimiento detallado de tu rendimiento y posición en rankings globales."
    },
    {
      icon: GraduationCap,
      title: "Entrenamiento en la Academia",
      description: "Acceso a rutinas de entrenamiento estructuradas y sesiones de coaching."
    },
    {
      icon: MessageCircle,
      title: "Comunidad en Discord",
      description: "Servidor activo 24/7 para conectar con otros jugadores y recibir soporte."
    },
    {
      icon: Shield,
      title: "Moderación Antitrampas",
      description: "Jueces supervisan los torneos para detectar trampas y sancionar a equipos que infrinjan las reglas."
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Múltiples horarios de competición para adaptarse a tu disponibilidad."
    },
    {
      icon: Trophy,
      title: "Premios Atractivos",
      description: "Premios en efectivo y reconocimientos para los mejores equipos y jugadores."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Características de la Plataforma
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre todas las herramientas y servicios que hacen de Aim League 
            la mejor opción para competir y mejorar en Counter-Strike 2.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-900 p-8 rounded-lg border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-300 font-semibold mb-2">Uptime</div>
              <div className="text-gray-400 text-sm">Plataforma siempre disponible</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">&lt;50ms</div>
              <div className="text-gray-300 font-semibold mb-2">Latencia</div>
              <div className="text-gray-400 text-sm">Servidores optimizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-gray-300 font-semibold mb-2">Soporte</div>
              <div className="text-gray-400 text-sm">Asistencia continua</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;