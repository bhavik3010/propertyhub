import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      quickActions: 'Quick Actions',
      bulkApprove: 'Bulk Approve Properties',
      manageUsers: 'Manage Users',
      systemAnnouncement: 'System Announcement',
      generateReport: 'Generate Report',
      backupData: 'Backup Data',
      viewLogs: 'View System Logs'
    },
    es: {
      quickActions: 'Acciones Rápidas',
      bulkApprove: 'Aprobar Propiedades en Lote',
      manageUsers: 'Gestionar Usuarios',
      systemAnnouncement: 'Anuncio del Sistema',
      generateReport: 'Generar Reporte',
      backupData: 'Respaldar Datos',
      viewLogs: 'Ver Registros del Sistema'
    }
  };

  const t = translations[currentLanguage];

  const actions = [
    {
      id: 1,
      title: t.bulkApprove,
      icon: 'CheckSquare',
      variant: 'success',
      description: 'Approve multiple properties at once'
    },
    {
      id: 2,
      title: t.manageUsers,
      icon: 'Users',
      variant: 'primary',
      description: 'User management and permissions'
    },
    {
      id: 3,
      title: t.systemAnnouncement,
      icon: 'Megaphone',
      variant: 'warning',
      description: 'Send notifications to all users'
    },
    {
      id: 4,
      title: t.generateReport,
      icon: 'FileText',
      variant: 'secondary',
      description: 'Create detailed system reports'
    },
    {
      id: 5,
      title: t.backupData,
      icon: 'Database',
      variant: 'info',
      description: 'Backup system data'
    },
    {
      id: 6,
      title: t.viewLogs,
      icon: 'Activity',
      variant: 'ghost',
      description: 'View system activity logs'
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading-semibold text-text-primary">{t.quickActions}</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <div key={action.id} className="p-4 rounded-lg border border-border hover:shadow-elevation-2 transition-all duration-250">
              <div className="text-center">
                <Button
                  variant={action.variant}
                  size="lg"
                  iconName={action.icon}
                  iconPosition="left"
                  fullWidth
                  className="mb-3"
                >
                  {action.title}
                </Button>
                <p className="text-xs text-text-muted">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;