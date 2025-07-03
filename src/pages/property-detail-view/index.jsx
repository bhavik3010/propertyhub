import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ImageGallery from './components/ImageGallery';
import PropertyOverview from './components/PropertyOverview';
import PropertyDetails from './components/PropertyDetails';
import ContactCard from './components/ContactCard';
import PropertyMap from './components/PropertyMap';
import SimilarProperties from './components/SimilarProperties';
import MobileActionBar from './components/MobileActionBar';

const PropertyDetailView = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock property data
  const property = {
    id: 1,
    title: "Luxury Modern Apartment in Downtown",
    price: "$3,500/month",
    address: "123 Main Street, Downtown District, City Center",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    status: "available",
    hasVirtualTour: true,
    propertyType: "Apartment",
    yearBuilt: 2020,
    parking: "2 spaces",
    lotSize: "N/A",
    hoaFees: "$200/month",
    propertyTax: "$3,200/year",
    walkScore: 92,
    transitScore: 85,
    bikeScore: 78,
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    description: `This stunning modern apartment offers the perfect blend of luxury and convenience in the heart of downtown. With floor-to-ceiling windows, you'll enjoy breathtaking city views and abundant natural light throughout the day.\n\nThe open-concept living space features high-end finishes, including hardwood floors, granite countertops, and stainless steel appliances. The master bedroom includes a walk-in closet and en-suite bathroom with a spa-like shower.\n\nBuilding amenities include a fitness center, rooftop terrace, concierge service, and secure parking. Located just steps from public transportation, shopping, dining, and entertainment venues.`,
    amenities: [
      "Swimming Pool",
      "Gym/Fitness Center",
      "Parking",
      "Air Conditioning",
      "Heating",
      "Laundry",
      "Dishwasher",
      "Balcony",
      "Security",
      "Elevator",
      "Internet"
    ],
    neighborhoodInfo: `Located in the vibrant downtown district, this property offers unparalleled access to the city's best attractions. The neighborhood is known for its walkability, with excellent restaurants, cafes, and shops within walking distance.\n\nThe area features tree-lined streets, well-maintained sidewalks, and a strong sense of community. Public transportation is easily accessible, making commuting to other parts of the city convenient and efficient.`,
    nearbyPlaces: [
      { name: "Central Park", distance: "0.3 miles", icon: "Trees" },
      { name: "Metro Station", distance: "0.1 miles", icon: "Train" },
      { name: "Whole Foods", distance: "0.2 miles", icon: "ShoppingCart" },
      { name: "City Hospital", distance: "0.5 miles", icon: "Heart" },
      { name: "Elementary School", distance: "0.4 miles", icon: "GraduationCap" },
      { name: "Fitness Center", distance: "0.1 miles", icon: "Dumbbell" }
    ],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ]
  };

  // Mock agent data
  const agent = {
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    experience: 8,
    propertiesListed: 156,
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@propertyintern.com"
  };

  const handleFavoriteToggle = () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-authentication-login-register');
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <NavigationBreadcrumbs />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery images={property.images} propertyName={property.title} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyOverview
              property={property}
              onFavoriteToggle={handleFavoriteToggle}
              isFavorite={isFavorite}
            />
            
            <PropertyDetails property={property} />
            
            <PropertyMap property={property} />
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <ContactCard agent={agent} property={property} />
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <SimilarProperties />
        </div>
      </main>

      {/* Mobile Action Bar */}
      <MobileActionBar
        onFavoriteToggle={handleFavoriteToggle}
        isFavorite={isFavorite}
        onContactClick={handleContactClick}
        onShareClick={handleShare}
      />
    </div>
  );
};

export default PropertyDetailView;