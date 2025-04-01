import React from 'react';
import { MediaViewer } from '../index';
import { useQCTechnicianHelpTranslations } from '../context/HelpLanguageContext';
import { getVideoUrl } from '../config/videoUrls';
import './QCTechnicianHelp.css';

// Import QC Technician assets - update paths based on your actual assets
const technicianListScreenshot = {
  en: '/assets/help/qctechnician/en/technician_list.png',
  ar: '/assets/help/qctechnician/ar/technician_list.png'
};
const assignTechnicianScreenshot = {
  en: '/assets/help/qctechnician/en/assign_technician.png',
  ar: '/assets/help/qctechnician/ar/assign_technician.png'
};

const QCTechnicianHelp = () => {
  // Get component-specific translations and language
  const { language, getTranslation, isRTL } = useQCTechnicianHelpTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="help-title">{getTranslation('QC Technician Assignment Help')}</h1>
      
      {/* QC Technician List Section */}
      <div className="help-section">
        <h2>{getTranslation('Technician List Overview')}</h2>
        <p>{getTranslation('The QC Technician List shows all assigned technicians. Here\'s how to use it effectively:')}</p>
        
        <MediaViewer 
          src={isRTL ? technicianListScreenshot.ar : technicianListScreenshot.en}
          type="image"
          caption={getTranslation('The QC Technician list interface')}
          alt={getTranslation('Screenshot of the QC Technician list showing columns and data')}
        />
        
        <div className="feature-grid">
          <div className="feature-item">
            <h3>{getTranslation('List Features')}</h3>
            <ul>
              <li>{getTranslation('View technician assignments including S.No, JC No., and Date')}</li>
              <li>{getTranslation('See assigned plates and vehicle information')}</li>
              <li>{getTranslation('Check garage location and current status')}</li>
              <li>{getTranslation('Track technician assignments and take actions')}</li>
            </ul>
          </div>
          
          <div className="feature-item">
            <h3>{getTranslation('Filtering Options')}</h3>
            <ul>
              <li>{getTranslation('Filter by date range to find specific assignments')}</li>
              <li>{getTranslation('Search by Job Card No. or Plate No.')}</li>
              <li>{getTranslation('Filter by Vehicle Make or Garage')}</li>
              <li>{getTranslation('Select specific User to view their assignments')}</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Assigning New Technician Section */}
      <div className="help-section">
        <h2>{getTranslation('Assigning a QC Technician')}</h2>
        <div className="help-content">
          <p>{getTranslation('Follow these steps to assign a quality control technician:')}</p>
          
          <MediaViewer 
            src={isRTL ? assignTechnicianScreenshot.ar : assignTechnicianScreenshot.en}
            type="image"
            caption={getTranslation('The QC Technician assignment interface')}
            alt={getTranslation('Screenshot of the QC Technician assignment form showing all fields')}
          />
          
          <MediaViewer
            src={getVideoUrl('qcTechnician', 'assignTechnician', isRTL ? 'ar' : 'en')}
            type="video"
            caption={getTranslation('Video demonstration of assigning a QC Technician')}
          />
          
          <div className="steps-container">
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 1')}</div>
                <h3>{getTranslation('Open the Assignment Form')}</h3>
              </div>
              <p>{getTranslation('Click the "Assign Technician" option from the menu, or click the "New" button from the Technician List view.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 2')}</div>
                <h3>{getTranslation('Select Job Card')}</h3>
              </div>
              <p>{getTranslation('Choose the Job Order No. from the dropdown. This will automatically fill in related details like date, plate number, and garage location.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 3')}</div>
                <h3>{getTranslation('Enter Job Time')}</h3>
              </div>
              <p>{getTranslation('Input the estimated job time required for the technician to complete the task.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 4')}</div>
                <h3>{getTranslation('Select Technician')}</h3>
              </div>
              <p>{getTranslation('Choose the appropriate technician for the job from the dropdown list of available technicians.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 5')}</div>
                <h3>{getTranslation('Upload Supporting Images')}</h3>
              </div>
              <p>{getTranslation('If needed, upload relevant images of the vehicle or specific issues that the technician should address.')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 6')}</div>
                <h3>{getTranslation('Save the Assignment')}</h3>
              </div>
              <p>{getTranslation('Click the "Save" button to confirm the technician assignment and create the record in the system.')}</p>
            </div>
          </div>
          
          <div className="help-notes">
            <h3>{getTranslation('Important Notes')}</h3>
            <ul>
              <li>{getTranslation('All fields marked with * are required and must be filled before saving.')}</li>
              <li>{getTranslation('The job time should be realistic based on the scope of work.')}</li>
              <li>{getTranslation('Once a technician is assigned, the job status will be updated automatically.')}</li>
              <li>{getTranslation('You can clear the form at any time by clicking the "Clear" button.')}</li>
              <li>{getTranslation('To cancel the operation, click the "Close" button to return to the list view.')}</li>
            </ul>
          </div>
          
          <div className="help-troubleshooting">
            <h3>{getTranslation('Troubleshooting')}</h3>
            <div className="troubleshooting-grid">
              <div className="troubleshooting-item">
                <h4>{getTranslation('Job Card Not Found')}</h4>
                <p>{getTranslation('If you cannot find a specific job card in the dropdown, it may be because it has already been assigned or does not require a technician assignment.')}</p>
              </div>
              
              <div className="troubleshooting-item">
                <h4>{getTranslation('Cannot Select Technician')}</h4>
                <p>{getTranslation('If you are unable to select a technician, check if they are currently assigned to other tasks or if their availability status is set correctly in the system.')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCTechnicianHelp; 