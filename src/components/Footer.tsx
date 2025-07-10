import React from 'react';
import { Target, MessageSquare, Mail, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                Aim <span className="text-cyan-400">League</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              La plataforma estudiantil líder para torneos amateur de Counter-Strike 2 
              y entrenamiento competitivo en la comunidad hispana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#5865F2] hover:bg-[#4752C4] p-3 rounded-lg transition-colors duration-300">
                <MessageSquare className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors duration-300">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors duration-300">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Torneos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Academia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Rankings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Reglas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400" />
                <a href="mailto:info@aimleague.com" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  info@aimleague.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Discord: AimLeague
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Horarios de Soporte</h4>
              <p className="text-gray-400 text-sm">Lunes - Viernes: 9:00 - 22:00</p>
              <p className="text-gray-400 text-sm">Sábado - Domingo: 12:00 - 20:00</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Aim League. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">
                Código de Conducta
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;