import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import FormProgressIndicator from './components/FormProgressIndicator';
import FormSidebar from './components/FormSidebar';
import BasicInfoStep from './components/BasicInfoStep';
import DetailsStep from './components/DetailsStep';
import ImagesStep from './components/ImagesStep';
import LocationStep from './components/LocationStep';
import ReviewStep from './components/ReviewStep';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import Button from '../../components/ui/Button';


const PropertyManagementAddEdit = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('mode') === 'edit';
  const propertyId = searchParams.get('id');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Load existing property data if editing
    if (isEditing && propertyId) {
      loadPropertyData(propertyId);
    }
    
    // Load draft data from localStorage
    const draftData = localStorage.getItem('propertyDraft');
    if (draftData && !isEditing) {
      setFormData(JSON.parse(draftData));
    }
  }, [isEditing, propertyId]);

  // Auto-save functionality
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const saveTimer = setTimeout(() => {
        autoSave();
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [formData]);

  const translations = {
    en: {
      addProperty: 'Add New Property',
      editProperty: 'Edit Property',
      formNavigation: 'Form Navigation',
      draftSaved: 'Draft saved successfully',
      submissionSuccess: 'Property submitted successfully!',
      submissionError: 'Error submitting property. Please try again.',
      loadError: 'Error loading property data',
      confirmExit: 'You have unsaved changes. Are you sure you want to leave?'
    },
    es: {
      addProperty: 'Agregar Nueva Propiedad',
      editProperty: 'Editar Propiedad',
      formNavigation: 'Navegación del Formulario',
      draftSaved: 'Borrador guardado exitosamente',
      submissionSuccess: '¡Propiedad enviada exitosamente!',
      submissionError: 'Error al enviar la propiedad. Inténtelo de nuevo.',
      loadError: 'Error al cargar los datos de la propiedad',
      confirmExit: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
    }
  };

  const t = translations[currentLanguage];

  const loadPropertyData = async (id) => {
    try {
      // Mock property data for editing
      const mockPropertyData = {
        title: "Luxury Downtown Apartment",
        description: "Beautiful 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.",
        price: "2500",
        currency: "USD",
        propertyType: "apartment",
        status: "available",
        bedrooms: "2",
        bathrooms: "2",
        squareFootage: "1200",
        amenities: ["wifi", "parking", "gym", "laundry", "airConditioning"],
        additionalFeatures: "Recently renovated with hardwood floors and stainless steel appliances.",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
        ],
        primaryImageIndex: 0,
        address: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States"
        },
        neighborhood: "Located in the vibrant downtown area with easy access to restaurants, shopping, and public transportation.",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      };
      
      setFormData(mockPropertyData);
    } catch (error) {
      console.error('Error loading property data:', error);
    }
  };

  const autoSave = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage as draft
      localStorage.setItem('propertyDraft', JSON.stringify(formData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setValidationErrors(prev => {
      const updated = { ...prev };
      Object.keys(newData).forEach(key => {
        delete updated[key];
      });
      return updated;
    });
  };

  const handleStepClick = (step) => {
    if (step <= currentStep || step === 1) {
      setCurrentStep(step);
      setShowMobileSidebar(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft data
      localStorage.removeItem('propertyDraft');
      
      // Navigate to success page or property list
      navigate('/user-dashboard', { 
        state: { 
          message: t.submissionSuccess,
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert(t.submissionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            validationErrors={validationErrors}
          />
        );
      case 2:
        return (
          <DetailsStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            validationErrors={validationErrors}
          />
        );
      case 3:
        return (
          <ImagesStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <LocationStep
            formData={formData}
            onUpdateData={handleUpdateData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            validationErrors={validationErrors}
          />
        );
      case 5:
        return (
          <ReviewStep
            formData={formData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            onEditStep={handleEditStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <div className="pt-16">
        <NavigationBreadcrumbs />
        
        {/* Page Header */}
        <div className="bg-surface border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading-bold text-text-primary">
                  {isEditing ? t.editProperty : t.addProperty}
                </h1>
                <p className="text-text-secondary mt-2">
                  {isEditing 
                    ? 'Update your property information'
                    : 'Create a new property listing'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
                
                {/* Mobile Sidebar Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileSidebar(true)}
                  iconName="Menu"
                  className="lg:hidden"
                >
                  {t.formNavigation}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <FormProgressIndicator
          currentStep={currentStep}
          totalSteps={5}
          onStepClick={handleStepClick}
        />

        {/* Main Content */}
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FormSidebar
              currentStep={currentStep}
              onStepClick={handleStepClick}
              formData={formData}
              validationErrors={validationErrors}
            />
          </div>

          {/* Mobile Sidebar */}
          {showMobileSidebar && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setShowMobileSidebar(false)}
              />
              <div className="relative bg-surface w-80 shadow-elevation-4">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-heading-semibold text-text-primary">
                    {t.formNavigation}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileSidebar(false)}
                    iconName="X"
                  />
                </div>
                <FormSidebar
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                  formData={formData}
                  validationErrors={validationErrors}
                />
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="flex-1 bg-background">
            <div className="py-8">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagementAddEdit;