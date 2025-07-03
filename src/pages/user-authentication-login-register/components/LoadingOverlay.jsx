import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isLoading, currentLanguage }) => {
  const translations = {
    en: {
      loading: 'Loading...'
    },
    es: {
      loading: 'Cargando...'
    }
  };

  const t = translations[currentLanguage];

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg p-6 flex flex-col items-center space-y-4 shadow-elevation-4">
        <div className="animate-spin">
          <Icon name="Loader2" size={32} color="var(--color-primary)" />
        </div>
        <p className="text-text-primary font-body-medium">{t.loading}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;