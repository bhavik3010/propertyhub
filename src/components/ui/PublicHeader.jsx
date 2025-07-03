import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const translations = {
    en: {
      properties: 'Properties',
      login: 'Login',
      register: 'Register',
      search: 'Search properties...',
      menu: 'Menu'
    },
    es: {
      properties: 'Propiedades',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      search: 'Buscar propiedades...',
      menu: 'Menú'
    }
  };

  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm border-b border-border shadow-elevation-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-250">
              <Icon name="Home" size={20} color="white" />
            </div>
            <span className="text-xl font-heading-bold text-text-primary">
              Property intern
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/property-detail-view"
              className={`text-sm font-body-medium transition-colors duration-250 hover:text-primary ${
                isActive('/property-detail-view')
                  ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
              }`}
            >
              {t.properties}
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder={t.search}
                className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>

            <Link to="/user-authentication-login-register">
              <Button variant="ghost" size="sm">
                {t.login}
              </Button>
            </Link>
            <Link to="/user-authentication-login-register">
              <Button variant="primary" size="sm">
                {t.register}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-250"
            aria-label={t.menu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-elevation-2">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/property-detail-view"
              onClick={closeMenu}
              className={`block text-base font-body-medium transition-colors duration-250 hover:text-primary ${
                isActive('/property-detail-view')
                  ? 'text-primary' :'text-text-secondary'
              }`}
            >
              {t.properties}
            </Link>
            
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Language:</span>
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link to="/user-authentication-login-register" onClick={closeMenu}>
                  <Button variant="ghost" size="sm" fullWidth>
                    {t.login}
                  </Button>
                </Link>
                <Link to="/user-authentication-login-register" onClick={closeMenu}>
                  <Button variant="primary" size="sm" fullWidth>
                    {t.register}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;