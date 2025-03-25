import './App.css';
import KPTCDashboard from './components/dashboard/KPTCDashboard.jsx';
import { useLanguage } from './context/LanguageContext.jsx';

function App() {
  const { currentLang } = useLanguage();
  
  return (
    <div className={`app-container ${currentLang === 'ar' ? 'rtl-layout' : ''}`}>
      <KPTCDashboard />
    </div>
  );
}

export default App; 