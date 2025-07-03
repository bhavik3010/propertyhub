import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressIndicator = ({ currentStep, totalSteps, onStepClick }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      basicInfo: 'Basic Info',
      details: 'Details',
      images: 'Images',
      location: 'Location',
      review: 'Review'
    },
    es: {
      basicInfo: 'Información Básica',
      details: 'Detalles',
      images: 'Imágenes',
      location: 'Ubicación',
      review: 'Revisar'
    }
  };

  const t = translations[currentLanguage];

  const steps = [
    { id: 1, label: t.basicInfo, icon: 'FileText' },
    { id: 2, label: t.details, icon: 'Settings' },
    { id: 3, label: t.images, icon: 'Camera' },
    { id: 4, label: t.location, icon: 'MapPin' },
    { id: 5, label: t.review, icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepClick(step.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-250 ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step.id
                    ? 'bg-success-100 text-success-700 hover:bg-success-200' :'bg-secondary-100 text-text-muted hover:bg-secondary-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? 'bg-primary-foreground text-primary'
                    : currentStep > step.id
                    ? 'bg-success text-success-foreground'
                    : 'bg-secondary-300 text-text-muted'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className="font-body-medium hidden sm:block">{step.label}</span>
              </button>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-success' : 'bg-secondary-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-text-muted">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormProgressIndicator;