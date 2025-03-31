import React from 'react';
import { isYouTubeUrl, getYouTubeVideoId } from '../config/videoUrls';
import './MediaViewer.css';

const MediaViewer = ({ src, type, caption, alt }) => {
  const renderContent = () => {
    if (type === 'video') {
      if (isYouTubeUrl(src)) {
        const videoId = getYouTubeVideoId(src);
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Thumbnail-based YouTube Embed
        return (
          <div className="youtube-container">
            <div className="youtube-fallback">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-thumbnail-link"
              >
                <img
                  className="youtube-thumbnail-image"
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                  alt={caption || 'Video thumbnail'}
                />
                <div className="youtube-play-button" />
                <div className="thumbnail-message">
                  <p>Click to watch video</p>
                </div>
              </a>
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
      return (
        <video controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    // Image
    return <img src={src} alt={alt || caption} />;
  };

  return (
    <div className="media-viewer">
      {renderContent()}
      {caption && <div className="media-caption">{caption}</div>}
    </div>
  );
};

export default MediaViewer;
