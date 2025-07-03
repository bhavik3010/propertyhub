import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const PropertyModal = ({ property, isOpen, onClose, onStatusChange, currentLanguage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [moderationNotes, setModerationNotes] = useState(property.moderationNotes || '');

  const translations = {
    en: {
      propertyDetails: 'Property Details',
      close: 'Close',
      approve: 'Approve',
      reject: 'Reject',
      owner: 'Owner',
      contact: 'Contact',
      location: 'Location',
      price: 'Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      propertyType: 'Property Type',
      description: 'Description',
      amenities: 'Amenities',
      moderationNotes: 'Moderation Notes',
      addNotes: 'Add notes for approval/rejection...',
      saveNotes: 'Save Notes',
      submittedOn: 'Submitted On',
      lastUpdated: 'Last Updated',
      viewOnMap: 'View on Map',
      contactOwner: 'Contact Owner',
      images: 'Images',
      of: 'of'
    },
    es: {
      propertyDetails: 'Detalles de la Propiedad',
      close: 'Cerrar',
      approve: 'Aprobar',
      reject: 'Rechazar',
      owner: 'Propietario',
      contact: 'Contacto',
      location: 'Ubicación',
      price: 'Precio',
      bedrooms: 'Dormitorios',
      bathrooms: 'Baños',
      area: 'Área',
      propertyType: 'Tipo de Propiedad',
      description: 'Descripción',
      amenities: 'Comodidades',
      moderationNotes: 'Notas de Moderación',
      addNotes: 'Agregar notas para aprobación/rechazo...',
      saveNotes: 'Guardar Notas',
      submittedOn: 'Enviado el',
      lastUpdated: 'Última Actualización',
      viewOnMap: 'Ver en Mapa',
      contactOwner: 'Contactar Propietario',
      images: 'Imágenes',
      of: 'de'
    }
  };

  const t = translations[currentLanguage];

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'es' ? 'es-ES' : 'en-US');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-elevation-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-bold text-text-primary">{t.propertyDetails}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-250"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-secondary-100">
              <Image
                src={property.images[currentImageIndex]}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-250"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-250"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} {t.of} {property.images.length}
                </div>
              </>
            )}
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-heading-bold text-text-primary">{property.title}</h3>
                <p className="text-text-secondary flex items-center mt-1">
                  <Icon name="MapPin" size={16} className="mr-1" />
                  {property.location}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <StatusBadge status={property.status} currentLanguage={currentLanguage} />
                <span className="text-2xl font-heading-bold text-primary">
                  {formatPrice(property.price)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <Icon name="Bed" size={20} className="mx-auto mb-1 text-text-muted" />
                  <p className="text-sm text-text-muted">{t.bedrooms}</p>
                  <p className="font-body-semibold text-text-primary">{property.bedrooms}</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <Icon name="Bath" size={20} className="mx-auto mb-1 text-text-muted" />
                  <p className="text-sm text-text-muted">{t.bathrooms}</p>
                  <p className="font-body-semibold text-text-primary">{property.bathrooms}</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <Icon name="Square" size={20} className="mx-auto mb-1 text-text-muted" />
                  <p className="text-sm text-text-muted">{t.area}</p>
                  <p className="font-body-semibold text-text-primary">{property.area} sq ft</p>
                </div>
              </div>

              <div>
                <h4 className="font-body-semibold text-text-primary mb-2">{t.description}</h4>
                <p className="text-text-secondary leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h4 className="font-body-semibold text-text-primary mb-2">{t.amenities}</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Owner Info */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-body-semibold text-text-primary mb-3">{t.owner}</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="font-body-medium text-text-primary">{property.owner.name}</p>
                    <p className="text-sm text-text-muted">{property.owner.email}</p>
                    <p className="text-sm text-text-muted">{property.owner.phone}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  className="mt-3 w-full"
                >
                  {t.contactOwner}
                </Button>
              </div>

              {/* Property Details */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t.propertyType}:</span>
                    <span className="font-body-medium text-text-primary capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t.submittedOn}:</span>
                    <span className="font-body-medium text-text-primary">{formatDate(property.submittedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{t.lastUpdated}:</span>
                    <span className="font-body-medium text-text-primary">{formatDate(property.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-body-semibold text-text-primary mb-3">{t.location}</h4>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={property.title}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
                  />
                </div>
              </div>

              {/* Moderation Notes */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-body-semibold text-text-primary mb-3">{t.moderationNotes}</h4>
                <textarea
                  value={moderationNotes}
                  onChange={(e) => setModerationNotes(e.target.value)}
                  placeholder={t.addNotes}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  {t.saveNotes}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {property.status === 'pending' && (
            <div className="flex justify-end space-x-4 pt-4 border-t border-border">
              <Button
                variant="danger"
                iconName="X"
                onClick={() => onStatusChange(property.id, 'rejected')}
              >
                {t.reject}
              </Button>
              <Button
                variant="success"
                iconName="Check"
                onClick={() => onStatusChange(property.id, 'approved')}
              >
                {t.approve}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;