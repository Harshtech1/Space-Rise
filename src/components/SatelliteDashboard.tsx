
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Wifi, Signal, BarChart4, Clock, Zap, Network, AreaChart } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, AreaChart as RechartsAreaChart, Area } from "recharts";
import { Badge } from "@/components/ui/badge";

interface SatelliteData {
  timestamp: string;
  signalStrength: number;
  latency: number;
  throughput: number;
  jitter: number;
  elevation: number;
  azimuth: number;
}

interface HandoverEvent {
  id: string;
  from: string;
  to: string;
  timestamp: Date;
  duration: number; // ms
  status: 'completed' | 'failed' | 'in-progress';
}

const SatelliteDashboard = () => {
  const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([]);
  const [handoverEvents, setHandoverEvents] = useState<HandoverEvent[]>([]);
  const [activeSatellite, setActiveSatellite] = useState('LEO-SAT-347');
  const [currentLatency, setCurrentLatency] = useState(125);
  const [currentJitter, setCurrentJitter] = useState(8.2);
  const [currentThroughput, setCurrentThroughput] = useState(28.5);
  const [bufferHealth, setBufferHealth] = useState(92);
  const [congestionLevel, setCongestionLevel] = useState(18);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Generate satellite data for visualization
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data: SatelliteData[] = [];
      
      for (let i = 60; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 30000);
        const formattedTime = timestamp.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        });
        
        // Base values with some randomness and sine wave patterns
        const timeIndex = i / 10;
        const signalBase = 75 + Math.sin(timeIndex) * 15;
        const latencyBase = 120 + Math.cos(timeIndex) * 50;
        const throughputBase = 25 + Math.sin(timeIndex * 0.7) * 10;
        
        data.push({
          timestamp: formattedTime,
          signalStrength: Math.max(0, Math.min(100, signalBase + Math.random() * 8 - 4)),
          latency: Math.max(50, latencyBase + Math.random() * 20 - 10),
          throughput: Math.max(5, throughputBase + Math.random() * 5 - 2.5),
          jitter: Math.max(0, 5 + Math.cos(timeIndex * 1.5) * 3 + Math.random() * 2),
          elevation: 45 + Math.sin(timeIndex * 0.3) * 35 + Math.random() * 2,
          azimuth: (230 + timeIndex * 3) % 360
        });
      }
      
      setSatelliteData(data);
      
      // Update current metrics
      const latest = data[data.length - 1];
      if (latest) {
        setCurrentLatency(latest.latency);
        setCurrentJitter(latest.jitter);
        setCurrentThroughput(latest.throughput);
      }
    };
    
    generateData();
    
    // Generate handover events
    const generateHandoverEvents = () => {
      const events: HandoverEvent[] = [
        {
          id: '1',
          from: 'LEO-SAT-251',
          to: 'LEO-SAT-347',
          timestamp: new Date(Date.now() - 1000 * 60 * 12),
          duration: 487,
          status: 'completed'
        },
        {
          id: '2',
          from: 'LEO-SAT-347',
          to: 'LEO-SAT-129',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          duration: 502,
          status: 'failed'
        },
        {
          id: '3',
          from: 'LEO-SAT-347',
          to: 'LEO-SAT-182',
          timestamp: new Date(Date.now() - 1000 * 60 * 2),
          duration: 278,
          status: 'completed'
        },
        {
          id: '4',
          from: 'LEO-SAT-182',
          to: 'LEO-SAT-347',
          timestamp: new Date(Date.now() - 1000 * 30),
          duration: 0,
          status: 'in-progress'
        }
      ];
      
      setHandoverEvents(events);
    };
    
    generateHandoverEvents();
    
    // Update data periodically
    const interval = setInterval(() => {
      const last = satelliteData[satelliteData.length - 1];
      if (last) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        });
        
        const timeIndex = Math.random() * 10;
        
        const newDataPoint: SatelliteData = {
          timestamp: formattedTime,
          signalStrength: Math.max(0, Math.min(100, last.signalStrength + Math.sin(timeIndex) * 5 + Math.random() * 6 - 3)),
          latency: Math.max(50, last.latency + Math.cos(timeIndex) * 15 + Math.random() * 10 - 5),
          throughput: Math.max(5, last.throughput + Math.sin(timeIndex * 0.5) * 3 + Math.random() * 2 - 1),
          jitter: Math.max(0, last.jitter + Math.cos(timeIndex * 0.7) * 1 + Math.random()),
          elevation: Math.max(10, Math.min(80, last.elevation + Math.sin(timeIndex * 0.2) * 2 + Math.random() - 0.5)),
          azimuth: (last.azimuth + 0.5) % 360
        };
        
        setSatelliteData(prev => [...prev.slice(1), newDataPoint]);
        
        // Update current metrics
        setCurrentLatency(newDataPoint.latency);
        setCurrentJitter(newDataPoint.jitter);
        setCurrentThroughput(newDataPoint.throughput);
        
        // Update buffer health and congestion
        setBufferHealth(prev => Math.max(70, Math.min(98, prev + Math.random() * 6 - 3)));
        setCongestionLevel(prev => Math.max(5, Math.min(60, prev + Math.random() * 8 - 4)));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Satellite orbit visualization animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    let time = 0;
    const speed = 0.003;
    
    const drawSatelliteOrbit = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw Earth
      const earthRadius = Math.min(width, height) * 0.3;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Earth glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, earthRadius * 0.95,
        centerX, centerY, earthRadius * 1.2
      );
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Earth surface
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0A1929';
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(79, 209, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Earth grid lines
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(79, 209, 255, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw latitude lines
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, earthRadius * i / 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(79, 209, 255, 0.1)';
        ctx.stroke();
      }
      
      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * earthRadius,
          centerY + Math.sin(angle) * earthRadius
        );
        ctx.strokeStyle = 'rgba(79, 209, 255, 0.1)';
        ctx.stroke();
      }
      
      // Draw satellite orbits
      const orbitRadius = earthRadius * 1.5;
      const orbitOffset = earthRadius * 0.2;
      
      // Orbit paths
      for (let i = 0; i < 3; i++) {
        const orbitAngle = (Math.PI / 6) * i;
        
        ctx.beginPath();
        ctx.ellipse(
          centerX, centerY,
          orbitRadius, orbitRadius - orbitOffset * i,
          orbitAngle, 0, Math.PI * 2
        );
        ctx.strokeStyle = 'rgba(79, 209, 255, 0.2)';
        ctx.stroke();
      }
      
      // Draw satellites
      const drawSatellite = (orbitIndex: number, position: number, isActive: boolean) => {
        const orbitAngle = (Math.PI / 6) * orbitIndex;
        const r = orbitRadius - orbitOffset * orbitIndex;
        
        const angle = position * Math.PI * 2;
        const x = centerX + Math.cos(angle) * r * Math.cos(orbitAngle);
        const y = centerY + Math.sin(angle) * r;
        
        // Satellite body
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#22C55E' : '#64748B';
        ctx.fill();
        
        if (isActive) {
          // Signal wave for active satellite
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        return { x, y };
      };
      
      // Draw satellite connections
      const sat1 = drawSatellite(0, (time * 1.5) % 1, false);
      const sat2 = drawSatellite(1, (time * 0.8 + 0.3) % 1, true); // Active
      const sat3 = drawSatellite(2, (time * 1.2 + 0.7) % 1, false);
      const groundStation = {
        x: centerX,
        y: centerY + earthRadius * 0.9
      };
      
      // Connection to ground station
      ctx.beginPath();
      ctx.moveTo(sat2.x, sat2.y);
      ctx.lineTo(groundStation.x, groundStation.y);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Inter-satellite links
      ctx.beginPath();
      ctx.moveTo(sat1.x, sat1.y);
      ctx.lineTo(sat2.x, sat2.y);
      ctx.strokeStyle = 'rgba(79, 209, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(sat2.x, sat2.y);
      ctx.lineTo(sat3.x, sat3.y);
      ctx.stroke();
      
      // Draw ground station
      ctx.beginPath();
      ctx.moveTo(groundStation.x, groundStation.y - 7);
      ctx.lineTo(groundStation.x - 5, groundStation.y);
      ctx.lineTo(groundStation.x + 5, groundStation.y);
      ctx.closePath();
      ctx.fillStyle = '#64748B';
      ctx.fill();
      
      time += speed;
      animationRef.current = requestAnimationFrame(drawSatelliteOrbit);
    };
    
    animationRef.current = requestAnimationFrame(drawSatelliteOrbit);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const getSignalQualityClass = (strength: number) => {
    if (strength >= 85) return 'text-green-500';
    if (strength >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getHandoverStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Satellite Visualization */}
      <Card className="col-span-1 md:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Satellite className="h-5 w-5 mr-2" />
            LEO Satellite Network Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="bg-sat-dark/50 rounded-xl p-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                <span className="font-medium">{activeSatellite}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Wifi className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Elevation: 48°</span>
                </div>
                <div className="flex items-center">
                  <Signal className="h-4 w-4 mr-1 text-green-500" />
                  <span>Connected</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              {/* Satellite Orbit Animation */}
              <div className="flex-1 flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={400} 
                  height={300} 
                  className="w-full max-w-[400px]"
                />
              </div>
              
              {/* Metrics */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-sat-gray/20 rounded p-3">
                  <div className="text-xs text-muted-foreground">Latency</div>
                  <div className="text-2xl font-mono font-bold mt-1">
                    {currentLatency.toFixed(1)} <span className="text-sm text-muted-foreground">ms</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Round-trip time</span>
                  </div>
                </div>
                
                <div className="bg-sat-gray/20 rounded p-3">
                  <div className="text-xs text-muted-foreground">Jitter</div>
                  <div className="text-2xl font-mono font-bold mt-1">
                    {currentJitter.toFixed(1)} <span className="text-sm text-muted-foreground">ms</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs">
                    <BarChart4 className="h-3 w-3 mr-1" />
                    <span>Latency variation</span>
                  </div>
                </div>
                
                <div className="bg-sat-gray/20 rounded p-3">
                  <div className="text-xs text-muted-foreground">Throughput</div>
                  <div className="text-2xl font-mono font-bold mt-1">
                    {currentThroughput.toFixed(1)} <span className="text-sm text-muted-foreground">Mbps</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    <span>Data transfer rate</span>
                  </div>
                </div>
                
                <div className="bg-sat-gray/20 rounded p-3">
                  <div className="text-xs text-muted-foreground">Buffer Health</div>
                  <div className="text-2xl font-mono font-bold mt-1">
                    {bufferHealth} <span className="text-sm text-muted-foreground">%</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs">
                    <Network className="h-3 w-3 mr-1" />
                    <span>Stream stability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Signal Metrics Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <AreaChart className="h-5 w-5 mr-2" />
            Satellite Signal Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                signalStrength: { color: "#22c55e" },
                latency: { color: "#3b82f6" },
                jitter: { color: "#f59e0b" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                  data={satelliteData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 11 }} 
                    tickCount={6}
                    tickMargin={10}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 250]}
                    tick={{ fontSize: 11 }}
                    tickMargin={10}
                  />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="signalStrength"
                    name="Signal Strength %"
                    stroke="var(--color-signalStrength)"
                    fill="var(--color-signalStrength)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="latency"
                    name="Latency (ms)"
                    stroke="var(--color-latency)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="jitter"
                    name="Jitter (ms)"
                    stroke="var(--color-jitter)"
                    strokeWidth={2}
                    dot={false}
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Signal Strength</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Latency</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">Jitter</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Handover Events */}
      <Card className="col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Signal className="h-5 w-5 mr-2" />
            Satellite Handover Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {handoverEvents.map(event => (
              <div 
                key={event.id}
                className={`p-3 border rounded-md ${
                  event.status === 'in-progress'
                    ? 'border-blue-500/30 bg-blue-500/10 animate-pulse'
                    : 'border-sat-gray/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Badge className={getHandoverStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      
                      <div className="text-xs text-muted-foreground ml-2">
                        {event.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-sm">
                      <div className="font-medium">{event.from}</div>
                      <svg width="24" height="16" className="mx-1">
                        <path 
                          d="M2 8 L22 8 M16 3 L22 8 L16 13" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          fill="none"
                        />
                      </svg>
                      <div className="font-medium">{event.to}</div>
                    </div>
                    
                    {event.status !== 'in-progress' && (
                      <div className="text-xs mt-1 text-muted-foreground">
                        Duration: {event.duration} ms
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {handoverEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <Signal className="h-6 w-6 mb-2 opacity-50" />
                <p>No handover events</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground border-t border-sat-gray/30 pt-3">
            <div className="flex justify-between">
              <span>Average handover time:</span>
              <span className="font-mono">422 ms</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Success rate:</span>
              <span className="font-mono">94.3%</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Network congestion:</span>
              <span className="font-mono">{congestionLevel}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatelliteDashboard;
