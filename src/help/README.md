# KPTC Dashboard Help System

A modular help system for the KPTC Dashboard React application that provides both a full help page interface and an overlay help system. This system supports multiple languages (English and Arabic), keyboard shortcuts, and a comprehensive search functionality.

## Features

- 🌐 Bilingual support (English & Arabic) with RTL handling
- 🔍 Advanced search functionality with direct component references
- ⌨️ Keyboard shortcuts (F1, Alt+H, Esc)
- 📱 Responsive design for mobile and desktop
- 🎨 Customizable UI components
- 🖼️ Media support for images and videos
- 🔄 Easy integration with existing projects

## Quick Links

- [Main Project Repository](https://github.com/ghousekw/KPTC_Dashboard_React)
- [Issues](https://github.com/ghousekw/KPTC_Dashboard_React/issues)
- [Pull Requests](https://github.com/ghousekw/KPTC_Dashboard_React/pulls)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ghousekw/KPTC_Dashboard_React.git
cd KPTC_Dashboard_React
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Directory Structure

```
/src/help/
├── context/                 # Language context and translations
│   ├── HelpLanguageContext.jsx
│   └── translations/       # Translation files for each component
├── login/                  # Login help content
├── dashboard/             # Dashboard help content
├── HelpContainer.jsx      # Main help container component
├── MediaViewer.jsx        # Media handling component
├── useHelp.js            # Core functionality hook
└── index.js              # Central exports
```

## Integration

### Basic Integration

1. Wrap your app with the required providers:

```jsx
// App.jsx
import { LanguageProvider } from './context/LanguageContext';
import { HelpLanguageProvider } from './help';

function App() {
  const [showHelpPage, setShowHelpPage] = useState(false);
  
  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F1' || (event.altKey && event.key.toLowerCase() === 'h')) {
        event.preventDefault();
        setShowHelpPage(prev => !prev);
      }
      if (event.key === 'Escape' && showHelpPage) {
        setShowHelpPage(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelpPage]);

  return (
    <LanguageProvider>
      <HelpLanguageProvider>
        {showHelpPage ? (
          <HelpTestPage onBack={() => setShowHelpPage(false)} />
        ) : (
          <YourMainComponent onHelpClick={() => setShowHelpPage(true)} />
        )}
      </HelpLanguageProvider>
    </LanguageProvider>
  );
}
```

### Adding Help Button to Navigation

Add the help button to your navigation/sidebar:

```jsx
// Sidebar.jsx
const Sidebar = ({ onHelpClick }) => {
  return (
    <aside className="sidebar">
      {/* Your other menu items */}
      
      <div className="sidebar-footer">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onHelpClick();
        }} className="footer-link">
          <i className="bi bi-question-circle"></i>
          <span>Help File</span>
        </a>
      </div>
    </aside>
  );
};
```

## Usage

### Opening Help

Users can access the help system in three ways:
1. Press `F1`
2. Press `Alt + H`
3. Click the help button in the sidebar

### Closing Help

The help system can be closed using:
1. Press `Escape`
2. Press `F1` or `Alt + H` again
3. Click the back button in the help interface

### Search Functionality

The help system includes an advanced search with:
- Direct component references using `@ComponentName.jsx`
- Keyword search across all help content
- Search suggestions and tips
- Real-time search results

Example searches:
```
@LoginHelp.jsx        # Direct access to login help
@DashboardHelp.jsx    # Direct access to dashboard help
login                 # Search for login-related content
```

## Customization

### Adding New Help Content

1. Create a new directory in `/src/help/` for your content:
```
/src/help/yourFeature/
└── YourFeatureHelp.jsx
```

2. Create translations in `/src/help/context/translations/`:
```javascript
// yourFeatureHelp.js
export const yourFeatureHelpTranslations = {
  en: {
    "Your Feature Help": "Your Feature Help",
    // ... more translations
  },
  ar: {
    "Your Feature Help": "مساعدة الميزة الخاصة بك",
    // ... more translations
  }
};
```

3. Add your translations to the context:
```javascript
// HelpLanguageContext.jsx
import { yourFeatureHelpTranslations } from './translations/yourFeatureHelp';

// Add to the translations object
const translations = {
  // ... existing translations
  yourFeatureHelp: yourFeatureHelpTranslations
};
```

### Styling

The help system uses modular CSS. To customize styles:

1. Update the relevant CSS files:
- `HelpContainer.css` - Main help container styles
- `MediaViewer.css` - Media viewer styles
- `help.css` - Global help styles

2. Add your own CSS modules for new components

## Media Assets

Place your media assets in:
```
/public/assets/help/
├── images/
└── videos/
```

Use the MediaViewer component to display media:
```jsx
import { MediaViewer } from '../help';

<MediaViewer 
  src="/assets/help/images/your-image.png"
  type="image"
  caption="Your caption"
  alt="Image description"
/>
```

## Best Practices

1. **Content Organization**
   - Keep help content focused and concise
   - Use images and videos for complex features
   - Provide step-by-step instructions

2. **Translations**
   - Always provide both English and Arabic translations
   - Test RTL layout for Arabic content
   - Use clear and simple language

3. **Accessibility**
   - Include alt text for all images
   - Ensure keyboard navigation works
   - Maintain good color contrast

4. **Performance**
   - Optimize media assets
   - Lazy load help content
   - Keep translations modular

## Troubleshooting

Common issues and solutions:

1. **Help not opening with F1**
   - Check if event listeners are properly set up in App.jsx
   - Ensure no other components are capturing F1 key

2. **Arabic content not displaying correctly**
   - Verify RTL direction is properly set
   - Check if Arabic translations are loaded
   - Ensure fonts support Arabic characters

3. **Search not working**
   - Check if HelpLanguageProvider is properly wrapped
   - Verify search indices are properly built
   - Check console for any errors

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
git commit -m 'Add some amazing feature'
```
4. Push to the branch:
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## Issues and Bug Reports

If you find any issues or bugs, please report them on our [Issues page](https://github.com/ghousekw/KPTC_Dashboard_React/issues).

## License

This help system is part of the KPTC Dashboard project. See the [LICENSE](https://github.com/ghousekw/KPTC_Dashboard_React/blob/master/LICENSE) file for details.

## Contact

- GitHub: [@ghousekw](https://github.com/ghousekw)
- Project Link: [https://github.com/ghousekw/KPTC_Dashboard_React](https://github.com/ghousekw/KPTC_Dashboard_React)

---

Made with ❤️ for Kuwait Public Transport Company 