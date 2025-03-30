import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const DetailedStats = () => {
  const { getTranslation } = useLanguage();
  
  const statsData = [
    {
      title: getTranslation('In Register'),
      value: 7,
      icon: 'bi-pencil-square',
      color: '#4169e1',
      description: getTranslation('Active initial JOs')
    },
    {
      title: getTranslation('Pending QA'),
      value: 3,
      icon: 'bi-clipboard-check',
      color: '#8e44ad',
      description: getTranslation('Awaiting quality check')
    },
    {
      title: getTranslation('Ready for Delivery'),
      value: 2,
      icon: 'bi-truck',
      color: '#27ae60',
      description: getTranslation('Completed and ready')
    },
    {
      title: getTranslation('Parts Pending'),
      value: 5,
      icon: 'bi-gear-fill',
      color: '#e74c3c',
      description: getTranslation('Waiting for parts')
    }
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-clipboard-data-fill"></i> {getTranslation('Detailed Status Breakdown')}
        </h3>
      </div>
      <div className="detailed-stats">
        {statsData.map((stat, index) => (
          <div key={index} className="detailed-stat-card">
            <div className="detailed-stat-card-header">
              <div className="detailed-stat-card-icon" style={{ backgroundColor: stat.color }}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div className="detailed-stat-card-title">{stat.title}</div>
            </div>
            <div className="detailed-stat-card-value">{stat.value}</div>
            <div className="detailed-stat-card-desc">
              <i className="bi bi-info-circle"></i> {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedStats; 