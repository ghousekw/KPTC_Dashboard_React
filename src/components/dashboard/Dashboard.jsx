import { useLanguage } from '../../context/LanguageContext.jsx';
import StatCard from './StatCard.jsx';
import ChartSection from '../charts/ChartSection.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { getTranslation } = useLanguage();

  // Mock data for stat cards
  const statCards = [
    {
      id: 1,
      title: 'Job Order Total',
      subtitle: 'All active job orders',
      count: 2476,
      trend: '+15%',
      icon: 'bi-clipboard-check',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Job Order Completed',
      subtitle: 'Last 30 days',
      count: 1387,
      trend: '+8%',
      icon: 'bi-check2-circle',
      color: 'success'
    },
    {
      id: 3,
      title: 'Pending Approvals',
      subtitle: 'Requires attention',
      count: 268,
      trend: '-3%',
      icon: 'bi-hourglass-split',
      color: 'warning'
    },
    {
      id: 4,
      title: 'Parts Requested',
      subtitle: 'Awaiting procurement',
      count: 189,
      trend: '+12%',
      icon: 'bi-gear',
      color: 'info'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <section className="stat-cards">
          {statCards.map(card => (
            <StatCard
              key={card.id}
              title={getTranslation(card.title)}
              subtitle={getTranslation(card.subtitle)}
              count={card.count}
              trend={card.trend}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </section>
        
        <ChartSection />
        
        <section className="dashboard-tables">
          <div className="table-container">
            <div className="table-header">
              <h3 className="table-title">
                <i className="bi bi-list-check"></i>
                {getTranslation('Recent Job Orders')}
              </h3>
              <div className="table-actions">
                <button className="btn-sm">
                  <i className="bi bi-filter"></i>
                  {getTranslation('Filter')}
                </button>
                <button className="btn-sm btn-primary">
                  <i className="bi bi-plus"></i>
                  {getTranslation('New')}
                </button>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{getTranslation('Job Order #')}</th>
                    <th>{getTranslation('Vehicle')}</th>
                    <th>{getTranslation('Status')}</th>
                    <th>{getTranslation('Created')}</th>
                    <th>{getTranslation('Priority')}</th>
                    <th>{getTranslation('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JO-2023-0875</td>
                    <td>Toyota Corolla - KWT12345</td>
                    <td><span className="status-badge status-approved">{getTranslation('Approved')}</span></td>
                    <td>15/03/2023</td>
                    <td><span className="priority-badge priority-high">{getTranslation('High')}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title={getTranslation('View details')}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Edit')}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Delete')}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JO-2023-0874</td>
                    <td>Nissan Patrol - KWT54321</td>
                    <td><span className="status-badge status-pending">{getTranslation('Pending')}</span></td>
                    <td>14/03/2023</td>
                    <td><span className="priority-badge priority-medium">{getTranslation('Medium')}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title={getTranslation('View details')}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Edit')}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Delete')}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>JO-2023-0873</td>
                    <td>Honda Accord - KWT98765</td>
                    <td><span className="status-badge status-completed">{getTranslation('Completed')}</span></td>
                    <td>13/03/2023</td>
                    <td><span className="priority-badge priority-low">{getTranslation('Low')}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title={getTranslation('View details')}>
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Edit')}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="action-btn" title={getTranslation('Delete')}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="table-footer">
              <div className="pagination">
                <button className="pagination-btn" disabled>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
              <div className="showing-entries">
                {getTranslation('Showing')} 1-3 {getTranslation('of')} 50 {getTranslation('entries')}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 