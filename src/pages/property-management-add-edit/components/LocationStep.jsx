import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ formData, onUpdateData, onNext, onPrevious, validationErrors }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      locationMap: 'Location & Map',
      propertyAddress: 'Property Address',
      streetAddress: 'Street Address',
      streetAddressPlaceholder: 'Enter street address',
      city: 'City',
      cityPlaceholder: 'Enter city',
      state: 'State/Province',
      statePlaceholder: 'Enter state or province',
      zipCode: 'ZIP/Postal Code',
      zipPlaceholder: 'Enter ZIP or postal code',
      country: 'Country',
      countryPlaceholder: 'Enter country',
      mapLocation: 'Map Location',
      mapDescription: 'Click on the map to set the exact location of your property',
      neighborhoodInfo: 'Neighborhood Information',
      neighborhoodPlaceholder: 'Describe the neighborhood, nearby amenities, transportation...',
      previous: 'Previous',
      next: 'Next',
      required: 'This field is required'
    },
    es: {
      locationMap: 'Ubicación y Mapa',
      propertyAddress: 'Dirección de la Propiedad',
      streetAddress: 'Dirección',
      streetAddressPlaceholder: 'Ingrese la dirección',
      city: 'Ciudad',
      cityPlaceholder: 'Ingrese la ciudad',
      state: 'Estado/Provincia',
      statePlaceholder: 'Ingrese el estado o provincia',
      zipCode: 'Código Postal',
      zipPlaceholder: 'Ingrese el código postal',
      country: 'País',
      countryPlaceholder: 'Ingrese el país',
      mapLocation: 'Ubicación en el Mapa',
      mapDescription: 'Haga clic en el mapa para establecer la ubicación exacta de su propiedad',
      neighborhoodInfo: 'Información del Vecindario',
      neighborhoodPlaceholder: 'Describa el vecindario, servicios cercanos, transporte...',
      previous: 'Anterior',
      next: 'Siguiente',
      required: 'Este campo es obligatorio'
    }
  };

  const t = translations[currentLanguage];

  // Mock coordinates for demonstration
  const defaultCoordinates = {
    lat: 40.7128,
    lng: -74.0060
  };

  const coordinates = formData.coordinates || defaultCoordinates;

  const handleInputChange = (field, value) => {
    onUpdateData({ [field]: value });
  };

  const handleAddressChange = (field, value) => {
    const address = { ...formData.address, [field]: value };
    onUpdateData({ address });
  };

  const handleNext = () => {
    const errors = {};
    const address = formData.address || {};
    
    if (!address.street?.trim()) errors.street = t.required;
    if (!address.city?.trim()) errors.city = t.required;
    if (!address.state?.trim()) errors.state = t.required;
    if (!address.zipCode?.trim()) errors.zipCode = t.required;
    if (!address.country?.trim()) errors.country = t.required;

    if (Object.keys(errors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading-bold text-text-primary mb-2">
          {t.locationMap}
        </h2>
        <p className="text-text-secondary">
          Provide the location details for your property
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Address Form */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
              {t.propertyAddress}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-2">
                  {t.streetAddress} *
                </label>
                <Input
                  type="text"
                  placeholder={t.streetAddressPlaceholder}
                  value={formData.address?.street || ''}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className={validationErrors.street ? 'border-error' : ''}
                />
                {validationErrors.street && (
                  <p className="text-error text-sm mt-1">{validationErrors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    {t.city} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t.cityPlaceholder}
                    value={formData.address?.city || ''}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className={validationErrors.city ? 'border-error' : ''}
                  />
                  {validationErrors.city && (
                    <p className="text-error text-sm mt-1">{validationErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    {t.state} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t.statePlaceholder}
                    value={formData.address?.state || ''}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className={validationErrors.state ? 'border-error' : ''}
                  />
                  {validationErrors.state && (
                    <p className="text-error text-sm mt-1">{validationErrors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    {t.zipCode} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t.zipPlaceholder}
                    value={formData.address?.zipCode || ''}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className={validationErrors.zipCode ? 'border-error' : ''}
                  />
                  {validationErrors.zipCode && (
                    <p className="text-error text-sm mt-1">{validationErrors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    {t.country} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t.countryPlaceholder}
                    value={formData.address?.country || ''}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    className={validationErrors.country ? 'border-error' : ''}
                  />
                  {validationErrors.country && (
                    <p className="text-error text-sm mt-1">{validationErrors.country}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Neighborhood Information */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.neighborhoodInfo}
            </label>
            <textarea
              placeholder={t.neighborhoodPlaceholder}
              value={formData.neighborhood || ''}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
            />
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
            {t.mapLocation}
          </h3>
          
          <div className="bg-secondary-50 border border-border rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-text-muted">
              <Icon name="Info" size={16} />
              <p className="text-sm">{t.mapDescription}</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1">
            <div className="h-80 relative">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Property Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=14&output=embed`}
                className="border-0"
              />
              
              {/* Overlay for interaction */}
              <div className="absolute inset-0 bg-transparent cursor-pointer" />
            </div>
          </div>

          {/* Coordinates Display */}
          <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Coordinates:</span>
              <span className="font-mono text-text-primary">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          {t.previous}
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;