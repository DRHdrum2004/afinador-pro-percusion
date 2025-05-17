import React from 'react';
import { getText } from '../utils/languages';

const Credits = ({ language }) => {
  return (
    <div className="mt-6 p-3 text-center text-sm text-gray-500">
      {getText('credits', language)}
    </div>
  );
};

export default Credits;