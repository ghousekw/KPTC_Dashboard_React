import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling help functionality
 * @param {string} defaultPage - The default help page to show
 * @returns {Object} Help state and functions
 */
const useHelp = (defaultPage = 'login') => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentHelpPage, setCurrentHelpPage] = useState(defaultPage);

  // Open help modal
  const openHelp = useCallback((page = null) => {
    if (page) {
      setCurrentHelpPage(page);
    }
    setIsHelpOpen(true);
    // Add a class to body to prevent scrolling when help is open
    document.body.classList.add('help-modal-open');
  }, []);

  // Close help modal
  const closeHelp = useCallback(() => {
    setIsHelpOpen(false);
    // Remove the class from body
    document.body.classList.remove('help-modal-open');
  }, []);

  // Toggle help modal
  const toggleHelp = useCallback((page = null) => {
    if (isHelpOpen) {
      closeHelp();
    } else {
      openHelp(page);
    }
  }, [isHelpOpen, openHelp, closeHelp]);

  // Add keyboard shortcut for help (F1 or Alt+H)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F1 key (common help key) or Alt+H
      if (e.key === 'F1' || (e.altKey && e.key.toLowerCase() === 'h')) {
        e.preventDefault();
        toggleHelp();
      }
      // Escape key to close help if open
      if (e.key === 'Escape' && isHelpOpen) {
        closeHelp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHelpOpen, toggleHelp, closeHelp]);

  return {
    isHelpOpen,
    currentHelpPage,
    openHelp,
    closeHelp,
    toggleHelp,
    setCurrentHelpPage
  };
};

export default useHelp; 