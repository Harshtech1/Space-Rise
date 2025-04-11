
import React, { useEffect, useRef } from 'react';

interface SignalCanvasProps {
  isConnected: boolean;
  signalStrength: number;
}

const SignalCanvas = ({ isConnected, signalStrength }: SignalCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Draw signal wave animation
    if (!canvasRef.current || !isConnected) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    let offset = 0;
    const drawFrame = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Background gradient with enhanced colors
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      bgGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Grid lines for a more professional look
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      const gridSpacingX = 40;
      for (let x = 0; x < width; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      const gridSpacingY = 20;
      for (let y = 0; y < height; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw signal wave
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      const strength = signalStrength / 100;
      const amplitude = height * 0.2 * strength;
      const frequency = 0.02;
      const speed = 0.05;
      
      for (let x = 0; x < width; x++) {
        // Primary wave
        const y1 = Math.sin((x + offset) * frequency) * amplitude;
        // Secondary wave
        const y2 = Math.sin((x + offset) * frequency * 2 + 0.5) * amplitude * 0.3;
        // Tertiary high-frequency wave for detail
        const y3 = Math.sin((x + offset) * frequency * 5 + 0.2) * amplitude * 0.05;
        // Combined wave
        const y = height / 2 + y1 + y2 + y3;
        
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      // Enhanced gradient for wave fill
      const gradient = ctx.createLinearGradient(0, height / 2 - amplitude, 0, height);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.9)');
      gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.3)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw line on top with glow effect
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      for (let x = 0; x < width; x++) {
        const y1 = Math.sin((x + offset) * frequency) * amplitude;
        const y2 = Math.sin((x + offset) * frequency * 2 + 0.5) * amplitude * 0.3;
        const y3 = Math.sin((x + offset) * frequency * 5 + 0.2) * amplitude * 0.05;
        const y = height / 2 + y1 + y2 + y3;
        
        ctx.lineTo(x, y);
      }
      
      // Glowing line effect
      ctx.strokeStyle = 'rgba(14, 165, 233, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add shadow for glow effect
      ctx.shadowColor = 'rgba(14, 165, 233, 0.8)';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.8)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Occasional "blips" for signal interruptions with enhanced visual effect
      if (Math.random() > 0.97) {
        const blipX = Math.random() * width;
        const blipY = height / 2 + (Math.random() * amplitude * 2 - amplitude);
        
        // Glow effect
        ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.arc(blipX, blipY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(blipX, blipY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Ripple effect
        ctx.beginPath();
        ctx.arc(blipX, blipY, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      }
      
      offset += speed;
      animationRef.current = requestAnimationFrame(drawFrame);
    };
    
    animationRef.current = requestAnimationFrame(drawFrame);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isConnected, signalStrength]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={112} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default SignalCanvas;
