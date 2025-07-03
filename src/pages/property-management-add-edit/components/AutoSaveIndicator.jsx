import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      saving: 'Saving...',
      saved: 'Saved',
      lastSaved: 'Last saved'
    },
    es: {
      saving: 'Guardando...',
      saved: 'Guardado',
      lastSaved: 'Guardado por última vez'
    }
  };

  const t = translations[currentLanguage];

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-warning-600">
        <Icon name="Loader2" size={16} className="animate-spin" />
        <span className="text-sm font-body-medium">{t.saving}</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center space-x-2 text-success-600">
        <Icon name="Check" size={16} />
        <span className="text-sm font-body-medium">
          {t.saved} {formatTime(lastSaved)}
        </span>
      </div>
    );
  }

  return null;
};

export default AutoSaveIndicator;