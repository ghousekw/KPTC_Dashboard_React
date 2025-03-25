import { useState, useEffect, useMemo } from 'react';
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
import ExecutiveChart from '../charts/ExecutiveChart.jsx';

// Sample data generator for garages
const getGarageData = (garage) => {
  // In a real application, this would fetch data from an API based on the selected garage
  const baseData = {
    all: {
      jobOrders: 1285,
      completedJobs: 972,
      pendingJobs: 213,
      totalVehicles: 524,
      monthlyIncome: 152500,
      weeklyIncome: 42300,
      monthlyExpense: 37800
    },
    sulaibiya: {
      jobOrders: 385,
      completedJobs: 310,
      pendingJobs: 75,
      totalVehicles: 180,
      monthlyIncome: 58200,
      weeklyIncome: 14700,
      monthlyExpense: 12400
    },
    subhan: {
      jobOrders: 290,
      completedJobs: 210,
      pendingJobs: 80,
      totalVehicles: 110,
      monthlyIncome: 32800,
      weeklyIncome: 8400,
      monthlyExpense: 8600
    },
    ahmadi: {
      jobOrders: 210,
      completedJobs: 150,
      pendingJobs: 60,
      totalVehicles: 95,
      monthlyIncome: 28500,
      weeklyIncome: 7200,
      monthlyExpense: 6800
    },
    fintas: {
      jobOrders: 240,
      completedJobs: 182,
      pendingJobs: 58,
      totalVehicles: 94,
      monthlyIncome: 22000,
      weeklyIncome: 6500,
      monthlyExpense: 5400
    },
    mutla: {
      jobOrders: 160,
      completedJobs: 120,
      pendingJobs: 40,
      totalVehicles: 45,
      monthlyIncome: 11000,
      weeklyIncome: 5500,
      monthlyExpense: 4600
    }
  };
  
  return baseData[garage] || baseData.all;
};

const KPTCDashboard = () => {
  const { getTranslation, currentLang, toggleLanguage, language } = useLanguage();
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState("all");

  // List of garages
  const garages = [
    { value: "all", label: getTranslation("All Garages") },
    { value: "sulaibiya", label: "MOI-Sulaibiya" },
    { value: "subhan", label: "MOI-Subhan" },
    { value: "ahmadi", label: "MOI-Ahmadi" },
    { value: "fintas", label: "MOI-Fintas" },
    { value: "mutla", label: "MOI-Mutla" }
  ];
  
  // Handle garage change
  const handleGarageChange = (e) => {
    setSelectedGarage(e.target.value);
  };

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

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('rtl-layout', language === 'ar');
  }, [darkMode, language]);

  // Get data for the selected garage
  const garageData = useMemo(() => {
    // Handle the case where selectedGarage is undefined
    const garageKey = selectedGarage || 'all';
    return getGarageData(garageKey);
  }, [selectedGarage]);
  
  // Calculate completion percentage
  const completionPercentage = Math.round((garageData.completedJobs / garageData.jobOrders) * 100);

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
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h1><i className="bi bi-graph-up"></i> {getTranslation('Dashboard & Reports')}</h1>
          </div>
          <div className="garage-selector">
            <select 
              value={selectedGarage} 
              onChange={handleGarageChange}
              className="garage-select"
            >
              {garages.map((garage) => (
                <option key={garage.value} value={garage.value}>
                  {garage.label}
                </option>
              ))}
            </select>
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
              <div>
                <div className="stat-card-title">{getTranslation('Total Job Orders')} {selectedGarage && selectedGarage !== "all" && `- ${garages.find(g => g.value === selectedGarage)?.label}`}</div>
                <div className="stat-card-value">{garageData.jobOrders}</div>
                <div className="stat-card-total"><i className="bi bi-arrow-up"></i> {getTranslation('12% Increase')}</div>
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-file-earmark-text"></i>
              </div>
            </div>
          </div>
          
          <div className="stat-card success">
            <div className="stat-card-header">
              <div>
                <div className="stat-card-title">{getTranslation('Completed Jobs')}</div>
                <div className="stat-card-value">{garageData.completedJobs}</div>
                <div className="stat-card-total"><i className="bi bi-check-circle"></i> {completionPercentage}% {getTranslation('Completion Rate')}</div>
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-check-square"></i>
              </div>
            </div>
          </div>
          
          <div className="stat-card warning">
            <div className="stat-card-header">
              <div>
                <div className="stat-card-title">{getTranslation('Pending Jobs')}</div>
                <div className="stat-card-value">{garageData.pendingJobs}</div>
                <div className="stat-card-total"><i className="bi bi-clipboard-check"></i> {getTranslation('Awaiting Completion')}</div>
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
          </div>
          
          <div className="stat-card danger">
            <div className="stat-card-header">
              <div>
                <div className="stat-card-title">{getTranslation('Total Vehicles')}</div>
                <div className="stat-card-value">{garageData.totalVehicles}</div>
                <div className="stat-card-total"><i className="bi bi-truck"></i> {getTranslation('In Service')}</div>
              </div>
              <div className="stat-card-icon">
                <i className="bi bi-car-front"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Second row stats - Financial Overview */}
        <div className="detailed-stats">
          <div className="detailed-stat-card">
            <div className="detailed-stat-card-header">
              <div className="detailed-stat-card-icon" style={{ backgroundColor: "#4338ca" }}>
                <i className="bi bi-currency-dollar"></i>
              </div>
              <div className="detailed-stat-card-title">{getTranslation('Monthly Income')}</div>
            </div>
            <div className="detailed-stat-card-value">${garageData.monthlyIncome.toLocaleString()}</div>
            <div className="detailed-stat-card-desc">
              <i className="bi bi-graph-up-arrow"></i> {getTranslation('Based on completed job orders')}
            </div>
          </div>

          <div className="detailed-stat-card">
            <div className="detailed-stat-card-header">
              <div className="detailed-stat-card-icon" style={{ backgroundColor: "#0891b2" }}>
                <i className="bi bi-calendar-week"></i>
              </div>
              <div className="detailed-stat-card-title">{getTranslation('Weekly Income')}</div>
            </div>
            <div className="detailed-stat-card-value">${garageData.weeklyIncome.toLocaleString()}</div>
            <div className="detailed-stat-card-desc">
              <i className="bi bi-calendar-check"></i> {getTranslation('Last 7 days')}
            </div>
          </div>

          <div className="detailed-stat-card">
            <div className="detailed-stat-card-header">
              <div className="detailed-stat-card-icon" style={{ backgroundColor: "#be123c" }}>
                <i className="bi bi-basket"></i>
              </div>
              <div className="detailed-stat-card-title">{getTranslation('Monthly Expenses')}</div>
            </div>
            <div className="detailed-stat-card-value">${garageData.monthlyExpense.toLocaleString()}</div>
            <div className="detailed-stat-card-desc">
              <i className="bi bi-tags"></i> {getTranslation('Parts and maintenance costs')}
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

        {/* Charts */}
        <div className="charts-grid">
          <ExecutiveChart selectedGarage={selectedGarage} />
          <ContractingPartyOverview selectedGarage={selectedGarage} />
        </div>

        {/* Job Flow */}
        <div className="job-flow-container">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="bi bi-arrow-left-right"></i> 
              {getTranslation('Job Order Flow')} 
              {selectedGarage && selectedGarage !== "all" && ` - ${garages.find(g => g.value === selectedGarage)?.label}`}
            </h3>
            <div className="chart-actions">
              <button className="chart-action-button">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>
        </div>

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