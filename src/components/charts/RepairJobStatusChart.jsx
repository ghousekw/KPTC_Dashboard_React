import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const RepairJobStatusChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      getTranslation('Completed'),
      getTranslation('In Progress'),
      getTranslation('On Hold'),
      getTranslation('Waiting Parts')
    ],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          '#28a745', // Green
          '#ffc107', // Yellow
          '#6c757d', // Gray
          '#17a2b8'  // Teal
        ],
        borderColor: [
          '#238c3c',
          '#e6ad06',
          '#5a6268',
          '#138496'
        ],
        borderWidth: 1,
        cutout: '70%'
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
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

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title"><i className="bi bi-gear-wide-connected"></i> {getTranslation('Repair Jobs Status Breakdown')}</h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Refresh')}><i className="bi bi-arrow-clockwise"></i></button>
          <button className="chart-action-button" title={getTranslation('Filter')}><i className="bi bi-funnel"></i></button>
        </div>
      </div>
      <div className="chart-body" style={{ height: '220px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RepairJobStatusChart; 