import React from 'react';
import { getText } from '../utils/languages';

const TuningGuide = ({ drumType, language, theme }) => {
  const getInstructions = () => {
    const guides = {
      snare: {
        es: [
          "1. Afina primero el parche batidor (superior)",
          "2. Ajusta el parche resonante (inferior) 1-2 tonos más alto",
          "3. Asegúrate que todos los tornos tengan la misma tensión"
        ],
        en: [
          "1. First tune the batter head (top)",
          "2. Adjust resonant head (bottom) 1-2 tones higher",
          "3. Ensure all lugs have equal tension"
        ]
      },
      kick: {
        es: [
          "1. Afina el parche batidor para el ataque",
          "2. El parche resonante controla el sustain",
          "3. Usa almohadillas internas para reducir overtones"
        ],
        en: [
          "1. Tune the batter head for attack",
          "2. Resonant head controls sustain",
          "3. Use internal dampening for overtones"
        ]
      },
      tom1: {
        es: [
          "1. Afina ambos parches al mismo tono",
          "2. Para más sustain, afloja ligeramente el resonante",
          "3. Ajusta en cruz (tornos opuestos)"
        ],
        en: [
          "1. Tune both heads to the same pitch",
          "2. For more sustain, slightly loosen resonant",
          "3. Tune in criss-cross pattern"
        ]
      },
      bongo_hembra: {
        es: [
          "1. Afina a un tono agudo y brillante",
          "2. El macho debe estar una cuarta abajo",
          "3. Usa tensión uniforme en todos los lados"
        ],
        en: [
          "1. Tune to a bright high pitch",
          "2. Macho should be a fourth lower",
          "3. Use even tension on all sides"
        ]
      },
      default: {
        es: [
          "1. Comienza con todos los tornos semisueltos",
          "2. Aprieta gradualmente en forma de estrella",
          "3. Usa pequeñas variaciones para el tono deseado"
        ],
        en: [
          "1. Start with all lugs finger tight",
          "2. Tighten gradually in star pattern",
          "3. Use small increments for desired pitch"
        ]
      }
    };

    return guides[drumType]?.[language] || guides['default'][language];
  };

  return (
    <div className={`p-4 rounded-lg shadow-md mt-4 transition-all ${
      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-blue-100 border border-blue-300'
    }`}>
      <h3 className={`text-lg font-medium mb-2 ${
        theme === 'dark' ? 'text-teal-300' : 'text-blue-800'
      }`}>
        {getText('tuningGuide', language)}
      </h3>
      <ul className={`list-decimal pl-5 space-y-1 ${
        theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
      }`}>
        {getInstructions().map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default TuningGuide;

// DONE