import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const QuickActions = () => {
  const { getTranslation } = useLanguage();
  
  const actions = [
    {
      title: getTranslation('Create New Job Order'),
      icon: 'bi-plus',
      iconColor: '#4CAF50',
      count: null,
      description: null,
      buttonText: getTranslation('Create New Job Order'),
      buttonIcon: 'bi-file-earmark-plus',
      buttonColor: '#4CAF50'
    },
    {
      title: getTranslation('Pending Approvals'),
      icon: 'bi-hourglass',
      iconColor: '#FF9800',
      count: 8,
      description: getTranslation('Requires your attention'),
      linkText: getTranslation('View all pending approvals'),
      linkIcon: 'bi-arrow-right',
      linkColor: '#FF9800'
    },
    {
      title: getTranslation('Maintenance Alerts'),
      icon: 'bi-bell',
      iconColor: '#F44336',
      count: 3,
      description: getTranslation('Critical maintenance needed'),
      linkText: getTranslation('View maintenance details'),
      linkIcon: 'bi-arrow-right',
      linkColor: '#F44336'
    },
    {
      title: getTranslation('Generate Reports'),
      icon: 'bi-file-earmark-text',
      iconColor: '#2196F3',
      count: null, 
      description: null,
      buttonText: getTranslation('Download Reports'),
      buttonIcon: 'bi-download',
      buttonColor: '#2196F3'
    }
  ];

  return (
    <div className="quick-actions-container">
      {actions.map((action, index) => (
        <div key={index} className="quick-action-panel" style={{ borderColor: action.iconColor || action.buttonColor }}>
          <div className="quick-action-panel-header">
            <div className="quick-action-panel-title">{action.title}</div>
            <div className="quick-action-panel-icon" style={{ backgroundColor: action.iconColor }}>
              <i className={`bi ${action.icon}`}></i>
            </div>
          </div>
          
          {action.count && (
            <div className="quick-action-panel-count">{action.count}</div>
          )}
          
          {action.description && (
            <div className="quick-action-panel-description">
              <i className="bi bi-info-circle"></i> {action.description}
            </div>
          )}
          
          {action.buttonText && (
            <button 
              className="quick-action-panel-button" 
              style={{ backgroundColor: action.buttonColor }}
            >
              <i className={`bi ${action.buttonIcon}`}></i> {action.buttonText}
            </button>
          )}

          {action.linkText && (
            <a 
              href="#" 
              className="quick-action-panel-link"
              style={{ color: action.linkColor }}
            >
              {action.linkText} <i className={`bi ${action.linkIcon}`}></i>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickActions; 