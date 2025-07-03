import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/user-authentication-login-register');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const translations = {
    en: {
      dashboard: 'Dashboard',
      propertyManagement: 'Property Management',
      userManagement: 'User Management',
      analytics: 'Analytics',
      reports: 'Reports',
      settings: 'Settings',
      support: 'Support',
      logout: 'Logout',
      collapse: 'Collapse',
      expand: 'Expand',
      menu: 'Menu'
    },
    es: {
      dashboard: 'Panel',
      propertyManagement: 'Gestión de Propiedades',
      userManagement: 'Gestión de Usuarios',
      analytics: 'Analíticas',
      reports: 'Reportes',
      settings: 'Configuración',
      support: 'Soporte',
      logout: 'Cerrar Sesión',
      collapse: 'Contraer',
      expand: 'Expandir',
      menu: 'Menú'
    }
  };

  const t = translations[currentLanguage];

  const menuItems = [
    {
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      label: t.dashboard,
      badge: null
    },
    {
      path: '/admin-property-management',
      icon: 'Building2',
      label: t.propertyManagement,
      badge: '12'
    },
    {
      path: '#',
      icon: 'Users',
      label: t.userManagement,
      badge: null
    },
    {
      path: '#',
      icon: 'BarChart3',
      label: t.analytics,
      badge: null
    },
    {
      path: '#',
      icon: 'FileText',
      label: t.reports,
      badge: null
    }
  ];

  const bottomMenuItems = [
    {
      path: '#',
      icon: 'Settings',
      label: t.settings
    },
    {
      path: '#',
      icon: 'HelpCircle',
      label: t.support
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-70 p-2 bg-surface rounded-lg shadow-elevation-2 border border-border"
        aria-label={t.menu}
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-60"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-surface border-r border-border shadow-elevation-2 z-70 transition-all duration-300 ease-smooth
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <Link to="/admin-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <span className="text-lg font-heading-bold text-text-primary">
                  Admin Panel
                </span>
              </Link>
            )}
            
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-1.5 rounded-md hover:bg-secondary-100 transition-colors duration-250"
              aria-label={isCollapsed ? t.expand : t.collapse}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>

            <button
              onClick={toggleMobileSidebar}
              className="lg:hidden p-1.5 rounded-md hover:bg-secondary-100 transition-colors duration-250"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-250 group
                  ${isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-text-secondary hover:bg-secondary-100 hover:text-text-primary'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive(item.path) ? 'text-primary-foreground' : ''
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className="font-body-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border space-y-2">
            {/* Language Selector */}
            {!isCollapsed && (
              <div className="mb-4">
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full appearance-none bg-secondary-50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            )}

            {/* Bottom Menu Items */}
            {bottomMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-250 text-text-secondary hover:bg-secondary-100 hover:text-text-primary
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <Icon name={item.icon} size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-body-medium">{item.label}</span>
                )}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-250 text-error hover:bg-error-50
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? t.logout : ''}
            >
              <Icon name="LogOut" size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-body-medium">{t.logout}</span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;