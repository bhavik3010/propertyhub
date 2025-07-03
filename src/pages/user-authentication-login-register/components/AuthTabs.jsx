import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange, currentLanguage }) => {
  const translations = {
    en: {
      login: 'Login',
      register: 'Register'
    },
    es: {
      login: 'Iniciar Sesión',
      register: 'Registrarse'
    }
  };

  const t = translations[currentLanguage];

  return (
    <div className="flex bg-secondary-100 rounded-lg p-1 mb-6">
      <Button
        variant={activeTab === 'login' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('login')}
        fullWidth
        className="rounded-md"
      >
        {t.login}
      </Button>
      <Button
        variant={activeTab === 'register' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('register')}
        fullWidth
        className="rounded-md"
      >
        {t.register}
      </Button>
    </div>
  );
};

export default AuthTabs;