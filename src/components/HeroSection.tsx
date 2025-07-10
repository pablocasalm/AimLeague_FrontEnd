import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Trophy, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center space-x-3">
          <Target className="w-12 h-12 text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Aim <span className="text-cyan-400">League</span>
          </h1>
        </div>
        
        {/* Tagline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-4 max-w-4xl">
          Compite. Mejora. Asciende.
        </h2>
        <p className="text-lg md:text-xl text-cyan-400 mb-12 font-medium">
          Bienvenido a Aim League
        </p>
        
        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg mb-12 max-w-2xl leading-relaxed">
Plataforma dedicada al desarrollo competitivo amateur en Counter-Strike 2, con torneos organizados y formación especializada.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/ranking" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/25">
            <Trophy className="w-5 h-5" />
            <span>Ver Ranking</span>
          </Link>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg">
            <Users className="w-5 h-5" />
            <span>Entrenar con la Academia</span>
          </button>
        </div>
        
        {/* Stats */}
        {/*<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
            <div className="text-gray-400 text-sm">Jugadores Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
            <div className="text-gray-400 text-sm">Torneos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Comunidad Activa</div>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default HeroSection;