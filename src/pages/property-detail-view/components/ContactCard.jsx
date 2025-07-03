import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactCard = ({ agent, property }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
    preferredContact: 'email'
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      contactAgent: 'Contact Agent',
      scheduleViewing: 'Schedule Viewing',
      callNow: 'Call Now',
      sendEmail: 'Send Email',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      yourPhone: 'Your Phone',
      inquiryType: 'Inquiry Type',
      general: 'General Inquiry',
      viewing: 'Schedule Viewing',
      financing: 'Financing Information',
      offer: 'Make an Offer',
      message: 'Message',
      preferredContact: 'Preferred Contact Method',
      email: 'Email',
      phone: 'Phone',
      sendMessage: 'Send Message',
      responseTime: 'Typically responds within 2 hours',
      properties: 'Properties Listed',
      experience: 'Years Experience'
    },
    es: {
      contactAgent: 'Contactar Agente',
      scheduleViewing: 'Programar Visita',
      callNow: 'Llamar Ahora',
      sendEmail: 'Enviar Email',
      yourName: 'Tu Nombre',
      yourEmail: 'Tu Email',
      yourPhone: 'Tu Teléfono',
      inquiryType: 'Tipo de Consulta',
      general: 'Consulta General',
      viewing: 'Programar Visita',
      financing: 'Información de Financiamiento',
      offer: 'Hacer una Oferta',
      message: 'Mensaje',
      preferredContact: 'Método de Contacto Preferido',
      email: 'Email',
      phone: 'Teléfono',
      sendMessage: 'Enviar Mensaje',
      responseTime: 'Normalmente responde en 2 horas',
      properties: 'Propiedades Listadas',
      experience: 'Años de Experiencia'
    }
  };

  const t = translations[currentLanguage];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="sticky top-24">
      <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
        {/* Agent Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={agent.photo}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading-bold text-text-primary">{agent.name}</h3>
            <p className="text-text-secondary">{agent.title}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
              <span>{agent.experience} {t.experience}</span>
              <span>{agent.propertiesListed} {t.properties}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="primary"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            fullWidth
          >
            {t.callNow}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            fullWidth
          >
            {t.sendEmail}
          </Button>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder={t.yourName}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder={t.yourEmail}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              placeholder={t.yourPhone}
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
            >
              <option value="general">{t.general}</option>
              <option value="viewing">{t.viewing}</option>
              <option value="financing">{t.financing}</option>
              <option value="offer">{t.offer}</option>
            </select>
          </div>

          <div>
            <textarea
              name="message"
              placeholder={t.message}
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              {t.preferredContact}
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-text-secondary">{t.email}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-text-secondary">{t.phone}</span>
              </label>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            type="submit"
            iconName="Send"
            iconPosition="left"
          >
            {t.sendMessage}
          </Button>
        </form>

        {/* Response Time */}
        <div className="mt-4 p-3 bg-success-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-success" />
            <span className="text-sm text-success-700">{t.responseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;