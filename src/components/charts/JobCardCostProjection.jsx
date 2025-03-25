import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobCardCostProjection = ({ jobCardId = 'KOJMIGIM/002053000005', onClose }) => {
  const { getTranslation } = useLanguage();
  const [activeTab, setActiveTab] = useState('breakdown');

  // Sample job card data
  const jobCardData = {
    id: jobCardId,
    vehicleMake: 'Toyota Land Cruiser',
    technicianName: 'Ahmed Hassan',
    dateCreated: '23/03/2025',
    status: 'In Progress',
    estimatedCompletion: '29/03/2025',
    costs: {
      laborCost: 420,
      partsCost: 1650,
      serviceCharges: 180,
      taxAmount: 112.5,
      totalCost: 2362.5,
      originalEstimate: 2200,
      variance: 162.5
    },
    breakdown: {
      engine: 850,
      transmission: 350,
      electrical: 480,
      brakes: 220,
      bodywork: 350
    },
    timeline: ['20/03/2025', '22/03/2025', '24/03/2025', '26/03/2025', '28/03/2025', '30/03/2025'],
    projectedCosts: [0, 850, 1200, 1650, 2100, 2362.5],
    actualCosts: [0, 880, 1280, 1720, 0, 0]
  };

  // Cost breakdown doughnut chart data
  const breakdownData = {
    labels: [
      getTranslation('Engine'),
      getTranslation('Transmission'),
      getTranslation('Electrical'),
      getTranslation('Brakes'),
      getTranslation('Body Work')
    ],
    datasets: [
      {
        data: Object.values(jobCardData.breakdown),
        backgroundColor: [
          '#4361ee',
          '#3a0ca3',
          '#7209b7',
          '#f72585',
          '#4cc9f0'
        ],
        borderColor: [
          '#3a56d4',
          '#2f0982',
          '#5f0795',
          '#d91a6d',
          '#38b1d8'
        ],
        borderWidth: 1
      }
    ]
  };

  // Cost projection bar chart data
  const projectionData = {
    labels: jobCardData.timeline,
    datasets: [
      {
        label: getTranslation('Projected Cost'),
        data: jobCardData.projectedCosts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: getTranslation('Actual Cost'),
        data: jobCardData.actualCosts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  // Options for charts
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()} KWD (${Math.round((value / jobCardData.costs.totalCost) * 100)}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + ' KWD';
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()} KWD`;
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-calculator"></i> {getTranslation('Job Card Cost Projection')} - {jobCardData.id}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Download')}>
            <i className="bi bi-download"></i>
          </button>
          <button className="chart-action-button" title={getTranslation('Refresh')}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          {onClose && (
            <button className="chart-action-button" title={getTranslation('Close')} onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          )}
          <button className="chart-action-button" title={getTranslation('More')}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>
      
      <div className="job-card-details">
        <div className="job-card-info">
          <div className="info-item">
            <span className="info-label"><i className="bi bi-car-front"></i> {getTranslation('Vehicle')}:</span>
            <span className="info-value">{jobCardData.vehicleMake}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><i className="bi bi-person-gear"></i> {getTranslation('Technician')}:</span>
            <span className="info-value">{jobCardData.technicianName}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><i className="bi bi-calendar-date"></i> {getTranslation('Created')}:</span>
            <span className="info-value">{jobCardData.dateCreated}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><i className="bi bi-clock"></i> {getTranslation('Est. Completion')}:</span>
            <span className="info-value">{jobCardData.estimatedCompletion}</span>
          </div>
          <div className="info-item">
            <span className="info-label"><i className="bi bi-info-circle"></i> {getTranslation('Status')}:</span>
            <span className={`status-badge ${jobCardData.status === 'In Progress' ? 'in-progress' : 'completed'}`}>
              {getTranslation(jobCardData.status)}
            </span>
          </div>
        </div>
        
        <div className="cost-summary">
          <div className="cost-summary-item total">
            <span className="cost-label">{getTranslation('Total Cost')}:</span>
            <span className="cost-value">{jobCardData.costs.totalCost.toLocaleString()} <small>KWD</small></span>
          </div>
          <div className="cost-summary-item">
            <span className="cost-label">{getTranslation('Original Estimate')}:</span>
            <span className="cost-value">{jobCardData.costs.originalEstimate.toLocaleString()} <small>KWD</small></span>
          </div>
          <div className={`cost-summary-item ${jobCardData.costs.variance > 0 ? 'negative' : 'positive'}`}>
            <span className="cost-label">{getTranslation('Variance')}:</span>
            <span className="cost-value">
              <i className={`bi ${jobCardData.costs.variance > 0 ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
              {Math.abs(jobCardData.costs.variance).toLocaleString()} <small>KWD</small>
              <small>({Math.round((jobCardData.costs.variance / jobCardData.costs.originalEstimate) * 100)}%)</small>
            </span>
          </div>
        </div>
      </div>
      
      <div className="chart-tabs">
        <button 
          className={`chart-tab ${activeTab === 'breakdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('breakdown')}
        >
          <i className="bi bi-pie-chart-fill"></i> {getTranslation('Cost Breakdown')}
        </button>
        <button 
          className={`chart-tab ${activeTab === 'projection' ? 'active' : ''}`}
          onClick={() => setActiveTab('projection')}
        >
          <i className="bi bi-graph-up"></i> {getTranslation('Cost Projection')}
        </button>
      </div>
      
      <div className="chart-content" style={{ height: '350px', marginTop: '15px', marginBottom: '20px' }}>
        {activeTab === 'breakdown' ? (
          <Doughnut data={breakdownData} options={doughnutOptions} />
        ) : (
          <Bar data={projectionData} options={barOptions} />
        )}
      </div>
      
      <div className="cost-details">
        <h4 className="cost-details-title">
          <i className="bi bi-list-columns"></i> {getTranslation('Detailed Cost Breakdown')}
        </h4>
        <div className="cost-details-grid">
          <div className="cost-detail-item">
            <span className="cost-detail-label">{getTranslation('Labor Cost')}:</span>
            <span className="cost-detail-value">
              <strong>{jobCardData.costs.laborCost.toLocaleString()}</strong>
              <span className="cost-unit">KWD</span>
            </span>
          </div>
          <div className="cost-detail-item">
            <span className="cost-detail-label">{getTranslation('Parts Cost')}:</span>
            <span className="cost-detail-value">
              <strong>{jobCardData.costs.partsCost.toLocaleString()}</strong>
              <span className="cost-unit">KWD</span>
            </span>
          </div>
          <div className="cost-detail-item">
            <span className="cost-detail-label">{getTranslation('Service Charges')}:</span>
            <span className="cost-detail-value">
              <strong>{jobCardData.costs.serviceCharges.toLocaleString()}</strong>
              <span className="cost-unit">KWD</span>
            </span>
          </div>
          <div className="cost-detail-item">
            <span className="cost-detail-label">{getTranslation('Tax Amount')}:</span>
            <span className="cost-detail-value">
              <strong>{jobCardData.costs.taxAmount.toLocaleString()}</strong>
              <span className="cost-unit">KWD</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <div className="print-report-button">
          <img src="/assets/images/print-icon.svg" alt="Print" className="print-icon" />
          <span>{getTranslation('Print Report')}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCardCostProjection; 