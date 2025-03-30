import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkflowStatusChart = () => {
  const { getTranslation, currentLang } = useLanguage();
  
  const chartData = {
    labels: [
      getTranslation('Stage 1'), 
      getTranslation('Stage 2'), 
      getTranslation('Stage 3'), 
      getTranslation('Stage 4'),
      getTranslation('Stage 5')
    ],
    datasets: [
      {
        label: getTranslation('Completed'),
        data: [15, 12, 10, 8, 5],
        backgroundColor: '#28a745', // Green
        barPercentage: 0.8,
      },
      {
        label: getTranslation('Pending'),
        data: [5, 8, 10, 12, 15],
        backgroundColor: '#ffc107', // Yellow
        barPercentage: 0.8,
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
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 20,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title"><i className="bi bi-kanban-fill"></i> {getTranslation('Approved Workflow Status')}</h3>
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

export default WorkflowStatusChart; 