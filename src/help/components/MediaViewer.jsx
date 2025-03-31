import React, { useState, useRef, useEffect } from 'react';
import { isYouTubeUrl, getYouTubeVideoId } from '../config/videoUrls';
import './MediaViewer.css';

const MediaViewer = ({ src, type, caption, alt }) => {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setLoadError(false);
    setIsLoading(true);
    setVideoError(null);
  }, [src]);

  const handleLoadError = (error) => {
    console.error('Media load error:', error);
    setLoadError(true);
    setIsLoading(false);
    if (error?.target?.error) {
      const errorCode = error.target.error.code;
      let errorMessage = 'Unable to load the video.';
      switch (errorCode) {
        case 1:
          errorMessage = 'Video loading was aborted.';
          break;
        case 2:
          errorMessage = 'Network error occurred while loading the video.';
          break;
        case 3:
          errorMessage = 'Video decoding failed. The file might be corrupted.';
          break;
        case 4:
          errorMessage = 'Video is not supported. Please try a different format.';
          break;
        default:
          errorMessage = 'An error occurred while loading the video.';
      }
      setVideoError(errorMessage);
    }
  };

  const handleLoadSuccess = () => {
    setIsLoading(false);
    setVideoError(null);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const getVideoUrl = (videoSrc) => {
    // If the URL is already absolute (YouTube or other external URL), return it
    if (videoSrc.startsWith('http://') || videoSrc.startsWith('https://')) {
      return videoSrc;
    }
    
    // For local files, ensure they start with a forward slash
    return videoSrc.startsWith('/') ? videoSrc : `/${videoSrc}`;
  };

  const renderContent = () => {
    if (type === 'video') {
      if (isYouTubeUrl(src)) {
        const videoId = getYouTubeVideoId(src);
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        if (loadError) {
          return (
            <div className="youtube-container">
              <div className="youtube-fallback">
                <div className="error-message">
                  <p>⚠️ The video player could not be loaded</p>
                  <p>Please disable your ad blocker or click below to watch the video:</p>
                  <div className="direct-link">
                    <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="youtube-container">
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&origin=${window.location.origin}&enablejsapi=1`}
                title={caption || "YouTube video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={handleLoadError}
                onLoad={handleLoadSuccess}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
              ></iframe>
            </div>
            <div className="direct-link">
              <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                Watch on YouTube
              </a>
            </div>
          </div>
        );
      }

      // Local video
      const videoUrl = getVideoUrl(src);
      return (
        <div className="local-video-container">
          <div className={`video-wrapper ${isLoading ? 'loading' : ''}`}>
            {isLoading && <div className="loading-spinner"></div>}
            <video
              ref={videoRef}
              controls
              onError={handleLoadError}
              onLoadedData={handleLoadSuccess}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              playsInline
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {loadError && (
              <div className="error-message">
                <p>⚠️ {videoError || 'Unable to load the video'}</p>
                <p>Please try the following:</p>
                <ul className="error-suggestions">
                  <li>Check your internet connection</li>
                  <li>Try refreshing the page</li>
                  <li>Use a different browser</li>
                  <li>Download the video to watch offline</li>
                </ul>
                <div className="direct-link">
                  <a href={videoUrl} download>
                    Download Video
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Image
    const imageUrl = getVideoUrl(src);
    return (
      <div className={`image-wrapper ${isLoading ? 'loading' : ''}`}>
        {isLoading && <div className="loading-spinner"></div>}
        <img 
          src={imageUrl} 
          alt={alt || caption} 
          onError={handleLoadError}
          onLoad={handleLoadSuccess}
        />
        {loadError && (
          <div className="error-message">
            <p>⚠️ Unable to load the image</p>
            <p>The image file might be missing or in an unsupported format.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="media-viewer">
      {renderContent()}
      {caption && <div className="media-caption">{caption}</div>}
    </div>
  );
};

export default MediaViewer;
