import React from 'react';
import { GraduationCap, Heart, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sobre <span className="text-cyan-400">Aim League</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Aim League es una plataforma diseñada para impulsar la escena amateur de Counter-Strike 2 en la comunidad hispana, ofreciendo torneos organizados, estadísticas, y una academia enfocada en el crecimiento de los jugadores.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors duration-300">
              <GraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Enfocados en los Jugadores</h3>
              <p className="text-gray-400">
                Todo en Aim League está pensado para quienes disfrutan competir, aprender y formar parte de una comunidad donde su evolución es prioridad.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors duration-300">
              <Heart className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Accesible y Económico</h3>
              <p className="text-gray-400">
                Mantenemos los costos bajos para que todos los jugadores puedan 
                participar sin barreras económicas significativas.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors duration-300">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Enfoque en el Crecimiento</h3>
              <p className="text-gray-400">
                Nuestra misión es ayudar a los jugadores a mejorar sus habilidades 
                y crecer dentro de la escena competitiva de CS2.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
            <p className="text-gray-300 leading-relaxed">
              Queremos ser la plataforma de referencia para jugadores amateur de CS2 en 
              el mundo hispano, ofreciendo una experiencia completa que combine competición 
              organizada con oportunidades de aprendizaje y crecimiento personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;