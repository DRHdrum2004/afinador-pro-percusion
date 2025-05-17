const createAudioAnalyzer = () => {
  let audioContext;
  let analyser;
  let microphone;
  let dataArray;
  let scriptProcessor;
  let isAnalyzing = false;
  let sampleCount = 0;
  const sampleSize = 5;
  const frequencyHistory = [];

  const startAnalysis = async (onFrequencyDetected) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 4096;
      
      // Create low pass filter for kick drum
      const filter = audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 200;

      microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(filter);
      filter.connect(analyser);
      
      scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      scriptProcessor.onaudioprocess = () => {
        analyser.getByteFrequencyData(dataArray);
        
        let maxAmplitude = 0;
        let maxIndex = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
          if (dataArray[i] > maxAmplitude) {
            maxAmplitude = dataArray[i];
            maxIndex = i;
          }
        }
        
        const frequency = maxIndex * audioContext.sampleRate / analyser.fftSize;
        frequencyHistory.push(frequency);
        
        // Only report every 5 samples for stability
        sampleCount++;
        if (sampleCount >= sampleSize) {
          const avgFrequency = frequencyHistory.slice(-sampleSize).reduce((a, b) => a + b, 0) / sampleSize;
          onFrequencyDetected(Math.round(avgFrequency));
          sampleCount = 0;
        }
      };
      
      isAnalyzing = true;
      return true;
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
      return false;
    }
  };

  const stopAnalysis = () => {
    if (!isAnalyzing) return;
    
    if (scriptProcessor) {
      scriptProcessor.disconnect();
      scriptProcessor.onaudioprocess = null;
    }
    
    if (microphone) {
      microphone.disconnect();
    }
    
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }
    
    isAnalyzing = false;
  };

  return { startAnalysis, stopAnalysis };
};

export default createAudioAnalyzer;