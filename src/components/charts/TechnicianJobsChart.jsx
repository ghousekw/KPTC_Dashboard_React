import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const TechnicianJobsChart = () => {
  const { getTranslation } = useLanguage();
  
  const technicians = [
    { name: 'Mike (Engine)', value: 5, max: 6 },
    { name: 'Sara (Electrical)', value: 4, max: 6 },
    { name: 'Raj (Brakes)', value: 2, max: 6 },
    { name: 'Carlos (Transmission)', value: 6, max: 6 },
    { name: 'Ahmed (Body Work)', value: 4, max: 6 }
  ];

  // Create array of x-axis labels
  const xAxisLabels = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          <i className="bi bi-person-vcard"></i> {getTranslation('Running Job Cards by Technician')}
        </h3>
        <div className="chart-actions">
          <button className="chart-action-button" title={getTranslation('Download')}>
            <i className="bi bi-download"></i>
          </button>
          <button className="chart-action-button" title={getTranslation('Refresh')}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <button className="chart-action-button" title={getTranslation('More')}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>
      
      {/* Legend */}
      <div style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "15px 0"
      }}>
        <div style={{ 
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            backgroundColor: "#4169e1",
            borderRadius: "2px"
          }}></div>
          <span style={{ 
            fontSize: "12px",
            color: "#666",
            fontWeight: "500"
          }}>Active Jobs</span>
        </div>
      </div>
      
      {/* Chart area */}
      <div style={{
        paddingLeft: "150px",
        position: "relative",
        marginTop: "25px",
        marginBottom: "20px"
      }}>
        {/* X axis */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid #eee",
          paddingBottom: "8px",
          marginBottom: "25px"
        }}>
          {xAxisLabels.map((label, index) => (
            <div key={index} style={{
              width: `${100 / xAxisLabels.length}%`,
              textAlign: "center",
              fontSize: "12px",
              color: "#888"
            }}>
              {label}
            </div>
          ))}
        </div>
        
        {/* Bars and Y axis labels */}
        {technicians.map((tech, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              left: "-150px",
              width: "140px",
              textAlign: "right",
              paddingRight: "15px",
              fontSize: "14px",
              color: "#444",
              fontWeight: "500"
            }}>
              {tech.name}
            </div>
            
            <div style={{
              flex: "1",
              height: "24px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative"
            }}>
              <div style={{
                height: "100%",
                width: `${(tech.value / tech.max) * 100}%`,
                backgroundColor: "#4169e1",
                borderRadius: "4px 0 0 4px"
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianJobsChart; 