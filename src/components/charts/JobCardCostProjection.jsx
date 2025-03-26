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
    <div className="job-card-details" style={{ 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
      overflow: 'hidden',
      margin: '15px 0'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 20px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ 
            color: '#4b5563',
            backgroundColor: '#f3f4f6', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px'
          }}>
            <i className="bi bi-file-earmark-text"></i>
          </span>
          <h3 style={{ 
            margin: 0, 
            fontWeight: '600', 
            color: '#374151', 
            fontSize: '16px'
          }}>
            {getTranslation('Job Card Cost Projection')} - {jobCardId}
          </h3>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            background: 'none',
            border: 'none',
            borderRadius: '4px',
            padding: '6px',
            cursor: 'pointer'
          }}>
            <i className="bi bi-printer" style={{ color: '#6b7280' }}></i>
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            borderRadius: '4px',
            padding: '6px',
            cursor: 'pointer'
          }}>
            <i className="bi bi-file-pdf" style={{ color: '#6b7280' }}></i>
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            borderRadius: '4px',
            padding: '6px',
            cursor: 'pointer'
          }} onClick={onClose}>
            <i className="bi bi-x-lg" style={{ color: '#6b7280' }}></i>
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '20px',
        gap: '15px 30px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Vehicle')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.vehicle}
          </div>
        </div>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Plate Number')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.plate}
          </div>
        </div>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Customer')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.customer}
          </div>
        </div>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Department')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.department}
          </div>
        </div>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Status')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.status}
          </div>
        </div>
        <div>
          <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>
            {getTranslation('Technician')}
          </div>
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {jobCardDetails.technicianName} (ID: {jobCardDetails.technicianId})
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        {/* Cost Summary Card */}
        <div style={{
          flex: '0 0 260px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '15px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                {getTranslation('Estimated Cost')}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                KD 22,300
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                {getTranslation('Actual Cost')}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                KD 21,800
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                {getTranslation('Variance')}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '5px' }}>
                KD 500 <span style={{ fontSize: '12px' }}>-2.2%</span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                {getTranslation('Grand Total')}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                KD 437
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: '1' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <div
              onClick={() => setActiveTab('breakdown')}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'breakdown' ? '#3b82f6' : '#6b7280',
                cursor: 'pointer',
                borderBottom: activeTab === 'breakdown' ? '2px solid #3b82f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="bi bi-pie-chart"></i> {getTranslation('Cost Breakdown')}
            </div>
            <div
              onClick={() => setActiveTab('parts')}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'parts' ? '#3b82f6' : '#6b7280',
                cursor: 'pointer',
                borderBottom: activeTab === 'parts' ? '2px solid #3b82f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="bi bi-wrench"></i> {getTranslation('Parts Cost')}
            </div>
            <div
              onClick={() => setActiveTab('labor')}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'labor' ? '#3b82f6' : '#6b7280',
                cursor: 'pointer',
                borderBottom: activeTab === 'labor' ? '2px solid #3b82f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="bi bi-person-gear"></i> {getTranslation('Labor Cost')}
            </div>
            <div
              onClick={() => setActiveTab('summary')}
              style={{
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === 'summary' ? '#3b82f6' : '#6b7280',
                cursor: 'pointer',
                borderBottom: activeTab === 'summary' ? '2px solid #3b82f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="bi bi-list-check"></i> {getTranslation('Summary')}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '10px' }}>
            {activeTab === 'breakdown' && (
              <div>
                <div style={{ height: '280px', position: 'relative' }}>
                  <Doughnut data={costBreakdownData} options={doughnutOptions} />
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '20px', 
                  marginTop: '20px' 
                }}>
                  {costBreakdownData.labels.map((label, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: costBreakdownData.datasets[0].backgroundColor[index],
                        borderRadius: '2px'
                      }}></div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'parts' && (
              <div className="cost-details">
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                  <i className="bi bi-wrench"></i> {getTranslation('Parts Cost Details')}
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th>{getTranslation('Part ID')}</th>
                      <th>{getTranslation('Description')}</th>
                      <th>{getTranslation('Quantity')}</th>
                      <th>{getTranslation('Unit Price')}</th>
                      <th>{getTranslation('Total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobCardDetails.parts.map(part => (
                      <tr key={part.id}>
                        <td>{part.id}</td>
                        <td>{part.name}</td>
                        <td>{part.quantity}</td>
                        <td>KD {part.unitPrice}</td>
                        <td>KD {part.totalPrice}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>{getTranslation('Total Parts Cost')}</td>
                      <td style={{ fontWeight: 'bold' }}>KD {partsTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'labor' && (
              <div className="cost-details">
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                  <i className="bi bi-person-gear"></i> {getTranslation('Labor Cost Details')}
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th>{getTranslation('Task ID')}</th>
                      <th>{getTranslation('Description')}</th>
                      <th>{getTranslation('Hours')}</th>
                      <th>{getTranslation('Rate/Hour')}</th>
                      <th>{getTranslation('Total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobCardDetails.labor.map(labor => (
                      <tr key={labor.id}>
                        <td>{labor.id}</td>
                        <td>{labor.description}</td>
                        <td>{labor.hours}</td>
                        <td>KD {labor.ratePerHour}</td>
                        <td>KD {labor.totalPrice}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>{getTranslation('Total Labor Cost')}</td>
                      <td style={{ fontWeight: 'bold' }}>KD {laborTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'summary' && (
              <div>
                <div className="cost-details-grid">
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Parts Cost')}</div>
                    <div className="cost-detail-value">
                      <strong>KD {partsTotal}</strong>
                      <span className="cost-unit">({Math.round((partsTotal / grandTotal) * 100)}%)</span>
                    </div>
                  </div>
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Labor Cost')}</div>
                    <div className="cost-detail-value">
                      <strong>KD {laborTotal}</strong>
                      <span className="cost-unit">({Math.round((laborTotal / grandTotal) * 100)}%)</span>
                    </div>
                  </div>
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Total Parts Items')}</div>
                    <div className="cost-detail-value">
                      <strong>{jobCardDetails.parts.length}</strong>
                    </div>
                  </div>
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Total Labor Tasks')}</div>
                    <div className="cost-detail-value">
                      <strong>{jobCardDetails.labor.length}</strong>
                    </div>
                  </div>
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Total Work Hours')}</div>
                    <div className="cost-detail-value">
                      <strong>{jobCardDetails.labor.reduce((sum, l) => sum + l.hours, 0)}</strong>
                    </div>
                  </div>
                  <div className="cost-detail-item">
                    <div className="cost-detail-label">{getTranslation('Grand Total')}</div>
                    <div className="cost-detail-value">
                      <strong>KD {grandTotal}</strong>
                    </div>
                  </div>
                </div>
                <div className="job-cost-chart" style={{ marginTop: '20px', height: '250px' }}>
                  <Bar data={chartData} options={barOptions} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        padding: '20px', 
        gap: '15px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <button style={{
          backgroundColor: '#3b82f6',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="bi bi-check-circle"></i>
          {getTranslation('Approve Costs')}
        </button>
        <button style={{
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          color: '#6b7280',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="bi bi-printer"></i>
          {getTranslation('Print Detailed Report')}
        </button>
      </div>
    </div>
  );
};

export default JobCardCostProjection; 