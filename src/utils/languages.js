const translations = {
  es: {
    appTitle: "Afinador Pro de Percusión",
    selectInstrument: "Selecciona el instrumento",
    tuningGuide: "Guía de Afinación",
    frequencyDetector: "Detector de Frecuencia",
    startDetection: "Iniciar Detección con Micrófono",
    stopDetection: "Detener Detección",
    frequencyStable: "Frecuencia estable",
    frequencyDetecting: "Detectando",
    credits: "Creado por David Rivero Hernández - Profesor de Percusión",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    tuningResult: {
      result: "Resultado de Afinación",
      drum: "Tambor",
      targetFreq: "Frecuencia objetivo",
      acceptableRange: "Rango aceptable",
      source: "Fuente",
      correctlyTuned: "Correctamente afinado",
      needsAdjustment: "Necesita ajuste",
      tighten: "Tensa el parche aproximadamente",
      loosen: "Afloja el parche aproximadamente",
      hz: "Hz"
    }
  },
  en: {
    appTitle: "Pro Percussion Tuner",
    selectInstrument: "Select instrument",
    tuningGuide: "Tuning Guide",
    frequencyDetector: "Frequency Detector",
    startDetection: "Start Detection with Microphone",
    stopDetection: "Stop Detection",
    frequencyStable: "Frequency stable",
    frequencyDetecting: "Detecting",
    credits: "Created by David Rivero Hernández - Percussion Professor",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    tuningResult: {
      result: "Tuning Result",
      drum: "Drum",
      targetFreq: "Target frequency",
      acceptableRange: "Acceptable range",
      source: "Source",
      correctlyTuned: "Correctly tuned",
      needsAdjustment: "Needs adjustment",
      tighten: "Tighten approximately",
      loosen: "Loosen approximately",
      hz: "Hz"
    }
  }
};

export const getText = (key, language = 'es') => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      // Buscar en español como fallback
      const fallbackValue = keys.reduce((obj, k) => obj?.[k], translations['es']);
      return fallbackValue || key;
    }
  }
  
  return value;
};