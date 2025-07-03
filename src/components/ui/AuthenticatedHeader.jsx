import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notifications] = useState([
    { id: 1, message: 'New property inquiry received', time: '5 min ago', unread: true },
    { id: 2, message: 'Property listing approved', time: '1 hour ago', unread: true },
    { id: 3, message: 'Monthly report available', time: '2 hours ago', unread: false },
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/user-authentication-login-register');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const translations = {
    en: {
      dashboard: 'Dashboard',
      myProperties: 'My Properties',
      addProperty: 'Add Property',
      notifications: 'Notifications',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      viewAll: 'View All',
      markAllRead: 'Mark All Read'
    },
    es: {
      dashboard: 'Panel',
      myProperties: 'Mis Propiedades',
      addProperty: 'Agregar Propiedad',
      notifications: 'Notificaciones',
      profile: 'Perfil',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
      viewAll: 'Ver Todo',
      markAllRead: 'Marcar Todo Leído'
    }
  };

  const t = translations[currentLanguage];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-elevation-1">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/user-dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-250">
              <Icon name="Home" size={20} color="white" />
            </div>
            <span className="text-xl font-heading-bold text-text-primary">
              Property intern
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/user-dashboard"
              className={`text-sm font-body-medium transition-colors duration-250 hover:text-primary ${
                location.pathname === '/user-dashboard' ?'text-primary' :'text-text-secondary'
              }`}
            >
              {t.dashboard}
            </Link>
            <Link
              to="/property-management-add-edit"
              className={`text-sm font-body-medium transition-colors duration-250 hover:text-primary ${
                location.pathname === '/property-management-add-edit' ?'text-primary' :'text-text-secondary'
              }`}
            >
              {t.addProperty}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>

            {/* Quick Add Property Button */}
            <Link to="/property-management-add-edit" className="hidden sm:block">
              <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
                {t.addProperty}
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-250"
                aria-label={t.notifications}
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-elevation-3 border border-border z-60">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading-semibold text-text-primary">{t.notifications}</h3>
                      <button className="text-xs text-primary hover:text-primary-600">
                        {t.markAllRead}
                      </button>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-secondary-50 transition-colors duration-250 ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <p className="text-sm text-text-primary">{notification.message}</p>
                        <p className="text-xs text-text-muted mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <button className="text-sm text-primary hover:text-primary-600 w-full text-center">
                      {t.viewAll}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-250"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-elevation-3 border border-border z-60">
                  <div className="p-4 border-b border-border">
                    <p className="font-body-medium text-text-primary">John Doe</p>
                    <p className="text-sm text-text-muted">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-250 flex items-center space-x-2">
                      <Icon name="User" size={16} />
                      <span>{t.profile}</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-secondary-50 hover:text-text-primary transition-colors duration-250 flex items-center space-x-2">
                      <Icon name="Settings" size={16} />
                      <span>{t.settings}</span>
                    </button>
                    <div className="sm:hidden px-4 py-2">
                      <select
                        value={currentLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="w-full appearance-none bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="en">EN</option>
                        <option value="es">ES</option>
                      </select>
                    </div>
                  </div>
                  <div className="border-t border-border py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-colors duration-250 flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;