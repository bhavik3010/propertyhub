import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import DashboardHeader from './components/DashboardHeader';
import QuickStatsCards from './components/QuickStatsCards';
import PropertyCard from './components/PropertyCard';
import RecentActivity from './components/RecentActivity';
import SavedSearches from './components/SavedSearches';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userRole, setUserRole] = useState('seeker'); // 'owner' or 'seeker'
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/user-authentication-login-register');
      return;
    }
    
    // Get user role from localStorage or API
    const savedRole = localStorage.getItem('userRole') || 'seeker';
    setUserRole(savedRole);
  }, [navigate]);

  const translations = {
    en: {
      overview: 'Overview',
      properties: 'Properties',
      activity: 'Activity',
      searches: 'Searches',
      loadMore: 'Load More',
      noProperties: 'No properties found',
      addFirstProperty: 'Add your first property to get started',
      startSearching: 'Start searching for your dream home'
    },
    es: {
      overview: 'Resumen',
      properties: 'Propiedades',
      activity: 'Actividad',
      searches: 'Búsquedas',
      loadMore: 'Cargar Más',
      noProperties: 'No se encontraron propiedades',
      addFirstProperty: 'Agrega tu primera propiedad para comenzar',
      startSearching: 'Comienza a buscar la casa de tus sueños'
    }
  };

  const t = translations[currentLanguage];

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    profileCompletion: 75,
    role: userRole
  };

  // Mock stats data
  const statsData = {
    // Owner stats
    activeListings: 12,
    totalViews: 1847,
    totalInquiries: 23,
    pendingApprovals: 2,
    // Seeker stats
    savedProperties: 8,
    recentSearches: 5,
    activeInquiries: 3,
    viewedToday: 15
  };

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 2500,
      type: "rent",
      location: "Downtown, New York",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      status: "active",
      images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
      stats: { views: 156, inquiries: 8, favorites: 12 }
    },
    {
      id: 2,
      title: "Cozy Suburban House",
      price: 450000,
      type: "sale",
      location: "Suburbs, California",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      status: "pending",
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
      stats: { views: 89, inquiries: 5, favorites: 7 }
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      price: 5000,
      type: "rent",
      location: "Manhattan, New York",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      status: "active",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
      stats: { views: 234, inquiries: 15, favorites: 28 }
    }
  ];

  // Mock recent activities
  const mockActivities = [
    {
      id: 1,
      type: "inquiry_received",
      title: "New inquiry received",
      description: "Someone is interested in your Modern Downtown Apartment",
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      type: "property_viewed",
      title: "Property viewed",
      description: "Your Luxury Penthouse was viewed 12 times today",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      type: "property_saved",
      title: "Property saved",
      description: "You saved Cozy Family Home to your favorites",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];

  // Mock saved searches
  const mockSavedSearches = [
    {
      id: 1,
      name: "Downtown Apartments",
      criteria: {
        location: "Downtown",
        priceRange: { min: 2000, max: 3000 },
        bedrooms: 2,
        propertyType: "apartment"
      },
      newResults: 3
    },
    {
      id: 2,
      name: "Family Houses",
      criteria: {
        location: "Suburbs",
        priceRange: { min: 400000, max: 600000 },
        bedrooms: 3,
        propertyType: "house"
      },
      newResults: 0
    }
  ];

  const handleEditProperty = (propertyId) => {
    navigate('/property-management-add-edit', { state: { propertyId, mode: 'edit' } });
  };

  const handleToggleStatus = (propertyId, currentStatus) => {
    console.log(`Toggling status for property ${propertyId} from ${currentStatus}`);
    // Implement status toggle logic
  };

  const handleViewAnalytics = (propertyId) => {
    console.log(`Viewing analytics for property ${propertyId}`);
    // Implement analytics view logic
  };

  const handleRunSearch = (searchId) => {
    console.log(`Running search ${searchId}`);
    navigate('/property-detail-view');
  };

  const handleDeleteSearch = (searchId) => {
    console.log(`Deleting search ${searchId}`);
    // Implement delete search logic
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <QuickStatsCards userRole={userRole} stats={statsData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions userRole={userRole} />
              <RecentActivity activities={mockActivities} />
            </div>
          </div>
        );
      
      case 'properties':
        return (
          <div className="space-y-6">
            {mockProperties.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Building2" size={64} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-heading-semibold text-text-primary mb-2">
                  {t.noProperties}
                </h3>
                <p className="text-text-secondary mb-6">
                  {userRole === 'owner' ? t.addFirstProperty : t.startSearching}
                </p>
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate(userRole === 'owner' ? '/property-management-add-edit' : '/property-detail-view')}
                >
                  {userRole === 'owner' ? 'Add Property' : 'Search Properties'}
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      userRole={userRole}
                      onEdit={handleEditProperty}
                      onToggleStatus={handleToggleStatus}
                      onViewAnalytics={handleViewAnalytics}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <Button variant="outline" iconName="ChevronDown" iconPosition="right">
                    {t.loadMore}
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      
      case 'activity':
        return (
          <div className="max-w-2xl">
            <RecentActivity activities={mockActivities} />
          </div>
        );
      
      case 'searches':
        return userRole === 'seeker' ? (
          <div className="max-w-2xl">
            <SavedSearches
              searches={mockSavedSearches}
              onRunSearch={handleRunSearch}
              onDeleteSearch={handleDeleteSearch}
            />
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <main className="pt-16">
        <NavigationBreadcrumbs />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <DashboardHeader
            userRole={userRole}
            userName={userData.name}
            profileCompletion={userData.profileCompletion}
          />
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
            {[
              { key: 'overview', label: t.overview },
              { key: 'properties', label: t.properties },
              { key: 'activity', label: t.activity },
              ...(userRole === 'seeker' ? [{ key: 'searches', label: t.searches }] : [])
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-body-medium border-b-2 transition-colors duration-250 ${
                  activeTab === tab.key
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;