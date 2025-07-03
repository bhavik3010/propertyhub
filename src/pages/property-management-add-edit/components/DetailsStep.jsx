import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DetailsStep = ({ formData, onUpdateData, onNext, onPrevious, validationErrors }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      propertyDetails: 'Property Details',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      squareFootage: 'Square Footage',
      sqftPlaceholder: 'Enter square footage',
      amenities: 'Amenities',
      additionalFeatures: 'Additional Features',
      additionalFeaturesPlaceholder: 'Describe any additional features...',
      previous: 'Previous',
      next: 'Next',
      required: 'This field is required',
      wifi: 'WiFi',
      parking: 'Parking',
      pool: 'Swimming Pool',
      gym: 'Gym/Fitness Center',
      laundry: 'Laundry',
      airConditioning: 'Air Conditioning',
      heating: 'Heating',
      balcony: 'Balcony/Terrace',
      garden: 'Garden',
      security: 'Security System',
      elevator: 'Elevator',
      petFriendly: 'Pet Friendly'
    },
    es: {
      propertyDetails: 'Detalles de la Propiedad',
      bedrooms: 'Dormitorios',
      bathrooms: 'Baños',
      squareFootage: 'Metros Cuadrados',
      sqftPlaceholder: 'Ingrese los metros cuadrados',
      amenities: 'Comodidades',
      additionalFeatures: 'Características Adicionales',
      additionalFeaturesPlaceholder: 'Describa características adicionales...',
      previous: 'Anterior',
      next: 'Siguiente',
      required: 'Este campo es obligatorio',
      wifi: 'WiFi',
      parking: 'Estacionamiento',
      pool: 'Piscina',
      gym: 'Gimnasio',
      laundry: 'Lavandería',
      airConditioning: 'Aire Acondicionado',
      heating: 'Calefacción',
      balcony: 'Balcón/Terraza',
      garden: 'Jardín',
      security: 'Sistema de Seguridad',
      elevator: 'Ascensor',
      petFriendly: 'Acepta Mascotas'
    }
  };

  const t = translations[currentLanguage];

  const amenitiesList = [
    { id: 'wifi', label: t.wifi, icon: 'Wifi' },
    { id: 'parking', label: t.parking, icon: 'Car' },
    { id: 'pool', label: t.pool, icon: 'Waves' },
    { id: 'gym', label: t.gym, icon: 'Dumbbell' },
    { id: 'laundry', label: t.laundry, icon: 'Shirt' },
    { id: 'airConditioning', label: t.airConditioning, icon: 'Wind' },
    { id: 'heating', label: t.heating, icon: 'Thermometer' },
    { id: 'balcony', label: t.balcony, icon: 'Home' },
    { id: 'garden', label: t.garden, icon: 'Trees' },
    { id: 'security', label: t.security, icon: 'Shield' },
    { id: 'elevator', label: t.elevator, icon: 'ArrowUp' },
    { id: 'petFriendly', label: t.petFriendly, icon: 'Heart' }
  ];

  const handleInputChange = (field, value) => {
    onUpdateData({ [field]: value });
  };

  const handleAmenityToggle = (amenityId) => {
    const currentAmenities = formData.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    
    onUpdateData({ amenities: updatedAmenities });
  };

  const handleNext = () => {
    const errors = {};
    
    if (!formData.bedrooms) errors.bedrooms = t.required;
    if (!formData.bathrooms) errors.bathrooms = t.required;
    if (!formData.squareFootage) errors.squareFootage = t.required;

    if (Object.keys(errors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading-bold text-text-primary mb-2">
          {t.propertyDetails}
        </h2>
        <p className="text-text-secondary">
          Provide detailed information about your property
        </p>
      </div>

      <div className="space-y-6">
        {/* Bedrooms and Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.bedrooms} *
            </label>
            <select
              value={formData.bedrooms || ''}
              onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250 ${
                validationErrors.bedrooms ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select bedrooms</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {validationErrors.bedrooms && (
              <p className="text-error text-sm mt-1">{validationErrors.bedrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.bathrooms} *
            </label>
            <select
              value={formData.bathrooms || ''}
              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250 ${
                validationErrors.bathrooms ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select bathrooms</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {validationErrors.bathrooms && (
              <p className="text-error text-sm mt-1">{validationErrors.bathrooms}</p>
            )}
          </div>
        </div>

        {/* Square Footage */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.squareFootage} *
          </label>
          <Input
            type="number"
            placeholder={t.sqftPlaceholder}
            value={formData.squareFootage || ''}
            onChange={(e) => handleInputChange('squareFootage', e.target.value)}
            className={validationErrors.squareFootage ? 'border-error' : ''}
          />
          {validationErrors.squareFootage && (
            <p className="text-error text-sm mt-1">{validationErrors.squareFootage}</p>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-4">
            {t.amenities}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity.id}
                type="button"
                onClick={() => handleAmenityToggle(amenity.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-250 ${
                  (formData.amenities || []).includes(amenity.id)
                    ? 'bg-primary-50 border-primary text-primary' :'bg-surface border-border text-text-secondary hover:bg-secondary-50'
                }`}
              >
                <Icon
                  name={amenity.icon}
                  size={16}
                  className={`flex-shrink-0 ${
                    (formData.amenities || []).includes(amenity.id)
                      ? 'text-primary' :'text-text-muted'
                  }`}
                />
                <span className="text-sm font-body-medium truncate">
                  {amenity.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.additionalFeatures}
          </label>
          <textarea
            placeholder={t.additionalFeaturesPlaceholder}
            value={formData.additionalFeatures || ''}
            onChange={(e) => handleInputChange('additionalFeatures', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
          />
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

export default DetailsStep;