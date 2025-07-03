import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, userRole, onEdit, onToggleStatus, onViewAnalytics }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      sqft: 'sq ft',
      views: 'views',
      inquiries: 'inquiries',
      favorites: 'favorites',
      edit: 'Edit',
      deactivate: 'Deactivate',
      activate: 'Activate',
      analytics: 'Analytics',
      viewDetails: 'View Details',
      removeFromSaved: 'Remove from Saved',
      contactOwner: 'Contact Owner',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      sold: 'Sold',
      rented: 'Rented'
    },
    es: {
      bedrooms: 'Habitaciones',
      bathrooms: 'Baños',
      sqft: 'pies²',
      views: 'vistas',
      inquiries: 'consultas',
      favorites: 'favoritos',
      edit: 'Editar',
      deactivate: 'Desactivar',
      activate: 'Activar',
      analytics: 'Analíticas',
      viewDetails: 'Ver Detalles',
      removeFromSaved: 'Quitar de Guardados',
      contactOwner: 'Contactar Propietario',
      status: 'Estado',
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
      sold: 'Vendido',
      rented: 'Alquilado'
    }
  };

  const t = translations[currentLanguage];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-secondary-100 text-secondary-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'sold': case'rented':
        return 'bg-primary-100 text-primary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-250 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        {userRole === 'owner' && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(property.status)}`}>
            {t[property.status] || property.status}
          </div>
        )}
        
        {/* Heart Icon for Saved Properties */}
        {userRole === 'seeker' && (
          <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-250">
            <Icon name="Heart" size={16} className="text-error" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-3">
          <h3 className="text-lg font-heading-semibold text-text-primary mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-heading-bold text-primary">
              {formatPrice(property.price)}
              {property.type === 'rent' && <span className="text-sm font-body-normal">/month</span>}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-text-secondary mb-3">
          <Icon name="MapPin" size={14} className="mr-1" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-4 text-text-secondary">
          <div className="flex items-center">
            <Icon name="Bed" size={16} className="mr-1" />
            <span className="text-sm">{property.bedrooms} {t.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Bath" size={16} className="mr-1" />
            <span className="text-sm">{property.bathrooms} {t.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Icon name="Square" size={16} className="mr-1" />
            <span className="text-sm">{property.sqft} {t.sqft}</span>
          </div>
        </div>

        {/* Owner Stats */}
        {userRole === 'owner' && (
          <div className="flex items-center justify-between mb-4 p-3 bg-secondary-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-heading-semibold text-text-primary">{property.stats?.views || 0}</div>
              <div className="text-xs text-text-muted">{t.views}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading-semibold text-text-primary">{property.stats?.inquiries || 0}</div>
              <div className="text-xs text-text-muted">{t.inquiries}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading-semibold text-text-primary">{property.stats?.favorites || 0}</div>
              <div className="text-xs text-text-muted">{t.favorites}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          {userRole === 'owner' ? (
            <>
              <Button
                variant="primary"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => onEdit(property.id)}
                className="flex-1"
              >
                {t.edit}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => onViewAnalytics(property.id)}
                className="flex-1"
              >
                {t.analytics}
              </Button>
              <Button
                variant={property.status === 'active' ? 'warning' : 'success'}
                size="sm"
                iconName={property.status === 'active' ? 'Pause' : 'Play'}
                onClick={() => onToggleStatus(property.id, property.status)}
                className="sm:w-auto"
              >
                {property.status === 'active' ? t.deactivate : t.activate}
              </Button>
            </>
          ) : (
            <>
              <Link to="/property-detail-view" className="flex-1">
                <Button variant="primary" size="sm" fullWidth>
                  {t.viewDetails}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1"
              >
                {t.contactOwner}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;