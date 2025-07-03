import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProperties = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      similarProperties: 'Similar Properties',
      beds: 'beds',
      baths: 'baths',
      sqft: 'sq ft',
      viewDetails: 'View Details',
      previous: 'Previous',
      next: 'Next'
    },
    es: {
      similarProperties: 'Propiedades Similares',
      beds: 'habitaciones',
      baths: 'baños',
      sqft: 'pies²',
      viewDetails: 'Ver Detalles',
      previous: 'Anterior',
      next: 'Siguiente'
    }
  };

  const t = translations[currentLanguage];

  const similarProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: "$2,500/month",
      address: "456 Oak Street, Downtown",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: 2,
      title: "Cozy Suburban House",
      price: "$3,200/month",
      address: "789 Pine Avenue, Suburbs",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      price: "$5,000/month",
      address: "321 High Street, Uptown",
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 2500,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: 4,
      title: "Charming Studio Loft",
      price: "$1,800/month",
      address: "654 Art District, Creative Quarter",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      status: "available"
    }
  ];

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, similarProperties.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleProperties = similarProperties.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-1 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading-bold text-text-primary">
          {t.similarProperties}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-250"
            aria-label={t.previous}
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-250"
            aria-label={t.next}
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProperties.map((property) => (
          <div key={property.id} className="bg-surface-secondary rounded-lg overflow-hidden border border-border hover:shadow-elevation-2 transition-shadow duration-250">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-250">
                  <Icon name="Heart" size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-heading-semibold text-text-primary">
                  {property.price}
                </h3>
                <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                  Available
                </span>
              </div>
              
              <h4 className="font-body-medium text-text-primary mb-2">
                {property.title}
              </h4>
              
              <div className="flex items-center text-text-muted mb-3">
                <Icon name="MapPin" size={14} className="mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                <span>{property.bedrooms} {t.beds}</span>
                <span>{property.bathrooms} {t.baths}</span>
                <span>{property.squareFeet.toLocaleString()} {t.sqft}</span>
              </div>
              
              <Link to="/property-detail-view">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {t.viewDetails}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;