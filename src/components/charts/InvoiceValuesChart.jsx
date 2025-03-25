import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InvoiceValuesChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: getTranslation('Job Orders'),
        data: [65, 70, 80, 81, 72, 84, 88, 90, 92, 95, 85, 80],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#36a2eb',
        yAxisID: 'y',
      },
      {
        label: getTranslation('Invoice Value (in KWD)'),
        data: [25000, 27500, 32000, 34000, 32500, 36000, 39000, 42000, 45000, 47000, 44000, 42000],
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#4bc0c0',
        yAxisID: 'y1',
      }
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: getTranslation('Number of Orders'),
          font: {
            size: 11,
          },
        },
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
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: getTranslation('Value (KWD)'),
          font: {
            size: 11,
          },
        },
        grid: {
          drawOnChartArea: false,
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
        <h3 className="chart-title"><i className="bi bi-cash-coin"></i> {getTranslation('Monthly Job Orders and Invoice Values (Last 12 Months)')}</h3>
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

export default InvoiceValuesChart; 