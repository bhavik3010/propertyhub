import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileActionBar = ({ onFavoriteToggle, isFavorite, onContactClick, onShareClick }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      favorite: 'Favorite',
      contact: 'Contact',
      share: 'Share',
      call: 'Call'
    },
    es: {
      favorite: 'Favorito',
      contact: 'Contactar',
      share: 'Compartir',
      call: 'Llamar'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-elevation-3 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onFavoriteToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-250 ${
              isFavorite
                ? 'bg-error text-error-foreground'
                : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
            aria-label={t.favorite}
          >
            <Icon name="Heart" size={20} />
          </button>
          
          <button
            onClick={onShareClick}
            className="w-12 h-12 rounded-full bg-secondary-100 text-text-secondary hover:bg-secondary-200 flex items-center justify-center transition-colors duration-250"
            aria-label={t.share}
          >
            <Icon name="Share" size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="md"
            iconName="Phone"
            iconPosition="left"
          >
            {t.call}
          </Button>
          
          <Button
            variant="primary"
            size="md"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onContactClick}
          >
            {t.contact}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileActionBar;