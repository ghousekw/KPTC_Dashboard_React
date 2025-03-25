import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const JobCardFlow = () => {
  const { getTranslation } = useLanguage();
  
  const flowSteps = [
    { 
      title: getTranslation('Reception'),
      icon: 'bi-folder-fill',
      count: 12,
      description: getTranslation('Initial assessment')
    },
    { 
      title: getTranslation('Inspection'),
      icon: 'bi-search',
      count: 8,
      description: getTranslation('Detailed diagnosis')
    },
    { 
      title: getTranslation('Estimation'),
      icon: 'bi-currency-dollar',
      count: 5,
      description: getTranslation('Cost approval')
    },
    { 
      title: getTranslation('Repair'),
      icon: 'bi-wrench',
      count: 7,
      description: getTranslation('Service execution')
    },
    { 
      title: getTranslation('Quality Check'),
      icon: 'bi-clipboard-check',
      count: 3,
      description: getTranslation('Final inspection')
    },
    { 
      title: getTranslation('Delivery'),
      icon: 'bi-car-front-fill',
      count: 2,
      description: getTranslation('Handover to client')
    }
  ];

  return (
    <div className="job-flow-container chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-diagram-3"></i> {getTranslation('Job Card Process Flow')}
        </h3>
      </div>
      <div className="job-flow-steps">
        {flowSteps.map((step, index) => (
          <div key={index} className="job-flow-step">
            <div className="job-flow-icon-container">
              <div className="job-flow-badge">{step.count}</div>
              <div className="job-flow-icon">
                <i className={`bi ${step.icon}`}></i>
              </div>
            </div>
            <div className="job-flow-content">
              <div className="job-flow-title">{step.title}</div>
              <div className="job-flow-description">{step.description}</div>
            </div>
            {index < flowSteps.length - 1 && (
              <div className="job-flow-arrow">
                <i className="bi bi-chevron-right"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCardFlow; 