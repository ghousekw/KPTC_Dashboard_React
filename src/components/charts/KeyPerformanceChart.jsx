import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const KeyPerformanceChart = ({ selectedGarage }) => {
  const { getTranslation } = useLanguage();
  
  // Sample data for different garages
  const kpiData = {
    all: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '87%',
        trend: '+4%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '92%',
        trend: '+2%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '76%',
        trend: '-3%',
        isUp: false,
        color: '#f87171'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.4d',
        trend: '-0.5d',
        isUp: true,
        color: '#a78bfa'
      }
    ],
    sulaibiya: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '89%',
        trend: '+5%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '94%',
        trend: '+3%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '78%',
        trend: '-2%',
        isUp: false,
        color: '#f87171'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.2d',
        trend: '-0.3d',
        isUp: true,
        color: '#a78bfa'
      }
    ],
    subhan: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '85%',
        trend: '+2%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '90%',
        trend: '+1%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '72%',
        trend: '-5%',
        isUp: false,
        color: '#f87171'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.6d',
        trend: '-0.2d',
        isUp: true,
        color: '#a78bfa'
      }
    ],
    ahmadi: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '82%',
        trend: '+3%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '88%',
        trend: '+2%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '80%',
        trend: '+1%',
        isUp: true,
        color: '#10b981'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.5d',
        trend: '-0.4d',
        isUp: true,
        color: '#a78bfa'
      }
    ],
    fintas: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '83%',
        trend: '+2%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '86%',
        trend: '+1%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '68%',
        trend: '-7%',
        isUp: false,
        color: '#f87171'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.8d',
        trend: '+0.1d',
        isUp: false,
        color: '#f87171'
      }
    ],
    mutla: [
      {
        id: 1,
        title: getTranslation('Technician Efficiency'),
        value: '81%',
        trend: '+1%',
        isUp: true,
        color: '#60a5fa'
      },
      {
        id: 2,
        title: getTranslation('Service Satisfaction'),
        value: '85%',
        trend: '+2%',
        isUp: true,
        color: '#34d399'
      },
      {
        id: 3,
        title: getTranslation('Parts Availability'),
        value: '65%',
        trend: '-8%',
        isUp: false,
        color: '#f87171'
      },
      {
        id: 4,
        title: getTranslation('Average Repair Time'),
        value: '2.9d',
        trend: '+0.2d',
        isUp: false,
        color: '#f87171'
      }
    ]
  };
  
  // Get appropriate KPI data
  const garageKey = selectedGarage && kpiData[selectedGarage] ? selectedGarage : 'all';
  const currentKpiData = kpiData[garageKey];

  return (
    <div className="key-performance-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-graph-up"></i> 
          {getTranslation('Key Performance Indicators')}
          {selectedGarage && selectedGarage !== "all" && ` - ${selectedGarage.charAt(0).toUpperCase() + selectedGarage.slice(1)}`}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {currentKpiData.map(kpi => (
          <div key={kpi.id} className="kpi-card" style={{ borderColor: kpi.color }}>
            <div className="kpi-title">{kpi.title}</div>
            <div className="kpi-value-container">
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-trend ${kpi.isUp ? 'trend-up' : 'trend-down'}`}>
                <i className={`bi ${kpi.isUp ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPerformanceChart; 