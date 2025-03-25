import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobCardCostProjection = ({ selectedGarage }) => {
  const { getTranslation } = useLanguage();
  const [activeTab, setActiveTab] = useState('breakdown');

  // Sample data for different garages
  const costData = {
    all: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [18500, 21000, 19800, 17650, 22300, 20100],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [19200, 20400, 20100, 18200, 21800, 19500],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    },
    sulaibiya: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [8500, 9000, 8800, 7650, 9300, 8100],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [8700, 8800, 9100, 7900, 9100, 8400],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    },
    subhan: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [5500, 6000, 5800, 5650, 6300, 6100],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [5700, 5900, 6100, 5800, 6200, 6000],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    },
    ahmadi: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [3500, 4000, 3800, 3650, 4300, 4100],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [3800, 3900, 4000, 3700, 4500, 3900],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    },
    fintas: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [2500, 2800, 2600, 2450, 2900, 2700],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [2700, 2750, 2800, 2500, 3000, 2600],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    },
    mutla: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: getTranslation('Estimated Cost'),
          data: [1500, 1700, 1600, 1450, 1800, 1600],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: getTranslation('Actual Cost'),
          data: [1600, 1650, 1700, 1500, 1900, 1550],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    }
  };
  
  // Get appropriate cost data
  const garageKey = selectedGarage && costData[selectedGarage] ? selectedGarage : 'all';
  const chartData = costData[garageKey];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? '#e2e8f0' 
            : '#475569'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? '#94a3b8' 
            : '#64748b'
        },
        grid: {
          color: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(148, 163, 184, 0.1)' 
            : 'rgba(203, 213, 225, 0.5)'
        }
      },
      y: {
        ticks: {
          color: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? '#94a3b8' 
            : '#64748b',
          callback: function(value) {
            return 'KD ' + value;
          }
        },
        grid: {
          color: document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(148, 163, 184, 0.1)' 
            : 'rgba(203, 213, 225, 0.5)'
        }
      }
    }
  };

  return (
    <div className="job-cost-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-cash-stack"></i> 
          {getTranslation('Job Card Cost Projection')}
          {selectedGarage && selectedGarage !== "all" && ` - ${selectedGarage.charAt(0).toUpperCase() + selectedGarage.slice(1)}`}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
      </div>
      <div className="job-cost-chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default JobCardCostProjection; 