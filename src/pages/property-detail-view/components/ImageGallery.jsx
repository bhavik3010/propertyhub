import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageGallery = ({ images, propertyName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-secondary-100 rounded-lg overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`${propertyName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-250"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-250"
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-250"
          aria-label="View fullscreen"
        >
          <Icon name="Maximize" size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-250 ${
              index === currentImageIndex
                ? 'border-primary shadow-elevation-2'
                : 'border-transparent hover:border-secondary-300'
            }`}
          >
            <Image
              src={image}
              alt={`${propertyName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-250 z-10"
            aria-label="Close fullscreen"
          >
            <Icon name="X" size={24} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={images[currentImageIndex]}
              alt={`${propertyName} - Fullscreen view`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-250"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-250"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;