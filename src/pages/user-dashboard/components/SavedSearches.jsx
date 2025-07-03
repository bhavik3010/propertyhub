import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ searches, onRunSearch, onDeleteSearch }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      savedSearches: 'Saved Searches',
      newResults: 'new results',
      runSearch: 'Run Search',
      delete: 'Delete',
      noSavedSearches: 'No saved searches yet',
      saveSearchDescription: 'Save your favorite search filters to get notified of new properties',
      createSearch: 'Create Search'
    },
    es: {
      savedSearches: 'Búsquedas Guardadas',
      newResults: 'nuevos resultados',
      runSearch: 'Ejecutar Búsqueda',
      delete: 'Eliminar',
      noSavedSearches: 'Aún no hay búsquedas guardadas',
      saveSearchDescription: 'Guarda tus filtros de búsqueda favoritos para recibir notificaciones de nuevas propiedades',
      createSearch: 'Crear Búsqueda'
    }
  };

  const t = translations[currentLanguage];

  const formatSearchCriteria = (criteria) => {
    const parts = [];
    if (criteria.location) parts.push(criteria.location);
    if (criteria.priceRange) parts.push(`$${criteria.priceRange.min.toLocaleString()} - $${criteria.priceRange.max.toLocaleString()}`);
    if (criteria.bedrooms) parts.push(`${criteria.bedrooms}+ bed`);
    if (criteria.propertyType) parts.push(criteria.propertyType);
    return parts.join(' • ');
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading-semibold text-text-primary">
          {t.savedSearches}
        </h2>
      </div>

      {searches.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-primary font-body-medium mb-2">{t.noSavedSearches}</p>
          <p className="text-text-muted text-sm mb-4">{t.saveSearchDescription}</p>
          <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
            {t.createSearch}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {searches.map((search) => (
            <div key={search.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-colors duration-250">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-body-semibold text-text-primary mb-1">
                    {search.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {formatSearchCriteria(search.criteria)}
                  </p>
                  {search.newResults > 0 && (
                    <div className="flex items-center text-sm text-success">
                      <Icon name="Bell" size={14} className="mr-1" />
                      <span>{search.newResults} {t.newResults}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="primary"
                    size="xs"
                    iconName="Search"
                    onClick={() => onRunSearch(search.id)}
                  >
                    {t.runSearch}
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Trash2"
                    onClick={() => onDeleteSearch(search.id)}
                    className="text-error hover:text-error-600"
                  >
                    {t.delete}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;