import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const DashboardHeader = ({ userRole, userName, profileCompletion }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      welcome: 'Welcome back',
      profileIncomplete: 'Complete your profile to get better recommendations',
      completeProfile: 'Complete Profile',
      profileComplete: 'Profile Complete'
    },
    es: {
      welcome: 'Bienvenido de nuevo',
      profileIncomplete: 'Completa tu perfil para obtener mejores recomendaciones',
      completeProfile: 'Completar Perfil',
      profileComplete: 'Perfil Completo'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-heading-bold mb-2">
            {t.welcome}, {userName}!
          </h1>
          {profileCompletion < 100 && (
            <p className="text-primary-100 text-sm">
              {t.profileIncomplete}
            </p>
          )}
        </div>
        
        {profileCompletion < 100 && (
          <div className="flex flex-col sm:items-end">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-1 sm:w-32 bg-primary-400 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <span className="text-sm font-body-medium">{profileCompletion}%</span>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              iconName="User"
              iconPosition="left"
            >
              {t.completeProfile}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;