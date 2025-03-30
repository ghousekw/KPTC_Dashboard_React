# MOI Job Card Help Component Implementation Guide

## Table of Contents
- [Component Structure](#component-structure)
- [Translation Setup](#translation-setup)
- [Context Integration](#context-integration)
- [Help Container Updates](#help-container-updates)
- [Test Page Integration](#test-page-integration)
- [Component Content](#component-content)
- [Media Integration](#media-integration)
- [Styling Implementation](#styling-implementation)
- [Search Integration](#search-integration)
- [Accessibility & UX](#accessibility--ux)
- [New Component Template](#new-component-template)

## Component Structure

### Directory Setup
```bash
src/help/moi/
├── MOIJobCardHelp.jsx
├── MOIJobCardHelp.css
└── assets/
    ├── job_card_list.png
    └── create_job_card.mp4
```

### Basic Component Structure
```jsx
// MOIJobCardHelp.jsx
import React from 'react';
import { MediaViewer } from '../index';
import { useMoiHelpTranslations } from '../context/HelpLanguageContext';
import './MOIJobCardHelp.css';

const MOIJobCardHelp = () => {
  const { getTranslation, isRTL } = useMoiHelpTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Component content */}
    </div>
  );
};

export default MOIJobCardHelp;
```

## Translation Setup

### Create Translation File
```javascript
// src/help/context/translations/moiHelp.js
const moiHelpTranslations = {
  'MOI Job Card Help': {
    ar: 'مساعدة بطاقة عمل وزارة الداخلية'
  },
  // Add other translations
};

export default moiHelpTranslations;
```

### Key Translation Categories
- Component titles
- Service types (Main & Quick)
- Instructions and steps
- UI elements
- Error messages
- Search keywords

## Context Integration

### Update Help Language Context
```javascript
// src/help/context/HelpLanguageContext.jsx
import moiHelpTranslations from './translations/moiHelp';

// Add to translations object
const translations = {
  ...existingTranslations,
  ...moiHelpTranslations
};

// Add custom hook
export const useMoiHelpTranslations = () => {
  const context = useHelpLanguage();
  return {
    ...context,
    getTranslation: (key) => context.getTranslation(key, 'moiHelp')
  };
};
```

## Help Container Updates

### Update Help Container Component
```javascript
// src/help/HelpContainer.jsx
import MOIJobCardHelp from './moi/MOIJobCardHelp';

// Add to available pages
const availableHelpPages = [
  // ... existing pages
  {
    id: 'moiJobCard',
    label: getTranslation('MOI Job Card Help'),
    description: getTranslation('Learn how to manage MOI job cards'),
    keywords: ['moi', 'job card', 'vehicle', 'maintenance']
  }
];

// Update render function
const renderHelpContent = () => {
  switch (activePage) {
    // ... existing cases
    case 'moiJobCard':
      return <MOIJobCardHelp />;
  }
};
```

## Test Page Integration

### Update Help Test Page
```javascript
// src/HelpTestPage.jsx
<div className="help-cards-grid">
  {/* ... existing cards */}
  <div 
    className="help-card"
    onClick={() => handleHelpCardClick('moiJobCard')}
    role="button"
    tabIndex={0}
  >
    <div className="help-card-icon">🚗</div>
    <h3>{getTranslation('MOI Job Card Help')}</h3>
    <p>{getTranslation('Learn how to manage MOI vehicle maintenance requests')}</p>
  </div>
</div>
```

## Component Content

### Main Sections
1. Job Card List
   - Search and filter options
   - Table columns explanation
   - Common actions

2. Service Types
   ```jsx
   <div className="service-types-container">
     <div className="service-type-item">
       <h3>{getTranslation('Main Service')}</h3>
       {/* Main service content */}
     </div>
     <div className="service-type-item highlight">
       <h3>{getTranslation('Quick Service')}</h3>
       {/* Quick service content */}
     </div>
   </div>
   ```

3. Creating New Job Card
   - Step-by-step instructions
   - Required fields
   - Service type selection

4. Important Notes
   - Required fields
   - Customer waiting status
   - Automatic updates

5. Troubleshooting
   - Common issues
   - Solutions
   - Contact information

## Media Integration

### Directory Structure
```bash
public/assets/help/moi/
├── en/
│   ├── job_card_list.png
│   ├── create_job_card.png
│   └── create_job_card.mp4
└── ar/
    ├── job_card_list.png
    ├── create_job_card.png
    └── create_job_card.mp4
```

### Asset Configuration
```javascript
// Define language-specific media assets
const jobCardListScreenshot = {
  en: '/assets/help/moi/en/job_card_list.png',
  ar: '/assets/help/moi/ar/job_card_list.png'
};

const createJobCardScreenshot = {
  en: '/assets/help/moi/en/create_job_card.png',
  ar: '/assets/help/moi/ar/create_job_card.png'
};

const createJobCardVideo = {
  en: '/assets/help/moi/en/create_job_card.mp4',
  ar: '/assets/help/moi/ar/create_job_card.mp4'
};
```

### Media Components
```jsx
// Language-aware MediaViewer implementation
<MediaViewer 
  src={isRTL ? jobCardListScreenshot.ar : jobCardListScreenshot.en}
  type="image"
  caption={getTranslation('The MOI Job Card list interface')}
  alt={getTranslation('Screenshot of the MOI Job Card list showing filters and table')}
/>

<MediaViewer 
  src={isRTL ? createJobCardScreenshot.ar : createJobCardScreenshot.en}
  type="image"
  caption={getTranslation('The MOI Job Card creation interface')}
  alt={getTranslation('Screenshot of the MOI Job Card creation form showing all required fields')}
  className="create-job-card-screenshot"
/>

<MediaViewer 
  src={isRTL ? createJobCardVideo.ar : createJobCardVideo.en}
  type="video"
  caption={getTranslation('Step-by-step guide to creating a new job card')}
  alt={getTranslation('Video demonstration of creating a new MOI job card')}
/>
```

### Best Practices for Bilingual Media
1. **File Organization**
   - Keep English and Arabic media in separate directories
   - Use consistent naming conventions across languages
   - Store media assets in the public directory for easy access

2. **Asset Management**
   - Define media paths as language-specific objects
   - Use the `isRTL` flag to determine the current language
   - Maintain parallel media structures for both languages

3. **Accessibility**
   - Provide translated captions and alt text
   - Ensure media content matches the interface language
   - Consider cultural differences in visual content

4. **Performance**
   - Optimize images for web use
   - Consider lazy loading for better performance
   - Use appropriate image formats (PNG for UI, JPEG for photos)

5. **Maintenance**
   - Update both language versions when making changes
   - Keep file names consistent between languages
   - Document any language-specific media requirements

## Styling Implementation

### CSS Structure
```css
/* MOIJobCardHelp.css */
.help-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.service-types-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* RTL Support */
[dir="rtl"] .service-type-item {
  /* RTL-specific styles */
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Mobile-specific styles */
}
```

## Search Integration

### Search Keywords
- Direct reference: `@MOIJobCardHelp.jsx`
- General terms: "moi", "job card", "vehicle"
- Feature-specific: "maintenance", "service"
- Arabic translations

### Search Implementation
```javascript
// Add to search function
if (query.includes('moi') || query.includes('job card')) {
  setActiveHelpPage('moiJobCard');
  return;
}
```

## Accessibility & UX

### Key Features
- ARIA labels
- Keyboard navigation
- RTL support
- Responsive design
- Clear visual hierarchy

## New Component Template

### Steps to Add New Component
1. Create directory structure:
   ```
   src/help/[component-name]/
   ├── ComponentNameHelp.jsx
   ├── ComponentNameHelp.css
   └── assets/
   ```

2. Create translations file:
   ```
   src/help/context/translations/componentNameHelp.js
   ```

3. Update context:
   - Import translations
   - Add custom hook
   - Update search

4. Update containers:
   - Add to HelpContainer
   - Add to HelpTestPage
   - Add search support

5. Implement content:
   - Add sections
   - Add media
   - Style component

6. Test functionality:
   - Search
   - Navigation
   - RTL support
   - Responsive design

### Example Implementation
```jsx
// src/help/new-component/NewComponentHelp.jsx
import React from 'react';
import { MediaViewer } from '../index';
import { useNewComponentTranslations } from '../context/HelpLanguageContext';
import './NewComponentHelp.css';

const NewComponentHelp = () => {
  const { getTranslation, isRTL } = useNewComponentTranslations();
  
  return (
    <div className={`help-container ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="help-title">{getTranslation('New Component Help')}</h1>
      {/* Add component sections */}
    </div>
  );
};

export default NewComponentHelp;
```

---

This guide serves as a reference for implementing new help components in the KPTC Dashboard. Follow these steps and patterns to maintain consistency across the help system. 