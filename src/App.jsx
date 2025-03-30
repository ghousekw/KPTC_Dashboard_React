import './App.css';
import { useState, useEffect } from 'react';
import KPTCDashboard from './components/dashboard/KPTCDashboard.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { HelpLanguageProvider } from './help/context/HelpLanguageContext';
import HelpTestPage from './HelpTestPage';

function App() {
  const [showHelpPage, setShowHelpPage] = useState(false);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for F1 key or Alt+H
      if (event.key === 'F1' || (event.altKey && event.key.toLowerCase() === 'h')) {
        event.preventDefault(); // Prevent default browser behavior
        setShowHelpPage(prev => !prev); // Toggle help visibility
      }
      // Add Escape key to close help
      if (event.key === 'Escape' && showHelpPage) {
        setShowHelpPage(false);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showHelpPage]);

  // Function to toggle between dashboard and help page
  const toggleHelpPage = () => {
    setShowHelpPage(prev => !prev);
  };

  return (
    <LanguageProvider>
      <HelpLanguageProvider>
        {showHelpPage ? (
          // Show Help Page
          <HelpTestPage onBack={toggleHelpPage} />
        ) : (
          // Show Dashboard
          <KPTCDashboard onHelpClick={toggleHelpPage} />
        )}
      </HelpLanguageProvider>
    </LanguageProvider>
  );
}

export default App; 