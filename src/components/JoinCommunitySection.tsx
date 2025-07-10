import React from 'react';
import { Users, UserPlus, Settings, MessageSquare, Mail } from 'lucide-react';

const JoinCommunitySection = () => {
  const roles = [
    {
      icon: Users,
      title: "Jugadores",
      description: "Participa en torneos, mejora tus habilidades y conecta con otros jugadores de tu nivel.",
      cta: "Únete como Jugador"
    },
    {
      icon: Settings,
      title: "Organizadores",
      description: "Ayuda a gestionar torneos, moderar la comunidad y crear eventos especiales.",
      cta: "Ser Organizador"
    },
    {
      icon: UserPlus,
      title: "Voluntarios",
      description: "Contribuye al crecimiento de la comunidad con tus habilidades y tiempo libre.",
      cta: "Ser Voluntario"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Conecta con la Comunidad Aim League
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre un espacio pensado para jugadores que quieren mejorar, competir y compartir su pasión por CS2. En nuestro servidor de Discord encontrarás compañeros de equipo, entrenamientos, torneos y todo lo que necesitás para formar parte de una comunidad activa y colaborativa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg text-center hover:bg-gray-750 transition-colors duration-300">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <role.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{role.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{role.description}</p>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                {role.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Únete a Nuestra Comunidad
              </h3>
              <p className="text-gray-300 mb-6">
                Conecta con jugadores que comparten tu pasión por CS2. Encuentra tu lugar 
                en una comunidad donde cada partida es una oportunidad de crecer y cada 
                compañero puede convertirse en tu próximo teammate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Únete a Discord</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Contactar por Email</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">Lo que Encontrarás</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Equipos y jugadores buscando compañeros</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Organización de torneos y entrenamientos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Soporte directo del staff</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Noticias, recursos y anuncios</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 text-center">
                <p className="text-cyan-400 font-medium italic">
                  "No se trata solo de jugar, se trata de crecer juntos."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;