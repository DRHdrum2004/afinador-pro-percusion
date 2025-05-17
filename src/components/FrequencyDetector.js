import React, { useState, useEffect } from 'react';

const FrequencyDetector = ({ drumType }) => {
  const [frequency, setFrequency] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    // Simulación de detección de frecuencia
    setTimeout(() => {
      const simulatedFreq = drumType === 'snare' ? 230 : 
                          drumType === 'kick' ? 65 : 170;
      setFrequency(simulatedFreq);
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Detector de Frecuencia</h3>
      <button
        onClick={startListening}
        disabled={isListening}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isListening ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} transition-colors`}
      >
        {isListening ? 'Detectando...' : 'Iniciar Detección'}
      </button>
      {frequency && (
        <p className="mt-2 text-gray-700">
          Frecuencia detectada: <span className="font-bold">{frequency} Hz</span>
        </p>
      )}
    </div>
  );
};

export default FrequencyDetector;