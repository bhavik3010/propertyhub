import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success-50 border-success-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'error':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-primary-50 border-primary-200';
    }
  };

  const getIconColor = () => {
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

  return (
    <div className={`p-6 rounded-lg border-2 ${getColorClasses()} transition-all duration-250 hover:shadow-elevation-2`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-body-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-heading-bold text-text-primary">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                size={16}
                color={changeType === 'increase' ? 'var(--color-success)' : 'var(--color-error)'}
              />
              <span className={`text-sm font-body-medium ml-1 ${
                changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
            <Icon name={icon} size={24} color={getIconColor()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;