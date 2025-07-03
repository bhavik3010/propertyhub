import React from 'react';

const StatusBadge = ({ status, currentLanguage }) => {
  const translations = {
    en: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      active: 'Active',
      inactive: 'Inactive'
    },
    es: {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      active: 'Activo',
      inactive: 'Inactivo'
    }
  };

  const t = translations[currentLanguage];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: t.pending,
          className: 'bg-warning-100 text-warning-800 border-warning-200',
          tooltip: 'Property is awaiting admin review'
        };
      case 'approved':
        return {
          label: t.approved,
          className: 'bg-success-100 text-success-800 border-success-200',
          tooltip: 'Property has been approved and is live'
        };
      case 'rejected':
        return {
          label: t.rejected,
          className: 'bg-error-100 text-error-800 border-error-200',
          tooltip: 'Property has been rejected'
        };
      case 'active':
        return {
          label: t.active,
          className: 'bg-success-100 text-success-800 border-success-200',
          tooltip: 'Property is currently active'
        };
      case 'inactive':
        return {
          label: t.inactive,
          className: 'bg-secondary-100 text-secondary-800 border-secondary-200',
          tooltip: 'Property is currently inactive'
        };
      default:
        return {
          label: status,
          className: 'bg-secondary-100 text-secondary-800 border-secondary-200',
          tooltip: ''
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium border ${config.className}`}
      title={config.tooltip}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;