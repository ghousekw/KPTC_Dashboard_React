import { useLanguage } from '../../context/LanguageContext.jsx';
import JobOrdersChart from './JobOrdersChart.jsx';
import KpiGaugeChart from './KpiGaugeChart.jsx';
import './ChartSection.css';

const ChartSection = () => {
  const { getTranslation } = useLanguage();

  return (
    <section className="chart-section">
      <div className="chart-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="bi bi-graph-up"></i>
              {getTranslation('Job Orders Overview')}
            </h3>
            <div className="chart-actions">
              <button className="btn-sm">
                <i className="bi bi-clock-history"></i>
                {getTranslation('Last 30 Days')}
              </button>
              <button className="btn-sm">
                <i className="bi bi-download"></i>
                {getTranslation('Export')}
              </button>
            </div>
          </div>
          <div className="chart-body">
            <JobOrdersChart />
          </div>
        </div>

        <div className="chart-container kpi-container">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="bi bi-speedometer2"></i>
              {getTranslation('Performance Metrics')}
            </h3>
            <div className="chart-actions">
              <button className="btn-sm">
                <i className="bi bi-arrow-repeat"></i>
                {getTranslation('Refresh')}
              </button>
            </div>
          </div>
          <div className="chart-body kpi-grid">
            <div className="kpi-card">
              <div className="kpi-title">{getTranslation('Completion Rate')}</div>
              <KpiGaugeChart value={78} maxValue={100} color="#223b73" />
              <div className="kpi-status">
                <i className="bi bi-arrow-up-right"></i>
                <span>78%</span>
                <span className="kpi-label">{getTranslation('Target')}: 85%</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-title">{getTranslation('Customer Satisfaction')}</div>
              <KpiGaugeChart value={92} maxValue={100} color="#28a745" />
              <div className="kpi-status">
                <i className="bi bi-arrow-up-right"></i>
                <span>92%</span>
                <span className="kpi-label">{getTranslation('Target')}: 90%</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-title">{getTranslation('Inventory Level')}</div>
              <KpiGaugeChart value={65} maxValue={100} color="#ffc107" />
              <div className="kpi-status">
                <i className="bi bi-arrow-down-right"></i>
                <span>65%</span>
                <span className="kpi-label">{getTranslation('Target')}: 75%</span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-title">{getTranslation('Efficiency')}</div>
              <KpiGaugeChart value={81} maxValue={100} color="#17a2b8" />
              <div className="kpi-status">
                <i className="bi bi-arrow-up-right"></i>
                <span>81%</span>
                <span className="kpi-label">{getTranslation('Target')}: 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartSection; 