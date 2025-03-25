import './StatCard.css';

const StatCard = ({ title, subtitle, count, trend, icon, color }) => {
  // Determine if trend is positive or negative
  const isTrendPositive = trend && trend.includes('+');
  
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-header">
        <h3 className="stat-card-title">
          <i className={`bi ${icon}`}></i>
          {title}
        </h3>
      </div>
      
      <div className="stat-card-body">
        <div className="stat-card-value">
          <div className="stat-card-total">
            <i className="bi bi-graph-up"></i>
            <span className="count">{count.toLocaleString()}</span>
          </div>
          
          {trend && (
            <div className={`stat-card-trend ${isTrendPositive ? 'trend-up' : 'trend-down'}`}>
              <i className={`bi ${isTrendPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`}></i>
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className="stat-card-subtitle">{subtitle}</div>
      </div>
      
      <div className="stat-card-footer">
        <a href={`#detail/${title.toLowerCase().replace(/\s+/g, '-')}`} className="stat-card-link">
          <span>View Details</span>
          <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default StatCard; 