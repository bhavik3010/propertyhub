import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertSystem = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Mock alerts data
    setAlerts([
      {
        id: 1,
        type: 'critical',
        title: 'Server Performance Warning',
        message: 'High CPU usage detected on main server. Immediate attention required.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        priority: 'high',
        dismissed: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Pending Property Approvals',
        message: '15 properties are waiting for approval for more than 24 hours.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        priority: 'medium',
        dismissed: false
      },
      {
        id: 3,
        type: 'info',
        title: 'Scheduled Maintenance',
        message: 'System maintenance scheduled for tonight at 2:00 AM EST.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        priority: 'low',
        dismissed: false
      },
      {
        id: 4,
        type: 'success',
        title: 'Backup Completed',
        message: 'Daily database backup completed successfully.',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        priority: 'low',
        dismissed: false
      }
    ]);
  }, []);

  const translations = {
    en: {
      systemAlerts: 'System Alerts',
      dismissAll: 'Dismiss All',
      dismiss: 'Dismiss',
      viewDetails: 'View Details',
      noAlerts: 'No active alerts',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    },
    es: {
      systemAlerts: 'Alertas del Sistema',
      dismissAll: 'Descartar Todo',
      dismiss: 'Descartar',
      viewDetails: 'Ver Detalles',
      noAlerts: 'No hay alertas activas',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo'
    }
  };

  const t = translations[currentLanguage];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          icon: 'var(--color-error)',
          text: 'text-error-800'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'var(--color-warning)',
          text: 'text-warning-800'
        };
      case 'info':
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          icon: 'var(--color-primary)',
          text: 'text-primary-800'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'var(--color-success)',
          text: 'text-success-800'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          border: 'border-secondary-200',
          icon: 'var(--color-secondary)',
          text: 'text-secondary-800'
        };
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error-800',
      medium: 'bg-warning-100 text-warning-800',
      low: 'bg-success-100 text-success-800'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium ${colors[priority]}`}>
        {t[priority]}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} min ago`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const dismissAllAlerts = () => {
    setAlerts(alerts.map(alert => ({ ...alert, dismissed: true })));
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading-semibold text-text-primary">{t.systemAlerts}</h3>
          {activeAlerts.length > 0 && (
            <Button variant="ghost" size="sm" onClick={dismissAllAlerts}>
              {t.dismissAll}
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
            <p className="text-text-secondary">{t.noAlerts}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert) => {
              const colors = getAlertColor(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 ${colors.bg} ${colors.border} transition-all duration-250`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon
                        name={getAlertIcon(alert.type)}
                        size={24}
                        color={colors.icon}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-sm font-body-semibold ${colors.text}`}>
                          {alert.title}
                        </h4>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      
                      <p className={`text-sm ${colors.text} mb-2`}>
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="xs">
                            {t.viewDetails}
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            {t.dismiss}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertSystem;