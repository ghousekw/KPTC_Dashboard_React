import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PerformanceIndicators = () => {
  const { getTranslation } = useLanguage();
  
  const indicators = [
    {
      title: getTranslation('Avg. Turnaround Time'),
      value: '2.3',
      unit: getTranslation('Days'),
      target: getTranslation('Target: 3 Days'),
      status: 'positive',
      color: '#28a745',
      percentage: 85
    },
    {
      title: getTranslation('First Time Fix Rate'),
      value: '89',
      unit: '%',
      target: getTranslation('Target: 85%'),
      status: 'warning',
      color: '#ffc107',
      percentage: 89
    },
    {
      title: getTranslation('Customer Satisfaction'),
      value: '94',
      unit: '%',
      target: getTranslation('Target: 90%'),
      status: 'positive',
      color: '#28a745',
      percentage: 94
    },
    {
      title: getTranslation('Labor Utilization'),
      value: '82',
      unit: '%',
      target: getTranslation('Target: 85%'),
      status: 'warning',
      color: '#ffc107',
      percentage: 82
    }
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-speedometer2"></i> {getTranslation('Key Performance Indicators')}
        </h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {indicators.map((indicator, index) => (
          <div key={index} className="kpi-indicator">
            <div className="kpi-indicator-title">
              {indicator.title}
            </div>
            <div className="kpi-gauge">
              <div className="kpi-gauge-value" style={{ color: indicator.color }}>
                {indicator.value}
                <span className="kpi-gauge-unit">{indicator.unit}</span>
              </div>
              <div className="kpi-gauge-visual">
                <div className="kpi-gauge-arc" style={{ 
                  background: `conic-gradient(${indicator.color} 0% ${indicator.percentage}%, #f0f0f0 ${indicator.percentage}% 100%)` 
                }}>
                  <div className="kpi-gauge-inner"></div>
                </div>
              </div>
              <div className="kpi-gauge-target" style={{ color: indicator.status === 'positive' ? '#28a745' : '#ffc107' }}>
                <i className={`bi ${indicator.status === 'positive' ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
                {indicator.target}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceIndicators; 