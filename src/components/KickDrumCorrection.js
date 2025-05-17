import React from 'react';

const KickDrumCorrection = ({ detectedFreq }) => {
  if (!detectedFreq || detectedFreq > 100) return null;

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-yellow-800 mb-2">Corrección Especial para Bombo</h3>
      <ul className="list-disc pl-5 space-y-1 text-yellow-700">
        <li>FFT Size: 4096 para mayor precisión en bajas frecuencias</li>
        <li>Filtro pasa-bajos activado automáticamente</li>
        <li>Validación cruzada con múltiples muestras</li>
        <li className="font-bold">Frecuencia actual: {detectedFreq} Hz</li>
      </ul>
    </div>
  );
};

export default KickDrumCorrection;