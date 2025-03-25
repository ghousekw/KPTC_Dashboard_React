import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

// Register all Chart.js components
Chart.register(...registerables);

const JobOrdersChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { currentLang } = useLanguage();

  useEffect(() => {
    // Sample data for demonstration
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // For Arabic, reverse the labels array
    const displayLabels = currentLang === 'ar' ? [...labels].reverse() : labels;
    
    const data = {
      labels: displayLabels,
      datasets: [
        {
          label: 'Completed Orders',
          data: [65, 78, 90, 85, 110, 120, 130, 125, 145, 140, 130, 145],
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: 'rgba(40, 167, 69, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Pending Orders',
          data: [45, 55, 65, 70, 85, 75, 90, 80, 95, 100, 95, 85],
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: 'rgba(255, 193, 7, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Rejected Orders',
          data: [15, 12, 20, 18, 25, 22, 30, 28, 35, 32, 28, 32],
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: 'rgba(220, 53, 69, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 13
            },
            bodyFont: {
              size: 12
            },
            padding: 10,
            boxPadding: 5,
            cornerRadius: 4
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              padding: 10,
              color: '#6c757d'
            },
            border: {
              dash: [2, 4]
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              lineWidth: 1
            },
            ticks: {
              padding: 10,
              color: '#6c757d'
            },
            border: {
              dash: [2, 4]
            }
          }
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            hitRadius: 10
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: {
            top: 5,
            right: 10,
            bottom: 5,
            left: 10
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    };

    // Clean up previous chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    if (chartRef && chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, config);
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [currentLang]); // Re-render chart when language changes

  return (
    <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default JobOrdersChart; 