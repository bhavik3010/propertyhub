import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onExport, 
  onBulkAction,
  selectedCount,
  currentLanguage 
}) => {
  const translations = {
    en: {
      search: 'Search properties...',
      status: 'Status',
      propertyType: 'Property Type',
      location: 'Location',
      dateRange: 'Date Range',
      ownerVerification: 'Owner Verification',
      export: 'Export',
      bulkActions: 'Bulk Actions',
      approve: 'Approve Selected',
      reject: 'Reject Selected',
      delete: 'Delete Selected',
      allStatuses: 'All Statuses',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      allTypes: 'All Types',
      apartment: 'Apartment',
      house: 'House',
      condo: 'Condo',
      townhouse: 'Townhouse',
      allLocations: 'All Locations',
      verified: 'Verified',
      unverified: 'Unverified',
      allVerification: 'All Verification',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      allTime: 'All Time',
      selectedItems: 'selected items'
    },
    es: {
      search: 'Buscar propiedades...',
      status: 'Estado',
      propertyType: 'Tipo de Propiedad',
      location: 'Ubicación',
      dateRange: 'Rango de Fechas',
      ownerVerification: 'Verificación del Propietario',
      export: 'Exportar',
      bulkActions: 'Acciones en Lote',
      approve: 'Aprobar Seleccionados',
      reject: 'Rechazar Seleccionados',
      delete: 'Eliminar Seleccionados',
      allStatuses: 'Todos los Estados',
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      allTypes: 'Todos los Tipos',
      apartment: 'Apartamento',
      house: 'Casa',
      condo: 'Condominio',
      townhouse: 'Casa Adosada',
      allLocations: 'Todas las Ubicaciones',
      verified: 'Verificado',
      unverified: 'No Verificado',
      allVerification: 'Toda Verificación',
      last7Days: 'Últimos 7 Días',
      last30Days: 'Últimos 30 Días',
      last90Days: 'Últimos 90 Días',
      allTime: 'Todo el Tiempo',
      selectedItems: 'elementos seleccionados'
    }
  };

  const t = translations[currentLanguage];

  const statusOptions = [
    { value: '', label: t.allStatuses },
    { value: 'pending', label: t.pending },
    { value: 'approved', label: t.approved },
    { value: 'rejected', label: t.rejected }
  ];

  const typeOptions = [
    { value: '', label: t.allTypes },
    { value: 'apartment', label: t.apartment },
    { value: 'house', label: t.house },
    { value: 'condo', label: t.condo },
    { value: 'townhouse', label: t.townhouse }
  ];

  const locationOptions = [
    { value: '', label: t.allLocations },
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'miami', label: 'Miami' }
  ];

  const verificationOptions = [
    { value: '', label: t.allVerification },
    { value: 'verified', label: t.verified },
    { value: 'unverified', label: t.unverified }
  ];

  const dateRangeOptions = [
    { value: '', label: t.allTime },
    { value: '7', label: t.last7Days },
    { value: '30', label: t.last30Days },
    { value: '90', label: t.last90Days }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <Input
              type="search"
              placeholder={t.search}
              value={filters.search}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          variant="primary"
          iconName="Download"
          onClick={onExport}
        >
          {t.export}
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            {t.status}
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            {t.propertyType}
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            {t.location}
          </label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            {t.dateRange}
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Owner Verification Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            {t.ownerVerification}
          </label>
          <select
            value={filters.ownerVerification}
            onChange={(e) => onFilterChange('ownerVerification', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {verificationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-body-medium text-primary">
              {selectedCount} {t.selectedItems}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              onClick={() => onBulkAction('approve')}
            >
              {t.approve}
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconName="X"
              onClick={() => onBulkAction('reject')}
            >
              {t.reject}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              onClick={() => onBulkAction('delete')}
            >
              {t.delete}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;