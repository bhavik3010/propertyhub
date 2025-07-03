import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ userRole }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      quickActions: 'Quick Actions',
      // Owner Actions
      addProperty: 'Add New Property',
      addPropertyDesc: 'List a new property for rent or sale',
      manageListings: 'Manage Listings',
      manageListingsDesc: 'Edit and update your property listings',
      viewInquiries: 'View Inquiries',
      viewInquiriesDesc: 'Respond to property inquiries',
      analytics: 'View Analytics',
      analyticsDesc: 'Check your property performance',
      // Seeker Actions
      searchProperties: 'Search Properties',
      searchPropertiesDesc: 'Find your perfect home',
      savedProperties: 'Saved Properties',
      savedPropertiesDesc: 'View your favorite properties',
      myInquiries: 'My Inquiries',
      myInquiriesDesc: 'Track your property inquiries',
      alerts: 'Manage Alerts',
      alertsDesc: 'Set up property notifications'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      // Owner Actions
      addProperty: 'Agregar Nueva Propiedad',
      addPropertyDesc: 'Lista una nueva propiedad para alquiler o venta',
      manageListings: 'Gestionar Listados',
      manageListingsDesc: 'Edita y actualiza tus listados de propiedades',
      viewInquiries: 'Ver Consultas',
      viewInquiriesDesc: 'Responde a las consultas de propiedades',
      analytics: 'Ver Analíticas',
      analyticsDesc: 'Revisa el rendimiento de tus propiedades',
      // Seeker Actions
      searchProperties: 'Buscar Propiedades',
      searchPropertiesDesc: 'Encuentra tu hogar perfecto',
      savedProperties: 'Propiedades Guardadas',
      savedPropertiesDesc: 'Ve tus propiedades favoritas',
      myInquiries: 'Mis Consultas',
      myInquiriesDesc: 'Rastrea tus consultas de propiedades',
      alerts: 'Gestionar Alertas',
      alertsDesc: 'Configura notificaciones de propiedades'
    }
  };

  const t = translations[currentLanguage];

  const getOwnerActions = () => [
    {
      title: t.addProperty,
      description: t.addPropertyDesc,
      icon: 'Plus',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      link: '/property-management-add-edit'
    },
    {
      title: t.manageListings,
      description: t.manageListingsDesc,
      icon: 'Edit',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      link: '/property-management-add-edit'
    },
    {
      title: t.viewInquiries,
      description: t.viewInquiriesDesc,
      icon: 'MessageCircle',
      color: 'text-success',
      bgColor: 'bg-success-50',
      link: '#'
    },
    {
      title: t.analytics,
      description: t.analyticsDesc,
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      link: '#'
    }
  ];

  const getSeekerActions = () => [
    {
      title: t.searchProperties,
      description: t.searchPropertiesDesc,
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      link: '/property-detail-view'
    },
    {
      title: t.savedProperties,
      description: t.savedPropertiesDesc,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error-50',
      link: '#'
    },
    {
      title: t.myInquiries,
      description: t.myInquiriesDesc,
      icon: 'MessageSquare',
      color: 'text-success',
      bgColor: 'bg-success-50',
      link: '#'
    },
    {
      title: t.alerts,
      description: t.alertsDesc,
      icon: 'Bell',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      link: '#'
    }
  ];

  const actions = userRole === 'owner' ? getOwnerActions() : getSeekerActions();

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
      <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
        {t.quickActions}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="block p-4 border border-border rounded-lg hover:border-primary hover:shadow-elevation-2 transition-all duration-250 group"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-250`}>
                <Icon name={action.icon} size={20} className={action.color} />
              </div>
              <div className="flex-1">
                <h3 className="font-body-semibold text-text-primary group-hover:text-primary transition-colors duration-250">
                  {action.title}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {action.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-muted group-hover:text-primary transition-colors duration-250" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;