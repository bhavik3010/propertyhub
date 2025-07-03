import React from 'react';

import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange,
  currentLanguage 
}) => {
  const translations = {
    en: {
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      itemsPerPage: 'Items per page'
    },
    es: {
      showing: 'Mostrando',
      to: 'a',
      of: 'de',
      results: 'resultados',
      previous: 'Anterior',
      next: 'Siguiente',
      page: 'Página',
      itemsPerPage: 'Elementos por página'
    }
  };

  const t = translations[currentLanguage];

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <p className="text-sm text-text-secondary">
            {t.showing} {startItem} {t.to} {endItem} {t.of} {totalItems} {t.results}
          </p>
          
          {/* Items per page selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-text-secondary">{t.itemsPerPage}:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t.previous}
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {visiblePages.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-text-muted">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors duration-250 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:bg-secondary-100 hover:text-text-primary'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t.next}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;