import React from 'react';

const LowFrequencyCorrection = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Corrección para Frecuencias Graves</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Usando FFT con alta resolución (fftSize: 4096)</li>
        <li>Filtro de paso bajo para mayor precisión en graves</li>
        <li>Verificación con referencia en base de datos</li>
      </ul>
    </div>
  );
};

export default LowFrequencyCorrection;