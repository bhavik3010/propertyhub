import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ currentLanguage, onLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'seeker',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const translations = {
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      userType: 'I am a',
      propertyOwner: 'Property Owner',
      propertySeeker: 'Property Seeker',
      acceptTerms: 'I accept the Terms of Service and Privacy Policy',
      createAccount: 'Create Account',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordMismatch: 'Passwords do not match',
      termsRequired: 'You must accept the terms and conditions',
      creatingAccount: 'Creating account...',
      accountCreated: 'Account created successfully!'
    },
    es: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      userType: 'Soy un',
      propertyOwner: 'Propietario',
      propertySeeker: 'Buscador de Propiedades',
      acceptTerms: 'Acepto los Términos de Servicio y Política de Privacidad',
      createAccount: 'Crear Cuenta',
      firstNameRequired: 'El nombre es requerido',
      lastNameRequired: 'El apellido es requerido',
      emailRequired: 'El correo es requerido',
      passwordRequired: 'La contraseña es requerida',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      passwordMismatch: 'Las contraseñas no coinciden',
      termsRequired: 'Debes aceptar los términos y condiciones',
      creatingAccount: 'Creando cuenta...',
      accountCreated: '¡Cuenta creada exitosamente!'
    }
  };

  const t = translations[currentLanguage];

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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t.firstNameRequired;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t.lastNameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordMinLength;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t.termsRequired;
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
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      localStorage.setItem('userRole', 'user');
      
      navigate('/user-dashboard');
      onLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="firstName"
            placeholder={t.firstName}
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.firstName && (
            <p className="text-error-600 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <Input
            type="text"
            name="lastName"
            placeholder={t.lastName}
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.lastName && (
            <p className="text-error-600 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
      
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
      
      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder={t.confirmPassword}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
        {errors.confirmPassword && (
          <p className="text-error-600 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-body-medium text-text-primary mb-2">
          {t.userType}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-250">
            <input
              type="radio"
              name="userType"
              value="owner"
              checked={formData.userType === 'owner'}
              onChange={handleInputChange}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm">{t.propertyOwner}</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-250">
            <input
              type="radio"
              name="userType"
              value="seeker"
              checked={formData.userType === 'seeker'}
              onChange={handleInputChange}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm">{t.propertySeeker}</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="flex items-start space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-0.5"
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            {t.acceptTerms}
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-error-600 text-sm mt-1">{errors.acceptTerms}</p>
        )}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        className="mt-6"
      >
        {t.createAccount}
      </Button>
    </form>
  );
};

export default RegisterForm;