import React, { useState } from 'react';
import { getText } from '../utils/languages';

const DrumSelector = ({ onDrumSelect, language, theme }) => {
  const [selectedDrum, setSelectedDrum] = useState('snare');

  const handleChange = (e) => {
    const drum = e.target.value;
    setSelectedDrum(drum);
    onDrumSelect(drum);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md mb-4 ${
      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-purple-200'
    }`}>
      <label htmlFor="drum-select" className={`block text-sm font-medium mb-2 ${
        theme === 'dark' ? 'text-teal-200' : 'text-purple-600'
      }`}>
        {getText('selectInstrument', language)}
      </label>
      <select
        id="drum-select"
        value={selectedDrum}
        onChange={handleChange}
        className={`w-full p-3 rounded-md border focus:ring-2 ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-100 border-gray-600 focus:ring-teal-400' 
            : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
        }`}
      >
        <optgroup label={getText('drumGroups.drums', language)} className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}>
          <option value="snare" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('drums.snare', language)}
          </option>
          <option value="kick" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('drums.kick', language)}
          </option>
          <option value="tom1" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('drums.tom1', language)}
          </option>
          <option value="tom2" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('drums.tom2', language)}
          </option>
          <option value="tom3" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('drums.tom3', language)}
          </option>
        </optgroup>
        
        <optgroup label={getText('drumGroups.bongos', language)} className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}>
          <option value="bongo_hembra" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('bongos.hembra', language)}
          </option>
          <option value="bongo_macho" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('bongos.macho', language)}
          </option>
        </optgroup>
        
        <optgroup label={getText('drumGroups.congas', language)} className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}>
          <option value="tumba_hembra" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('congas.hembra', language)}
          </option>
          <option value="tumba_macho" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('congas.macho', language)}
          </option>
        </optgroup>
        
        <optgroup label={getText('drumGroups.timbales', language)} className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}>
          <option value="timbal_hembra" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('timbales.hembra', language)}
          </option>
          <option value="timbal_macho" className={theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}>
            {getText('timbales.macho', language)}
          </option>
        </optgroup>
      </select>
    </div>
  );
};

export default DrumSelector;

// DONE