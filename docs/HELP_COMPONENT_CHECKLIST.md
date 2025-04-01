# Help Component Implementation Checklist

This checklist outlines the necessary steps for implementing a new help component in the KPTC Dashboard, based on the implementation of the QC Inspector Help component.

## 1. Component Structure

- [ ] Create directory structure:
  ```
  src/help/[component-name]/
  ├── ComponentNameHelp.jsx
  ├── ComponentNameHelp.css
  ```

- [ ] Setup media assets structure:
  ```
  public/assets/help/[component-name]/
  ├── en/
  │   ├── feature_screenshot.png
  │   └── feature_video.mp4
  └── ar/
      ├── feature_screenshot.png
      └── feature_video.mp4
  ```

- [ ] Create base component:
  ```jsx
  import React from 'react';
  import { MediaViewer } from '../index';
  import { useComponentNameHelpTranslations } from '../context/HelpLanguageContext';
  import { getVideoUrl } from '../config/videoUrls';
  import './ComponentNameHelp.css';

  const ComponentNameHelp = () => {
    const { language, getTranslation, isRTL } = useComponentNameHelpTranslations();
    
    return (
      <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="help-title">{getTranslation('Component Name Help')}</h1>
        {/* Component content */}
      </div>
    );
  };

  export default ComponentNameHelp;
  ```

## 2. Translation Setup

- [ ] Create translations file:
  ```
  src/help/context/translations/componentNameHelp.js
  ```

- [ ] Define translations:
  ```js
  const componentNameHelpTranslations = {
    'Component Name Help': {
      ar: 'مساعدة اسم المكون'
    },
    // Add all required translations
  };

  export default componentNameHelpTranslations;
  ```

- [ ] Include key translation categories:
  - [ ] Component titles
  - [ ] Section headings
  - [ ] Instructions and steps
  - [ ] UI element descriptions
  - [ ] Error messages
  - [ ] Search keywords

## 3. Video URL Configuration

- [ ] Update videoUrls.js configuration:
  ```js
  export const helpVideos = {
    // Existing videos
    componentName: {
      featureName: {
        development: {
          en: '/assets/help/componentname/en/feature_video.mp4',
          ar: '/assets/help/componentname/ar/feature_video.mp4'
        },
        production: {
          en: 'https://www.youtube.com/embed/YOUTUBE_VIDEO_ID_EN',
          ar: 'https://www.youtube.com/embed/YOUTUBE_VIDEO_ID_AR'
        }
      }
    }
  };
  ```

## 4. Context Integration

- [ ] Update HelpLanguageContext.jsx:
  - [ ] Import component translations:
    ```js
    import componentNameHelpTranslations from './translations/componentNameHelp';
    ```
  
  - [ ] Add to translations object:
    ```js
    translations = {
      ...translations,
      ...componentNameHelpTranslations
    };
    ```
  
  - [ ] Add component to getModuleTranslations function:
    ```js
    case 'componentNameHelp':
      return getTranslation(key, 'componentNameHelp');
    ```
  
  - [ ] Update searchHelpContent to include new component
  
  - [ ] Create custom hook:
    ```js
    export const useComponentNameHelpTranslations = () => {
      const context = useHelpLanguage();
      return {
        ...context,
        getTranslation: (key) => context.getModuleTranslations('componentNameHelp', key)
      };
    };
    ```

## 5. Help Container Updates

- [ ] Update HelpContainer.jsx:
  - [ ] Import component:
    ```js
    import ComponentNameHelp from './componentname/ComponentNameHelp';
    ```
  
  - [ ] Add to available pages:
    ```js
    {
      id: 'componentName',
      label: getTranslation('Component Name Help'),
      description: getTranslation('Description of the component'),
      keywords: ['keyword1', 'keyword2', 'keyword3']
    }
    ```
  
  - [ ] Update renderHelpContent function:
    ```js
    case 'componentName':
      return <ComponentNameHelp />;
    ```

## 6. Test Page Integration

- [ ] Update HelpTestPage.jsx:
  - [ ] Add search support for direct component reference:
    ```js
    if (query.includes('componentname') || query.includes('feature')) {
      setActiveHelpPage('componentName');
      setSearchQuery('');
      return;
    }
    ```
  
  - [ ] Add component card:
    ```jsx
    <div 
      className="help-card"
      onClick={() => handleHelpCardClick('componentName')}
      role="button"
      tabIndex={0}
    >
      <div className="help-card-icon">🔍</div>
      <h3>{getTranslation('Component Name Help')}</h3>
      <p>{getTranslation('Description of the component')}</p>
    </div>
    ```
  
  - [ ] Update search tip:
    ```jsx
    <p>{getTranslation('Pro tip: Try searching with:')}</p>
    <code>@LoginHelp.jsx</code> {getTranslation('or')} <code>@ComponentNameHelp.jsx</code>
    ```

## 7. Component Content

- [ ] Add major sections:
  - [ ] Overview
  - [ ] Feature list/grid
  - [ ] Step-by-step instructions
  - [ ] Important notes
  - [ ] Troubleshooting

- [ ] Implement media:
  - [ ] Screenshots with captions
  - [ ] Videos using getVideoUrl
  - [ ] Ensure RTL support for media

- [ ] Structure content with proper hierarchy:
  - [ ] Use h1 for main title
  - [ ] Use h2 for sections
  - [ ] Use h3 for subsections
  - [ ] Use lists for steps and features

## 8. Styling Implementation

- [ ] Create ComponentNameHelp.css with:
  - [ ] Base container styles
  - [ ] Section styles
  - [ ] Grid layouts
  - [ ] Feature highlights
  - [ ] RTL support
  - [ ] Responsive design
  - [ ] Consistent with existing help components

## 9. Testing

- [ ] Test component in development environment:
  - [ ] Verify local MP4 files load
  - [ ] Check all translations
  - [ ] Test RTL support
  - [ ] Verify responsive design
  - [ ] Test keyboard navigation
  - [ ] Verify search functionality

- [ ] Test component in production build:
  - [ ] Verify YouTube videos load
  - [ ] Check all production assets

## 10. Documentation

- [ ] Update project documentation:
  - [ ] Add component purpose
  - [ ] Document translation keys
  - [ ] Note any special considerations
  - [ ] Add info about media assets

---

## Example Usage Pattern

Here's a typical workflow for implementing a new help component:

1. Create the component directory and files
2. Add translations
3. Update video URL configuration
4. Update HelpLanguageContext
5. Update HelpContainer
6. Update HelpTestPage
7. Implement component content and styling
8. Test in development and production environments
9. Update documentation

This checklist ensures consistency across all help components and simplifies the process of adding new help content to the KPTC Dashboard. 