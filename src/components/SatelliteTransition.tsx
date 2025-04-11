
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Globe, ArrowUpRight } from 'lucide-react';

const SatelliteTransition = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Satellite properties
    const satellite = {
      x: 0,
      y: 0,
      radius: 4,
      angle: 0,
      orbitRadius: 90,
      speed: 0.01,
      active: true,
    };
    
    const satellite2 = {
      x: 0,
      y: 0,
      radius: 4,
      angle: Math.PI,
      orbitRadius: 80,
      speed: 0.015,
      active: true,
    };
    
    // Earth properties
    const earth = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 40,
    };
    
    // Signal properties
    const signals: {startX: number, startY: number, endX: number, endY: number, progress: number}[] = [];
    
    // Function to draw Earth
    const drawEarth = () => {
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
      
      // Create gradient for Earth
      const gradient = ctx.createRadialGradient(
        earth.x - 15, earth.y - 15, 0,
        earth.x, earth.y, earth.radius
      );
      gradient.addColorStop(0, '#338eda');
      gradient.addColorStop(1, '#144d80');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add continents (simplified)
      ctx.beginPath();
      ctx.ellipse(earth.x - 10, earth.y - 5, 15, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#2e8c5e';
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(earth.x + 15, earth.y + 10, 12, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#2e8c5e';
      ctx.fill();
      
      // Add atmosphere glow
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, earth.radius + 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#88c4ff20';
      ctx.lineWidth = 8;
      ctx.stroke();
    };
    
    // Function to draw satellite
    const drawSatellite = (sat: typeof satellite) => {
      // Update satellite position
      sat.x = earth.x + Math.cos(sat.angle) * sat.orbitRadius;
      sat.y = earth.y + Math.sin(sat.angle) * sat.orbitRadius;
      
      // Draw orbit
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, sat.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff10';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw satellite
      ctx.beginPath();
      ctx.arc(sat.x, sat.y, sat.radius, 0, Math.PI * 2);
      ctx.fillStyle = sat.active ? '#f0f0f0' : '#666';
      ctx.fill();
      ctx.strokeStyle = sat.active ? '#ffffff' : '#999';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw solar panels
      ctx.beginPath();
      const panelLength = 8;
      const panelWidth = 2;
      const panelAngle = sat.angle + Math.PI / 2;
      
      ctx.save();
      ctx.translate(sat.x, sat.y);
      ctx.rotate(panelAngle);
      ctx.fillStyle = '#4481c3';
      ctx.fillRect(-panelLength, -panelWidth, panelLength * 2, panelWidth * 2);
      ctx.restore();
      
      // Occasionally send signal
      if (Math.random() < 0.03 && sat.active) {
        signals.push({
          startX: sat.x,
          startY: sat.y,
          endX: earth.x + Math.random() * earth.radius * 0.8 - earth.radius * 0.4,
          endY: earth.y + Math.random() * earth.radius * 0.8 - earth.radius * 0.4,
          progress: 0,
        });
      }
      
      // Update angle for next frame
      sat.angle += sat.speed;
      if (sat.angle > Math.PI * 2) sat.angle -= Math.PI * 2;
    };
    
    // Draw signals
    const drawSignals = () => {
      for (let i = 0; i < signals.length; i++) {
        const signal = signals[i];
        signal.progress += 0.05;
        
        if (signal.progress < 1) {
          const x = signal.startX + (signal.endX - signal.startX) * signal.progress;
          const y = signal.startY + (signal.endY - signal.startY) * signal.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(81, 209, 246, ${1 - signal.progress})`;
          ctx.fill();
          
          // Draw trail
          ctx.beginPath();
          ctx.moveTo(signal.startX, signal.startY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(81, 209, 246, ${0.3 * (1 - signal.progress)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Remove completed signals
          signals.splice(i, 1);
          i--;
        }
      }
    };
    
    // Simulate handover between satellites
    let handoverTimer = 0;
    const simulateHandover = () => {
      handoverTimer++;
      
      if (handoverTimer > 300) {
        const activeSat = satellite.active ? satellite : satellite2;
        const inactiveSat = satellite.active ? satellite2 : satellite;
        
        // Start handover
        inactiveSat.active = true;
        
        // After a delay, deactivate the previously active satellite
        setTimeout(() => {
          activeSat.active = false;
          handoverTimer = 0;
        }, 2000);
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background stars
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1 + 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
        ctx.fill();
      }
      
      drawEarth();
      drawSatellite(satellite);
      drawSatellite(satellite2);
      drawSignals();
      simulateHandover();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <Satellite className="h-4 w-4 mr-1.5" />
          LEO Satellite Transition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-sat-dark/40 rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={300} 
            height={200} 
            className="w-full h-[200px]"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-sat-blue/10 rounded-md p-3">
            <div className="text-xs font-medium mb-1 flex items-center">
              <Globe className="h-3.5 w-3.5 mr-1 text-sat-blue" />
              Handover Events
            </div>
            <div className="text-xl font-bold">14</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span>+3 from average</span>
            </div>
          </div>
          
          <div className="bg-amber-500/10 rounded-md p-3">
            <div className="text-xs font-medium mb-1 flex items-center">
              <Satellite className="h-3.5 w-3.5 mr-1 text-amber-500" />
              Active Satellites
            </div>
            <div className="text-xl font-bold">2</div>
            <div className="text-xs text-muted-foreground mt-1">
              LEO constellation
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SatelliteTransition;
