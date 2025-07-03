import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PropertyMap = ({ property }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      location: 'Location & Nearby',
      walkScore: 'Walk Score',
      transitScore: 'Transit Score',
      bikeScore: 'Bike Score',
      nearbyAmenities: 'Nearby Amenities',
      viewOnGoogleMaps: 'View on Google Maps'
    },
    es: {
      location: 'Ubicación y Cercanías',
      walkScore: 'Puntuación de Caminata',
      transitScore: 'Puntuación de Transporte',
      bikeScore: 'Puntuación de Bicicleta',
      nearbyAmenities: 'Comodidades Cercanas',
      viewOnGoogleMaps: 'Ver en Google Maps'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
      <h2 className="text-xl font-heading-bold text-text-primary mb-6">
        {t.location}
      </h2>

      {/* Map */}
      <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-6">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={property.title}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      {/* Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading-bold text-primary mb-1">
            {property.walkScore}
          </div>
          <div className="text-sm text-text-secondary">{t.walkScore}</div>
        </div>
        
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading-bold text-primary mb-1">
            {property.transitScore}
          </div>
          <div className="text-sm text-text-secondary">{t.transitScore}</div>
        </div>
        
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading-bold text-primary mb-1">
            {property.bikeScore}
          </div>
          <div className="text-sm text-text-secondary">{t.bikeScore}</div>
        </div>
      </div>

      {/* Nearby Amenities */}
      <div>
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
          {t.nearbyAmenities}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {property.nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon
                    name={place.icon}
                    size={16}
                    className="text-primary"
                  />
                </div>
                <span className="text-text-primary font-body-medium">{place.name}</span>
              </div>
              <span className="text-sm text-text-muted">{place.distance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View on Google Maps */}
      <div className="mt-6 pt-6 border-t border-border">
        <a
          href={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-250"
        >
          <Icon name="ExternalLink" size={16} />
          <span className="font-body-medium">{t.viewOnGoogleMaps}</span>
        </a>
      </div>
    </div>
  );
};

export default PropertyMap;