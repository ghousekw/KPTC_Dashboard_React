import React from 'react';
import { MediaViewer } from '../index';
import { useQCInspectorHelpTranslations } from '../context/HelpLanguageContext';
import { getVideoUrl } from '../config/videoUrls';
import './QCInspectorHelp.css';

// Import QC Inspector assets - update paths based on your actual assets
const inspectorListScreenshot = {
  en: '/assets/help/qcinspector/en/inspector_list.png',
  ar: '/assets/help/qcinspector/ar/inspector_list.png'
};
const assignInspectorScreenshot = {
  en: '/assets/help/qcinspector/en/assign_inspector.png',
  ar: '/assets/help/qcinspector/ar/assign_inspector.png'
};

const QCInspectorHelp = () => {
  // Get component-specific translations and language
  const { language, getTranslation, isRTL } = useQCInspectorHelpTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="help-title">{getTranslation('QC Inspector Assignment Help')}</h1>
      
      {/* QC Inspector List Section */}
      <div className="help-section">
        <h2>{getTranslation('Inspector List Overview')}</h2>
        <p>{getTranslation('The QC Inspector List shows all assigned quality control inspectors. Here\'s how to use it effectively:')}</p>
        
        <MediaViewer 
          src={isRTL ? inspectorListScreenshot.ar : inspectorListScreenshot.en}
          type="image"
          caption={getTranslation('The QC Inspector list interface')}
          alt={getTranslation('Screenshot of the QC Inspector list showing columns and data')}
        />
        
        <div className="feature-grid">
          <div className="feature-item">
            <h3>{getTranslation('List Features')}</h3>
            <ul>
              <li>{getTranslation('View inspector details including S.No, JC No., and Date')}</li>
              <li>{getTranslation('See assigned plates and vehicle information')}</li>
              <li>{getTranslation('Check garage location and current status')}</li>
              <li>{getTranslation('Track inspector assignments and take actions')}</li>
            </ul>
          </div>
          
          <div className="feature-item">
            <h3>{getTranslation('Filtering Options')}</h3>
            <ul>
              <li>{getTranslation('Filter by date range to find specific assignments')}</li>
              <li>{getTranslation('Search by Job Card No. or Plate No.')}</li>
              <li>{getTranslation('Filter by Vehicle Make or Garage')}</li>
              <li>{getTranslation('Select specific Inspector to view their assignments')}</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Assigning New Inspector Section */}
      <div className="help-section">
        <h2>{getTranslation('Assigning a QC Inspector')}</h2>
        <div className="help-content">
          <p>{getTranslation('Follow these steps to assign a quality control inspector:')}</p>
          
          <MediaViewer 
            src={isRTL ? assignInspectorScreenshot.ar : assignInspectorScreenshot.en}
            type="image"
            caption={getTranslation('The QC Inspector assignment interface')}
            alt={getTranslation('Screenshot of the QC Inspector assignment form showing all fields')}
          />
          
          <MediaViewer
            src={getVideoUrl('qcInspector', 'assignInspector', isRTL ? 'ar' : 'en')}
            type="video"
            caption={getTranslation('Video demonstration of assigning a QC Inspector')}
          />
          
          <div className="steps-container">
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 1')}</div>
                <h3>{getTranslation('Open the Assignment Form')}</h3>
              </div>
              <p>{getTranslation('Click the "Assign Inspector" option from the menu, or click the "New" button from the Inspector List view.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 2')}</div>
                <h3>{getTranslation('Select Job Card Details')}</h3>
              </div>
              <ul>
                <li>{getTranslation('Select the Job Card No. from the dropdown')}</li>
                <li>{getTranslation('The Job Card Date will be automatically populated')}</li>
                <li>{getTranslation('Plate No. will display based on the selected Job Card')}</li>
                <li>{getTranslation('Garage location will be shown automatically')}</li>
              </ul>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 3')}</div>
                <h3>{getTranslation('Enter Job Time Details')}</h3>
              </div>
              <ul>
                <li>{getTranslation('Enter the Job Time IN when work begins')}</li>
                <li>{getTranslation('The current date and time will be used by default')}</li>
                <li>{getTranslation('You can adjust the time if needed')}</li>
              </ul>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 4')}</div>
                <h3>{getTranslation('Assign Inspector')}</h3>
              </div>
              <ul>
                <li>{getTranslation('Enter or select the inspector name')}</li>
                <li>{getTranslation('Choose from the available inspectors in the dropdown')}</li>
                <li>{getTranslation('Verify that all information is correct')}</li>
              </ul>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 5')}</div>
                <h3>{getTranslation('Save the Assignment')}</h3>
              </div>
              <p>{getTranslation('Click the "Save" button to finalize the inspector assignment. The system will confirm the successful assignment.')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Important Notes Section */}
      <div className="help-section">
        <h2>{getTranslation('Important Notes')}</h2>
        
        <div className="notes-container">
          <div className="note-item">
            <h3>{getTranslation('Required Fields')}</h3>
            <p>{getTranslation('Job Card No. and Inspector are mandatory fields that must be completed')}</p>
          </div>
          
          <div className="note-item">
            <h3>{getTranslation('Time Tracking')}</h3>
            <p>{getTranslation('Job Time IN is recorded to track when the inspection begins')}</p>
          </div>
          
          <div className="note-item">
            <h3>{getTranslation('Status Updates')}</h3>
            <p>{getTranslation('The Job Card status will update automatically once an inspector is assigned')}</p>
          </div>
        </div>
      </div>
      
      {/* Actions Section */}
      <div className="help-section">
        <h2>{getTranslation('Additional Actions')}</h2>
        
        <div className="actions-container">
          <div className="action-item">
            <h3>{getTranslation('Clear Form')}</h3>
            <p>{getTranslation('Click the "Clear" button to reset all fields and start over')}</p>
          </div>
          
          <div className="action-item">
            <h3>{getTranslation('Close Form')}</h3>
            <p>{getTranslation('Click the "Close" button to exit without saving changes')}</p>
          </div>
          
          <div className="action-item">
            <h3>{getTranslation('Edit Assignment')}</h3>
            <p>{getTranslation('To modify an existing assignment, select it from the list and update the information')}</p>
          </div>
        </div>
      </div>
      
      {/* Troubleshooting Section */}
      <div className="help-section">
        <h2>{getTranslation('Troubleshooting')}</h2>
        
        <div className="troubleshooting-container">
          <div className="trouble-item">
            <h3>{getTranslation('Cannot Find Job Card')}</h3>
            <p>{getTranslation('Ensure the job card has been created and is in a status that allows inspector assignment')}</p>
          </div>
          
          <div className="trouble-item">
            <h3>{getTranslation('Inspector Not Available')}</h3>
            <p>{getTranslation('If an inspector is not listed in the dropdown, contact the administrator to ensure they are properly registered in the system')}</p>
          </div>
          
          <div className="trouble-item">
            <h3>{getTranslation('Assignment Failed')}</h3>
            <p>{getTranslation('If the assignment fails to save, check that all required fields are completed correctly and try again')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCInspectorHelp; 