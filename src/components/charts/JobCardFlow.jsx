import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const JobCardFlow = ({ selectedGarage }) => {
  const { getTranslation } = useLanguage();

  // Sample data for different garages
  const jobFlowData = {
    all: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 48
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 32
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 26
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 20
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 14
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 10
      }
    ],
    sulaibiya: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 18
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 14
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 10
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 8
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 5
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 4
      }
    ],
    subhan: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 12
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 9
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 7
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 5
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 3
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 2
      }
    ],
    ahmadi: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 8
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 6
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 5
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 4
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 3
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 2
      }
    ],
    fintas: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 6
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 5
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 4
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 3
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 2
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 1
      }
    ],
    mutla: [
      { 
        id: 1,
        title: getTranslation('Job Order Submission'),
        description: getTranslation('Vehicle information and requirements'),
        icon: 'bi-file-earmark-text',
        count: 4
      },
      { 
        id: 2,
        title: getTranslation('Estimation'),
        description: getTranslation('Cost calculation and approval'),
        icon: 'bi-calculator',
        count: 3
      },
      { 
        id: 3,
        title: getTranslation('Job Assignment'),
        description: getTranslation('Technician allocation and planning'),
        icon: 'bi-person-badge',
        count: 2
      },
      { 
        id: 4,
        title: getTranslation('Repair Work'),
        description: getTranslation('Maintenance and parts replacement'),
        icon: 'bi-tools',
        count: 2
      },
      { 
        id: 5,
        title: getTranslation('Quality Check'),
        description: getTranslation('Inspection and validation'),
        icon: 'bi-check-circle',
        count: 1
      },
      { 
        id: 6,
        title: getTranslation('Handover to client'),
        description: getTranslation('Delivery and documentation'),
        icon: 'bi-arrow-right-circle',
        count: 1
      }
    ]
  };

  // Get appropriate job flow data
  const garageKey = selectedGarage && jobFlowData[selectedGarage] ? selectedGarage : 'all';
  const currentJobFlowData = jobFlowData[garageKey];

  return (
    <div className="job-flow-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-arrow-left-right"></i> 
          {getTranslation('Job Order Flow')} 
          {selectedGarage && selectedGarage !== "all" && ` - ${selectedGarage.charAt(0).toUpperCase() + selectedGarage.slice(1)}`}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
      </div>
      <div className="job-flow-steps">
        {currentJobFlowData.map((step, index) => (
          <div key={step.id} className="job-flow-step">
            <div className="job-flow-icon-container">
              <div className="job-flow-icon">
                <i className={`bi ${step.icon}`}></i>
              </div>
              {step.count > 0 && (
                <div className="job-flow-badge">{step.count}</div>
              )}
            </div>
            <div className="job-flow-title">{step.title}</div>
            <div className="job-flow-description">{step.description}</div>
            {index < currentJobFlowData.length - 1 && <div className="job-flow-arrow"><i className="bi bi-chevron-right"></i></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCardFlow; 