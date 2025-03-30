/**
 * This is an example file showing how to integrate the help system
 * into any component in your application.
 * DO NOT INCLUDE THIS FILE IN PRODUCTION - IT'S JUST FOR REFERENCE.
 */

import React from 'react';
import { 
  useHelp, 
  HelpContainer, 
  MediaViewer, 
  useLoginHelpTranslations,
  useDashboardHelpTranslations
} from './index';

// Example Login Component
const LoginExample = () => {
  // Use the help hook with 'login' as the default page
  const { isHelpOpen, openHelp, closeHelp, currentHelpPage } = useHelp('login');
  // Use component-specific translations for login
  const { getTranslation } = useLoginHelpTranslations();

  return (
    <div className="login-page">
      {/* Login form content */}
      <div className="login-form">
        <h1>KPTC Login</h1>
        <form>
          <div className="form-group">
            <label>{getTranslation('User Name')}</label>
            <input type="text" placeholder={getTranslation('Enter username')} />
          </div>
          <div className="form-group">
            <label>{getTranslation('Password')}</label>
            <input type="password" placeholder={getTranslation('Enter password')} />
          </div>
          <button type="submit">{getTranslation('Login')}</button>
        </form>
        
        {/* Help button */}
        <button 
          className="help-button" 
          onClick={() => openHelp('login')}
          aria-label={getTranslation('Get help with login')}
        >
          {getTranslation('Need Help?')} <span className="help-icon">?</span>
        </button>
      </div>

      {/* Render the help container only when help is open */}
      {isHelpOpen && (
        <HelpContainer 
          currentPage={currentHelpPage} 
          onClose={closeHelp} 
        />
      )}
    </div>
  );
};

// Example App Component showing how to use the help system app-wide
const AppExample = () => {
  const { isHelpOpen, currentHelpPage, closeHelp } = useHelp();

  return (
    <div className="app">
      {/* Your app content */}
      
      {/* Global help modal */}
      {isHelpOpen && (
        <HelpContainer 
          currentPage={currentHelpPage} 
          onClose={closeHelp} 
        />
      )}
    </div>
  );
};

/**
 * This is an example component demonstrating how to use the help system
 * with media assets in your application.
 */
const ExampleComponent = () => {
  // Use the custom hook to manage help state
  const { openHelp } = useHelp();
  // Use dashboard-specific translations
  const { getTranslation } = useDashboardHelpTranslations();
  
  // Function to open help for a specific page
  const showLoginHelp = () => {
    openHelp('login');
  };
  
  const showDashboardHelp = () => {
    openHelp('dashboard');
  };
  
  return (
    <div className="example-container">
      <h1>KPTC Dashboard Example</h1>
      
      <div className="example-section">
        <h2>{getTranslation('Using the Help System')}</h2>
        <p>
          {getTranslation('The KPTC Dashboard includes a comprehensive help system with step-by-step guides, screenshots, and instructional videos.')}
        </p>
        
        <div className="example-buttons">
          <button onClick={showLoginHelp} className="help-button">
            {getTranslation('Show Login Help')}
          </button>
          
          <button onClick={showDashboardHelp} className="help-button">
            {getTranslation('Show Dashboard Help')}
          </button>
        </div>
      </div>
      
      <div className="example-section">
        <h2>Adding Media to Your Own Help Content</h2>
        <p>
          When creating your own help content, you can use the MediaViewer component
          to include images and videos:
        </p>
        
        <div className="code-example">
          <pre>
{`// Import the MediaViewer component and translation hook
import { MediaViewer, useMediaViewerTranslations } from './help';

// In your component
const { getTranslation, isRTL } = useMediaViewerTranslations();

// For images
<MediaViewer 
  src="/assets/help/your_image.png"
  type="image"
  caption={getTranslation("Description of the image")}
  alt={getTranslation("Alternative text for accessibility")}
/>

// For videos
<MediaViewer 
  src="/assets/help/your_video.mp4"
  type="video"
  caption={getTranslation("Description of what the video demonstrates")}
/>`}
          </pre>
        </div>
      </div>
      
      <div className="example-section">
        <h2>{getTranslation('Keyboard Shortcuts')}</h2>
        <p>
          {getTranslation('Users can access help using these keyboard shortcuts:')}
        </p>
        <ul className="shortcut-list">
          <li><strong>F1</strong> {getTranslation('or')} <strong>Alt+H</strong> - {getTranslation('Open help modal')}</li>
          <li><strong>Esc</strong> - {getTranslation('Close help modal')}</li>
          <li><strong>Ctrl+F</strong> - {getTranslation('Search within help content')}</li>
        </ul>
      </div>
      
      <div className="example-section">
        <h2>{getTranslation('Integrating Help in Your Components')}</h2>
        <p>
          {getTranslation('To add context-sensitive help to any component:')}
        </p>
        <ol className="integration-steps">
          <li>{getTranslation('Import the')} <code>useHelp</code> {getTranslation('hook and component-specific translation hook')}</li>
          <li>{getTranslation('Use the')} <code>openHelp</code> {getTranslation('function with the appropriate page ID')}</li>
          <li>{getTranslation('Add help buttons or keyboard shortcuts as needed')}</li>
        </ol>
        <p>
          {getTranslation('The help system will automatically show the relevant content for the current context.')}
        </p>
      </div>
    </div>
  );
};

export default ExampleComponent; 