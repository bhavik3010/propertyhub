import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImagesStep = ({ formData, onUpdateData, onNext, onPrevious }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      imagesMedia: 'Images & Media',
      uploadImages: 'Upload Property Images',
      dragDropText: 'Drag and drop images here, or click to select files',
      supportedFormats: 'Supported formats: JPG, PNG, WebP (Max 10MB each)',
      selectFiles: 'Select Files',
      primaryImage: 'Primary Image',
      setPrimary: 'Set as Primary',
      removeImage: 'Remove Image',
      reorderImages: 'Drag to reorder images',
      previous: 'Previous',
      next: 'Next',
      noImages: 'No images uploaded yet'
    },
    es: {
      imagesMedia: 'Imágenes y Medios',
      uploadImages: 'Subir Imágenes de la Propiedad',
      dragDropText: 'Arrastra y suelta imágenes aquí, o haz clic para seleccionar archivos',
      supportedFormats: 'Formatos soportados: JPG, PNG, WebP (Máx 10MB cada uno)',
      selectFiles: 'Seleccionar Archivos',
      primaryImage: 'Imagen Principal',
      setPrimary: 'Establecer como Principal',
      removeImage: 'Eliminar Imagen',
      reorderImages: 'Arrastra para reordenar imágenes',
      previous: 'Anterior',
      next: 'Siguiente',
      noImages: 'No se han subido imágenes aún'
    }
  };

  const t = translations[currentLanguage];

  // Mock image URLs for demonstration
  const mockImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
  ];

  const images = formData.images || mockImages;
  const primaryImageIndex = formData.primaryImageIndex || 0;

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    // In a real application, you would upload files to a server
    // For demo purposes, we'll use mock URLs
    const newImages = files.map((file, index) => 
      mockImages[Math.floor(Math.random() * mockImages.length)]
    );
    
    onUpdateData({ 
      images: [...images, ...newImages]
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const newPrimaryIndex = primaryImageIndex >= index && primaryImageIndex > 0 
      ? primaryImageIndex - 1 
      : primaryImageIndex;
    
    onUpdateData({ 
      images: updatedImages,
      primaryImageIndex: newPrimaryIndex
    });
  };

  const handleSetPrimary = (index) => {
    onUpdateData({ primaryImageIndex: index });
  };

  const handleReorderImages = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    
    let newPrimaryIndex = primaryImageIndex;
    if (primaryImageIndex === fromIndex) {
      newPrimaryIndex = toIndex;
    } else if (fromIndex < primaryImageIndex && toIndex >= primaryImageIndex) {
      newPrimaryIndex = primaryImageIndex - 1;
    } else if (fromIndex > primaryImageIndex && toIndex <= primaryImageIndex) {
      newPrimaryIndex = primaryImageIndex + 1;
    }
    
    onUpdateData({ 
      images: updatedImages,
      primaryImageIndex: newPrimaryIndex
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading-bold text-text-primary mb-2">
          {t.imagesMedia}
        </h2>
        <p className="text-text-secondary">
          Upload high-quality images to showcase your property
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-250 ${
          dragOver
            ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-secondary-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-text-muted" />
          </div>
          
          <div>
            <p className="text-lg font-body-medium text-text-primary mb-2">
              {t.dragDropText}
            </p>
            <p className="text-sm text-text-muted">
              {t.supportedFormats}
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={() => fileInputRef.current?.click()}
            iconName="Plus"
            iconPosition="left"
          >
            {t.selectFiles}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-semibold text-text-primary">
              Uploaded Images ({images.length})
            </h3>
            <p className="text-sm text-text-muted">
              {t.reorderImages}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group bg-surface rounded-lg overflow-hidden border border-border shadow-elevation-1"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                  />
                </div>
                
                {/* Primary Badge */}
                {index === primaryImageIndex && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-body-medium">
                    {t.primaryImage}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center space-x-2">
                  {index !== primaryImageIndex && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetPrimary(index)}
                      className="bg-surface/90 text-text-primary hover:bg-surface"
                    >
                      {t.setPrimary}
                    </Button>
                  )}
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                    iconName="Trash2"
                    className="bg-error/90 hover:bg-error"
                  >
                    {t.removeImage}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-8 text-center py-8">
          <Icon name="ImageOff" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-muted">{t.noImages}</p>
        </div>
      )}

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
          onClick={onNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
};

export default ImagesStep;