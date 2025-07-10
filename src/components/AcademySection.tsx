import React from 'react';
import { Target, BookOpen, MessageSquare, TrendingUp, Users, Calendar } from 'lucide-react';

const AcademySection = () => {
  const features = [
    {
      icon: Target,
      title: "Rutinas de Entrenamiento",
      description: "Ejercicios específicos para mejorar tu puntería y precisión en diferentes escenarios de juego."
    },
    {
      icon: BookOpen,
      title: "Contenido Educativo",
      description: "Guías, tutoriales y análisis de partidas para mejorar tu comprensión estratégica del juego."
    },
    {
      icon: MessageSquare,
      title: "Sesiones en Discord",
      description: "Entrenamientos grupales y sesiones de feedback con coaches experimentados."
    },
    {
      icon: TrendingUp,
      title: "Seguimiento de Progreso",
      description: "Monitorea tu mejora con estadísticas detalladas y análisis de rendimiento."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <Target className="inline-block w-10 h-10 text-cyan-400 mr-3" />
            Aim League Academy
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nuestro programa de entrenamiento diseñado para ayudarte a alcanzar tu máximo potencial 
            en Counter-Strike 2 a través de práctica estructurada y mentorización.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">¿Qué Ofrecemos?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Próximas Sesiones</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-semibold">Entrenamiento de Puntería</h4>
                  <p className="text-gray-400 text-sm">Rutinas de aim y crosshair placement</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">Lunes 18:00</p>
                  <p className="text-gray-400 text-sm">2 hrs</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-semibold">Análisis de Demos</h4>
                  <p className="text-gray-400 text-sm">Revisión de partidas y feedback</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">Miércoles 19:00</p>
                  <p className="text-gray-400 text-sm">1.5 hrs</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="text-white font-semibold">Estrategias de Equipo</h4>
                  <p className="text-gray-400 text-sm">Tácticas y coordinación grupal</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">Viernes 20:00</p>
                  <p className="text-gray-400 text-sm">2 hrs</p>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold mt-6 transition-colors duration-300">
              Ver Calendario Completo
            </button>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Únete a Nuestra Comunidad de Entrenamiento
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Accede a entrenamientos exclusivos, participa en scrimmages organizados y 
            recibe feedback personalizado de coaches experimentados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Únete a la Academia</span>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Ver Horarios</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;