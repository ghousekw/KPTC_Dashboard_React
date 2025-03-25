import React from 'react';
import { Line } from 'react-chartjs-2';
import { useLanguage } from '../../context/LanguageContext';

// Modified component to use selected garage data
const ExecutiveChart = ({ selectedGarage }) => {
  const { getTranslation } = useLanguage();

  // Define chart data based on selected garage
  const getChartData = () => {
    let data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: []
    };

    // Base dataset for "All Garages"
    const allGaragesData = {
      income: [12500, 15800, 18300, 20100, 22400, 25800, 22300, 19700, 23600, 28900, 32100, 35200],
      expenses: [8200, 9300, 10400, 11200, 12500, 13800, 11900, 10300, 12800, 15400, 17200, 18400]
    };

    // Data for specific garages
    const garageSpecificData = {
      sulaibiya: {
        income: [5400, 6200, 7800, 8200, 9100, 10200, 8900, 7800, 9500, 11200, 12800, 14000],
        expenses: [2800, 3100, 3900, 4100, 4500, 5100, 4400, 3900, 4800, 5600, 6400, 7000]
      },
      subhan: {
        income: [2800, 3500, 4000, 4600, 5100, 5900, 5100, 4500, 5400, 6600, 7400, 8100],
        expenses: [1800, 2100, 2400, 2700, 3000, 3500, 3000, 2600, 3200, 3900, 4400, 4800]
      },
      ahmadi: {
        income: [2100, 2600, 3000, 3300, 3700, 4300, 3700, 3300, 3900, 4800, 5300, 5800],
        expenses: [1200, 1500, 1700, 1900, 2100, 2400, 2100, 1900, 2300, 2800, 3100, 3400]
      },
      fintas: {
        income: [1800, 2300, 2700, 3000, 3300, 3800, 3300, 2900, 3500, 4300, 4800, 5200],
        expenses: [1100, 1400, 1600, 1800, 2000, 2300, 2000, 1700, 2000, 2500, 2800, 3100]
      },
      mutla: {
        income: [1300, 1600, 1900, 2100, 2300, 2600, 2300, 2000, 2400, 2900, 3300, 3600],
        expenses: [800, 1000, 1100, 1200, 1400, 1600, 1400, 1200, 1500, 1800, 2000, 2200]
      }
    };

    // Select appropriate data based on garage
    const chartData = selectedGarage === 'all' ? allGaragesData : garageSpecificData[selectedGarage] || allGaragesData;

    // Add income dataset
    data.datasets.push({
      label: getTranslation('Income'),
      data: chartData.income,
      fill: false,
      backgroundColor: 'rgba(38, 99, 235, 0.2)',
      borderColor: 'rgba(38, 99, 235, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(38, 99, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38, 99, 235, 1)',
      tension: 0.4
    });

    // Add expenses dataset
    data.datasets.push({
      label: getTranslation('Expenses'),
      data: chartData.expenses,
      fill: false,
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(239, 68, 68, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(239, 68, 68, 1)',
      tension: 0.4
    });

    return data;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return '$' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-graph-up"></i> 
          {getTranslation('Financial Performance')}
          {selectedGarage !== 'all' && ` - ${selectedGarage.charAt(0).toUpperCase() + selectedGarage.slice(1)}`}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button">
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>
      <div className="chart-body">
        <Line data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default ExecutiveChart; 