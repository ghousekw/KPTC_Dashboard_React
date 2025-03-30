import { createContext, useState, useContext, useEffect } from 'react';

// Import modular translations
import coreTranslations from './translations/core';
import loginHelpTranslations from './translations/loginHelp';
import dashboardHelpTranslations from './translations/dashboardHelp';
import helpContainerTranslations from './translations/helpContainer';
import helpTestPageTranslations from './translations/helpTestPage';
import mediaViewerTranslations from './translations/mediaViewer';

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
      ...mediaViewerTranslations
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
      // Add more mappings as you add more help pages
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
      
      // If we found direct matches, return them immediately
      if (results.length > 0) {
        return results;
      }
    }
    
    // Search function for each module
    const searchModule = (module, moduleName) => {
      const page = moduleToPage[moduleName];
      if (!page) return;
      
      // Collect all matches for this module
      const moduleMatches = [];
      
      // Special case - check for exact module name in the query
      // Only match exact module name references, not partial ones
      if ((searchQuery === moduleName.toLowerCase()) || 
          (moduleName === 'loginHelp' && searchQuery === 'login') ||
          (moduleName === 'dashboardHelp' && searchQuery === 'dashboard')) {
        moduleMatches.push({
          id: `${page}-exact-match`,
          page,
          title: getTranslationForSearch(page, moduleName),
          content: moduleName === 'loginHelp' 
            ? 'Authentication and login process guide' 
            : 'Dashboard features and analytics',
          match: null, // Hide the "module reference" text
          relevance: 5 // High priority for module name matches
        });
      }
      
      // Search in translation keys (collect the best matches)
      const searchableKeys = Object.keys(module).filter(key => 
        // Only include meaningful keys (longer than 3 chars)
        key.length > 3 && 
        // Filter out very generic keys
        !['the', 'and', 'for', 'with'].includes(key.toLowerCase())
      );
      
      searchableKeys.forEach((key, index) => {
        if (key.toLowerCase().includes(searchQuery)) {
          moduleMatches.push({
            id: `${page}-key-${index}`,
            page,
            title: getTranslationForSearch(page, moduleName),
            content: key,
            match: null, // Hide the "found match" text
            relevance: key.toLowerCase() === searchQuery ? 4 : 2 // Higher for exact match
          });
        }
      });
      
      // Search in Arabic translations
      Object.entries(module).forEach(([key, value], index) => {
        if (value.ar && value.ar.toLowerCase().includes(searchQuery)) {
          moduleMatches.push({
            id: `${page}-ar-${index}`,
            page,
            title: getTranslationForSearch(page, moduleName),
            content: value.ar,
            match: null, // Hide the match text
            relevance: 1 // Match in translation
          });
        }
      });
      
      // Add the best match for this module
      if (moduleMatches.length > 0) {
        // Sort by relevance
        moduleMatches.sort((a, b) => b.relevance - a.relevance);
        // Add the best match
        addUniqueResult(moduleMatches[0]);
      } else if (searchQuery === 'login' && moduleName === 'loginHelp') {
        // Special case - always show Login Help for "login" query
        addUniqueResult({
          id: `${page}-default-match`,
          page,
          title: getTranslationForSearch(page, moduleName),
          content: 'Login authentication and access instructions',
          match: null,
          relevance: 3
        });
      }
    };
    
    // Helper function to get the title for a help page
    const getTranslationForSearch = (page, moduleName) => {
      switch (page) {
        case 'login': return getTranslation('Login Help', moduleName);
        case 'dashboard': return getTranslation('Dashboard Help', moduleName);
        default: return page.charAt(0).toUpperCase() + page.slice(1) + ' Help';
      }
    };
    
    // Search in all modules
    searchModule(loginHelpTranslations, 'loginHelp');
    searchModule(dashboardHelpTranslations, 'dashboardHelp');
    // Add more modules as needed
    
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

export default HelpLanguageContext; 