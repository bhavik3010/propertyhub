import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentPropertiesTable = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      recentProperties: 'Recent Properties',
      pendingApproval: 'Pending Approval',
      property: 'Property',
      location: 'Location',
      price: 'Price',
      status: 'Status',
      actions: 'Actions',
      approve: 'Approve',
      reject: 'Reject',
      view: 'View',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    es: {
      recentProperties: 'Propiedades Recientes',
      pendingApproval: 'Pendiente de Aprobación',
      property: 'Propiedad',
      location: 'Ubicación',
      price: 'Precio',
      status: 'Estado',
      actions: 'Acciones',
      approve: 'Aprobar',
      reject: 'Rechazar',
      view: 'Ver',
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    }
  };

  const t = translations[currentLanguage];

  const properties = [
    {
      id: 1,
      title: 'Modern Downtown Apartment',
      location: 'New York, NY',
      price: '$2,500/month',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      status: 'pending',
      submittedBy: 'John Smith',
      submittedAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      location: 'Miami, FL',
      price: '$850,000',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
      status: 'pending',
      submittedBy: 'Sarah Johnson',
      submittedAt: '4 hours ago'
    },
    {
      id: 3,
      title: 'Cozy Studio Apartment',
      location: 'San Francisco, CA',
      price: '$1,800/month',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      status: 'approved',
      submittedBy: 'Mike Davis',
      submittedAt: '1 day ago'
    },
    {
      id: 4,
      title: 'Family House with Garden',
      location: 'Austin, TX',
      price: '$450,000',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
      status: 'pending',
      submittedBy: 'Emily Wilson',
      submittedAt: '1 day ago'
    },
    {
      id: 5,
      title: 'Penthouse with City View',
      location: 'Chicago, IL',
      price: '$3,200/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      status: 'rejected',
      submittedBy: 'David Brown',
      submittedAt: '2 days ago'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium bg-warning-100 text-warning-800">
            <Icon name="Clock" size={12} className="mr-1" />
            {t.pending}
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium bg-success-100 text-success-800">
            <Icon name="CheckCircle" size={12} className="mr-1" />
            {t.approved}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium bg-error-100 text-error-800">
            <Icon name="XCircle" size={12} className="mr-1" />
            {t.rejected}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading-semibold text-text-primary">{t.recentProperties}</h3>
          <span className="text-sm text-text-secondary">{t.pendingApproval}</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-body-medium text-text-secondary uppercase tracking-wider">
                {t.property}
              </th>
              <th className="px-6 py-3 text-left text-xs font-body-medium text-text-secondary uppercase tracking-wider">
                {t.location}
              </th>
              <th className="px-6 py-3 text-left text-xs font-body-medium text-text-secondary uppercase tracking-wider">
                {t.price}
              </th>
              <th className="px-6 py-3 text-left text-xs font-body-medium text-text-secondary uppercase tracking-wider">
                {t.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-body-medium text-text-secondary uppercase tracking-wider">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-secondary-50 transition-colors duration-250">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 overflow-hidden rounded-lg">
                      <Image
                        src={property.image}
                        alt={property.title}
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-body-medium text-text-primary">
                        {property.title}
                      </div>
                      <div className="text-sm text-text-secondary">
                        by {property.submittedBy}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary">{property.location}</div>
                  <div className="text-sm text-text-secondary">{property.submittedAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-body-medium text-text-primary">{property.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(property.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    {property.status === 'pending' && (
                      <>
                        <Button variant="success" size="xs">
                          {t.approve}
                        </Button>
                        <Button variant="danger" size="xs">
                          {t.reject}
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="xs">
                      {t.view}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPropertiesTable;