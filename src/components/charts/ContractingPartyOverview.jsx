import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ContractingPartyOverview = () => {
  const { getTranslation } = useLanguage();
  
  // Work order acceptance/rejection data
  const workOrderStatusData = {
    labels: [
      getTranslation('Accepted'),
      getTranslation('Pending Review'),
      getTranslation('Rejected')
    ],
    datasets: [
      {
        data: [68, 22, 10],
        backgroundColor: [
          '#28a745', // Green
          '#ffc107', // Yellow
          '#dc3545', // Red
        ],
        borderColor: [
          '#238c3c',
          '#e6ad06',
          '#c6303e',
        ],
        borderWidth: 1,
        cutout: '65%'
      },
    ],
  };
  
  // Work implementation status over time
  const implementationTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: getTranslation('Implemented'),
        data: [42, 38, 45, 50, 54, 59],
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: getTranslation('In Progress'),
        data: [28, 32, 30, 25, 22, 18],
        backgroundColor: 'rgba(255, 193, 7, 0.7)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: getTranslation('Pending'),
        data: [30, 30, 25, 25, 24, 23],
        backgroundColor: 'rgba(108, 117, 125, 0.7)',
        borderColor: 'rgba(108, 117, 125, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ],
  };
  
  // Monthly financial balances
  const financialBalancesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: getTranslation('Contract Value'),
        data: [85000, 85000, 85000, 85000, 85000, 85000],
        backgroundColor: 'rgba(173, 216, 230, 0.2)',
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderDash: [5, 5]
      },
      {
        label: getTranslation('Billed Amount'),
        data: [12000, 28000, 42000, 58000, 70000, 78000],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: getTranslation('Received Payments'),
        data: [8000, 20000, 35000, 48000, 62000, 72000],
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ],
  };
  
  // Work statistics during period
  const periodStats = [
    {
      title: getTranslation('Total Work Orders'),
      value: 124,
      change: '+8%',
      increase: true,
      icon: 'bi-file-earmark-check'
    },
    {
      title: getTranslation('Contract Completion'),
      value: '78%',
      change: '+5%',
      increase: true,
      icon: 'bi-check2-circle'
    },
    {
      title: getTranslation('Contract Balance'),
      value: '7,000',
      unit: 'KWD',
      change: '-8%',
      increase: false,
      icon: 'bi-cash-stack'
    },
    {
      title: getTranslation('Pending Approvals'),
      value: '22',
      change: '-4',
      increase: true,
      icon: 'bi-hourglass-split'
    }
  ];

  // Options for doughnut chart
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
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    }
  };

  // Options for line chart
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  // Options for financial chart
  const financialOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value) {
            return value.toLocaleString() + ' KWD';
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  // Add styles for the Hold status badge
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-badge completed';
      case 'Pending Review':
        return 'status-badge in-progress';
      case 'Rejected':
        return 'status-badge pending';
      case 'On Hold':
        return 'status-badge hold';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-building"></i> {getTranslation('Contracting Party Overview')}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Download')}>
            <i className="bi bi-download"></i>
          </button>
          <button className="chart-action-button" title={getTranslation('Refresh')}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <button className="chart-action-button" title={getTranslation('More')}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>
      
      {/* Work Statistics Cards */}
      <div className="stats-cards">
        {periodStats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="stats-card-icon">
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div className="stats-card-content">
              <div className="stats-card-title">{stat.title}</div>
              <div className="stats-card-value">
                {stat.value}
                {stat.unit && <span className="stats-card-unit">{stat.unit}</span>}
              </div>
              <div className={`stats-card-change ${stat.increase ? 'positive' : 'negative'}`}>
                <i className={`bi ${stat.increase ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="executive-charts">
        {/* Work Order Status Chart */}
        <div className="executive-chart-panel">
          <h4 className="executive-chart-title">
            {getTranslation('Work Order Acceptance Status')}
          </h4>
          <div className="executive-chart-body" style={{ height: '260px' }}>
            <Doughnut data={workOrderStatusData} options={doughnutOptions} />
          </div>
        </div>
        
        {/* Implementation Trends Chart */}
        <div className="executive-chart-panel">
          <h4 className="executive-chart-title">
            {getTranslation('Implementation Status Trends')}
          </h4>
          <div className="executive-chart-body" style={{ height: '260px' }}>
            <Line data={implementationTrendsData} options={lineOptions} />
          </div>
        </div>
      </div>
      
      {/* Financial Balances Chart */}
      <div className="executive-chart-panel" style={{ marginBottom: '25px' }}>
        <h4 className="executive-chart-title">
          <i className="bi bi-cash"></i> {getTranslation('Financial Balances')}
        </h4>
        <div className="executive-chart-body" style={{ height: '300px' }}>
          <Line data={financialBalancesData} options={financialOptions} />
        </div>
      </div>
      
      {/* Work Order Approval Table */}
      <div className="priority-tasks">
        <h4 className="priority-tasks-title">
          <i className="bi bi-clipboard-check"></i> {getTranslation('Recent Work Order Approvals')}
        </h4>
        <div className="priority-tasks-table">
          <table>
            <thead>
              <tr>
                <th>{getTranslation('Order ID')}</th>
                <th>{getTranslation('Description')}</th>
                <th>{getTranslation('Value')}</th>
                <th>{getTranslation('Submitted Date')}</th>
                <th>{getTranslation('Status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WO-2053</td>
                <td>{getTranslation('Engine repair and maintenance - Toyota')}</td>
                <td>1,850 KWD</td>
                <td>12 Apr 2023</td>
                <td><span className={getStatusBadgeClass('Accepted')}>{getTranslation('Accepted')}</span></td>
              </tr>
              <tr>
                <td>WO-2058</td>
                <td>{getTranslation('Electrical system overhaul - Nissan')}</td>
                <td>2,350 KWD</td>
                <td>14 Apr 2023</td>
                <td><span className={getStatusBadgeClass('Pending Review')}>{getTranslation('Pending Review')}</span></td>
              </tr>
              <tr>
                <td>WO-2060</td>
                <td>{getTranslation('Vehicle inspection - Honda')}</td>
                <td>950 KWD</td>
                <td>15 Apr 2023</td>
                <td><span className={getStatusBadgeClass('On Hold')}>{getTranslation('On Hold')}</span></td>
              </tr>
              <tr>
                <td>WO-2061</td>
                <td>{getTranslation('Brake system replacement - GMC')}</td>
                <td>1,150 KWD</td>
                <td>15 Apr 2023</td>
                <td><span className={getStatusBadgeClass('Accepted')}>{getTranslation('Accepted')}</span></td>
              </tr>
              <tr>
                <td>WO-2064</td>
                <td>{getTranslation('Transmission repair - KIA')}</td>
                <td>3,250 KWD</td>
                <td>17 Apr 2023</td>
                <td><span className={getStatusBadgeClass('Rejected')}>{getTranslation('Rejected')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractingPartyOverview; 