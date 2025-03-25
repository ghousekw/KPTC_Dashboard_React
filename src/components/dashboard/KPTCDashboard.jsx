import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './KPTCDashboard.css';
import StatusBarChart from '../charts/StatusBarChart.jsx';
import JobTypesPieChart from '../charts/JobTypesPieChart.jsx';
import JobOrderTrendsChart from '../charts/JobOrderTrendsChart.jsx';
import RepairJobStatusChart from '../charts/RepairJobStatusChart.jsx';
import WorkflowStatusChart from '../charts/WorkflowStatusChart.jsx';
import InvoiceValuesChart from '../charts/InvoiceValuesChart.jsx';
import TechnicianJobsChart from '../charts/TechnicianJobsChart.jsx';
import JobCardFlow from '../charts/JobCardFlow.jsx';
import DetailedStats from '../charts/DetailedStats.jsx';
import PerformanceIndicators from '../charts/PerformanceIndicators.jsx';
import QuickActions from '../charts/QuickActions.jsx';
import ExecutiveSummaryChart from '../charts/ExecutiveSummaryChart.jsx';
import ContractingPartyOverview from '../charts/ContractingPartyOverview.jsx';
import JobCardCostProjection from '../charts/JobCardCostProjection.jsx';

const KPTCDashboard = () => {
  const { getTranslation, currentLang, toggleLanguage } = useLanguage();
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Set dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Function to handle job card selection
  const handleJobCardClick = (jobCardId) => {
    setSelectedJobCard(jobCardId);
    // Scroll to the cost projection section
    setTimeout(() => {
      document.getElementById('cost-projection-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Close sidebar when clicking outside or on Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarActive && e.target.classList.contains('sidebar-overlay')) {
        setSidebarActive(false);
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setSidebarActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [sidebarActive]);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    if (currentLang === 'ar') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [currentLang]);

  return (
    <div className={`container ${currentLang === 'ar' ? 'rtl-layout' : ''}`}>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      
      {/* Sidebar Overlay */}
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="brand">
          <div className="logo-container">
            <img 
              src="/assets/images/kptc-logo.png" 
              alt="KPTC Logo" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="svg-fallback" style={{ display: 'none' }}>
              <div className="fallback-logo">
                <span>KPTC</span>
              </div>
            </div>
          </div>
          <div className="logo-text">Kuwait Public Transport Company</div>
        </div>
        
        <div className="menu-item active">
          <i className="bi bi-graph-up"></i>
          <span>{getTranslation('Dashboard & Reports')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-file-text"></i>
          <span>{getTranslation('MOI Reception')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-person"></i>
          <span>{getTranslation('KPTC Reception')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-wrench"></i>
          <span>{getTranslation('Garage')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-cart"></i>
          <span>{getTranslation('Procurement')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-card-list"></i>
          <span>{getTranslation('Accounts')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-archive"></i>
          <span>{getTranslation('Stores')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-sliders"></i>
          <span>{getTranslation('Master')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-question-circle"></i>
          <span>{getTranslation('Help File')}</span>
        </div>
        
        <div className="menu-item">
          <i className="bi bi-box-arrow-right"></i>
          <span>{getTranslation('Logout')}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content" style={{ maxWidth: "1800px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h1><i className="bi bi-graph-up"></i> {getTranslation('Dashboard & Reports')}</h1>
          </div>
          <div className="header-right">
            <div className="notifications">
              <i className="bi bi-bell"></i>
              <span className="badge">5</span>
            </div>
            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
              <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
            </div>
            <div className="language-selector" onClick={toggleLanguage}>
              <i className="bi bi-translate"></i>
              <span>{getTranslation('Arabic')}</span>
            </div>
            <div className="user-profile">
              <div className="placeholder-img profile">
                <span>A</span>
              </div>
              <span>{getTranslation('Admin')}</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        
        {/* Job Card Flow - Moved to top */}
        <JobCardFlow />
        
        <ExecutiveSummaryChart />

        <ContractingPartyOverview />

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card primary">
            <div className="stat-card-header">
              <div className="stat-card-title">
                {getTranslation('Job Order Total')}
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-list-ul"></i>
              </div>
            </div>
            <div className="stat-card-value">16</div>
            <div className="stat-card-total">
              <i className="bi bi-arrow-up-right"></i> {getTranslation('All active job orders')}
            </div>
          </div>
          
          <div className="stat-card success">
            <div className="stat-card-header">
              <div className="stat-card-title">
                {getTranslation('Job Order Completed')}
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-check"></i>
              </div>
            </div>
            <div className="stat-card-value">0</div>
            <div className="stat-card-total">
              <i className="bi bi-calendar-check"></i> {getTranslation('Finished job orders')}
            </div>
          </div>
          
          <div className="stat-card warning">
            <div className="stat-card-header">
              <div className="stat-card-title">
                {getTranslation('Job Order In Progress')}
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-gear-fill"></i>
              </div>
            </div>
            <div className="stat-card-value">16</div>
            <div className="stat-card-total">
              <i className="bi bi-wrench"></i> {getTranslation('Currently processing')}
            </div>
          </div>
          
          <div className="stat-card danger">
            <div className="stat-card-header">
              <div className="stat-card-title">
                {getTranslation('Job Order On Hold')}
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-hand-index-thumb"></i>
              </div>
            </div>
            <div className="stat-card-value">0</div>
            <div className="stat-card-total">
              <i className="bi bi-clock"></i> {getTranslation('Temporarily stopped')}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h3 className="filter-title"><i className="bi bi-funnel"></i> {getTranslation('Filter Options')}</h3>
          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-calendar"></i> {getTranslation('From Date')}</label>
              <input type="date" className="filter-input" />
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-calendar"></i> {getTranslation('To Date')}</label>
              <input type="date" className="filter-input" />
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-hash"></i> {getTranslation('Job Order No.')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-credit-card"></i> {getTranslation('Plate No.')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-car-front"></i> {getTranslation('Vehicle Make')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
                <option value="Toyota">{getTranslation('Toyota')}</option>
                <option value="Chevrolet">{getTranslation('Chevrolet')}</option>
                <option value="Nissan">{getTranslation('Nissan')}</option>
                <option value="Kia">{getTranslation('KIA')}</option>
                <option value="Mitsubishi">{getTranslation('Mitsubishi')}</option>
                <option value="GMC">{getTranslation('GMC')}</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-building"></i> {getTranslation('Garage')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-file-earmark"></i> {getTranslation('MOI Job Order No.')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label"><i className="bi bi-list-check"></i> {getTranslation('Current JO Status')}</label>
              <select className="filter-select">
                <option value="">{getTranslation('All')}</option>
                <option value="Estimation Approved">{getTranslation('Estimation Approved')}</option>
                <option value="Warranty Initiated">{getTranslation('Warranty Initiated')}</option>
                <option value="JO Submitted">{getTranslation('JO Submitted')}</option>
              </select>
            </div>
            
            <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <div className="filter-button-group">
                <button className="filter-button"><i className="bi bi-search"></i> {getTranslation('Proceed')}</button>
                <button className="filter-button secondary"><i className="bi bi-arrow-clockwise"></i> {getTranslation('Reset')}</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Orders Table */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title"><i className="bi bi-list"></i> {getTranslation('Job Orders in March 2025')}</h3>
            <div className="click-helper">
              <i className="bi bi-info-circle"></i> {getTranslation('Click on a job order to view cost projection')}
            </div>
            <div className="table-actions">
              <button className="table-button" title={getTranslation('Export to Excel')}><i className="bi bi-file-excel"></i></button>
              <button className="table-button" title={getTranslation('Export to PDF')}><i className="bi bi-file-pdf"></i></button>
              <button className="table-button" title={getTranslation('Print')}><i className="bi bi-printer"></i></button>
              <button className="table-button" title={getTranslation('Refresh')}><i className="bi bi-arrow-clockwise"></i></button>
            </div>
          </div>
          {/* Mobile scroll indicator */}
          <div className="mobile-scroll-hint">
            <i className="bi bi-arrows-expand"></i> {getTranslation('Scroll to see more')}
          </div>
          <table>
            <thead>
              <tr>
                <th><i className="bi bi-sort-numeric-down"></i> {getTranslation('S.No.')}</th>
                <th><i className="bi bi-hash"></i> {getTranslation('JO No.')}</th>
                <th><i className="bi bi-calendar-date"></i> {getTranslation('JO Date')}</th>
                <th><i className="bi bi-person-gear"></i> {getTranslation('Technician')}</th>
                <th><i className="bi bi-credit-card"></i> {getTranslation('Plate No.')}</th>
                <th><i className="bi bi-car-front"></i> {getTranslation('Vehicle Make')}</th>
                <th><i className="bi bi-building"></i> {getTranslation('Garage')}</th>
                <th><i className="bi bi-info-circle"></i> {getTranslation('JO Status')}</th>
                <th><i className="bi bi-gear"></i> {getTranslation('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable" onClick={() => handleJobCardClick('KOJMIGIM/002053000005')}>
                <td>1</td>
                <td>KOJMIGIM/002053000005</td>
                <td>23/03/2025</td>
                <td>11433</td>
                <td>{getTranslation('GMC')}</td>
                <td>{getTranslation('MOI SULABIYA MAIN')}</td>
                <td><span className="status-badge status-warranty"><i className="bi bi-shield"></i> {getTranslation('Warranty Initiated')}</span></td>
                <td>
                  <div className="action-buttons">
                    <div className="action-button" title={getTranslation('View Details')}><i className="bi bi-eye"></i></div>
                    <div className="action-button" title={getTranslation('Edit Record')}><i className="bi bi-pencil-square"></i></div>
                    <div className="action-button" title={getTranslation('Print Report')}><i className="bi bi-printer"></i></div>
                    <div className="action-button" title={getTranslation('Download PDF')}><i className="bi bi-file-pdf"></i></div>
                    <div className="action-button" title={getTranslation('Share')}><i className="bi bi-share"></i></div>
                    <div className="action-button" title={getTranslation('Delete')}><i className="bi bi-trash"></i></div>
                  </div>
                </td>
              </tr>
              <tr className="clickable" onClick={() => handleJobCardClick('KOJMIGIM/002053000002')}>
                <td>4</td>
                <td>KOJMIGIM/002053000002</td>
                <td>20/03/2025</td>
                <td>1216098</td>
                <td>{getTranslation('TOYOTA')}</td>
                <td>{getTranslation('MOI SULABIYA MAIN')}</td>
                <td><span className="status-badge status-submitted"><i className="bi bi-send"></i> {getTranslation('JO Submitted')}</span></td>
                <td>
                  <div className="action-buttons">
                    <div className="action-button" title={getTranslation('View Details')}><i className="bi bi-eye"></i></div>
                    <div className="action-button" title={getTranslation('Edit Record')}><i className="bi bi-pencil-square"></i></div>
                    <div className="action-button" title={getTranslation('Print Report')}><i className="bi bi-printer"></i></div>
                    <div className="action-button" title={getTranslation('Download PDF')}><i className="bi bi-file-pdf"></i></div>
                    <div className="action-button" title={getTranslation('Share')}><i className="bi bi-share"></i></div>
                    <div className="action-button" title={getTranslation('Delete')}><i className="bi bi-trash"></i></div>
                  </div>
                </td>
              </tr>
              <tr className="clickable" onClick={() => handleJobCardClick('KOJMIGIM/002053000000')}>
                <td>5</td>
                <td>KOJMIGIM/002053000000</td>
                <td>19/03/2025</td>
                <td>071039</td>
                <td>{getTranslation('KIA')}</td>
                <td>{getTranslation('MOI AHMADI')}</td>
                <td><span className="status-badge status-estimation"><i className="bi bi-calculator"></i> {getTranslation('Estimation Approved')}</span></td>
                <td>
                  <div className="action-buttons">
                    <div className="action-button" title={getTranslation('View Details')}><i className="bi bi-eye"></i></div>
                    <div className="action-button" title={getTranslation('Edit Record')}><i className="bi bi-pencil-square"></i></div>
                    <div className="action-button" title={getTranslation('Print Report')}><i className="bi bi-printer"></i></div>
                    <div className="action-button" title={getTranslation('Download PDF')}><i className="bi bi-file-pdf"></i></div>
                    <div className="action-button" title={getTranslation('Share')}><i className="bi bi-share"></i></div>
                    <div className="action-button" title={getTranslation('Delete')}><i className="bi bi-trash"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
            <div>{getTranslation('Showing 1 to 5 of 16 entries')}</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button className="table-button" title={getTranslation('Previous')}><i className="bi bi-chevron-left"></i></button>
              <button className="table-button" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>1</button>
              <button className="table-button">2</button>
              <button className="table-button">3</button>
              <button className="table-button">4</button>
              <button className="table-button" title={getTranslation('Next')}><i className="bi bi-chevron-right"></i></button>
            </div>
          </div>
        </div>

        {/* Show cost projection only when a job card is selected */}
        {selectedJobCard && (
          <div id="cost-projection-section">
            <JobCardCostProjection 
              jobCardId={selectedJobCard} 
              onClose={() => setSelectedJobCard(null)}
            />
          </div>
        )}

        <div className="charts-grid">
          <RepairJobStatusChart />
          <WorkflowStatusChart />
        </div>

        <InvoiceValuesChart />

        <TechnicianJobsChart />

        <PerformanceIndicators />

        <DetailedStats />

        <QuickActions />

        <JobOrderTrendsChart />

        {/* Footer */}
        <div className="footer">
          <div>© 2025 KPTC Dashboard System. All rights reserved.</div>
          <div className="footer-links">
            <a href="#" className="footer-link"><i className="bi bi-book"></i> {getTranslation('Documentation')}</a>
            <a href="#" className="footer-link"><i className="bi bi-headset"></i> {getTranslation('Support')}</a>
            <a href="#" className="footer-link"><i className="bi bi-shield-check"></i> {getTranslation('Privacy Policy')}</a>
            <a href="#" className="footer-link"><i className="bi bi-gear"></i> {getTranslation('Settings')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTCDashboard; 