import { createContext, useState, useContext, useEffect } from 'react';

// Import modular translations
import coreTranslations from './translations/core';
import loginHelpTranslations from './translations/loginHelp';
import dashboardHelpTranslations from './translations/dashboardHelp';
import helpContainerTranslations from './translations/helpContainer';
import helpTestPageTranslations from './translations/helpTestPage';
import mediaViewerTranslations from './translations/mediaViewer';
import moiHelpTranslations from './translations/moiHelp';
import qcInspectorHelpTranslations from './translations/qcInspectorHelp';

// Create the context
const HelpLanguageContext = createContext();

export const HelpLanguageProvider = ({ children }) => {
  // Get stored language or default to English
  const [language, setLanguage] = useState(
    localStorage.getItem('kptc_help_lang') || 'en'
  );

  // Translation function
  const getTranslation = (key, module = null) => {
    if (language === 'en') return key;
    
    // If module is specified, look in that module first
    if (module) {
      const moduleTranslations = getModuleTranslations(module);
      if (moduleTranslations[key]?.ar) {
        return moduleTranslations[key].ar;
      }
    }
    
    // Otherwise, search in all modules
    const translations = {
      ...coreTranslations,
      ...loginHelpTranslations,
      ...dashboardHelpTranslations,
      ...helpContainerTranslations, 
      ...helpTestPageTranslations,
      ...mediaViewerTranslations,
      ...moiHelpTranslations,
      ...qcInspectorHelpTranslations
    };
    
    return translations[key]?.ar || key;
  };
  
  // Function to get translations for a specific module
  const getModuleTranslations = (moduleName) => {
    switch (moduleName) {
      case 'core': return coreTranslations;
      case 'loginHelp': return loginHelpTranslations;
      case 'dashboardHelp': return dashboardHelpTranslations;
      case 'helpContainer': return helpContainerTranslations;
      case 'helpTestPage': return helpTestPageTranslations;
      case 'mediaViewer': return mediaViewerTranslations;
      case 'moiHelp': return moiHelpTranslations;
      case 'qcInspectorHelp': return qcInspectorHelpTranslations;
      default: return {};
    }
  };
  
  // Function to search across all help content
  const searchHelpContent = (query) => {
    if (!query || query.trim() === '') {
      return [];
    }
    
    const searchQuery = query.toLowerCase().trim();
    const results = [];
    
    // Track pages we've already added to prevent duplicates
    const addedPages = new Set();
    
    // Define mappings between modules and page identifiers
    const moduleToPage = {
      'loginHelp': 'login',
      'dashboardHelp': 'dashboard',
      'moiHelp': 'moiJobCard',
      'qcInspectorHelp': 'qcInspector'
    };
    
    // Helper function to add a unique result
    const addUniqueResult = (result) => {
      // Only add if we haven't added this page yet or if it's a high-relevance match
      if (!addedPages.has(result.page) || result.relevance >= 5) {
        results.push(result);
        addedPages.add(result.page);
      }
    };
    
    // Check for direct component references like @LoginHelp.jsx or @DashboardHelp.jsx
    if (searchQuery.startsWith('@') || searchQuery.includes('.jsx')) {
      const normalizedQuery = searchQuery.replace('@', '').replace('.jsx', '').toLowerCase();
      
      // Check for specific component names
      if (normalizedQuery.includes('login') || normalizedQuery === 'loginhelp') {
        addUniqueResult({
          id: 'direct-login',
          page: 'login',
          title: 'Login Help',
          content: 'Authentication and login process guide',
          match: 'Direct component reference: LoginHelp',
          relevance: 10 // Highest priority for direct component references
        });
      }
      
      if (normalizedQuery.includes('dashboard') || normalizedQuery === 'dashboardhelp') {
        addUniqueResult({
          id: 'direct-dashboard',
          page: 'dashboard',
          title: 'Dashboard Help',
          content: 'Dashboard features and usage guide',
          match: 'Direct component reference: DashboardHelp',
          relevance: 10 // Highest priority for direct component references
        });
      }
      
      if (normalizedQuery.includes('moi') || normalizedQuery === 'moijobcardhelp') {
        addUniqueResult({
          id: 'direct-moi',
          page: 'moiJobCard',
          title: 'MOI Job Card Help',
          content: 'MOI job card management guide',
          match: 'Direct component reference: MOIJobCardHelp',
          relevance: 10 // Highest priority for direct component references
        });
      }
      
      if (normalizedQuery.includes('qcinspector') || normalizedQuery === 'qcinspectorhelp') {
        addUniqueResult({
          id: 'direct-qcinspector',
          page: 'qcInspector',
          title: 'QC Inspector Assignment Help',
          content: 'QC Inspector assignment guide',
          match: 'Direct component reference: QCInspectorHelp',
          relevance: 10 // Highest priority for direct component references
        });
      }
      
      // If we found direct matches, return them immediately
      if (results.length > 0) {
        return results;
      }
    }
    
    // Search function for each module
    const searchModule = (module, moduleName) => {
      const page = moduleToPage[moduleName];
      const moduleMatches = [];
      
      // Search through all translations in this module
      Object.entries(module).forEach(([key, value]) => {
        // Check English text
        if (key.toLowerCase().includes(searchQuery)) {
          moduleMatches.push({
            id: `${page}-${key}`,
            page,
            title: getTranslationForSearch(page, moduleName),
            content: key,
            match: key,
            relevance: 2 // Match in English
          });
        }
        
        // Check Arabic text
        if (value.ar && value.ar.toLowerCase().includes(searchQuery)) {
          moduleMatches.push({
            id: `${page}-ar-${key}`,
            page,
            title: getTranslationForSearch(page, moduleName),
            content: value.ar,
            match: value.ar,
            relevance: 2 // Match in Arabic
          });
        }
      });
      
      // Add the best match for this module
      if (moduleMatches.length > 0) {
        moduleMatches.sort((a, b) => b.relevance - a.relevance);
        addUniqueResult(moduleMatches[0]);
      }
    };
    
    // Helper function to get the title for a help page
    const getTranslationForSearch = (page, moduleName) => {
      switch (page) {
        case 'login': return getTranslation('Login Help', moduleName);
        case 'dashboard': return getTranslation('Dashboard Help', moduleName);
        case 'moiJobCard': return getTranslation('MOI Job Card Help', moduleName);
        case 'qcInspector': return getTranslation('QC Inspector Assignment Help', moduleName);
        default: return page.charAt(0).toUpperCase() + page.slice(1) + ' Help';
      }
    };
    
    // Search in all modules
    searchModule(loginHelpTranslations, 'loginHelp');
    searchModule(dashboardHelpTranslations, 'dashboardHelp');
    searchModule(moiHelpTranslations, 'moiHelp');
    searchModule(qcInspectorHelpTranslations, 'qcInspectorHelp');
    
    // If no results but we have a general query, provide helpful options
    if (results.length === 0) {
      if (searchQuery.includes('password') || searchQuery.includes('user') || 
          searchQuery.includes('authenticate') || searchQuery.includes('sign')) {
        addUniqueResult({
          id: 'fallback-login',
          page: 'login',
          title: 'Login Help',
          content: 'Authentication and account access',
          match: null,
          relevance: 3
        });
      }
      
      if (searchQuery.includes('chart') || searchQuery.includes('stat') || 
          searchQuery.includes('metric') || searchQuery.includes('data')) {
        addUniqueResult({
          id: 'fallback-dashboard',
          page: 'dashboard',
          title: 'Dashboard Help',
          content: 'Dashboard analytics and visualization',
          match: null,
          relevance: 3
        });
      }

      if (searchQuery.includes('moi') || searchQuery.includes('job') || 
          searchQuery.includes('card') || searchQuery.includes('vehicle') ||
          searchQuery.includes('service')) {
        addUniqueResult({
          id: 'fallback-moi',
          page: 'moiJobCard',
          title: 'MOI Job Card Help',
          content: 'Vehicle maintenance and job card management',
          match: null,
          relevance: 3
        });
      }
      
      if (searchQuery.includes('qc') || searchQuery.includes('inspector') || 
          searchQuery.includes('quality') || searchQuery.includes('assign') ||
          searchQuery.includes('control')) {
        addUniqueResult({
          id: 'fallback-qcinspector',
          page: 'qcInspector',
          title: 'QC Inspector Assignment Help',
          content: 'Quality Control Inspector assignment and management',
          match: null,
          relevance: 3
        });
      }
    }
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    // Return results (limit to 3 for cleaner UI)
    return results.slice(0, 3);
  };

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('kptc_help_lang', language);
  }, [language]);

  return (
    <HelpLanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      getTranslation,
      isRTL: language === 'ar',
      toggleLanguage,
      // Module-specific functions
      getModuleTranslations,
      // Search function
      searchHelpContent
    }}>
      {children}
    </HelpLanguageContext.Provider>
  );
};

// Custom hook to use the help language context
export const useHelpLanguage = () => useContext(HelpLanguageContext);

// Component-specific hooks
export const useLoginHelpTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'loginHelp')
  };
};

export const useDashboardHelpTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'dashboardHelp')
  };
};

export const useHelpContainerTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'helpContainer')
  };
};

export const useHelpTestPageTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'helpTestPage')
  };
};

export const useMediaViewerTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'mediaViewer')
  };
};

export const useMoiHelpTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'moiHelp')
  };
};

export const useQCInspectorHelpTranslations = () => {
  const context = useHelpLanguage();
  
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'qcInspectorHelp')
  };
};

export default HelpLanguageContext; 