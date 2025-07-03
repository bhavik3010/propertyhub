import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const BasicInfoStep = ({ formData, onUpdateData, onNext, validationErrors }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      basicInformation: 'Basic Information',
      propertyTitle: 'Property Title',
      propertyTitlePlaceholder: 'Enter a descriptive title for your property',
      description: 'Description',
      descriptionPlaceholder: 'Describe your property in detail...',
      price: 'Price',
      pricePlaceholder: 'Enter price',
      currency: 'Currency',
      propertyType: 'Property Type',
      selectPropertyType: 'Select property type',
      availabilityStatus: 'Availability Status',
      selectStatus: 'Select status',
      next: 'Next',
      required: 'This field is required',
      apartment: 'Apartment',
      house: 'House',
      condo: 'Condo',
      townhouse: 'Townhouse',
      villa: 'Villa',
      studio: 'Studio',
      available: 'Available',
      rented: 'Rented',
      sold: 'Sold',
      pending: 'Pending'
    },
    es: {
      basicInformation: 'Información Básica',
      propertyTitle: 'Título de la Propiedad',
      propertyTitlePlaceholder: 'Ingrese un título descriptivo para su propiedad',
      description: 'Descripción',
      descriptionPlaceholder: 'Describa su propiedad en detalle...',
      price: 'Precio',
      pricePlaceholder: 'Ingrese el precio',
      currency: 'Moneda',
      propertyType: 'Tipo de Propiedad',
      selectPropertyType: 'Seleccione el tipo de propiedad',
      availabilityStatus: 'Estado de Disponibilidad',
      selectStatus: 'Seleccione el estado',
      next: 'Siguiente',
      required: 'Este campo es obligatorio',
      apartment: 'Apartamento',
      house: 'Casa',
      condo: 'Condominio',
      townhouse: 'Casa Adosada',
      villa: 'Villa',
      studio: 'Estudio',
      available: 'Disponible',
      rented: 'Alquilado',
      sold: 'Vendido',
      pending: 'Pendiente'
    }
  };

  const t = translations[currentLanguage];

  const propertyTypes = [
    { value: 'apartment', label: t.apartment },
    { value: 'house', label: t.house },
    { value: 'condo', label: t.condo },
    { value: 'townhouse', label: t.townhouse },
    { value: 'villa', label: t.villa },
    { value: 'studio', label: t.studio }
  ];

  const statusOptions = [
    { value: 'available', label: t.available },
    { value: 'rented', label: t.rented },
    { value: 'sold', label: t.sold },
    { value: 'pending', label: t.pending }
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' }
  ];

  const handleInputChange = (field, value) => {
    onUpdateData({ [field]: value });
  };

  const handleNext = () => {
    const errors = {};
    
    if (!formData.title?.trim()) errors.title = t.required;
    if (!formData.description?.trim()) errors.description = t.required;
    if (!formData.price) errors.price = t.required;
    if (!formData.propertyType) errors.propertyType = t.required;
    if (!formData.status) errors.status = t.required;

    if (Object.keys(errors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading-bold text-text-primary mb-2">
          {t.basicInformation}
        </h2>
        <p className="text-text-secondary">
          Provide the essential details about your property
        </p>
      </div>

      <div className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.propertyTitle} *
          </label>
          <Input
            type="text"
            placeholder={t.propertyTitlePlaceholder}
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={validationErrors.title ? 'border-error' : ''}
          />
          {validationErrors.title && (
            <p className="text-error text-sm mt-1">{validationErrors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.description} *
          </label>
          <textarea
            placeholder={t.descriptionPlaceholder}
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250 ${
              validationErrors.description ? 'border-error' : 'border-border'
            }`}
          />
          {validationErrors.description && (
            <p className="text-error text-sm mt-1">{validationErrors.description}</p>
          )}
        </div>

        {/* Price and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.price} *
            </label>
            <Input
              type="number"
              placeholder={t.pricePlaceholder}
              value={formData.price || ''}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={validationErrors.price ? 'border-error' : ''}
            />
            {validationErrors.price && (
              <p className="text-error text-sm mt-1">{validationErrors.price}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.currency}
            </label>
            <select
              value={formData.currency || 'USD'}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.propertyType} *
          </label>
          <select
            value={formData.propertyType || ''}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250 ${
              validationErrors.propertyType ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">{t.selectPropertyType}</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {validationErrors.propertyType && (
            <p className="text-error text-sm mt-1">{validationErrors.propertyType}</p>
          )}
        </div>

        {/* Availability Status */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            {t.availabilityStatus} *
          </label>
          <select
            value={formData.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250 ${
              validationErrors.status ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">{t.selectStatus}</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {validationErrors.status && (
            <p className="text-error text-sm mt-1">{validationErrors.status}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
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

export default BasicInfoStep;