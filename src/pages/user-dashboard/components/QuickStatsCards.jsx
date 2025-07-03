import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ userRole, stats }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      // Property Seeker Stats
      savedProperties: 'Saved Properties',
      recentSearches: 'Recent Searches',
      activeInquiries: 'Active Inquiries',
      viewedToday: 'Viewed Today',
      // Property Owner Stats
      activeListings: 'Active Listings',
      totalViews: 'Total Views',
      totalInquiries: 'Total Inquiries',
      pendingApprovals: 'Pending Approvals'
    },
    es: {
      // Property Seeker Stats
      savedProperties: 'Propiedades Guardadas',
      recentSearches: 'Búsquedas Recientes',
      activeInquiries: 'Consultas Activas',
      viewedToday: 'Vistas Hoy',
      // Property Owner Stats
      activeListings: 'Listados Activos',
      totalViews: 'Vistas Totales',
      totalInquiries: 'Consultas Totales',
      pendingApprovals: 'Aprobaciones Pendientes'
    }
  };

  const t = translations[currentLanguage];

  const getStatsConfig = () => {
    if (userRole === 'owner') {
      return [
        {
          title: t.activeListings,
          value: stats.activeListings || 0,
          icon: 'Building2',
          color: 'text-primary',
          bgColor: 'bg-primary-50',
          change: '+2 this month'
        },
        {
          title: t.totalViews,
          value: stats.totalViews || 0,
          icon: 'Eye',
          color: 'text-success',
          bgColor: 'bg-success-50',
          change: '+15% this week'
        },
        {
          title: t.totalInquiries,
          value: stats.totalInquiries || 0,
          icon: 'MessageCircle',
          color: 'text-accent',
          bgColor: 'bg-accent-50',
          change: '+3 today'
        },
        {
          title: t.pendingApprovals,
          value: stats.pendingApprovals || 0,
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning-50',
          change: '2 awaiting review'
        }
      ];
    } else {
      return [
        {
          title: t.savedProperties,
          value: stats.savedProperties || 0,
          icon: 'Heart',
          color: 'text-error',
          bgColor: 'bg-error-50',
          change: '+3 this week'
        },
        {
          title: t.recentSearches,
          value: stats.recentSearches || 0,
          icon: 'Search',
          color: 'text-primary',
          bgColor: 'bg-primary-50',
          change: '5 saved filters'
        },
        {
          title: t.activeInquiries,
          value: stats.activeInquiries || 0,
          icon: 'MessageSquare',
          color: 'text-accent',
          bgColor: 'bg-accent-50',
          change: '2 pending response'
        },
        {
          title: t.viewedToday,
          value: stats.viewedToday || 0,
          icon: 'TrendingUp',
          color: 'text-success',
          bgColor: 'bg-success-50',
          change: '+12 since yesterday'
        }
      ];
    }
  };

  const statsConfig = getStatsConfig();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsConfig.map((stat, index) => (
        <div key={index} className="bg-surface rounded-lg p-6 border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-250">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading-bold text-text-primary">
                {stat.value.toLocaleString()}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-body-medium text-text-secondary mb-1">
              {stat.title}
            </h3>
            <p className="text-xs text-text-muted">
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;