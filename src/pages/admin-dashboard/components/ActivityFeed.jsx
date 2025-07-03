import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      approve: 'Approve',
      reject: 'Reject',
      view: 'View'
    },
    es: {
      recentActivity: 'Actividad Reciente',
      viewAll: 'Ver Todo',
      approve: 'Aprobar',
      reject: 'Rechazar',
      view: 'Ver'
    }
  };

  const t = translations[currentLanguage];

  const activities = [
    {
      id: 1,
      type: 'user_registration',
      icon: 'UserPlus',
      title: 'New user registered',
      description: 'Sarah Johnson joined the platform',
      timestamp: '2 minutes ago',
      color: 'success',
      actionRequired: false
    },
    {
      id: 2,
      type: 'property_submission',
      icon: 'Building2',
      title: 'Property submitted for approval',
      description: 'Modern apartment in downtown area',
      timestamp: '15 minutes ago',
      color: 'warning',
      actionRequired: true
    },
    {
      id: 3,
      type: 'system_alert',
      icon: 'AlertTriangle',
      title: 'System maintenance scheduled',
      description: 'Scheduled for tonight at 2:00 AM',
      timestamp: '1 hour ago',
      color: 'error',
      actionRequired: false
    },
    {
      id: 4,
      type: 'property_approved',
      icon: 'CheckCircle',
      title: 'Property approved',
      description: 'Luxury villa listing is now live',
      timestamp: '2 hours ago',
      color: 'success',
      actionRequired: false
    },
    {
      id: 5,
      type: 'user_inquiry',
      icon: 'MessageSquare',
      title: 'New property inquiry',
      description: 'User interested in 3-bedroom house',
      timestamp: '3 hours ago',
      color: 'primary',
      actionRequired: true
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success-50';
      case 'warning':
        return 'bg-warning-50';
      case 'error':
        return 'bg-error-50';
      default:
        return 'bg-primary-50';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading-semibold text-text-primary">{t.recentActivity}</h3>
          <Button variant="ghost" size="sm">
            {t.viewAll}
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-250">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(activity.color)}`}>
                <Icon name={activity.icon} size={20} color={getIconColor(activity.color)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-body-medium text-text-primary">{activity.title}</p>
                    <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                    <p className="text-xs text-text-muted mt-2">{activity.timestamp}</p>
                  </div>
                  
                  {activity.actionRequired && (
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="success" size="xs">
                        {t.approve}
                      </Button>
                      <Button variant="danger" size="xs">
                        {t.reject}
                      </Button>
                    </div>
                  )}
                  
                  {!activity.actionRequired && (
                    <Button variant="ghost" size="xs">
                      {t.view}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;