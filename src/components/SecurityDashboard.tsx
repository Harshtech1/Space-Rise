
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Lock, Unlock, Eye, EyeOff, RefreshCw, Cpu, Radio, BellRing } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SecurityAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface SecurityMetric {
  timestamp: string;
  encryptionRate: number;
  threatDetection: number;
  packetLoss: number;
  dataIntegrity: number;
}

const SecurityDashboard = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [encryptionStatus, setEncryptionStatus] = useState(true);
  const [securityScore, setSecurityScore] = useState(87);
  const [lastScan, setLastScan] = useState<Date>(new Date());
  const [scanning, setScanning] = useState(false);
  
  // Generate security alerts
  useEffect(() => {
    const generatedAlerts: SecurityAlert[] = [
      {
        id: '1',
        severity: 'low',
        message: 'Unencrypted data packet detected',
        details: 'Packet #24518 contains unencrypted data. Protocol: HTTP',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        acknowledged: true
      },
      {
        id: '2',
        severity: 'medium',
        message: 'Signal interference detected',
        details: 'Possible jamming attempt detected on frequency 10.75 GHz',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        acknowledged: false
      },
      {
        id: '3',
        severity: 'high',
        message: 'Authentication failure',
        details: 'Multiple failed authentication attempts detected from IP 192.168.1.45',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        acknowledged: false
      }
    ];
    
    setAlerts(generatedAlerts);
  }, []);
  
  // Generate security metrics data
  useEffect(() => {
    const generateMetrics = () => {
      const now = new Date();
      const data: SecurityMetric[] = [];
      
      for (let i = 24; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 15 * 60000);
        const formattedTime = timestamp.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        // Base values with some randomness
        const baseSecurity = Math.random() * 10 + 85;
        const basePacketLoss = Math.random() * 2 + 1;
        
        data.push({
          timestamp: formattedTime,
          encryptionRate: Math.min(100, baseSecurity + Math.random() * 5 - 2.5),
          threatDetection: Math.max(0, Math.min(100, baseSecurity - 10 + Math.random() * 8)),
          packetLoss: basePacketLoss + Math.random(),
          dataIntegrity: Math.min(100, baseSecurity - 5 + Math.random() * 5),
        });
      }
      
      setMetrics(data);
    };
    
    generateMetrics();
    
    const interval = setInterval(() => {
      const last = metrics[metrics.length - 1];
      if (last) {
        const now = new Date();
        const newPoint: SecurityMetric = {
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          encryptionRate: Math.min(100, last.encryptionRate + Math.random() * 4 - 2),
          threatDetection: Math.max(0, Math.min(100, last.threatDetection + Math.random() * 6 - 3)),
          packetLoss: Math.max(0, Math.min(10, last.packetLoss + Math.random() * 1 - 0.5)),
          dataIntegrity: Math.min(100, last.dataIntegrity + Math.random() * 4 - 2),
        };
        
        setMetrics(prev => [...prev.slice(1), newPoint]);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleScanNow = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setLastScan(new Date());
      
      // Add a new alert
      const newAlert: SecurityAlert = {
        id: Date.now().toString(),
        severity: Math.random() > 0.7 ? 'medium' : 'low',
        message: 'Suspicious packet pattern detected',
        details: 'Unusual pattern in data stream may indicate protocol anomaly',
        timestamp: new Date(),
        acknowledged: false
      };
      
      setAlerts(prev => [newAlert, ...prev]);
      
      // Update security score
      setSecurityScore(prev => Math.max(70, Math.min(98, prev + Math.floor(Math.random() * 7) - 3)));
    }, 3000);
  };
  
  const toggleEncryption = () => {
    setEncryptionStatus(prev => !prev);
  };
  
  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Security Score Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-1.5" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-4xl font-bold ${getSecurityScoreColor(securityScore)}`}>
                {securityScore}
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Last scan:</span>
                <span className="text-sm">
                  {lastScan.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            <div className="h-2 bg-sat-gray/30 rounded-full mt-4 overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  securityScore >= 90 ? 'bg-green-500' : 
                  securityScore >= 70 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Critical</span>
              <span>Good</span>
            </div>
            
            <Button 
              onClick={handleScanNow} 
              className="w-full mt-4"
              disabled={scanning}
            >
              {scanning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Scan Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Encryption Status Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Lock className="h-4 w-4 mr-1.5" />
              Encryption Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {encryptionStatus ? (
                  <Lock className="h-6 w-6 mr-2 text-green-500" />
                ) : (
                  <Unlock className="h-6 w-6 mr-2 text-yellow-500" />
                )}
                <span className="font-medium">
                  {encryptionStatus ? 'Encryption Enabled' : 'Encryption Disabled'}
                </span>
              </div>
              
              <Badge variant={encryptionStatus ? "default" : "destructive"}>
                {encryptionStatus ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Algorithm:</span>
                <span className="font-mono">AES-256-GCM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Key rotation:</span>
                <span className="font-mono">Every 24h</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Protected data:</span>
                <span className="font-mono">92.4%</span>
              </div>
            </div>
            
            <Button 
              variant={encryptionStatus ? "destructive" : "default"}
              className="w-full mt-6"
              onClick={toggleEncryption}
            >
              {encryptionStatus ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Disable Encryption
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Enable Encryption
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Detection Statistics Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="h-4 w-4 mr-1.5" />
              Detection Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-muted-foreground">Threat attempts blocked</div>
                  <div className="text-sm font-medium">142</div>
                </div>
                <div className="h-2 bg-sat-gray/30 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-muted-foreground">Data integrity checks</div>
                  <div className="text-sm font-medium">15,842</div>
                </div>
                <div className="h-2 bg-sat-gray/30 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-muted-foreground">Signal interference events</div>
                  <div className="text-sm font-medium">27</div>
                </div>
                <div className="h-2 bg-sat-gray/30 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-muted-foreground">Critical vulnerabilities</div>
                  <div className="text-sm font-medium">2</div>
                </div>
                <div className="h-2 bg-sat-gray/30 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Metrics Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Security Metrics Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                encryptionRate: { color: "#22c55e" },
                threatDetection: { color: "#ea580c" },
                packetLoss: { color: "#ef4444" },
                dataIntegrity: { color: "#3b82f6" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={metrics}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 10]}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="encryptionRate"
                    name="Encryption Rate"
                    stroke="var(--color-encryptionRate)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="threatDetection"
                    name="Threat Detection"
                    stroke="var(--color-threatDetection)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="packetLoss"
                    name="Packet Loss %"
                    stroke="var(--color-packetLoss)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="dataIntegrity"
                    name="Data Integrity"
                    stroke="var(--color-dataIntegrity)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Security Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-3 border rounded-md ${
                    alert.acknowledged 
                      ? 'border-sat-gray/30 bg-sat-gray/10' 
                      : 'border-orange-500/30 bg-orange-500/10 animate-pulse'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1.5 mr-2 ${getSeverityColor(alert.severity)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {alert.details}
                      </div>
                    </div>
                  </div>
                  
                  {!alert.acknowledged && (
                    <div className="mt-2 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Acknowledge
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <BellRing className="h-8 w-8 mb-2 opacity-50" />
                <p>No security alerts</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SecurityDashboard;
