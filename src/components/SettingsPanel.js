import React from 'react';
import { getText } from '../utils/languages';

const SettingsPanel = ({ language, setLanguage, theme, setTheme }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md mb-4 ${
      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-purple-200'
    }`}>
      <div className="space-y-4">
        <div>
          <label htmlFor="language-select" className={`block text-sm font-medium mb-1 ${
            theme === 'dark' ? 'text-teal-200' : 'text-purple-600'
          }`}>
            {getText('language', language)}
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`w-full p-2 rounded-md border focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-100 border-gray-600 focus:ring-teal-400' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
            }`}
          >
            <option 
              value="es" 
              className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}
            >
              Español
            </option>
            <option 
              value="en"
              className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}
            >
              English
            </option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            theme === 'dark' ? 'text-teal-200' : 'text-purple-600'
          }`}>
            {getText('theme', language)}
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                theme === 'light' 
                  ? 'bg-purple-600 text-white' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getText('light', language)}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-teal-600 text-white' 
                  : theme === 'dark' 
                    ? 'bg-gray-800 text-gray-100' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getText('dark', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;