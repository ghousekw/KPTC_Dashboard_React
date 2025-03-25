import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const JobTypesPieChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      getTranslation('Engine'),
      getTranslation('Transmission'),
      getTranslation('Brakes'),
      getTranslation('Electrical'),
      getTranslation('Body Work'),
      getTranslation('Other')
    ],
    datasets: [
      {
        data: [25, 20, 15, 18, 12, 10],
        backgroundColor: [
          '#4169e1', // Blue
          '#ff6384', // Pink
          '#36a2eb', // Light Blue
          '#ffcd56', // Yellow
          '#4bc0c0', // Teal
          '#9966ff'  // Purple
        ],
        borderColor: [
          '#3a5ecc',
          '#e55a77',
          '#3092d4',
          '#e6b94d',
          '#44acac',
          '#885ce6'
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
        position: 'right',
        labels: {
          boxWidth: 15,
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
        <h3 className="chart-title"><i className="bi bi-pie-chart-fill"></i> {getTranslation('Repair Jobs by Type')}</h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Refresh')}><i className="bi bi-arrow-clockwise"></i></button>
          <button className="chart-action-button" title={getTranslation('Filter')}><i className="bi bi-funnel"></i></button>
        </div>
      </div>
      <div className="chart-body" style={{ height: '220px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default JobTypesPieChart; 