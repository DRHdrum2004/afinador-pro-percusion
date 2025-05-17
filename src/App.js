import React, { useState, useEffect } from 'react';
import DrumSelector from './components/DrumSelector';
import RealFrequencyDetector from './components/RealFrequencyDetector';
import TuningResult from './components/TuningResult';
import TuningGuide from './components/TuningGuide';
import RealTimeGraph from './components/RealTimeGraph';
import SettingsPanel from './components/SettingsPanel';
import Credits from './components/Credits';
import ThemeIcon from './components/ThemeIcon';
import { getText } from './utils/languages';

// REGISTRACIÓN DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('✅ Service Worker registrado:', reg))
            .catch(err => console.error('❌ Error registrando el Service Worker:', err));
    });
}

const App = () => {
  const [selectedDrum, setSelectedDrum] = useState('snare');
  const [detectedFreq, setDetectedFreq] = useState(null);
  const [frequencyHistory, setFrequencyHistory] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'es'
  );
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [language, theme]);

  useEffect(() => {
    console.log('🎵 Aplicación inicializada con Theme:', theme, 'y Language:', language);
  }, []);

  const handleDrumSelect = (drum) => {
    setSelectedDrum(drum);
    setDetectedFreq(null);
    setFrequencyHistory([]);
  };

  const handleFrequencyDetected = (freq) => {
    setDetectedFreq(freq);
    setFrequencyHistory(prev => [...prev, freq]);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'
    }`}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-6 gap-3">
          <ThemeIcon className="h-10 w-10"/>
          <h1 className={`text-3xl font-bold text-transparent bg-clip-text ${
            theme === 'dark' ? 'bg-gradient-to-r from-teal-400 to-blue-500' : 'bg-gradient-to-r from-purple-500 to-pink-600'
          }`}>
            {getText('appTitle', language)}
          </h1>
        </div>

        <SettingsPanel
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />

        <DrumSelector onDrumSelect={handleDrumSelect} language={language} theme={theme} />
        <TuningGuide drumType={selectedDrum} language={language} theme={theme} />
        <RealFrequencyDetector
          drumType={selectedDrum}
          onFrequencyDetected={handleFrequencyDetected}
          language={language}
          theme={theme}
        />
        {detectedFreq && (
          <>
            <TuningResult
              drumType={selectedDrum}
              detectedFreq={detectedFreq}
              language={language}
              theme={theme}
            />
            <RealTimeGraph frequencies={frequencyHistory} theme={theme} />
          </>
        )}
        <Credits language={language} />
      </div>
    </div>
  );
};

export default App;
