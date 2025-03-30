// Import components
import HelpContainer from './HelpContainer';
import LoginHelp from './login/LoginHelp';
import DashboardHelp from './dashboard/DashboardHelp';
import MediaViewer from './MediaViewer';

// Import hooks and context
import useHelp from './useHelp';
import { 
  HelpLanguageProvider, 
  useHelpLanguage,
  useLoginHelpTranslations,
  useDashboardHelpTranslations,
  useHelpContainerTranslations,
  useHelpTestPageTranslations,
  useMediaViewerTranslations
} from './context/HelpLanguageContext';

// Import global styles
import './help.css';

// Export components
export {
  HelpContainer,
  LoginHelp,
  DashboardHelp,
  MediaViewer,
  useHelp,
  HelpLanguageProvider,
  useHelpLanguage,
  // Export component-specific hooks
  useLoginHelpTranslations,
  useDashboardHelpTranslations,
  useHelpContainerTranslations,
  useHelpTestPageTranslations,
  useMediaViewerTranslations
}; 