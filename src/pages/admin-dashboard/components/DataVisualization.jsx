import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DataVisualization = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeChart, setActiveChart] = useState('properties');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      dataVisualization: 'Data Visualization',
      propertyListings: 'Property Listings',
      userEngagement: 'User Engagement',
      geographicDistribution: 'Geographic Distribution',
      properties: 'Properties',
      users: 'Users',
      geographic: 'Geographic'
    },
    es: {
      dataVisualization: 'Visualización de Datos',
      propertyListings: 'Listados de Propiedades',
      userEngagement: 'Participación de Usuarios',
      geographicDistribution: 'Distribución Geográfica',
      properties: 'Propiedades',
      users: 'Usuarios',
      geographic: 'Geográfico'
    }
  };

  const t = translations[currentLanguage];

  const propertyData = [
    { month: 'Jan', listings: 45, approved: 38, pending: 7 },
    { month: 'Feb', listings: 52, approved: 45, pending: 7 },
    { month: 'Mar', listings: 48, approved: 41, pending: 7 },
    { month: 'Apr', listings: 61, approved: 55, pending: 6 },
    { month: 'May', listings: 55, approved: 48, pending: 7 },
    { month: 'Jun', listings: 67, approved: 62, pending: 5 }
  ];

  const userEngagementData = [
    { month: 'Jan', activeUsers: 1200, newUsers: 180, sessions: 3400 },
    { month: 'Feb', activeUsers: 1350, newUsers: 220, sessions: 3800 },
    { month: 'Mar', activeUsers: 1280, newUsers: 195, sessions: 3600 },
    { month: 'Apr', activeUsers: 1450, newUsers: 240, sessions: 4200 },
    { month: 'May', activeUsers: 1380, newUsers: 210, sessions: 3900 },
    { month: 'Jun', activeUsers: 1520, newUsers: 280, sessions: 4500 }
  ];

  const geographicData = [
    { name: 'New York', value: 35, color: '#2563EB' },
    { name: 'California', value: 28, color: '#059669' },
    { name: 'Texas', value: 18, color: '#D97706' },
    { name: 'Florida', value: 12, color: '#DC2626' },
    { name: 'Others', value: 7, color: '#64748B' }
  ];

  const chartTabs = [
    { id: 'properties', label: t.properties, icon: 'Building2' },
    { id: 'users', label: t.users, icon: 'Users' },
    { id: 'geographic', label: t.geographic, icon: 'MapPin' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'properties':
        return (
          <div className="w-full h-80" aria-label="Property Listings Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="approved" fill="var(--color-success)" name="Approved" />
                <Bar dataKey="pending" fill="var(--color-warning)" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'users':
        return (
          <div className="w-full h-80" aria-label="User Engagement Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="activeUsers" stroke="var(--color-primary)" strokeWidth={2} name="Active Users" />
                <Line type="monotone" dataKey="newUsers" stroke="var(--color-success)" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'geographic':
        return (
          <div className="w-full h-80" aria-label="Geographic Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {geographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">{t.dataVisualization}</h3>
        
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-body-medium rounded-md transition-all duration-250 ${
                activeChart === tab.id
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
        {renderChart()}
      </div>
    </div>
  );
};

export default DataVisualization;