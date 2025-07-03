import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, onPrevious, onSubmit, onEditStep, isSubmitting }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      reviewSubmit: 'Review & Submit',
      reviewDetails: 'Please review all the details before submitting your property listing',
      basicInformation: 'Basic Information',
      propertyDetails: 'Property Details',
      imagesMedia: 'Images & Media',
      locationInfo: 'Location Information',
      edit: 'Edit',
      propertyTitle: 'Property Title',
      description: 'Description',
      price: 'Price',
      propertyType: 'Property Type',
      status: 'Status',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      squareFootage: 'Square Footage',
      amenities: 'Amenities',
      additionalFeatures: 'Additional Features',
      images: 'Images',
      primaryImage: 'Primary Image',
      address: 'Address',
      neighborhood: 'Neighborhood',
      coordinates: 'Coordinates',
      previous: 'Previous',
      submitListing: 'Submit Listing',
      submitting: 'Submitting...',
      noAmenities: 'No amenities selected',
      noAdditionalFeatures: 'No additional features',
      noNeighborhoodInfo: 'No neighborhood information',
      sqft: 'sq ft'
    },
    es: {
      reviewSubmit: 'Revisar y Enviar',
      reviewDetails: 'Por favor revise todos los detalles antes de enviar su listado de propiedad',
      basicInformation: 'Información Básica',
      propertyDetails: 'Detalles de la Propiedad',
      imagesMedia: 'Imágenes y Medios',
      locationInfo: 'Información de Ubicación',
      edit: 'Editar',
      propertyTitle: 'Título de la Propiedad',
      description: 'Descripción',
      price: 'Precio',
      propertyType: 'Tipo de Propiedad',
      status: 'Estado',
      bedrooms: 'Dormitorios',
      bathrooms: 'Baños',
      squareFootage: 'Metros Cuadrados',
      amenities: 'Comodidades',
      additionalFeatures: 'Características Adicionales',
      images: 'Imágenes',
      primaryImage: 'Imagen Principal',
      address: 'Dirección',
      neighborhood: 'Vecindario',
      coordinates: 'Coordenadas',
      previous: 'Anterior',
      submitListing: 'Enviar Listado',
      submitting: 'Enviando...',
      noAmenities: 'No se seleccionaron comodidades',
      noAdditionalFeatures: 'No hay características adicionales',
      noNeighborhoodInfo: 'No hay información del vecindario',
      sqft: 'm²'
    }
  };

  const t = translations[currentLanguage];

  const amenitiesLabels = {
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
  };

  const propertyTypeLabels = {
    apartment: 'Apartment',
    house: 'House',
    condo: 'Condo',
    townhouse: 'Townhouse',
    villa: 'Villa',
    studio: 'Studio'
  };

  const statusLabels = {
    available: 'Available',
    rented: 'Rented',
    sold: 'Sold',
    pending: 'Pending'
  };

  const formatPrice = (price, currency) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[currency] || '$'}${Number(price).toLocaleString()}`;
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  const ReviewSection = ({ title, stepNumber, onEdit, children }) => (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading-semibold text-text-primary">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(stepNumber)}
          iconName="Edit"
          iconPosition="left"
        >
          {t.edit}
        </Button>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, className = "" }) => (
    <div className={`flex justify-between py-2 ${className}`}>
      <span className="text-text-secondary font-body-medium">{label}:</span>
      <span className="text-text-primary font-body-normal">{value}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading-bold text-text-primary mb-2">
          {t.reviewSubmit}
        </h2>
        <p className="text-text-secondary">
          {t.reviewDetails}
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <ReviewSection
          title={t.basicInformation}
          stepNumber={1}
          onEdit={onEditStep}
        >
          <div className="space-y-2">
            <InfoRow label={t.propertyTitle} value={formData.title || '-'} />
            <InfoRow label={t.description} value={formData.description || '-'} />
            <InfoRow 
              label={t.price} 
              value={formatPrice(formData.price, formData.currency)} 
            />
            <InfoRow 
              label={t.propertyType} 
              value={propertyTypeLabels[formData.propertyType] || '-'} 
            />
            <InfoRow 
              label={t.status} 
              value={statusLabels[formData.status] || '-'} 
            />
          </div>
        </ReviewSection>

        {/* Property Details */}
        <ReviewSection
          title={t.propertyDetails}
          stepNumber={2}
          onEdit={onEditStep}
        >
          <div className="space-y-2">
            <InfoRow label={t.bedrooms} value={formData.bedrooms || '-'} />
            <InfoRow label={t.bathrooms} value={formData.bathrooms || '-'} />
            <InfoRow 
              label={t.squareFootage} 
              value={formData.squareFootage ? `${formData.squareFootage} ${t.sqft}` : '-'} 
            />
            <div className="py-2">
              <span className="text-text-secondary font-body-medium">{t.amenities}:</span>
              <div className="mt-2">
                {formData.amenities && formData.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                      >
                        {amenitiesLabels[amenity] || amenity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-text-muted italic">{t.noAmenities}</span>
                )}
              </div>
            </div>
            <InfoRow 
              label={t.additionalFeatures} 
              value={formData.additionalFeatures || t.noAdditionalFeatures} 
            />
          </div>
        </ReviewSection>

        {/* Images */}
        <ReviewSection
          title={t.imagesMedia}
          stepNumber={3}
          onEdit={onEditStep}
        >
          <div>
            <p className="text-text-secondary mb-4">
              {t.images}: {formData.images?.length || 0}
            </p>
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg border border-border">
                      <Image
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index === (formData.primaryImageIndex || 0) && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                        {t.primaryImage}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Location */}
        <ReviewSection
          title={t.locationInfo}
          stepNumber={4}
          onEdit={onEditStep}
        >
          <div className="space-y-2">
            <InfoRow 
              label={t.address} 
              value={formatAddress(formData.address) || '-'} 
            />
            <InfoRow 
              label={t.neighborhood} 
              value={formData.neighborhood || t.noNeighborhoodInfo} 
            />
            <InfoRow 
              label={t.coordinates} 
              value={formData.coordinates 
                ? `${formData.coordinates.lat.toFixed(6)}, ${formData.coordinates.lng.toFixed(6)}`
                : '-'
              } 
            />
          </div>
        </ReviewSection>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          disabled={isSubmitting}
        >
          {t.previous}
        </Button>
        
        <Button
          variant="primary"
          onClick={onSubmit}
          iconName="Send"
          iconPosition="right"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? t.submitting : t.submitListing}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;