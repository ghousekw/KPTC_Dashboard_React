import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobCardCostProjection = ({ jobCardId, onClose, selectedGarage }) => {
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

  // Chart options
  const barOptions = {
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

  // Doughnut chart data for cost breakdown
  const costBreakdownData = {
    labels: [
      getTranslation('Parts'),
      getTranslation('Labor'),
      getTranslation('Overheads'),
      getTranslation('Miscellaneous')
    ],
    datasets: [
      {
        data: [12800, 5400, 2800, 1200],
        backgroundColor: [
          '#3b82f6',
          '#ef4444',
          '#10b981',
          '#f59e0b'
        ],
        borderColor: [
          '#2563eb',
          '#dc2626',
          '#059669',
          '#d97706'
        ],
        borderWidth: 1
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return label + ': KD ' + value + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Sample job card details
  const jobCardDetails = {
    id: jobCardId,
    vehicle: 'Toyota Land Cruiser',
    plate: 'KWT 12345',
    customer: 'Ministry of Interior',
    department: 'Police Division',
    startDate: '2025-04-15',
    estimatedEndDate: '2025-04-22',
    status: 'In Progress',
    technicianName: 'Ahmed Abdullah',
    technicianId: '1216098',
    totalEstimatedCost: 22300,
    totalActualCost: 21800,
    variance: -500,
    variancePercentage: -2.2,
    parts: [
      { id: 'P001', name: 'Oil Filter', quantity: 1, unitPrice: 15, totalPrice: 15 },
      { id: 'P002', name: 'Engine Oil', quantity: 5, unitPrice: 12, totalPrice: 60 },
      { id: 'P003', name: 'Air Filter', quantity: 1, unitPrice: 25, totalPrice: 25 },
      { id: 'P004', name: 'Brake Pads (Set)', quantity: 1, unitPrice: 85, totalPrice: 85 },
      { id: 'P005', name: 'Spark Plugs', quantity: 4, unitPrice: 18, totalPrice: 72 }
    ],
    labor: [
      { id: 'L001', description: 'Oil Change', hours: 1, ratePerHour: 45, totalPrice: 45 },
      { id: 'L002', description: 'Brake Inspection', hours: 0.5, ratePerHour: 45, totalPrice: 22.5 },
      { id: 'L003', description: 'Air Filter Replacement', hours: 0.5, ratePerHour: 45, totalPrice: 22.5 },
      { id: 'L004', description: 'Brake Pad Replacement', hours: 2, ratePerHour: 45, totalPrice: 90 }
    ]
  };

  // Calculate totals
  const partsTotal = jobCardDetails.parts.reduce((sum, part) => sum + part.totalPrice, 0);
  const laborTotal = jobCardDetails.labor.reduce((sum, labor) => sum + labor.totalPrice, 0);
  const grandTotal = 437; // Fixed for demo purposes, matching screenshot

  return (
    <div style={{
      width: '100%',
      backgroundColor: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
      color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : 'inherit',
      borderRadius: '8px',
      padding: '20px'
    }}>
      {/* Vehicle Info Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Vehicle</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>Toyota Land Cruiser</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Plate Number</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>KWT 12345</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Customer</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>Ministry of Interior</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Department</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>Police Division</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Status</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>In Progress</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '8px' 
          }}>Technician</div>
          <div style={{ 
            fontWeight: '600',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>Ahmed Abdullah (ID: 1216098)</div>
        </div>
      </div>

      {/* Cost Summary Section */}
      <div style={{
        backgroundColor: document.body.classList.contains('dark-mode') ? '#0f172a' : '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '5px' 
          }}>Estimated Cost</div>
          <div style={{ 
            fontSize: '24px',
            fontWeight: '700',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>KD 22,300</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '5px' 
          }}>Actual Cost</div>
          <div style={{ 
            fontSize: '24px',
            fontWeight: '700',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>KD 21,800</div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '5px' 
          }}>Variance</div>
          <div style={{ 
            fontSize: '24px',
            fontWeight: '700',
            color: '#38b259'
          }}>KD 500 -2.2%</div>
        </div>
        <div>
          <div style={{ 
            color: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#666',
            marginBottom: '5px' 
          }}>Grand Total</div>
          <div style={{ 
            fontSize: '24px',
            fontWeight: '700',
            color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#333'
          }}>KD 437</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div style={{
        borderBottom: document.body.classList.contains('dark-mode') ? '1px solid #334155' : '1px solid #e2e8f0',
        marginBottom: '20px'
      }}>
        <button style={{
          padding: '10px 20px',
          color: document.body.classList.contains('dark-mode') ? '#60a5fa' : '#2563eb',
          borderBottom: document.body.classList.contains('dark-mode') ? '2px solid #60a5fa' : '2px solid #2563eb',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}>Cost Breakdown</button>
      </div>

      {/* Chart Section */}
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        {/* Your existing chart component */}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
        justifyContent: 'flex-start'
      }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: document.body.classList.contains('dark-mode') ? '#2563eb' : '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-check"></i>
          Approve Costs
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: document.body.classList.contains('dark-mode') ? '#334155' : '#f3f4f6',
          color: document.body.classList.contains('dark-mode') ? '#f1f5f9' : '#374151',
          border: document.body.classList.contains('dark-mode') ? '1px solid #475569' : '1px solid #e5e7eb',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-print"></i>
          Print Detailed Report
        </button>
      </div>
    </div>
  );
};

export default JobCardCostProjection; 