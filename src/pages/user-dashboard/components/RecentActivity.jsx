import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      noActivity: 'No recent activity',
      justNow: 'Just now',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago'
    },
    es: {
      recentActivity: 'Actividad Reciente',
      viewAll: 'Ver Todo',
      noActivity: 'Sin actividad reciente',
      justNow: 'Ahora mismo',
      minutesAgo: 'minutos atrás',
      hoursAgo: 'horas atrás',
      daysAgo: 'días atrás'
    }
  };

  const t = translations[currentLanguage];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'property_viewed':
        return { name: 'Eye', color: 'text-primary', bgColor: 'bg-primary-50' };
      case 'inquiry_received':
        return { name: 'MessageCircle', color: 'text-success', bgColor: 'bg-success-50' };
      case 'property_saved':
        return { name: 'Heart', color: 'text-error', bgColor: 'bg-error-50' };
      case 'property_listed':
        return { name: 'Plus', color: 'text-accent', bgColor: 'bg-accent-50' };
      case 'property_updated':
        return { name: 'Edit', color: 'text-warning', bgColor: 'bg-warning-50' };
      case 'inquiry_sent':
        return { name: 'Send', color: 'text-primary', bgColor: 'bg-primary-50' };
      default:
        return { name: 'Activity', color: 'text-secondary', bgColor: 'bg-secondary-50' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return t.justNow;
    if (diffInMinutes < 60) return `${diffInMinutes} ${t.minutesAgo}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ${t.hoursAgo}`;
    return `${Math.floor(diffInMinutes / 1440)} ${t.daysAgo}`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading-semibold text-text-primary">
          {t.recentActivity}
        </h2>
        <button className="text-sm text-primary hover:text-primary-600 font-body-medium">
          {t.viewAll}
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">{t.noActivity}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const iconConfig = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${iconConfig.bgColor} flex-shrink-0`}>
                  <Icon name={iconConfig.name} size={16} className={iconConfig.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary font-body-medium">
                    {activity.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;