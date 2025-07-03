import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PropertyDetails = ({ property }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      description: 'Description',
      amenities: 'Amenities',
      propertyFeatures: 'Property Features',
      neighborhood: 'Neighborhood',
      propertyType: 'Property Type',
      yearBuilt: 'Year Built',
      parking: 'Parking',
      lotSize: 'Lot Size',
      hoaFees: 'HOA Fees',
      propertyTax: 'Property Tax'
    },
    es: {
      description: 'Descripción',
      amenities: 'Comodidades',
      propertyFeatures: 'Características de la Propiedad',
      neighborhood: 'Vecindario',
      propertyType: 'Tipo de Propiedad',
      yearBuilt: 'Año de Construcción',
      parking: 'Estacionamiento',
      lotSize: 'Tamaño del Lote',
      hoaFees: 'Tarifas de HOA',
      propertyTax: 'Impuesto a la Propiedad'
    }
  };

  const t = translations[currentLanguage];

  const amenityIcons = {
    'Swimming Pool': 'Waves',
    'Gym/Fitness Center': 'Dumbbell',
    'Parking': 'Car',
    'Air Conditioning': 'Wind',
    'Heating': 'Flame',
    'Laundry': 'Shirt',
    'Dishwasher': 'Utensils',
    'Balcony': 'Home',
    'Garden': 'Trees',
    'Security': 'Shield',
    'Elevator': 'ArrowUp',
    'Internet': 'Wifi'
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
        <h2 className="text-xl font-heading-bold text-text-primary mb-4">
          {t.description}
        </h2>
        <p className="text-text-secondary leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Property Features */}
      <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
        <h2 className="text-xl font-heading-bold text-text-primary mb-4">
          {t.propertyFeatures}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.propertyType}</span>
            <span className="text-text-primary font-body-medium">{property.propertyType}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.yearBuilt}</span>
            <span className="text-text-primary font-body-medium">{property.yearBuilt}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.parking}</span>
            <span className="text-text-primary font-body-medium">{property.parking}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.lotSize}</span>
            <span className="text-text-primary font-body-medium">{property.lotSize}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.hoaFees}</span>
            <span className="text-text-primary font-body-medium">{property.hoaFees}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">{t.propertyTax}</span>
            <span className="text-text-primary font-body-medium">{property.propertyTax}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
        <h2 className="text-xl font-heading-bold text-text-primary mb-4">
          {t.amenities}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon
                  name={amenityIcons[amenity] || 'Check'}
                  size={16}
                  className="text-primary"
                />
              </div>
              <span className="text-text-primary font-body-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
        <h2 className="text-xl font-heading-bold text-text-primary mb-4">
          {t.neighborhood}
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          {property.neighborhoodInfo}
        </p>
        
        {/* Nearby Places */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
              <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                <Icon
                  name={place.icon}
                  size={16}
                  className="text-accent"
                />
              </div>
              <div>
                <div className="text-text-primary font-body-medium">{place.name}</div>
                <div className="text-sm text-text-muted">{place.distance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;