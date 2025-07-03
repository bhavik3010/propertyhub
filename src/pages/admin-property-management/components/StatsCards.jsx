import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats, currentLanguage }) => {
  const translations = {
    en: {
      totalProperties: 'Total Properties',
      pendingReview: 'Pending Review',
      approvedProperties: 'Approved Properties',
      rejectedProperties: 'Rejected Properties',
      thisMonth: 'This month',
      increase: 'increase',
      decrease: 'decrease'
    },
    es: {
      totalProperties: 'Propiedades Totales',
      pendingReview: 'Pendientes de Revisión',
      approvedProperties: 'Propiedades Aprobadas',
      rejectedProperties: 'Propiedades Rechazadas',
      thisMonth: 'Este mes',
      increase: 'aumento',
      decrease: 'disminución'
    }
  };

  const t = translations[currentLanguage];

  const cards = [
    {
      title: t.totalProperties,
      value: stats.total,
      change: stats.totalChange,
      icon: 'Building2',
      color: 'primary'
    },
    {
      title: t.pendingReview,
      value: stats.pending,
      change: stats.pendingChange,
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: t.approvedProperties,
      value: stats.approved,
      change: stats.approvedChange,
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: t.rejectedProperties,
      value: stats.rejected,
      change: stats.rejectedChange,
      icon: 'XCircle',
      color: 'error'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-100',
        icon: 'text-primary',
        text: 'text-primary'
      },
      warning: {
        bg: 'bg-warning-100',
        icon: 'text-warning',
        text: 'text-warning'
      },
      success: {
        bg: 'bg-success-100',
        icon: 'text-success',
        text: 'text-success'
      },
      error: {
        bg: 'bg-error-100',
        icon: 'text-error',
        text: 'text-error'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const colors = getColorClasses(card.color);
        const isPositive = card.change >= 0;
        
        return (
          <div key={index} className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-shadow duration-250">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-body-medium text-text-muted">{card.title}</p>
                <p className="text-2xl font-heading-bold text-text-primary mt-1">{card.value}</p>
                <div className="flex items-center mt-2">
                  <Icon
                    name={isPositive ? "TrendingUp" : "TrendingDown"}
                    size={16}
                    className={isPositive ? "text-success" : "text-error"}
                  />
                  <span className={`text-sm ml-1 ${isPositive ? "text-success" : "text-error"}`}>
                    {Math.abs(card.change)}% {isPositive ? t.increase : t.decrease}
                  </span>
                  <span className="text-sm text-text-muted ml-1">{t.thisMonth}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon name={card.icon} size={24} className={colors.icon} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;