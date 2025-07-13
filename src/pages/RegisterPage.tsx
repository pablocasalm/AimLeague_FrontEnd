import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff,
  MessageSquare,
  Gamepad2
} from 'lucide-react';
import { userService } from '../../services/userService';

interface FormData {
  Username: string,
  Password: string,
  RepeatPassword: string,
  Email: string,
  FirstName: string,
  LastName: string,
  DiscordUser: string,
  SteamId: string
}

interface FormErrors {
  [key: string]: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    Username: '',
    Password: '',
    RepeatPassword: '',
    Email: '',
    FirstName: '',
    LastName: '',
    DiscordUser: '',
    SteamId: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update password strength in real-time
    if (field === 'Password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Real-time password confirmation validation
    if (field === 'RepeatPassword' || (field === 'Password' && formData.RepeatPassword)) {
      const passwordToCheck = field === 'Password' ? value : formData.Password;
      const confirmPasswordToCheck = field === 'RepeatPassword' ? value : formData.RepeatPassword;
      
      if (confirmPasswordToCheck && passwordToCheck !== confirmPasswordToCheck) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength: number): { text: string; color: string } => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Muy débil', color: 'text-red-400' };
      case 2:
        return { text: 'Débil', color: 'text-orange-400' };
      case 3:
        return { text: 'Regular', color: 'text-yellow-400' };
      case 4:
        return { text: 'Fuerte', color: 'text-green-400' };
      case 5:
        return { text: 'Muy fuerte', color: 'text-green-500' };
      default:
        return { text: '', color: '' };
    }
  };

  const getPasswordStrengthWidth = (strength: number): string => {
    return `${(strength / 5) * 100}%`;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-400';
      case 2:
        return 'bg-orange-400';
      case 3:
        return 'bg-yellow-400';
      case 4:
        return 'bg-green-400';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSteamId = (steamId: string): boolean => {
    // Steam64 ID validation (17 digits starting with 7656119)
    const steam64Regex = /^7656119[0-9]{10}$/;
    return steam64Regex.test(steamId);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.FirstName.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.LastName.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    if (!formData.Email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(formData.Email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.Password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.Password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (passwordStrength < 3) {
      newErrors.password = 'La contraseña debe ser más fuerte';
    }

    if (!formData.RepeatPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.Password !== formData.RepeatPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.LastName.trim()) {
      newErrors.apodo = 'El apodo es obligatorio';
    } else if (formData.LastName.length < 3) {
      newErrors.apodo = 'El apodo debe tener al menos 3 caracteres';
    } else if (formData.LastName.length > 20) {
      newErrors.apodo = 'El apodo no puede tener más de 20 caracteres';
    }

    if (!formData.DiscordUser.trim()) {
      newErrors.discord = 'El usuario de Discord es obligatorio';
    } else if (!formData.DiscordUser.includes('#') && !formData.DiscordUser.includes('@')) {
      newErrors.discord = 'Formato inválido. Usa: usuario#1234 o @usuario';
    }

    if (!formData.SteamId.trim()) {
      newErrors.steamId = 'El STEAM_ID es obligatorio';
    } else if (!validateSteamId(formData.SteamId)) {
      newErrors.steamId = 'STEAM_ID inválido. Debe ser un Steam64 ID válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    // 1) Llamas al servicio real
    const result = await userService.register({
      Username:    formData.Username,
      Password:    formData.Password,
      RepeatPassword: formData.RepeatPassword,  // si tu API lo pide
      Email:       formData.Email,
      FirstName:   formData.FirstName,
      LastName:    formData.LastName,
      DiscordUser: formData.DiscordUser,
      SteamId:     formData.SteamId
    });

    // 2) Manejas la respuesta (ej. un objeto { Success, Error } ó { Success, Token, ... })
    if (!result.Success) {
      // mostramos el error que venga del backend
      setErrors({ general: result.Error || 'Error al registrar usuario' });
    } else {
      // redirigimos al login con mensaje de éxito
      navigate('/login', {
        state: {
          message: '¡Registro exitoso! Ya puedes iniciar sesión con tus credenciales.',
          type: 'success'
        }
      });
    }
  } catch (err: any) {
    // capturamos fallo de red o parsing
    setErrors({ general: err.message || 'Error desconocido al registrar' });
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>

      <div className="relative z-10 w-full max-w-5xl px-4 h-full flex items-center justify-center">
        {/* Registration Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-2xl w-full max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="text-center mb-4">
            <Link to="/" className="inline-flex items-center space-x-2 mb-3">
              <Target className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">
                Aim <span className="text-cyan-400">League</span>
              </span>
            </Link>
            <h1 className="text-xl font-bold text-white mb-1">Crear Cuenta</h1>
            <p className="text-gray-400 text-xs">Únete a la comunidad de CS2 más competitiva</p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-xs">{errors.general}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Personal Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Nombre */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    value={formData.FirstName}
                    onChange={(e) => handleInputChange('FirstName', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                      errors.nombre ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tu nombre"
                  />
                </div>
                {errors.nombre && (
                  <p className="text-red-400 text-xs mt-0.5">{errors.nombre}</p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Apellido *
                </label>
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    value={formData.LastName}
                    onChange={(e) => handleInputChange('LastName', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                      errors.apellido ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tu apellido"
                  />
                </div>
                {errors.apellido && (
                  <p className="text-red-400 text-xs mt-0.5">{errors.apellido}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="email"
                    value={formData.Email}
                    onChange={(e) => handleInputChange('Email', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-0.5">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.Password}
                    onChange={(e) => handleInputChange('Password', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg pl-7 pr-8 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.Password && (
                  <div className="mt-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-gray-400">Fortaleza:</span>
                      <span className={`text-xs font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                        {getPasswordStrengthText(passwordStrength).text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-0.5">
                      <div 
                        className={`h-0.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: getPasswordStrengthWidth(passwordStrength) }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Repetir Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.RepeatPassword}
                    onChange={(e) => handleInputChange('RepeatPassword', e.target.value)}
                    className={`w-full bg-gray-900 border rounded-lg pl-7 pr-8 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-0.5">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Gaming Information */}
            <div className="border-t border-gray-700 pt-3">
              <h3 className="text-xs font-semibold text-white mb-2 flex items-center space-x-1">
                <Gamepad2 className="w-3 h-3 text-cyan-400" />
                <span>Información de Gaming</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Apodo */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Apodo (visible en torneos) *
                  </label>
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="text"
                      value={formData.Username}
                      onChange={(e) => handleInputChange('Username', e.target.value)}
                      className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                        errors.apodo ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Tu apodo de juego"
                      maxLength={20}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    {errors.apodo ? (
                      <p className="text-red-400 text-xs">{errors.apodo}</p>
                    ) : (
                      <p className="text-gray-500 text-xs">3-20 caracteres</p>
                    )}
                    <span className="text-gray-500 text-xs">{formData.Username.length}/20</span>
                  </div>
                </div>

                {/* Discord */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Usuario de Discord *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="text"
                      value={formData.DiscordUser}
                      onChange={(e) => handleInputChange('DiscordUser', e.target.value)}
                      className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                        errors.discord ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="usuario#1234"
                    />
                  </div>
                  {errors.discord && (
                    <p className="text-red-400 text-xs mt-0.5">{errors.discord}</p>
                  )}
                </div>

                {/* Steam ID */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    STEAM_ID (Steam64) *
                  </label>
                  <div className="relative">
                    <Gamepad2 className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="text"
                      value={formData.SteamId}
                      onChange={(e) => handleInputChange('SteamId', e.target.value)}
                      className={`w-full bg-gray-900 border rounded-lg pl-7 pr-2 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-xs ${
                        errors.steamId ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="76561198000000000"
                    />
                  </div>
                  {errors.steamId ? (
                    <p className="text-red-400 text-xs mt-0.5">{errors.steamId}</p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-0.5">
                      <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                        Encuentra tu Steam64 ID
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  <span className="text-sm">Creando cuenta...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3 h-3" />
                  <span className="text-sm">Crear Cuenta</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-3 text-center">
            <p className="text-gray-400 text-xs mb-2">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                to="/login" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Inicia sesión aquí
              </Link>
            </p>
            
            {/* Terms Notice */}
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-xs">
                Al crear una cuenta, aceptas nuestros{' '}
                <a href="#" className="underline hover:text-blue-300">Términos de Servicio</a>
                {' '}y{' '}
                <a href="#" className="underline hover:text-blue-300">Política de Privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;