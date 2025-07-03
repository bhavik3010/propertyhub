import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import StatsCards from './components/StatsCards';
import FilterToolbar from './components/FilterToolbar';
import PropertyTable from './components/PropertyTable';
import ActivityLog from './components/ActivityLog';
import Pagination from './components/Pagination';

const AdminPropertyManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    propertyType: '',
    location: '',
    dateRange: '',
    ownerVerification: ''
  });

  // Mock data
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "apartment",
      status: "pending",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop"
      ],
      owner: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        verified: true
      },
      description: `Beautiful modern apartment in the heart of downtown with stunning city views. This spacious 2-bedroom, 2-bathroom unit features high-end finishes, stainless steel appliances, and floor-to-ceiling windows.\n\nThe building offers premium amenities including a fitness center, rooftop terrace, and 24/7 concierge service. Perfect for professionals seeking luxury living in a prime location.`,
      amenities: ["Air Conditioning", "Gym", "Parking", "Balcony", "Dishwasher", "Laundry"],
      submittedAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      moderationNotes: ""
    },
    {
      id: 2,
      title: "Cozy Family House",
      location: "Los Angeles, CA",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: "house",
      status: "approved",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
      ],
      owner: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 987-6543",
        verified: true
      },
      description: `Charming family home located in a quiet residential neighborhood. This well-maintained property features 3 bedrooms, 2 bathrooms, and a spacious backyard perfect for children and pets.\n\nThe house includes a modern kitchen with granite countertops, hardwood floors throughout, and a two-car garage. Close to excellent schools and shopping centers.`,
      amenities: ["Garden", "Garage", "Fireplace", "Hardwood Floors", "Updated Kitchen"],
      submittedAt: "2024-01-12T14:20:00Z",
      updatedAt: "2024-01-13T09:15:00Z",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      moderationNotes: "Approved - All documentation verified"
    },
    {
      id: 3,
      title: "Luxury Condo with Ocean View",
      location: "Miami, FL",
      price: 4500,
      bedrooms: 2,
      bathrooms: 3,
      area: 1500,
      type: "condo",
      status: "rejected",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
      ],
      owner: {
        name: "Michael Rodriguez",
        email: "michael.rodriguez@email.com",
        phone: "+1 (555) 456-7890",
        verified: false
      },
      description: `Stunning oceanfront condominium with breathtaking views of the Atlantic Ocean. This luxury unit features floor-to-ceiling windows, marble floors, and a private balcony.\n\nBuilding amenities include a resort-style pool, spa, fitness center, and private beach access. Perfect for those seeking the ultimate in luxury coastal living.`,
      amenities: ["Ocean View", "Pool", "Spa", "Beach Access", "Concierge", "Valet Parking"],
      submittedAt: "2024-01-10T16:45:00Z",
      updatedAt: "2024-01-11T11:30:00Z",
      coordinates: { lat: 25.7617, lng: -80.1918 },
      moderationNotes: "Rejected - Owner verification required"
    },
    {
      id: 4,
      title: "Historic Townhouse",
      location: "Chicago, IL",
      price: 2800,
      bedrooms: 3,
      bathrooms: 2,
      area: 1600,
      type: "townhouse",
      status: "pending",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
      ],
      owner: {
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 234-5678",
        verified: true
      },
      description: `Beautiful historic townhouse in a charming neighborhood. This property combines classic architecture with modern updates, featuring original hardwood floors, exposed brick walls, and updated kitchen and bathrooms.\n\nThe property includes a private patio and is within walking distance of parks, restaurants, and public transportation.`,
      amenities: ["Historic Character", "Patio", "Exposed Brick", "Updated Kitchen", "Near Transit"],
      submittedAt: "2024-01-14T12:00:00Z",
      updatedAt: "2024-01-14T12:00:00Z",
      coordinates: { lat: 41.8781, lng: -87.6298 },
      moderationNotes: ""
    },
    {
      id: 5,
      title: "Modern Studio Apartment",
      location: "Houston, TX",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      type: "apartment",
      status: "approved",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
      ],
      owner: {
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "+1 (555) 345-6789",
        verified: true
      },
      description: `Sleek modern studio apartment perfect for young professionals. Features an open floor plan, high ceilings, and large windows that flood the space with natural light.\n\nThe unit includes a modern kitchen with stainless steel appliances, in-unit washer/dryer, and access to building amenities including a fitness center and rooftop deck.`,
      amenities: ["Open Floor Plan", "High Ceilings", "In-Unit Laundry", "Fitness Center", "Rooftop Deck"],
      submittedAt: "2024-01-08T09:30:00Z",
      updatedAt: "2024-01-09T14:20:00Z",
      coordinates: { lat: 29.7604, lng: -95.3698 },
      moderationNotes: "Approved - Fast track approval"
    }
  ];

  const mockStats = {
    total: 156,
    totalChange: 12,
    pending: 23,
    pendingChange: 8,
    approved: 118,
    approvedChange: 15,
    rejected: 15,
    rejectedChange: -3
  };

  const mockActivities = [
    {
      id: 1,
      adminName: "Admin User",
      action: "approved",
      propertyTitle: "Modern Downtown Apartment",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      adminName: "Admin User",
      action: "rejected",
      propertyTitle: "Luxury Condo with Ocean View",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      adminName: "Admin User",
      action: "updated",
      propertyTitle: "Cozy Family House",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      adminName: "Admin User",
      action: "approved",
      propertyTitle: "Historic Townhouse",
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.owner.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.ownerVerification) {
      const isVerified = filters.ownerVerification === 'verified';
      filtered = filtered.filter(property => property.owner.verified === isVerified);
    }

    if (filters.dateRange) {
      const days = parseInt(filters.dateRange);
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(property => new Date(property.submittedAt) >= cutoffDate);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [filters, properties]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleSelectProperty = (propertyId) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = () => {
    const currentPageProperties = getCurrentPageProperties();
    const currentPageIds = currentPageProperties.map(p => p.id);
    const allSelected = currentPageIds.every(id => selectedProperties.includes(id));
    
    if (allSelected) {
      setSelectedProperties(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedProperties(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const handleStatusChange = (propertyId, newStatus) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, status: newStatus, updatedAt: new Date().toISOString() }
          : property
      )
    );
  };

  const handleBulkAction = (action) => {
    if (action === 'approve') {
      setProperties(prev =>
        prev.map(property =>
          selectedProperties.includes(property.id)
            ? { ...property, status: 'approved', updatedAt: new Date().toISOString() }
            : property
        )
      );
    } else if (action === 'reject') {
      setProperties(prev =>
        prev.map(property =>
          selectedProperties.includes(property.id)
            ? { ...property, status: 'rejected', updatedAt: new Date().toISOString() }
            : property
        )
      );
    } else if (action === 'delete') {
      setProperties(prev =>
        prev.filter(property => !selectedProperties.includes(property.id))
      );
    }
    setSelectedProperties([]);
  };

  const handleEdit = (property) => {
    // Navigate to edit page or open edit modal
    console.log('Edit property:', property);
  };

  const handleExport = () => {
    // Export functionality
    console.log('Export properties');
  };

  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        <NavigationBreadcrumbs />
        
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Stats Cards */}
          <StatsCards stats={mockStats} currentLanguage={currentLanguage} />

          {/* Filter Toolbar */}
          <FilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onExport={handleExport}
            onBulkAction={handleBulkAction}
            selectedCount={selectedProperties.length}
            currentLanguage={currentLanguage}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Property Table */}
            <div className="xl:col-span-3 space-y-6">
              <PropertyTable
                properties={getCurrentPageProperties()}
                selectedProperties={selectedProperties}
                onSelectProperty={handleSelectProperty}
                onSelectAll={handleSelectAll}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                currentLanguage={currentLanguage}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProperties.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Activity Log */}
            <div className="xl:col-span-1">
              <ActivityLog
                activities={mockActivities}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyManagement;