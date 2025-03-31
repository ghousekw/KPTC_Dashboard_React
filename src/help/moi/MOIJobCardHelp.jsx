import React from 'react';
import { MediaViewer } from '../index';
import { useMoiHelpTranslations } from '../context/HelpLanguageContext';
import { getVideoUrl } from '../config/videoUrls';
import './MOIJobCardHelp.css';

// Import MOI Job Card assets
const jobCardListScreenshot = {
  en: '/assets/help/moi/en/job_card_list.png',
  ar: '/assets/help/moi/ar/job_card_list.png'
};
const createJobCardScreenshot = {
  en: '/assets/help/moi/en/create_job_card.png',
  ar: '/assets/help/moi/ar/create_job_card.png'
};

const MOIJobCardHelp = () => {
  // Get component-specific translations and language
  const { language, getTranslation, isRTL } = useMoiHelpTranslations();
  
  // Get the appropriate video URL based on environment and language
  const createJobCardVideo = getVideoUrl('moi', 'createJobCard', language);
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="help-title">{getTranslation('MOI Job Card Help')}</h1>
      
      {/* Job Card List Section */}
      <div className="help-section">
        <h2>{getTranslation('Job Card List')}</h2>
        <p>{getTranslation('The Job Card List shows all MOI vehicle maintenance requests. Here\'s how to use it effectively:')}</p>
        
        <MediaViewer 
          src={isRTL ? jobCardListScreenshot.ar : jobCardListScreenshot.en}
          type="image"
          caption={getTranslation('The MOI Job Card list interface')}
          alt={getTranslation('Screenshot of the MOI Job Card list showing filters and table')}
        />
        
        <div className="feature-grid">
          <div className="feature-item">
            <h3>{getTranslation('Search and Filter')}</h3>
            <ul>
              <li>{getTranslation('Use the date range to filter job cards')}</li>
              <li>{getTranslation('Filter by Job Card No., Plate No., or Vehicle Make')}</li>
              <li>{getTranslation('Select specific Garage location')}</li>
              <li>{getTranslation('Filter by Service Type and Customer Waiting status')}</li>
            </ul>
          </div>
          
          <div className="feature-item">
            <h3>{getTranslation('Job Card Details')}</h3>
            <ul>
              <li>{getTranslation('View S.No, JC No., and JC Date')}</li>
              <li>{getTranslation('Check Plate No. and Vehicle Make')}</li>
              <li>{getTranslation('Monitor Garage assignment and JC Status')}</li>
              <li>{getTranslation('Track Service Type and Customer Waiting status')}</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Creating New Job Card Section */}
      <div className="help-section">
        <h2>{getTranslation('Creating New Job Card')}</h2>
        <div className="help-content">
          <p>{getTranslation('Follow these steps to create a new job card:')}</p>
          
          <MediaViewer 
            src={createJobCardVideo}
            type="video"
            caption={getTranslation('How to create a new job card')}
          />
          
          <div className="service-types-container">
            <div className="service-type-item">
              <h3>{getTranslation('Main Service')}</h3>
              <div className="service-type-description">
                <p>{getTranslation('Used for normal repairs and maintenance work that may require extended service time.')}</p>
                <ul>
                  <li>{getTranslation('Regular vehicle maintenance')}</li>
                  <li>{getTranslation('Complex repairs')}</li>
                  <li>{getTranslation('Multiple service items')}</li>
                  <li>{getTranslation('Standard processing time')}</li>
                </ul>
              </div>
            </div>
            
            <div className="service-type-item highlight">
              <h3>{getTranslation('Quick Service')}</h3>
              <div className="service-type-description">
                <p>{getTranslation('Designed for rapid service when the customer is waiting in reception. Ideal for repairs that can be completed within 1 hour.')}</p>
                <ul>
                  <li>{getTranslation('Oil changes')}</li>
                  <li>{getTranslation('Minor repairs')}</li>
                  <li>{getTranslation('Quick maintenance tasks')}</li>
                  <li>{getTranslation('1-hour service target')}</li>
                </ul>
                <div className="quick-service-note">
                  <span className="note-icon">⚡</span>
                  <p>{getTranslation('Quick Service automatically sets the Customer Waiting status for priority handling')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <MediaViewer 
            src={isRTL ? createJobCardScreenshot.ar : createJobCardScreenshot.en}
            type="image"
            caption={getTranslation('The MOI Job Card creation interface')}
            alt={getTranslation('Screenshot of the MOI Job Card creation form showing all required fields')}
            className="create-job-card-screenshot"
          />
          
          <div className="steps-container">
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 1')}</div>
                <h3>{getTranslation('Click New')}</h3>
              </div>
              <p>{getTranslation('Click the blue "New" button at the top of the Job Card page')}</p>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 2')}</div>
                <h3>{getTranslation('Enter Basic Information')}</h3>
              </div>
              <ul>
                <li>{getTranslation('Select date range (From Date - To Date)')}</li>
                <li>{getTranslation('Job Card No. will be auto-generated')}</li>
                <li>{getTranslation('Select Plate No. from the dropdown')}</li>
                <li>{getTranslation('Vehicle Make will auto-populate based on Plate No.')}</li>
              </ul>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 3')}</div>
                <h3>{getTranslation('Assign Details')}</h3>
              </div>
              <ul>
                <li>{getTranslation('Select Garage location')}</li>
                <li>{getTranslation('Choose Service Type (Main Service or Quick Service)')}</li>
                <li>{getTranslation('For Quick Service: Customer Waiting will be automatically set')}</li>
                <li>{getTranslation('For Main Service: Indicate if Customer is Waiting')}</li>
                <li>{getTranslation('Select User if applicable')}</li>
              </ul>
            </div>
            
            <div className="help-step">
              <div className="step-header">
                <div className="step-badge">{getTranslation('Step 4')}</div>
                <h3>{getTranslation('Submit')}</h3>
              </div>
              <p>{getTranslation('Click the "Proceed" button to create the job card')}</p>
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
            <p>{getTranslation('Plate No., Garage, and Service Type are mandatory fields')}</p>
          </div>
          
          <div className="note-item">
            <h3>{getTranslation('Customer Waiting')}</h3>
            <p>{getTranslation('Mark "Customer Waiting" for priority handling')}</p>
          </div>
          
          <div className="note-item">
            <h3>{getTranslation('Status Updates')}</h3>
            <p>{getTranslation('Job Card status will update automatically as it moves through the workflow')}</p>
          </div>
        </div>
      </div>
      
      {/* Troubleshooting Section */}
      <div className="help-section">
        <h2>{getTranslation('Troubleshooting')}</h2>
        
        <div className="troubleshooting-container">
          <div className="trouble-item">
            <h3>{getTranslation('Cannot Find Plate Number')}</h3>
            <p>{getTranslation('Ensure the vehicle is registered in the system. Contact the admin if the vehicle needs to be added.')}</p>
          </div>
          
          <div className="trouble-item">
            <h3>{getTranslation('Job Card Not Created')}</h3>
            <p>{getTranslation('Check that all required fields are filled and try again. If the issue persists, contact IT support.')}</p>
          </div>
          
          <div className="trouble-item">
            <h3>{getTranslation('Need to Cancel Job Card')}</h3>
            <p>{getTranslation('Only administrators can cancel job cards. Contact your supervisor for assistance.')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MOIJobCardHelp; 