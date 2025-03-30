import React from 'react';
import { MediaViewer } from '../index';
import { useDashboardHelpTranslations } from '../context/HelpLanguageContext';
import './DashboardHelp.css';

// Import dashboard assets
const dashboardScreenshot = '/assets/help/dashboard_overview.png';
const filteringVideo = '/assets/help/filtering_demo.mp4';
const chartInteractionImage = '/assets/help/chart_interaction.png';

const DashboardHelp = () => {
  // Get language context from help system
  const { getTranslation, isRTL } = useDashboardHelpTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="help-title">{getTranslation('Dashboard Help')}</h1>
      
      <div className="help-section">
        <div className="help-intro">
          <h2>{getTranslation('Dashboard Overview')}</h2>
          <p>
            {getTranslation('Welcome to the KPTC Dashboard. This central hub displays key performance indicators, job orders, and analytics to help you monitor and manage operations efficiently.')}
          </p>
          
          <MediaViewer 
            src={dashboardScreenshot}
            type="image"
            caption={getTranslation('The KPTC Dashboard overview screen')}
            alt={getTranslation('Screenshot of the KPTC dashboard showing statistics, job orders, and charts')}
          />
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Dashboard Navigation Map')}</h2>
        <div className="dashboard-map">
          <div className="map-area top-area">
            <div className="map-label">{getTranslation('Header Bar')}</div>
            <div className="map-description">{getTranslation('Contains logo, notifications, language selector, and user menu')}</div>
          </div>
          <div className="map-container">
            <div className="map-area side-area">
              <div className="map-label">{getTranslation('Sidebar Menu')}</div>
              <div className="map-description">{getTranslation('Navigation menu for accessing different sections')}</div>
            </div>
            <div className="map-area main-area">
              <div className="map-section">
                <div className="map-label">{getTranslation('Statistics Cards')}</div>
                <div className="map-description">{getTranslation('Key metrics overview')}</div>
              </div>
              <div className="map-section">
                <div className="map-label">{getTranslation('Filter Options')}</div>
                <div className="map-description">{getTranslation('Date range and status filters')}</div>
              </div>
              <div className="map-section">
                <div className="map-label">{getTranslation('Job Orders Table')}</div>
                <div className="map-description">{getTranslation('List of jobs with details and action buttons')}</div>
              </div>
              <div className="map-section">
                <div className="map-label">{getTranslation('Charts')}</div>
                <div className="map-description">{getTranslation('Visual representations of job data and performance metrics')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Using Dashboard Components')}</h2>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Component')}</div>
            <h3>{getTranslation('Statistics Cards')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('The statistics cards provide a quick overview of key metrics such as total job orders, completed jobs, pending assignments, and more.')}</p>
            <div className="step-instruction">
              <h4>{getTranslation('How to use:')}</h4>
              <ol className="instruction-list">
                <li>{getTranslation('View all cards to get a complete overview of your operation status')}</li>
                <li>{getTranslation('Click on a card to see more detailed information')}</li>
                <li>{getTranslation('Use cards to quickly filter job orders by clicking on specific statuses')}</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Component')}</div>
            <h3>{getTranslation('Filter Options')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('Filter controls allow you to refine the dashboard data based on date ranges, job status, technician, and other criteria.')}</p>
            
            <MediaViewer 
              src={filteringVideo}
              type="video"
              caption={getTranslation('How to use dashboard filters')}
            />
            
            <div className="step-instruction">
              <h4>{getTranslation('How to use:')}</h4>
              <ol className="instruction-list">
                <li>
                  <strong>{getTranslation('Set Date Range:')}</strong>
                  <ul>
                    <li>{getTranslation('Click on the date selector')}</li>
                    <li>{getTranslation('Choose from preset options (Today, This Week, This Month, etc.)')}</li>
                    <li>{getTranslation('Or select custom date range by choosing start and end dates')}</li>
                    <li>{getTranslation('Click "Apply" to update the dashboard')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Apply Specific Filters:')}</strong>
                  <ul>
                    <li>{getTranslation('Use dropdown selectors for Status, Technician, Priority, etc.')}</li>
                    <li>{getTranslation('Select multiple options by clicking on checkboxes')}</li>
                    <li>{getTranslation('Click "Apply Filters" to update the dashboard view')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Clear Filters:')}</strong>
                  <ul>
                    <li>{getTranslation('Click "Clear All" to reset all filters')}</li>
                    <li>{getTranslation('Or click individual clear buttons next to specific filter selections')}</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Component')}</div>
            <h3>{getTranslation('Job Orders Table')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('The Job Orders table displays all jobs matching your current filter criteria, with detailed information and action options for each job.')}</p>
            
            <div className="step-instruction">
              <h4>{getTranslation('How to use:')}</h4>
              <ol className="instruction-list">
                <li>
                  <strong>{getTranslation('View Job Orders:')}</strong>
                  <ul>
                    <li>{getTranslation('Each row represents a job order with ID, customer, status, priority, etc.')}</li>
                    <li>{getTranslation('Color coding helps identify different statuses (green for completed, etc.)')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Sort Data:')}</strong>
                  <ul>
                    <li>{getTranslation('Click any column header to sort by that column')}</li>
                    <li>{getTranslation('Click again to toggle between ascending and descending order')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Perform Actions:')}</strong>
                  <ul>
                    <li>{getTranslation('Click the "View" button (eye icon) to see full job details')}</li>
                    <li>{getTranslation('Click the "Edit" button (pencil icon) to modify job information')}</li>
                    <li>{getTranslation('Use the "Print" button to generate a printable job report')}</li>
                    <li>{getTranslation('Click "Download" to save the job details as a PDF')}</li>
                    <li>{getTranslation('Use "Share" to send job information via email')}</li>
                    <li>{getTranslation('Click "Delete" to remove a job (requires confirmation)')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Navigate Pages:')}</strong>
                  <ul>
                    <li>{getTranslation('Use pagination controls at the bottom to move between pages')}</li>
                    <li>{getTranslation('Select how many job orders to display per page (10, 25, 50, 100)')}</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Component')}</div>
            <h3>{getTranslation('Charts and Analytics')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('The dashboard includes various charts and graphs to visually represent your operational data and performance metrics.')}</p>
            
            <MediaViewer 
              src={chartInteractionImage}
              type="image"
              caption={getTranslation('Interactive chart showing job completion trends')}
            />
            
            <div className="step-instruction">
              <h4>{getTranslation('How to use:')}</h4>
              <ol className="instruction-list">
                <li>
                  <strong>{getTranslation('Explore Charts:')}</strong>
                  <ul>
                    <li>{getTranslation('Hover over chart elements to see detailed data points')}</li>
                    <li>{getTranslation('Use chart legends to understand color-coding')}</li>
                    <li>{getTranslation('Switch between different chart types using the view options (if available)')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('View Detailed Information:')}</strong>
                  <ul>
                    <li>{getTranslation('Click on specific chart segments to drill down into more detailed data')}</li>
                    <li>{getTranslation('Use time period selectors to change the data range shown in charts')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Analyze Trends:')}</strong>
                  <ul>
                    <li>{getTranslation('Look for patterns in job completion rates over time')}</li>
                    <li>{getTranslation('Identify peak workload periods')}</li>
                    <li>{getTranslation('Compare performance across different timeframes')}</li>
                  </ul>
                </li>
                <li>
                  <strong>{getTranslation('Monitor Technician Workload:')}</strong>
                  <ul>
                    <li>{getTranslation('Review technician allocation charts to see workload distribution')}</li>
                    <li>{getTranslation('Identify potential resource bottlenecks')}</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Quick Actions Guide')}</h2>
        
        <div className="quick-actions">
          <div className="action-item">
            <div className="action-icon">➕</div>
            <div className="action-content">
              <h4>{getTranslation('Create New Job Order')}</h4>
              <ol className="action-steps">
                <li>{getTranslation('Click the "+ New Job Order" button in the top right corner')}</li>
                <li>{getTranslation('Fill in the required information in the form')}</li>
                <li>{getTranslation('Assign to a technician if needed')}</li>
                <li>{getTranslation('Set priority and due date')}</li>
                <li>{getTranslation('Click "Submit" to create the job')}</li>
              </ol>
            </div>
          </div>
          
          <div className="action-item">
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h4>{getTranslation('Export Dashboard Data')}</h4>
              <ol className="action-steps">
                <li>{getTranslation('Click the "Export" button in the dashboard toolbar')}</li>
                <li>{getTranslation('Select your preferred format (Excel, PDF, CSV)')}</li>
                <li>{getTranslation('Choose what data to include in the export')}</li>
                <li>{getTranslation('Click "Download" to get your file')}</li>
              </ol>
            </div>
          </div>
          
          <div className="action-item">
            <div className="action-icon">🔄</div>
            <div className="action-content">
              <h4>{getTranslation('Refresh Dashboard Data')}</h4>
              <ol className="action-steps">
                <li>{getTranslation('Click the refresh button in the top right corner of the dashboard')}</li>
                <li>{getTranslation('Or press F5 to reload the entire page')}</li>
                <li>{getTranslation('Wait for the data to update with the latest information')}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Tips for Efficient Dashboard Use')}</h2>
        
        <div className="efficiency-tips">
          <div className="tip-item">
            <div className="tip-icon">⌨️</div>
            <div className="tip-content">
              <h4>{getTranslation('Keyboard Shortcuts')}</h4>
              <p>{getTranslation('Use these keyboard shortcuts to speed up your workflow:')}</p>
              <ul>
                <li><strong>F5</strong> - {getTranslation('Refresh dashboard')}</li>
                <li><strong>Ctrl+F</strong> - {getTranslation('Search within the page')}</li>
                <li><strong>Alt+N</strong> - {getTranslation('Create new job order')}</li>
                <li><strong>Alt+F</strong> - {getTranslation('Open filters panel')}</li>
              </ul>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">📱</div>
            <div className="tip-content">
              <h4>{getTranslation('Mobile Usage')}</h4>
              <p>{getTranslation('When using the dashboard on mobile devices:')}</p>
              <ul>
                <li>{getTranslation('Swipe horizontally on tables to see all columns')}</li>
                <li>{getTranslation('Use pinch-to-zoom for detailed chart viewing')}</li>
                <li>{getTranslation('Tap column headers to sort')}</li>
                <li>{getTranslation('Use the mobile menu (hamburger icon) to access sidebar options')}</li>
              </ul>
            </div>
          </div>
          
          <div className="tip-item">
            <div className="tip-icon">⚡</div>
            <div className="tip-content">
              <h4>{getTranslation('Performance Optimization')}</h4>
              <p>{getTranslation('For best dashboard performance:')}</p>
              <ul>
                <li>{getTranslation('Limit date ranges to relevant periods')}</li>
                <li>{getTranslation('Use specific filters to reduce data load')}</li>
                <li>{getTranslation('Close unused browser tabs')}</li>
                <li>{getTranslation('Clear browser cache weekly')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Troubleshooting')}</h2>
        
        <div className="common-problems">
          <div className="problem-item">
            <h4>{getTranslation('Dashboard Not Loading')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('Dashboard shows loading spinner indefinitely or displays error message.')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Check your internet connection')}</li>
                <li>{getTranslation('Refresh the page')}</li>
                <li>{getTranslation('Clear browser cache and cookies')}</li>
                <li>{getTranslation('Try using a different browser')}</li>
                <li>{getTranslation('Contact IT support if the issue persists')}</li>
              </ol>
            </div>
          </div>
          
          <div className="problem-item">
            <h4>{getTranslation('Filters Not Working')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('Applied filters do not change the displayed data.')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Ensure you clicked "Apply" after setting filters')}</li>
                <li>{getTranslation('Try clearing all filters and then applying them again')}</li>
                <li>{getTranslation('Check if multiple conflicting filters are applied')}</li>
                <li>{getTranslation('Refresh the page and try again')}</li>
              </ol>
            </div>
          </div>
          
          <div className="problem-item">
            <h4>{getTranslation('Export Errors')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('Unable to export dashboard data or exported file is corrupted.')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Reduce the amount of data by applying more specific filters')}</li>
                <li>{getTranslation('Try a different export format (e.g., CSV instead of Excel)')}</li>
                <li>{getTranslation('Check if your browser is blocking downloads')}</li>
                <li>{getTranslation('Ensure you have sufficient disk space')}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Need Further Assistance?')}</h2>
        <p>
          {getTranslation('If you need additional help with the dashboard, please contact the IT support team:')}
        </p>
        <div className="help-contact">
          <p><strong>{getTranslation('Email:')}</strong> support.kptc@telox-gcc.com</p>
          <p><strong>{getTranslation('Phone:')}</strong> +965 92245954</p>
          <p><strong>{getTranslation('Working Hours:')}</strong> {getTranslation('Sunday-Thursday, 8:00 AM - 4:00 PM')}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHelp; 