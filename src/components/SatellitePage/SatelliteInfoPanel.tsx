
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Activity, ArrowUp, Signal } from 'lucide-react';

interface SatelliteInfoPanelProps {
  orbitHeight: number;
  velocity: number;
  signalStrength: number;
  latency: number;
}

const SatelliteInfoPanel = ({
  orbitHeight,
  velocity,
  signalStrength,
  latency
}: SatelliteInfoPanelProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <ArrowUp className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Altitude</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{orbitHeight} km</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Low Earth Orbit</div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Velocity</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{velocity} km/s</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Orbital Speed</div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Signal className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Signal</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{signalStrength}%</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Current Strength</div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">Latency</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">{latency} ms</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Round Trip Time</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatelliteInfoPanel;
