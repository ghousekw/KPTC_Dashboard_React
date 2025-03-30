import React, { useState } from 'react';
import { useMediaViewerTranslations } from './context/HelpLanguageContext';
import './MediaViewer.css';

/**
 * MediaViewer component for displaying images and videos in the help system
 * @param {Object} props Component props
 * @param {string} props.src Source URL of the media
 * @param {string} props.type Type of media ('image' or 'video')
 * @param {string} props.caption Optional caption for the media
 * @param {string} props.alt Alternative text for images (accessibility)
 * @returns {JSX.Element} MediaViewer component
 */
const MediaViewer = ({ src, type = 'image', caption, alt }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getTranslation, isRTL } = useMediaViewerTranslations();

  const handleLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderMedia = () => {
    if (type === 'video') {
      return (
        <video 
          controls
          onLoadedData={handleLoad}
          className={isLoading ? 'loading' : ''}
        >
          <source src={src} type="video/mp4" />
          {getTranslation('Your browser does not support the video tag.')}
        </video>
      );
    } else {
      // Default to image
      return (
        <img 
          src={src} 
          alt={alt || caption || getTranslation('Help screenshot')} 
          onLoad={handleLoad}
          className={isLoading ? 'loading' : ''}
        />
      );
    }
  };

  return (
    <div className={`media-viewer ${isFullscreen ? 'fullscreen' : ''} ${isRTL ? 'rtl' : ''}`}>
      <div className="media-container">
        {isLoading && (
          <div className="loading-indicator">
            {getTranslation('Loading media...')}
          </div>
        )}
        {renderMedia()}
        
        <div className="media-controls">
          <button 
            className="fullscreen-toggle" 
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? getTranslation('Exit full screen') : getTranslation('Full screen')}
          >
            {isFullscreen ? '↙' : '↗'}
          </button>
        </div>
      </div>
      
      {caption && (
        <div className="media-caption">
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default MediaViewer; 