import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FormSidebar = ({ currentStep, onStepClick, formData, validationErrors }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      formNavigation: 'Form Navigation',
      basicInfo: 'Basic Information',
      propertyDetails: 'Property Details',
      images: 'Images & Media',
      location: 'Location & Map',
      reviewSubmit: 'Review & Submit',
      completed: 'Completed',
      current: 'Current',
      hasErrors: 'Has Errors'
    },
    es: {
      formNavigation: 'Navegación del Formulario',
      basicInfo: 'Información Básica',
      propertyDetails: 'Detalles de la Propiedad',
      images: 'Imágenes y Medios',
      location: 'Ubicación y Mapa',
      reviewSubmit: 'Revisar y Enviar',
      completed: 'Completado',
      current: 'Actual',
      hasErrors: 'Tiene Errores'
    }
  };

  const t = translations[currentLanguage];

  const sidebarItems = [
    {
      id: 1,
      title: t.basicInfo,
      icon: 'FileText',
      fields: ['title', 'description', 'price', 'propertyType', 'status']
    },
    {
      id: 2,
      title: t.propertyDetails,
      icon: 'Settings',
      fields: ['bedrooms', 'bathrooms', 'squareFootage', 'amenities']
    },
    {
      id: 3,
      title: t.images,
      icon: 'Camera',
      fields: ['images']
    },
    {
      id: 4,
      title: t.location,
      icon: 'MapPin',
      fields: ['address', 'coordinates', 'neighborhood']
    },
    {
      id: 5,
      title: t.reviewSubmit,
      icon: 'CheckCircle',
      fields: []
    }
  ];

  const getStepStatus = (step) => {
    if (currentStep === step.id) return 'current';
    if (currentStep > step.id) return 'completed';
    
    // Check if step has errors
    const hasErrors = step.fields.some(field => validationErrors[field]);
    if (hasErrors) return 'error';
    
    return 'pending';
  };

  const getStepIcon = (step) => {
    const status = getStepStatus(step);
    if (status === 'completed') return 'CheckCircle';
    if (status === 'error') return 'AlertCircle';
    return step.icon;
  };

  return (
    <div className="w-64 bg-surface-secondary border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-6">
          {t.formNavigation}
        </h3>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const status = getStepStatus(item);
            const isClickable = status === 'completed' || status === 'current';
            
            return (
              <button
                key={item.id}
                onClick={() => isClickable && onStepClick(item.id)}
                disabled={!isClickable}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-250 ${
                  status === 'current' ?'bg-primary text-primary-foreground shadow-elevation-1'
                    : status === 'completed' ?'bg-success-50 text-success-700 hover:bg-success-100'
                    : status === 'error' ?'bg-error-50 text-error-700 hover:bg-error-100' :'bg-secondary-100 text-text-muted cursor-not-allowed'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === 'current' ?'bg-primary-foreground text-primary'
                    : status === 'completed' ?'bg-success text-success-foreground'
                    : status === 'error' ?'bg-error text-error-foreground' :'bg-secondary-300 text-text-muted'
                }`}>
                  <Icon name={getStepIcon(item)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-body-medium truncate">{item.title}</div>
                  <div className="text-xs opacity-75 mt-0.5">
                    {status === 'current' && t.current}
                    {status === 'completed' && t.completed}
                    {status === 'error' && t.hasErrors}
                  </div>
                </div>
                
                {status === 'current' && (
                  <Icon name="ChevronRight" size={16} className="flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default FormSidebar;