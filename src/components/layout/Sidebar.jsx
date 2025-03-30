import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Sidebar.css';

const Sidebar = ({ onHelpClick }) => {
  const { getTranslation } = useLanguage();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Toggle submenu visibility
  const toggleSubmenu = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  // Handle help click
  const handleHelpClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    if (onHelpClick) {
      onHelpClick();
    }
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo-container">
          <img src="/assets/images/kptc-logo.png" alt="KPTC Logo" />
          <div className="svg-fallback">
            <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="60" fill="#f8f9fa" />
              <text x="100" y="35" fontFamily="Arial" fontSize="24" fill="#223b73" textAnchor="middle">KPTC</text>
            </svg>
          </div>
        </div>
      </div>

      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item active">
            <a href="#dashboard" onClick={() => toggleSubmenu('dashboard')}>
              <i className="bi bi-speedometer2"></i>
              <span>{getTranslation('Dashboard & Reports')}</span>
              <i className={`menu-arrow bi bi-chevron-${activeSubmenu === 'dashboard' ? 'up' : 'down'}`}></i>
            </a>
            <ul className={`submenu ${activeSubmenu === 'dashboard' ? 'active' : ''}`}>
              <li><a href="#dashboard/main">{getTranslation('Main Dashboard')}</a></li>
              <li><a href="#dashboard/reports">{getTranslation('Reports')}</a></li>
              <li><a href="#dashboard/analytics">{getTranslation('Analytics')}</a></li>
            </ul>
          </li>
          
          <li className="menu-item">
            <a href="#moi">
              <i className="bi bi-building"></i>
              <span>{getTranslation('MOI Reception')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#kptc">
              <i className="bi bi-reception-4"></i>
              <span>{getTranslation('KPTC Reception')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#garage">
              <i className="bi bi-truck"></i>
              <span>{getTranslation('Garage')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#procurement">
              <i className="bi bi-cart3"></i>
              <span>{getTranslation('Procurement')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#accounts">
              <i className="bi bi-cash-coin"></i>
              <span>{getTranslation('Accounts')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#stores">
              <i className="bi bi-box-seam"></i>
              <span>{getTranslation('Stores')}</span>
            </a>
          </li>
          
          <li className="menu-item">
            <a href="#master" onClick={() => toggleSubmenu('master')}>
              <i className="bi bi-gear"></i>
              <span>{getTranslation('Master')}</span>
              <i className={`menu-arrow bi bi-chevron-${activeSubmenu === 'master' ? 'up' : 'down'}`}></i>
            </a>
            <ul className={`submenu ${activeSubmenu === 'master' ? 'active' : ''}`}>
              <li><a href="#master/users">{getTranslation('User Management')}</a></li>
              <li><a href="#master/roles">{getTranslation('Roles & Permissions')}</a></li>
              <li><a href="#master/settings">{getTranslation('System Settings')}</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <a href="#" onClick={handleHelpClick} className="footer-link" title={`${getTranslation('Press F1 or Alt+H')}`}>
          <i className="bi bi-question-circle"></i>
          <span>{getTranslation('Help')}</span>
        </a>
        <a href="#logout" className="footer-link">
          <i className="bi bi-box-arrow-right"></i>
          <span>{getTranslation('Logout')}</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar; 