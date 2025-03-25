import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const KpiGaugeChart = ({ value, maxValue = 100, color = '#223b73' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    // Calculate the percentage value
    const percentage = Math.min(Math.max(0, value), maxValue) / maxValue * 100;
    
    // Data configuration for gauge chart
    const data = {
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: [
          color,
          '#f5f5f5'
        ],
        borderWidth: 0,
        cutout: '70%',
        circumference: 180,
        rotation: 270
      }]
    };
    
    // Chart configuration
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
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
  }, [value, maxValue, color]);
  
  return (
    <div className="gauge-chart-wrapper" style={{ position: 'relative', height: '120px', width: '120px' }}>
      <canvas ref={chartRef}></canvas>
      <div className="gauge-value" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        fontSize: '1.5rem',
        fontWeight: '700',
        color: color
      }}>
        {value}%
      </div>
    </div>
  );
};

export default KpiGaugeChart; 