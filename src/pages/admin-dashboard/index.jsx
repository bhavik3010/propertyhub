import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Import all components
import KPICard from './components/KPICard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import DataVisualization from './components/DataVisualization';
import RecentPropertiesTable from './components/RecentPropertiesTable';
import UserActivityMonitor from './components/UserActivityMonitor';
import AlertSystem from './components/AlertSystem';

const AdminDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      adminDashboard: 'Admin Dashboard',
      searchPlaceholder: 'Search properties, users, or logs...',
      export: 'Export Data',
      refresh: 'Refresh',
      totalProperties: 'Total Properties',
      activeUsers: 'Active Users',
      pendingApprovals: 'Pending Approvals',
      monthlyRevenue: 'Monthly Revenue',
      systemOverview: 'System Overview',
      welcomeBack: 'Welcome back, Administrator',
      lastLogin: 'Last login: Today at 9:30 AM'
    },
    es: {
      adminDashboard: 'Panel de Administrador',
      searchPlaceholder: 'Buscar propiedades, usuarios o registros...',
      export: 'Exportar Datos',
      refresh: 'Actualizar',
      totalProperties: 'Total de Propiedades',
      activeUsers: 'Usuarios Activos',
      pendingApprovals: 'Aprobaciones Pendientes',
      monthlyRevenue: 'Ingresos Mensuales',
      systemOverview: 'Resumen del Sistema',
      welcomeBack: 'Bienvenido de nuevo, Administrador',
      lastLogin: 'Último inicio de sesión: Hoy a las 9:30 AM'
    }
  };

  const t = translations[currentLanguage];

  const kpiData = [
    {
      title: t.totalProperties,
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Building2',
      color: 'primary'
    },
    {
      title: t.activeUsers,
      value: '8,932',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success'
    },
    {
      title: t.pendingApprovals,
      value: '23',
      change: '-15.3%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: t.monthlyRevenue,
      value: '$45,678',
      change: '+22.1%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'success'
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting data...');
  };

  const handleRefresh = () => {
    // Mock refresh functionality
    console.log('Refreshing dashboard...');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        <NavigationBreadcrumbs />
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading-bold text-text-primary mb-2">
                  {t.adminDashboard}
                </h1>
                <p className="text-text-secondary">{t.welcomeBack}</p>
                <p className="text-sm text-text-muted">{t.lastLogin}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button variant="secondary" size="sm" iconName="Download" onClick={handleExport}>
                  {t.export}
                </Button>
                <Button variant="ghost" size="sm" iconName="RefreshCw" onClick={handleRefresh}>
                  {t.refresh}
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Alert System */}
          <div className="mb-8">
            <AlertSystem />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Activity Feed */}
            <div className="xl:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Data Visualization */}
          <div className="mb-8">
            <DataVisualization />
          </div>

          {/* Recent Properties Table */}
          <div className="mb-8">
            <RecentPropertiesTable />
          </div>

          {/* User Activity Monitor */}
          <div className="mb-8">
            <UserActivityMonitor />
          </div>

          {/* Quick Navigation Links */}
          <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
            <h3 className="text-lg font-heading-semibold text-text-primary mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/admin-property-management"
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary-50 hover:border-primary transition-all duration-250"
              >
                <Icon name="Building2" size={24} color="var(--color-primary)" />
                <div>
                  <p className="font-body-medium text-text-primary">Property Management</p>
                  <p className="text-sm text-text-secondary">Manage all properties</p>
                </div>
              </Link>
              
              <Link
                to="/user-dashboard"
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary-50 hover:border-primary transition-all duration-250"
              >
                <Icon name="Users" size={24} color="var(--color-primary)" />
                <div>
                  <p className="font-body-medium text-text-primary">User Management</p>
                  <p className="text-sm text-text-secondary">Manage user accounts</p>
                </div>
              </Link>
              
              <Link
                to="/property-detail-view"
                className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary-50 hover:border-primary transition-all duration-250"
              >
                <Icon name="BarChart3" size={24} color="var(--color-primary)" />
                <div>
                  <p className="font-body-medium text-text-primary">Analytics</p>
                  <p className="text-sm text-text-secondary">View detailed reports</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;