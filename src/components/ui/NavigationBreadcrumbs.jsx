import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      home: 'Home',
      dashboard: 'Dashboard',
      admin: 'Admin',
      properties: 'Properties',
      propertyDetail: 'Property Detail',
      propertyManagement: 'Property Management',
      addProperty: 'Add Property',
      editProperty: 'Edit Property',
      userDashboard: 'User Dashboard',
      adminDashboard: 'Admin Dashboard',
      adminPropertyManagement: 'Property Management',
      authentication: 'Authentication',
      login: 'Login',
      register: 'Register'
    },
    es: {
      home: 'Inicio',
      dashboard: 'Panel',
      admin: 'Administrador',
      properties: 'Propiedades',
      propertyDetail: 'Detalle de Propiedad',
      propertyManagement: 'Gestión de Propiedades',
      addProperty: 'Agregar Propiedad',
      editProperty: 'Editar Propiedad',
      userDashboard: 'Panel de Usuario',
      adminDashboard: 'Panel de Administrador',
      adminPropertyManagement: 'Gestión de Propiedades',
      authentication: 'Autenticación',
      login: 'Iniciar Sesión',
      register: 'Registrarse'
    }
  };

  const t = translations[currentLanguage];

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs.push({
      label: t.home,
      path: '/',
      isActive: false
    });

    // Map path segments to breadcrumb items
    const pathMap = {
      'user-authentication-login-register': {
        label: t.authentication,
        path: '/user-authentication-login-register'
      },
      'property-detail-view': {
        label: t.propertyDetail,
        path: '/property-detail-view'
      },
      'user-dashboard': {
        label: t.userDashboard,
        path: '/user-dashboard'
      },
      'property-management-add-edit': {
        label: t.propertyManagement,
        path: '/property-management-add-edit'
      },
      'admin-dashboard': {
        label: t.adminDashboard,
        path: '/admin-dashboard'
      },
      'admin-property-management': {
        label: t.adminPropertyManagement,
        path: '/admin-property-management'
      }
    };

    // Build breadcrumb trail
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      if (pathMap[segment]) {
        breadcrumbs.push({
          label: pathMap[segment].label,
          path: currentPath,
          isActive: isLast
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on home page or if only home breadcrumb exists
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm py-3 px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={16}
                className="text-text-muted mx-2"
              />
            )}
            
            {breadcrumb.isActive ? (
              <span className="font-body-medium text-text-primary">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="text-text-secondary hover:text-primary transition-colors duration-250 font-body-normal"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;