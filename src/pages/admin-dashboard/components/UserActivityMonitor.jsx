import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserActivityMonitor = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('logins');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      userActivity: 'User Activity Monitor',
      loginPatterns: 'Login Patterns',
      popularSearches: 'Popular Searches',
      engagementStats: 'Engagement Stats',
      logins: 'Logins',
      searches: 'Searches',
      engagement: 'Engagement',
      totalLogins: 'Total Logins',
      activeUsers: 'Active Users',
      avgSessionTime: 'Avg Session Time',
      bounceRate: 'Bounce Rate'
    },
    es: {
      userActivity: 'Monitor de Actividad de Usuario',
      loginPatterns: 'Patrones de Inicio de Sesión',
      popularSearches: 'Búsquedas Populares',
      engagementStats: 'Estadísticas de Participación',
      logins: 'Inicios de Sesión',
      searches: 'Búsquedas',
      engagement: 'Participación',
      totalLogins: 'Total de Inicios de Sesión',
      activeUsers: 'Usuarios Activos',
      avgSessionTime: 'Tiempo Promedio de Sesión',
      bounceRate: 'Tasa de Rebote'
    }
  };

  const t = translations[currentLanguage];

  const loginData = [
    { hour: '00:00', logins: 12 },
    { hour: '04:00', logins: 8 },
    { hour: '08:00', logins: 45 },
    { hour: '12:00', logins: 78 },
    { hour: '16:00', logins: 65 },
    { hour: '20:00', logins: 52 }
  ];

  const popularSearches = [
    { term: 'apartment downtown', count: 1250, trend: 'up' },
    { term: '2 bedroom house', count: 980, trend: 'up' },
    { term: 'luxury villa', count: 750, trend: 'down' },
    { term: 'studio apartment', count: 620, trend: 'up' },
    { term: 'family home', count: 580, trend: 'stable' }
  ];

  const engagementStats = [
    {
      metric: t.totalLogins,
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'LogIn'
    },
    {
      metric: t.activeUsers,
      value: '1,523',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Users'
    },
    {
      metric: t.avgSessionTime,
      value: '8m 32s',
      change: '+2.1%',
      changeType: 'increase',
      icon: 'Clock'
    },
    {
      metric: t.bounceRate,
      value: '24.3%',
      change: '-3.8%',
      changeType: 'decrease',
      icon: 'TrendingDown'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={16} color="var(--color-success)" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} color="var(--color-error)" />;
      default:
        return <Icon name="Minus" size={16} color="var(--color-text-muted)" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logins':
        return (
          <div className="w-full h-64" aria-label="Login Patterns Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="logins" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'searches':
        return (
          <div className="space-y-4">
            {popularSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-body-medium text-text-primary">
                    {search.term}
                  </span>
                  {getTrendIcon(search.trend)}
                </div>
                <div className="text-sm text-text-secondary">
                  {search.count.toLocaleString()} searches
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'engagement':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engagementStats.map((stat, index) => (
              <div key={index} className="p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.metric}</p>
                    <p className="text-xl font-heading-bold text-text-primary">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <Icon
                        name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                        size={14}
                        color={stat.changeType === 'increase' ? 'var(--color-success)' : 'var(--color-error)'}
                      />
                      <span className={`text-sm ml-1 ${
                        stat.changeType === 'increase' ? 'text-success' : 'text-error'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon name={stat.icon} size={20} color="var(--color-primary)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'logins', label: t.logins },
    { id: 'searches', label: t.searches },
    { id: 'engagement', label: t.engagement }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">{t.userActivity}</h3>
        
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-body-medium rounded-md transition-all duration-250 ${
                activeTab === tab.id
                  ? 'bg-surface text-primary shadow-elevation-1'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserActivityMonitor;