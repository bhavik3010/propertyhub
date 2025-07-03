import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLog = ({ activities, currentLanguage }) => {
  const translations = {
    en: {
      activityLog: 'Recent Activity',
      approved: 'approved',
      rejected: 'rejected',
      updated: 'updated',
      created: 'created',
      deleted: 'deleted',
      property: 'property',
      by: 'by',
      noActivity: 'No recent activity',
      viewAll: 'View All Activity'
    },
    es: {
      activityLog: 'Actividad Reciente',
      approved: 'aprobó',
      rejected: 'rechazó',
      updated: 'actualizó',
      created: 'creó',
      deleted: 'eliminó',
      property: 'propiedad',
      by: 'por',
      noActivity: 'No hay actividad reciente',
      viewAll: 'Ver Toda la Actividad'
    }
  };

  const t = translations[currentLanguage];

  const getActivityIcon = (action) => {
    switch (action) {
      case 'approved':
        return { name: 'Check', color: 'text-success' };
      case 'rejected':
        return { name: 'X', color: 'text-error' };
      case 'updated':
        return { name: 'Edit', color: 'text-warning' };
      case 'created':
        return { name: 'Plus', color: 'text-primary' };
      case 'deleted':
        return { name: 'Trash2', color: 'text-error' };
      default:
        return { name: 'Activity', color: 'text-text-muted' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return currentLanguage === 'es' ? 'Ahora' : 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}${currentLanguage === 'es' ? ' min' : ' min ago'}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}${currentLanguage === 'es' ? ' h' : ' hours ago'}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}${currentLanguage === 'es' ? ' días' : ' days ago'}`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading-semibold text-text-primary">{t.activityLog}</h3>
        <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-250">
          {t.viewAll}
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-text-muted mb-2" />
          <p className="text-text-muted">{t.noActivity}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const iconConfig = getActivityIcon(activity.action);
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 ${iconConfig.color}`}>
                  <Icon name={iconConfig.name} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    <span className="font-body-medium">{activity.adminName}</span>
                    {' '}
                    <span className="text-text-secondary">
                      {t[activity.action]} {t.property}
                    </span>
                    {' '}
                    <span className="font-body-medium">{activity.propertyTitle}</span>
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

export default ActivityLog;