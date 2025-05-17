import React from 'react';
import drumData from '../mock/drumData';
import { getText } from '../utils/languages';

const TuningResult = ({ drumType, detectedFreq, language }) => {
  if (!drumType || !detectedFreq) return null;

  const drum = drumData[drumType];
  const [minFreq, maxFreq] = drum.range.split('-').map(Number);
  const isInTune = detectedFreq >= minFreq && detectedFreq <= maxFreq;
  const difference = detectedFreq - drum.targetFreq;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {getText('tuningResult.result', language)}
      </h3>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">{getText('tuningResult.drum', language)}:</span> {drum.brand} {drum.model}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">{getText('tuningResult.targetFreq', language)}:</span> {drum.targetFreq} {getText('tuningResult.hz', language)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">{getText('tuningResult.acceptableRange', language)}:</span> {drum.range} {getText('tuningResult.hz', language)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">{getText('tuningResult.source', language)}:</span> {drum.source}
        </p>
        <div className={`mt-4 p-3 rounded-md ${isInTune ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isInTune ? (
            <p className="font-bold">✅ {getText('tuningResult.correctlyTuned', language)}</p>
          ) : (
            <>
              <p className="font-bold">❌ {getText('tuningResult.needsAdjustment', language)}</p>
              <p className="mt-1">
                {difference > 0 
                  ? `${getText('tuningResult.loosen', language)} ${Math.abs(difference)} ${getText('tuningResult.hz', language)}`
                  : `${getText('tuningResult.tighten', language)} ${Math.abs(difference)} ${getText('tuningResult.hz', language)}`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuningResult;

// DONE