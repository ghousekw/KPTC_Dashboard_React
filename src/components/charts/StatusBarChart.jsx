import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatusBarChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      getTranslation('Pending'), 
      getTranslation('In Progress'), 
      getTranslation('Completed'), 
      getTranslation('Cancelled')
    ],
    datasets: [
      {
        label: getTranslation('Job Orders'),
        data: [65, 45, 95, 15],
        backgroundColor: [
          '#4169e1', // Blue for Pending
          '#ffc107', // Yellow for In Progress
          '#28a745', // Green for Completed
          '#dc3545', // Red for Cancelled
        ],
        borderColor: [
          '#3a5ecc',
          '#e6ad06', 
          '#238c3c',
          '#c62f3e',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
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
        <h3 className="chart-title"><i className="bi bi-bar-chart-fill"></i> {getTranslation('Job Orders by Status')}</h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Refresh')}><i className="bi bi-arrow-clockwise"></i></button>
          <button className="chart-action-button" title={getTranslation('Filter')}><i className="bi bi-funnel"></i></button>
        </div>
      </div>
      <div className="chart-body" style={{ height: '220px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatusBarChart; 