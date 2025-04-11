
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SecurityDashboard from '@/components/SecurityDashboard';
import { Shield, Lock, UnlockIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const SecurityPage = () => {
  // Mock security data
  const securityMetrics = [
    { name: "Encryption Coverage", value: 86, color: "bg-green-500" },
    { name: "Signal Integrity", value: 92, color: "bg-blue-500" },
    { name: "Threat Detection", value: 73, color: "bg-amber-500" },
    { name: "Protocol Validation", value: 89, color: "bg-purple-500" },
  ];
  
  const recentEvents = [
    { id: 1, type: "warning", message: "Unencrypted packet detected", time: "2 mins ago", icon: UnlockIcon },
    { id: 2, type: "info", message: "Signal strength optimized", time: "15 mins ago", icon: CheckCircle },
    { id: 3, type: "error", message: "Authentication failure attempt", time: "32 mins ago", icon: AlertCircle },
    { id: 4, type: "success", message: "Secure connection established", time: "1 hour ago", icon: Lock },
  ];
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Signal Security Monitor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Security Overview</CardTitle>
              <CardDescription>Real-time monitoring of signal security metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityDashboard />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Security Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securityMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className={`h-2 ${metric.color}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                Recent Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-start p-3 rounded-md bg-sat-gray/20 border border-sat-gray/30"
                  >
                    <div className={`
                      p-1.5 rounded-full mr-3 shrink-0
                      ${event.type === 'error' ? 'bg-red-500/20 text-red-500' : 
                        event.type === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                        event.type === 'success' ? 'bg-green-500/20 text-green-500' :
                        'bg-blue-500/20 text-blue-500'}
                    `}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.message}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
