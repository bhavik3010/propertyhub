import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import LoadingOverlay from './components/LoadingOverlay';

const UserAuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      welcome: 'Welcome to Property intern',
      subtitle: 'Find your perfect property or list your own',
      backToHome: 'Back to Home'
    },
    es: {
      welcome: 'Bienvenido a Property intern',
      subtitle: 'Encuentra tu propiedad perfecta o lista la tuya',
      backToHome: 'Volver al Inicio'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col">
      {/* Header */}
      <header className="w-full p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-250">
              <Icon name="Home" size={20} color="white" />
            </div>
            <span className="text-xl font-heading-bold text-text-primary">
              Property intern
            </span>
          </Link>
          
          <Link
            to="/"
            className="text-sm text-text-secondary hover:text-primary transition-colors duration-250 flex items-center space-x-1"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>{t.backToHome}</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Hero Content (Hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl"></div>
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern house exterior"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            <div className="mt-8">
              <h1 className="text-4xl font-heading-bold text-text-primary mb-4">
                {t.welcome}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-surface rounded-2xl shadow-elevation-3 p-6 sm:p-8 border border-border">
              {/* Mobile Hero */}
              <div className="lg:hidden text-center mb-6">
                <h1 className="text-2xl font-heading-bold text-text-primary mb-2">
                  {t.welcome}
                </h1>
                <p className="text-text-secondary">
                  {t.subtitle}
                </p>
              </div>

              {/* Auth Tabs */}
              <AuthTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                currentLanguage={currentLanguage}
              />

              {/* Forms */}
              {activeTab === 'login' ? (
                <LoginForm
                  currentLanguage={currentLanguage}
                  onLoading={setIsLoading}
                />
              ) : (
                <RegisterForm
                  currentLanguage={currentLanguage}
                  onLoading={setIsLoading}
                />
              )}

              {/* Social Login */}
              <SocialLogin currentLanguage={currentLanguage} />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} currentLanguage={currentLanguage} />
    </div>
  );
};

export default UserAuthenticationLoginRegister;