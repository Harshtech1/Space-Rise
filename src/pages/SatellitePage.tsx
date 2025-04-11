
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import SatelliteDashboard from '@/components/SatelliteDashboard';
import SatelliteTransition from '@/components/SatelliteTransition';
import SatelliteInfoPanel from '@/components/SatellitePage/SatelliteInfoPanel';

const SatellitePage = () => {
  const [satelliteStats, setSatelliteStats] = useState({
    orbitHeight: 550,
    velocity: 7.8,
    signalStrength: 92,
    latency: 45
  });
  
  // Simulate changing satellite stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSatelliteStats(prev => ({
        orbitHeight: Math.floor(prev.orbitHeight + (Math.random() * 2 - 1)),
        velocity: parseFloat((prev.velocity + (Math.random() * 0.1 - 0.05)).toFixed(2)),
        signalStrength: Math.max(70, Math.min(99, Math.floor(prev.signalStrength + (Math.random() * 4 - 2)))),
        latency: Math.max(35, Math.min(60, Math.floor(prev.latency + (Math.random() * 4 - 2))))
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">LEO Satellite Behavior Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <SatelliteDashboard />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <SatelliteTransition />
            </CardContent>
          </Card>
          
          <SatelliteInfoPanel {...satelliteStats} />
        </div>
      </div>
    </div>
  );
};

export default SatellitePage;
