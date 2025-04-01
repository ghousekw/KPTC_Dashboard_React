// Video URL configuration for help content
export const helpVideos = {
  login: {
    passwordVisibility: {
      development: '/assets/help/password_visibility.mp4',
      production: 'https://www.youtube.com/embed/UEIpEmKxjOA'
    }
  },
  moi: {
    createJobCard: {
      development: {
        en: '/assets/help/moi/en/create_job_card.mp4',
        ar: '/assets/help/moi/ar/create_job_card.mp4'
      },
      production: {
        en: 'https://www.youtube.com/embed/A40_ZLpSMCg',
        ar: 'https://www.youtube.com/embed/nYdVBe4mZKo'
      }
    }
  },
  qcInspector: {
    assignInspector: {
      development: {
        en: '/assets/help/qcinspector/en/assign_inspector.mp4',
        ar: '/assets/help/qcinspector/ar/assign_inspector.mp4'
      },
      production: {
        en: 'https://www.youtube.com/embed/YZkvBzRuUn4',
        ar: 'https://www.youtube.com/embed/V0qOSHiDSkM'
      }
    }
  }
};

// Helper function to get the appropriate video URL based on environment and language
export const getVideoUrl = (section, video, language = 'en') => {
  // In production, always return YouTube URLs for help documentation
  if (import.meta.env.PROD) {
    return typeof helpVideos[section][video].production === 'object'
      ? helpVideos[section][video].production[language]
      : helpVideos[section][video].production;
  }

  // In development, use local files
  return typeof helpVideos[section][video].development === 'object'
    ? helpVideos[section][video].development[language]
    : helpVideos[section][video].development;
};

// Helper function to check if URL is a YouTube video
export const isYouTubeUrl = (url) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Helper function to get YouTube video ID
export const getYouTubeVideoId = (url) => {
  // Handle watch URLs
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1].split('&')[0];
  }
  
  // Handle embed URLs
  if (url.includes('/embed/')) {
    return url.split('/embed/')[1].split('?')[0];
  }
  
  // Handle youtu.be URLs
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split('?')[0];
  }
  
  // Fallback regex for other formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}; 