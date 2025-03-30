import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const JobOrderTrendsChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: getTranslation('New Orders'),
        data: [65, 70, 80, 81, 90, 95, 85, 83, 90, 85, 80, 75],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#36a2eb',
      },
      {
        label: getTranslation('Completed Orders'),
        data: [50, 60, 65, 70, 75, 80, 75, 70, 75, 78, 70, 65],
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#4bc0c0',
      }
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 15,
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        intersect: false,
        mode: 'index',
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
        <h3 className="chart-title"><i className="bi bi-graph-up-arrow"></i> {getTranslation('Monthly Job Order Trends')}</h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Refresh')}><i className="bi bi-arrow-clockwise"></i></button>
          <button className="chart-action-button" title={getTranslation('Filter')}><i className="bi bi-funnel"></i></button>
        </div>
      </div>
      <div className="chart-body" style={{ height: '220px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default JobOrderTrendsChart; 