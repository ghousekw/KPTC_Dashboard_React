import React from 'react';
import { MediaViewer, useLoginHelpTranslations } from '../index';
import './LoginHelp.css';

// Import login screen assets - these paths should be updated to your actual assets
const loginScreenshot = '/assets/help/login_screen.png';
const passwordVisibilityVideo = '/assets/help/password_visibility.mp4';

const LoginHelp = () => {
  // Get component-specific translations
  const { language, getTranslation, isRTL } = useLoginHelpTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="help-title">{getTranslation('Login Page Help')}</h1>
      
      <div className="help-section">
        <div className="help-intro">
          <h2>{getTranslation('Getting Started')}</h2>
          <p>
            {getTranslation('Welcome to the KPTC Dashboard login page. This guide will walk you through each step of the login process.')}
          </p>
          
          <MediaViewer 
            src={loginScreenshot}
            type="image"
            caption={getTranslation('The KPTC Dashboard login screen')}
            alt={getTranslation('The KPTC Dashboard login screen')}
          />
        </div>
      </div>

      <div className="help-workflow">
        <h2>{getTranslation('Login Process Overview')}</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">{getTranslation('Enter Username')}</div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">{getTranslation('Enter Password')}</div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">{getTranslation('Click Login')}</div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="step-number">4</div>
            <div className="step-content">{getTranslation('Access Dashboard')}</div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Step-by-Step Login Guide')}</h2>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Step 1')}</div>
            <h3>{getTranslation('Enter Your Username')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('Find the "User Name" field at the top of the login form.')}</p>
            <div className="step-instruction">
              <ol className="instruction-list">
                <li>{getTranslation('Look for the first input field labeled "User Name"')}</li>
                <li>{getTranslation('Click inside the field to activate it')}</li>
                <li>{getTranslation('Type your assigned username')}</li>
              </ol>
            </div>
            <div className="help-note">
              <span className="help-icon">ℹ️</span> {getTranslation('Your username is typically assigned by your system administrator and is case-sensitive.')}
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Step 2')}</div>
            <h3>{getTranslation('Enter Your Password')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('Next, enter your password in the password field.')}</p>
            <div className="step-instruction">
              <ol className="instruction-list">
                <li>{getTranslation('Click in the password field (located below the username field)')}</li>
                <li>{getTranslation('Type your password')}</li>
                <li>
                  {isRTL ? (
                    <>{getTranslation('Show/Hide Password: If you need to verify what you\'ve typed, click the eye icon at the right side of the password field to show your password')} <span className="icon-example">👁️</span></>
                  ) : (
                    <><strong>Show/Hide Password:</strong> If you need to verify what you've typed, click the eye icon 
                    <span className="icon-example">👁️</span> at the right side of the password field to show your password</>
                  )}
                </li>
              </ol>
            </div>
            
            <MediaViewer 
              src={passwordVisibilityVideo}
              type="video"
              caption={getTranslation('How to show/hide your password using the visibility toggle')}
            />
            
            <div className="help-note">
              <span className="help-icon">🔒</span> {getTranslation('Your password is hidden for security purposes. Make sure no one can see your screen while entering your password.')}
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Step 3')}</div>
            <h3>{getTranslation('Click the Login Button')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('After entering your credentials, click the "Login" button to access the system.')}</p>
            <div className="step-instruction">
              <ol className="instruction-list">
                <li>{getTranslation('Verify that you\'ve entered both your username and password correctly')}</li>
                <li>{getTranslation('Click the blue "Login" button located below the password field')}</li>
                <li>{getTranslation('Wait for the system to authenticate your credentials')}</li>
              </ol>
            </div>
            <div className="help-note">
              <span className="help-icon">⏱️</span> {getTranslation('The authentication process usually takes a few seconds. Please be patient.')}
            </div>
          </div>
        </div>
        
        <div className="help-step">
          <div className="step-header">
            <div className="step-badge">{getTranslation('Step 4')}</div>
            <h3>{getTranslation('Access the Dashboard')}</h3>
          </div>
          <div className="step-content">
            <p>{getTranslation('After successful authentication, you\'ll be redirected to the KPTC Dashboard.')}</p>
            <div className="step-instruction">
              <ol className="instruction-list">
                <li>{getTranslation('Verify that you can see the dashboard with various statistics and menu items')}</li>
                <li>{getTranslation('Check the top-right corner to confirm you\'re logged in with your username')}</li>
                <li>{getTranslation('Begin using the system!')}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Troubleshooting Login Issues')}</h2>
        
        <div className="common-problems">
          <div className="problem-item">
            <h4>{getTranslation('Incorrect Username or Password')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('You see an error message stating "Invalid credentials" or "Login failed".')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Double-check that Caps Lock is not enabled')}</li>
                <li>{getTranslation('Verify your username spelling')}</li>
                <li>{getTranslation('Make sure you\'re using the most recent password')}</li>
                <li>{getTranslation('If problems persist, use the "Forgot Password" option or contact the administrator')}</li>
              </ol>
            </div>
          </div>
          
          <div className="problem-item">
            <h4>{getTranslation('Account Locked')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('Error message indicates your account is locked.')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Wait for approximately 15 minutes before trying again')}</li>
                <li>{getTranslation('If you still can\'t log in, contact your system administrator to unlock your account')}</li>
              </ol>
            </div>
          </div>
          
          <div className="problem-item">
            <h4>{getTranslation('Connection Issues')}</h4>
            <div className="problem-solution">
              <p><strong>{getTranslation('Problem:')}</strong> {getTranslation('Login page loads slowly or doesn\'t respond when clicking "Login".')}</p>
              <p><strong>{getTranslation('Solution:')}</strong></p>
              <ol>
                <li>{getTranslation('Check your internet connection')}</li>
                <li>{getTranslation('Refresh the page (usually F5 or browser refresh button)')}</li>
                <li>{getTranslation('Try clearing your browser cache')}</li>
                <li>{getTranslation('If using a VPN, check if it\'s working properly')}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Security Tips')}</h2>
        <div className="security-tips">
          <div className="security-tip">
            <div className="tip-icon">🔐</div>
            <div className="tip-content">
              <h4>{getTranslation('Create a Strong Password')}</h4>
              <p>{getTranslation('Use a combination of uppercase and lowercase letters, numbers, and special characters.')}</p>
            </div>
          </div>
          
          <div className="security-tip">
            <div className="tip-icon">🔄</div>
            <div className="tip-content">
              <h4>{getTranslation('Change Your Password Regularly')}</h4>
              <p>{getTranslation('Update your password every 90 days for enhanced security.')}</p>
            </div>
          </div>
          
          <div className="security-tip">
            <div className="tip-icon">🛑</div>
            <div className="tip-content">
              <h4>{getTranslation('Never Share Your Credentials')}</h4>
              <p>{getTranslation('Do not share your login information with anyone, including colleagues.')}</p>
            </div>
          </div>
          
          <div className="security-tip">
            <div className="tip-icon">🚪</div>
            <div className="tip-content">
              <h4>{getTranslation('Always Log Out')}</h4>
              <p>{getTranslation('Click the "Logout" button when you finish using the system, especially on shared computers.')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h2>{getTranslation('Need Further Assistance?')}</h2>
        <p>
          {getTranslation('If you continue to experience issues with the login process, please contact the IT support team:')}
        </p>
        <div className="help-contact">
          <p><strong>{getTranslation('Email:')}</strong> support.kptc@telox-gcc.com</p>
          <p><strong>{getTranslation('Phone:')}</strong> +965 92245954</p>
          <p><strong>{getTranslation('Working Hours:')}</strong> {getTranslation('Sunday-Thursday, 8:00 AM - 4:00 PM')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHelp; 