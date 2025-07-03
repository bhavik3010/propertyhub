import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyOverview = ({ property, onFavoriteToggle, isFavorite }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      beds: 'Beds',
      baths: 'Baths',
      sqft: 'Sq Ft',
      available: 'Available',
      sold: 'Sold',
      rented: 'Rented',
      pending: 'Pending',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      share: 'Share',
      virtualTour: 'Virtual Tour'
    },
    es: {
      beds: 'Habitaciones',
      baths: 'Baños',
      sqft: 'Pies²',
      available: 'Disponible',
      sold: 'Vendido',
      rented: 'Alquilado',
      pending: 'Pendiente',
      addToFavorites: 'Agregar a Favoritos',
      removeFromFavorites: 'Quitar de Favoritos',
      share: 'Compartir',
      virtualTour: 'Tour Virtual'
    }
  };

  const t = translations[currentLanguage];

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-success text-success-foreground', label: t.available },
      sold: { color: 'bg-error text-error-foreground', label: t.sold },
      rented: { color: 'bg-warning text-warning-foreground', label: t.rented },
      pending: { color: 'bg-secondary text-secondary-foreground', label: t.pending }
    };

    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-body-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-heading-bold text-text-primary">
              {property.price}
            </h1>
            {getStatusBadge(property.status)}
          </div>
          
          <div className="flex items-center text-text-secondary mb-4">
            <Icon name="MapPin" size={16} className="mr-2" />
            <span className="text-base">{property.address}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant={isFavorite ? "danger" : "outline"}
            size="sm"
            iconName={isFavorite ? "Heart" : "Heart"}
            onClick={onFavoriteToggle}
            className="flex-shrink-0"
          >
            {isFavorite ? t.removeFromFavorites : t.addToFavorites}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            onClick={handleShare}
            className="flex-shrink-0"
          >
            {t.share}
          </Button>
        </div>
      </div>

      {/* Property Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Bed" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-heading-bold text-text-primary">{property.bedrooms}</div>
          <div className="text-sm text-text-secondary">{t.beds}</div>
        </div>
        
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Bath" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-heading-bold text-text-primary">{property.bathrooms}</div>
          <div className="text-sm text-text-secondary">{t.baths}</div>
        </div>
        
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Square" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-heading-bold text-text-primary">{property.squareFeet.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">{t.sqft}</div>
        </div>
      </div>

      {/* Virtual Tour Button */}
      {property.hasVirtualTour && (
        <Button
          variant="primary"
          size="md"
          iconName="Play"
          iconPosition="left"
          fullWidth
          className="mb-4"
        >
          {t.virtualTour}
        </Button>
      )}
    </div>
  );
};

export default PropertyOverview;