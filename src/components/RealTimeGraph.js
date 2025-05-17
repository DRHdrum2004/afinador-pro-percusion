import React, { useEffect, useRef } from 'react';

const RealTimeGraph = ({ frequencies }) => {
  const canvasRef = useRef(null);
  const maxDataPoints = 50;

  useEffect(() => {
    if (!frequencies.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * (i / 10));
      ctx.lineTo(width, height * (i / 10));
      ctx.stroke();
    }

    // Draw graph
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = width / Math.min(frequencies.length, maxDataPoints);
    let x = 0;

    const recentFrequencies = frequencies.slice(-maxDataPoints);
    const maxFreq = Math.max(...recentFrequencies, 1);

    recentFrequencies.forEach((freq, index) => {
      const y = height - (freq / maxFreq) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    });

    ctx.stroke();
  }, [frequencies]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Variación de Frecuencia</h3>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={150}
        className="w-full h-full border border-gray-200 rounded-md"
      ></canvas>
    </div>
  );
};

export default RealTimeGraph;