import React, { useState, useEffect } from 'react';
import createAudioAnalyzer from '../utils/audioAnalyzer';
import { getText } from '../utils/languages';

const RealFrequencyDetector = ({ drumType, onFrequencyDetected, language }) => {
  const [frequency, setFrequency] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [analyzer] = useState(createAudioAnalyzer());
  const [frequencies, setFrequencies] = useState([]);
  const [isStable, setIsStable] = useState(false);

  const handleFrequencyDetected = (freq) => {
    setFrequency(freq);
    setFrequencies(prev => [...prev, freq]);
    onFrequencyDetected(freq);
    
    // Check stability (last 5 readings within 5Hz range)
    if (frequencies.length >= 5) {
      const lastFive = frequencies.slice(-5);
      const min = Math.min(...lastFive);
      const max = Math.max(...lastFive);
      setIsStable((max - min) <= 5);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      analyzer.stopAnalysis();
      setIsListening(false);
      setFrequencies([]);
      setIsStable(false);
    } else {
      setFrequency(null);
      setError(null);
      const success = await analyzer.startAnalysis(handleFrequencyDetected);
      
      if (success) {
        setIsListening(true);
      } else {
        setError('No se pudo acceder al micrófono. Asegúrate de permitir el acceso.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isListening) {
        analyzer.stopAnalysis();
      }
    };
  }, [isListening, analyzer]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {getText('frequencyDetector', language)}
      </h3>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
      <button
        onClick={toggleListening}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'} transition-colors`}
      >
        {isListening ? getText('stopDetection', language) : getText('startDetection', language)}
      </button>
      {frequency && (
        <div className={`mt-4 p-3 rounded-md ${isStable ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
          <p className="font-bold">
            {isStable ? '✅ ' + getText('frequencyStable', language) + ': ' 
              : '🔄 ' + getText('frequencyDetecting', language) + ': '} 
            <span className="font-mono">{frequency} Hz</span>
          </p>
          <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isStable ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300`} 
              style={{ width: `${Math.min(100, frequency / 500 * 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealFrequencyDetector;

// DONE