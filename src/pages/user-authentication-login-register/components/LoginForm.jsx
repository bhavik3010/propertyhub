import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage, onLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const translations = {
    en: {
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      forgotPassword: 'Forgot your password?',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid credentials. Use: admin@example.com / admin123 or user@example.com / user123',
      signingIn: 'Signing in...'
    },
    es: {
      email: 'Correo Electrónico',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      signIn: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      emailRequired: 'El correo es requerido',
      passwordRequired: 'La contraseña es requerida',
      invalidCredentials: 'Credenciales inválidas. Usa: admin@example.com / admin123 o user@example.com / user123',
      signingIn: 'Iniciando sesión...'
    }
  };

  const t = translations[currentLanguage];

  const mockCredentials = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );
      
      if (user) {
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        localStorage.setItem('userRole', user.role);
        
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setErrors({ general: t.invalidCredentials });
      }
      
      onLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}
      
      <div>
        <Input
          type="email"
          name="email"
          placeholder={t.email}
          value={formData.email}
          onChange={handleInputChange}
          className="w-full"
        />
        {errors.email && (
          <p className="text-error-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t.password}
          value={formData.password}
          onChange={handleInputChange}
          className="w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
        {errors.password && (
          <p className="text-error-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">{t.rememberMe}</span>
        </label>
        
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-600 transition-colors duration-250"
        >
          {t.forgotPassword}
        </button>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        className="mt-6"
      >
        {t.signIn}
      </Button>
    </form>
  );
};

export default LoginForm;