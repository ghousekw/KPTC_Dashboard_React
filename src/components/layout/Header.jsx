import { useLanguage } from '../../context/LanguageContext.jsx';
import './Header.css';

const Header = () => {
  const { getTranslation, toggleLanguage, currentLang } = useLanguage();

  return (
    <header className="header">
      <button className="mobile-menu-btn">
        <i className="bi bi-list"></i>
      </button>
      
      <div className="header-left">
        <h1 className="page-title">
          <i className="bi bi-speedometer2"></i>
          {getTranslation('Dashboard & Reports')}
        </h1>
      </div>
      
      <div className="header-right">
        <div className="date-display">
          <i className="bi bi-calendar3"></i>
          <span>{new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <button 
          className="language-selector" 
          onClick={toggleLanguage} 
          aria-label={`Switch to ${currentLang === 'en' ? 'Arabic' : 'English'}`}
        >
          <i className="bi bi-translate"></i>
          <span>{getTranslation('Arabic')}</span>
        </button>
        
        <div className="user-profile dropdown">
          <button className="dropdown-toggle">
            <div className="placeholder-img">
              <span>A</span>
            </div>
            <span className="user-name">{getTranslation('Admin')}</span>
            <i className="bi bi-chevron-down"></i>
          </button>
          <div className="dropdown-menu">
            <a href="#profile" className="dropdown-item">
              <i className="bi bi-person"></i>
              <span>{getTranslation('Profile')}</span>
            </a>
            <a href="#settings" className="dropdown-item">
              <i className="bi bi-gear"></i>
              <span>{getTranslation('Settings')}</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#logout" className="dropdown-item">
              <i className="bi bi-box-arrow-right"></i>
              <span>{getTranslation('Logout')}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 