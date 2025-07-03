import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import PropertyModal from './PropertyModal';

const PropertyTable = ({ 
  properties, 
  selectedProperties, 
  onSelectProperty, 
  onSelectAll, 
  onStatusChange, 
  onEdit,
  currentLanguage 
}) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translations = {
    en: {
      selectAll: 'Select All',
      thumbnail: 'Thumbnail',
      title: 'Title',
      owner: 'Owner',
      status: 'Status',
      submitted: 'Submitted',
      actions: 'Actions',
      preview: 'Preview',
      edit: 'Edit',
      approve: 'Approve',
      reject: 'Reject',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      noProperties: 'No properties found',
      viewDetails: 'View Details'
    },
    es: {
      selectAll: 'Seleccionar Todo',
      thumbnail: 'Miniatura',
      title: 'Título',
      owner: 'Propietario',
      status: 'Estado',
      submitted: 'Enviado',
      actions: 'Acciones',
      preview: 'Vista Previa',
      edit: 'Editar',
      approve: 'Aprobar',
      reject: 'Rechazar',
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      noProperties: 'No se encontraron propiedades',
      viewDetails: 'Ver Detalles'
    }
  };

  const t = translations[currentLanguage];

  const handlePreview = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'es' ? 'es-ES' : 'en-US');
  };

  if (properties.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-8 text-center">
        <Icon name="Building2" size={48} className="mx-auto text-text-muted mb-4" />
        <p className="text-text-secondary">{t.noProperties}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProperties.length === properties.length}
                    onChange={onSelectAll}
                    className="rounded border-border focus:ring-2 focus:ring-primary"
                  />
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.thumbnail}
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.title}
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.owner}
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.status}
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.submitted}
                </th>
                <th className="text-left px-4 py-3 text-sm font-body-semibold text-text-primary">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-secondary-50 transition-colors duration-250">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => onSelectProperty(property.id)}
                      className="rounded border-border focus:ring-2 focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-body-medium text-text-primary">{property.title}</p>
                      <p className="text-sm text-text-muted">{property.location}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="text-sm font-body-medium text-text-primary">{property.owner.name}</p>
                        <p className="text-xs text-text-muted">{property.owner.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={property.status} currentLanguage={currentLanguage} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-text-secondary">{formatDate(property.submittedAt)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handlePreview(property)}
                        title={t.preview}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => onEdit(property)}
                        title={t.edit}
                      />
                      {property.status === 'pending' && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            iconName="Check"
                            onClick={() => onStatusChange(property.id, 'approved')}
                            title={t.approve}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            iconName="X"
                            onClick={() => onStatusChange(property.id, 'rejected')}
                            title={t.reject}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-surface rounded-lg border border-border p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedProperties.includes(property.id)}
                onChange={() => onSelectProperty(property.id)}
                className="mt-1 rounded border-border focus:ring-2 focus:ring-primary"
              />
              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-body-semibold text-text-primary truncate">{property.title}</h3>
                <p className="text-sm text-text-muted">{property.location}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <StatusBadge status={property.status} currentLanguage={currentLanguage} />
                  <span className="text-xs text-text-muted">{formatDate(property.submittedAt)}</span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="primary"
                    size="xs"
                    iconName="Eye"
                    onClick={() => handlePreview(property)}
                  >
                    {t.viewDetails}
                  </Button>
                  {property.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="xs"
                        iconName="Check"
                        onClick={() => onStatusChange(property.id, 'approved')}
                      />
                      <Button
                        variant="danger"
                        size="xs"
                        iconName="X"
                        onClick={() => onStatusChange(property.id, 'rejected')}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Modal */}
      {isModalOpen && selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onStatusChange={onStatusChange}
          currentLanguage={currentLanguage}
        />
      )}
    </>
  );
};

export default PropertyTable;