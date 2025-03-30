import React, { useState, useEffect } from 'react';
import { 
  useHelp, 
  useHelpTestPageTranslations,
  useHelpLanguage,
  HelpContainer 
} from './help';
import './styles/HelpTestPage.css';

const HelpTestPage = ({ onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeHelpPage, setActiveHelpPage] = useState(null);
  
  // Simple search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showTip, setShowTip] = useState(false);
  
  // Get context for translations and search
  const { searchHelpContent } = useHelpLanguage();
  const { language, toggleLanguage, isRTL, getTranslation } = useHelpTestPageTranslations();

  // Handle help card click
  const handleHelpCardClick = (pageId) => {
    setActiveHelpPage(pageId);
  };

  // Handle help close
  const handleHelpClose = () => {
    setActiveHelpPage(null);
  };
  
  // Hide tip when search results are showing
  useEffect(() => {
    if (searchResults.length > 0) {
      setShowTip(false);
    }
  }, [searchResults]);
  
  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
    // Clear results when input is cleared
    if (e.target.value === '') {
      setSearchResults([]);
    }
  };
  
  // Handle search input focus
  const handleSearchFocus = () => {
    // Only show tip if there are no search results
    if (searchResults.length === 0) {
      setShowTip(true);
    }
  };
  
  // Handle search input blur
  const handleSearchBlur = () => {
    // Use a short timeout to allow for clicking on search results
    setTimeout(() => {
      setShowTip(false);
    }, 150);
  };
  
  // Perform search when Enter is pressed or search button is clicked
  const performSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      // Handle special case for direct component references
      if (searchQuery.includes('@') || searchQuery.toLowerCase().includes('.jsx')) {
        const query = searchQuery.toLowerCase();
        
        if (query.includes('login')) {
          setActiveHelpPage('login');
          setSearchQuery('');
          return;
        }
        
        if (query.includes('dashboard')) {
          setActiveHelpPage('dashboard');
          setSearchQuery('');
          return;
        }

        if (query.includes('moi') || query.includes('jobcard') || query.includes('job card')) {
          setActiveHelpPage('moiJobCard');
          setSearchQuery('');
          return;
        }
      }
      
      // Normal search
      const results = searchHelpContent(searchQuery);
      setSearchResults(results);
      
      // Hide tip when showing results
      setShowTip(false);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback for errors
      setSearchResults([
        {
          id: 'error-fallback',
          page: 'login',
          title: 'Login Help',
          content: 'Search encountered an error',
          match: 'Fallback result'
        }
      ]);
    }
  };
  
  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };
  
  // Navigate to a help page from search results
  const navigateToResult = (page) => {
    setActiveHelpPage(page);
    setSearchResults([]);
    setSearchQuery('');
  };
  
  return (
    <div className="test-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="test-header">
        <div className="header-left">
          <button 
            className="back-button" 
            onClick={onBack}
            title={getTranslation('Back to Dashboard')}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <img src="assets/images/kptc-logo.png" alt="KPTC Logo" className="header-logo" />
        </div>
        <div className="branding">
          <h1>{getTranslation('KPTC Help Guide')}</h1>
          <span className="demo-version">{getTranslation('V1')}</span>
        </div>
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={getTranslation('Search help topics...')}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <button 
              className="search-button"
              onClick={performSearch}
              aria-label={getTranslation('Search')}
            >
              🔍
            </button>
            
            {/* Search tip tooltip - only show if no results */}
            {showTip && searchResults.length === 0 && (
              <div className="search-tip">
                <p>{getTranslation('Pro tip: Try searching with:')}</p>
                <code>@LoginHelp.jsx</code> {getTranslation('or')} <code>@DashboardHelp.jsx</code> {getTranslation('or')} <code>@MOIJobCardHelp.jsx</code>
              </div>
            )}
            
            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>{getTranslation('Search Results')}</h3>
                <ul>
                  {searchResults.map(result => (
                    <li key={result.id} onClick={() => navigateToResult(result.page)}>
                      <div className="result-title">{result.title}</div>
                      <div className="result-content">{result.content}</div>
                      {result.match && <div className="result-match">{result.match}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* No results message */}
            {searchQuery.trim() !== '' && searchResults.length === 0 && !showTip && (
              <div className="search-results">
                <p className="no-results">{getTranslation('No results found')}</p>
                <p className="search-hint">{getTranslation('Tip: Try using @LoginHelp.jsx or @DashboardHelp.jsx to directly access those modules.')}</p>
              </div>
            )}
          </div>
          
          <div className="language-toggle">
            <button 
              className="lang-toggle-btn" 
              onClick={toggleLanguage}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </header>
      
      <div className="test-container">
        <section className="test-section">
          <h2>{getTranslation('Help Topics')}</h2>
          <p>{getTranslation('Select a help topic to learn more about using the KPTC Dashboard.')}</p>
          
          <div className="help-cards-grid">
            <div 
              className="help-card" 
              onClick={() => handleHelpCardClick('login')}
              role="button"
              tabIndex={0}
            >
              <div className="help-card-icon">🔐</div>
              <h3>{getTranslation('Login Help')}</h3>
              <p>{getTranslation('Learn how to access the system and authenticate')}</p>
            </div>
            
            <div 
              className="help-card"
              onClick={() => handleHelpCardClick('dashboard')}
              role="button"
              tabIndex={0}
            >
              <div className="help-card-icon">📊</div>
              <h3>{getTranslation('Dashboard Help')}</h3>
              <p>{getTranslation('Understand the dashboard features and analytics')}</p>
            </div>
            
            <div 
              className="help-card"
              onClick={() => handleHelpCardClick('moiJobCard')}
              role="button"
              tabIndex={0}
            >
              <div className="help-card-icon">🚗</div>
              <h3>{getTranslation('MOI Job Card Help')}</h3>
              <p>{getTranslation('Learn how to manage MOI vehicle maintenance requests')}</p>
            </div>
            
            <div 
              className="help-card"
              onClick={() => handleHelpCardClick('test')}
              role="button"
              tabIndex={0}
            >
              <div className="help-card-icon">❓</div>
              <h3>{getTranslation('Test Not Found')}</h3>
              <p>{getTranslation('See what happens when help content is not available')}</p>
            </div>
          </div>
          
          <div className="help-info">
            <h3>{getTranslation('Keyboard Shortcuts')}</h3>
            <ul>
              <li><strong>F1</strong> {getTranslation('or')} <strong>Alt+H</strong> - {getTranslation('Toggle help')}</li>
              <li><strong>ESC</strong> - {getTranslation('Close help')}</li>
              <li><strong>Ctrl+F</strong> - {getTranslation('Search within help')}</li>
            </ul>
          </div>
        </section>
        
        {isMobile && (
          <div className="mobile-notice">
            <p>{getTranslation('You are viewing on a mobile device. The help system is responsive and will adjust to your screen size.')}</p>
          </div>
        )}
      </div>

      {/* Help Container Modal */}
      {activeHelpPage && (
        <HelpContainer
          currentPage={activeHelpPage}
          onClose={handleHelpClose}
        />
      )}
    </div>
  );
};

export default HelpTestPage;