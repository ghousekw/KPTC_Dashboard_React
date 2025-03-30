import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExecutiveSummaryChart = () => {
  const { getTranslation } = useLanguage();
  
  // Work status data for doughnut chart
  const workStatusData = {
    labels: [
      getTranslation('Implemented'),
      getTranslation('In Progress'),
      getTranslation('Pending')
    ],
    datasets: [
      {
        data: [42, 28, 30],
        backgroundColor: [
          '#28a745', // Green
          '#ffc107', // Yellow
          '#6c757d', // Gray
        ],
        borderColor: [
          '#238c3c',
          '#e6ad06',
          '#5a6268',
        ],
        borderWidth: 1,
        cutout: '65%'
      },
    ],
  };
  
  // Financial data for bar chart
  const financialData = {
    labels: [getTranslation('Q1'), getTranslation('Q2'), getTranslation('Q3'), getTranslation('Q4')],
    datasets: [
      {
        label: getTranslation('Revenue'),
        data: [45000, 52000, 49000, 60000],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: getTranslation('Expenses'),
        data: [38000, 42000, 37000, 43000],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ],
  };
  
  // Work statistics data
  const workStats = [
    {
      title: getTranslation('Total Job Orders'),
      value: 248,
      change: '+12%',
      increase: true,
      icon: 'bi-clipboard-check'
    },
    {
      title: getTranslation('Average Completion Time'),
      value: '3.2',
      unit: getTranslation('days'),
      change: '-0.5',
      increase: true,
      icon: 'bi-clock'
    },
    {
      title: getTranslation('Customer Satisfaction'),
      value: '92%',
      change: '+4%',
      increase: true,
      icon: 'bi-emoji-smile'
    },
    {
      title: getTranslation('Revenue Per Job'),
      value: '1,850',
      unit: 'KWD',
      change: '+8%',
      increase: true,
      icon: 'bi-currency-dollar'
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

  // Options for bar chart
  const barOptions = {
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

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-graph-up-arrow"></i> {getTranslation('Executive Management Dashboard')}
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
        {workStats.map((stat, index) => (
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
        {/* Work Status Chart */}
        <div className="executive-chart-panel">
          <h4 className="executive-chart-title">
            {getTranslation('Work Implementation Status')}
          </h4>
          <div className="executive-chart-body" style={{ height: '260px' }}>
            <Doughnut data={workStatusData} options={doughnutOptions} />
          </div>
        </div>
        
        {/* Financial Overview Chart */}
        <div className="executive-chart-panel">
          <h4 className="executive-chart-title">
            {getTranslation('Financial Overview')}
          </h4>
          <div className="executive-chart-body" style={{ height: '260px' }}>
            <Bar data={financialData} options={barOptions} />
          </div>
        </div>
      </div>
      
      {/* Priority Tasks Table */}
      <div className="priority-tasks">
        <h4 className="priority-tasks-title">
          <i className="bi bi-flag"></i> {getTranslation('Priority Pending Tasks')}
        </h4>
        <div className="priority-tasks-table">
          <table>
            <thead>
              <tr>
                <th>{getTranslation('Task ID')}</th>
                <th>{getTranslation('Description')}</th>
                <th>{getTranslation('Assigned To')}</th>
                <th>{getTranslation('Due Date')}</th>
                <th>{getTranslation('Status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>T-1023</td>
                <td>{getTranslation('Engine diagnostics system upgrade')}</td>
                <td>Mike Ahmed</td>
                <td>15 Apr 2023</td>
                <td><span className="status-badge pending">{getTranslation('Pending')}</span></td>
              </tr>
              <tr>
                <td>T-1045</td>
                <td>{getTranslation('New transmission repair tool installation')}</td>
                <td>Sara Khan</td>
                <td>18 Apr 2023</td>
                <td><span className="status-badge in-progress">{getTranslation('In Progress')}</span></td>
              </tr>
              <tr>
                <td>T-1051</td>
                <td>{getTranslation('Customer service training program')}</td>
                <td>Ahmed Ali</td>
                <td>20 Apr 2023</td>
                <td><span className="status-badge pending">{getTranslation('Pending')}</span></td>
              </tr>
              <tr>
                <td>T-1062</td>
                <td>{getTranslation('Quarterly inventory audit')}</td>
                <td>Carlos Diaz</td>
                <td>22 Apr 2023</td>
                <td><span className="status-badge in-progress">{getTranslation('In Progress')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryChart; 