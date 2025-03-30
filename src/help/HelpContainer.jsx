import React, { useState, useEffect, useMemo } from 'react';
import { LoginHelp, DashboardHelp, MediaViewer } from './index';
import { useHelpLanguage } from './context/HelpLanguageContext';
import './HelpContainer.css';

const HelpContainer = ({ currentPage, onClose }) => {
  const [activePage, setActivePage] = useState(currentPage || 'login');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);
  const { language, getTranslation, isRTL, toggleLanguage } = useHelpLanguage();
  
  // List of all available help pages - use useMemo to prevent recreation on every render
  const allHelpPages = useMemo(() => [
    { 
      id: 'login', 
      label: getTranslation('Login'), 
      description: getTranslation('Access the system and authentication'),
      keywords: ['login', 'authentication', 'credentials', 'password', 'username', 'sign in', 'تسجيل الدخول', 'المصادقة', 'بيانات الاعتماد', 'كلمة المرور', 'اسم المستخدم']
    },
    { 
      id: 'dashboard', 
      label: getTranslation('Dashboard'), 
      description: getTranslation('Overview and main dashboard features'),
      keywords: ['dashboard', 'overview', 'statistics', 'charts', 'job orders', 'filter', 'table', 'actions', 'لوحة المعلومات', 'نظرة عامة', 'إحصائيات', 'الرسوم البيانية', 'طلبات العمل', 'تصفية', 'جدول', 'إجراءات']
    },
    // Add more pages as you create more help components
  ], [language, getTranslation]); // Only recreate when language changes
  
  // Filter pages based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPages(allHelpPages);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = allHelpPages.filter(page => 
      page.label.toLowerCase().includes(query) || 
      page.description.toLowerCase().includes(query) ||
      page.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
    
    setFilteredPages(filtered);
  }, [searchQuery, allHelpPages]); // Removed language from dependencies
  
  // Update active page when currentPage prop changes
  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
    }
  }, [currentPage]);
  
  // Function to render the appropriate help content
  const renderHelpContent = () => {
    switch (activePage) {
      case 'login':
        return <LoginHelp />;
      case 'dashboard':
        return <DashboardHelp />;
      // Add more cases as you create more help components
      default:
        return (
          <div className="help-not-found">
            <div className="help-not-found-icon">❓</div>
            <h2>{getTranslation('Help content not found')}</h2>
            <p>{getTranslation('The help content for')} "{activePage}" {getTranslation('is not available yet.')}</p>
            <button 
              className="help-back-button"
              onClick={() => setActivePage('login')}
            >
              {getTranslation('Go to Login Help')}
            </button>
          </div>
        );
    }
  };
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC key to close help
      if (e.key === 'Escape') {
        onClose();
      }
      
      // CTRL+F or CMD+F for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && e.target.id !== 'help-search') {
        e.preventDefault();
        document.getElementById('help-search').focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  // Track scroll position in content area
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleContentScroll = (e) => {
    if (e.target.scrollTop > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  return (
    <div className={`help-modal ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="help-modal-content">
        <div className={`help-header ${isScrolled ? 'header-shadow' : ''}`}>
          <h2>{getTranslation('KPTC Help Center')}</h2>
          <div className="help-header-actions">
            <button 
              className="help-language-btn" 
              onClick={toggleLanguage}
              title={getTranslation('Switch Language')}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <button 
              className="help-print-btn" 
              onClick={() => window.print()}
              title={getTranslation('Print help content')}
            >
              🖨️
            </button>
            <button 
              className="help-close-btn" 
              onClick={onClose}
              title={getTranslation('Close help')}
            >
              &times;
            </button>
          </div>
        </div>
        
        <div className="help-body">
          <div className="help-sidebar">
            <div className="help-search">
              <input
                id="help-search"
                type="text"
                placeholder={getTranslation('Search help topics...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchQuery('')}
                  title={getTranslation('Clear search')}
                >
                  &times;
                </button>
              )}
            </div>
            
            <h3>{getTranslation('Help Topics')}</h3>
            {filteredPages.length === 0 ? (
              <div className="no-results">{getTranslation('No matching topics found')}</div>
            ) : (
              <ul className="help-topics-list">
                {filteredPages.map(page => (
                  <li 
                    key={page.id} 
                    className={activePage === page.id ? 'active' : ''}
                    onClick={() => setActivePage(page.id)}
                  >
                    <div className="topic-name">{page.label}</div>
                    <div className="topic-description">{page.description}</div>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="sidebar-footer">
              <div className="keyboard-shortcuts">
                <h4>{getTranslation('Keyboard Shortcuts')}</h4>
                <ul className="shortcuts-list">
                  <li><strong>Esc</strong> - {getTranslation('Close help')}</li>
                  <li><strong>Ctrl+F</strong> - {getTranslation('Search')}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="help-content" onScroll={handleContentScroll}>
            {renderHelpContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpContainer; 