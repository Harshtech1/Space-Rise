
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Folder, Router, ServerCog } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { streamSourceService } from "@/services/streamSourceService";
import { toast } from "sonner";

interface StreamSourceProps {
  activeSource?: string;
}

export const StreamSource = ({ activeSource = "" }: StreamSourceProps) => {
  const [source, setSource] = useState(activeSource || "No active connection");
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState<string>("simulator");
  const [host, setHost] = useState<string>("localhost");
  const [port, setPort] = useState<string>("8080");
  
  useEffect(() => {
    setSource(activeSource);
  }, [activeSource]);
  
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Reset stats for the simulation
    toast.info("Connecting to stream source...");
    
    setTimeout(() => {
      setIsConnecting(false);
      setSource(getSourceDisplayName());
      toast.success("Connected successfully!");
    }, 1500);
  };
  
  const getSourceDisplayName = () => {
    switch (selectedSourceType) {
      case "simulator":
        return "DVB-S2 Stream Simulator";
      case "file":
        return "Recorded BBFrame File";
      case "socket":
        return `Live Socket Connection (${host}:${port})`;
      default:
        return "Unknown Source";
    }
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <ServerCog className="h-4 w-4 mr-1.5" />
          Stream Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="text-xs text-muted-foreground">Select Source</div>
          <Select 
            defaultValue={selectedSourceType} 
            onValueChange={setSelectedSourceType}
          >
            <SelectTrigger className="text-xs">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simulator" className="text-xs">
                <div className="flex items-center">
                  <Cpu className="h-3.5 w-3.5 mr-1.5" />
                  <span>DVB-S2 Stream Simulator</span>
                </div>
              </SelectItem>
              <SelectItem value="file" className="text-xs">
                <div className="flex items-center">
                  <Folder className="h-3.5 w-3.5 mr-1.5" />
                  <span>Recorded BBFrame File</span>
                </div>
              </SelectItem>
              <SelectItem value="socket" className="text-xs">
                <div className="flex items-center">
                  <Router className="h-3.5 w-3.5 mr-1.5" />
                  <span>Live Socket Connection</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <div className="text-xs text-muted-foreground">Connection Settings</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs">Host</label>
              <input 
                type="text" 
                className="w-full bg-sat-gray/30 border border-sat-gray/50 rounded-md px-2 py-1 text-xs"
                placeholder="localhost"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                disabled={selectedSourceType !== "socket"}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs">Port</label>
              <input 
                type="text" 
                className="w-full bg-sat-gray/30 border border-sat-gray/50 rounded-md px-2 py-1 text-xs"
                placeholder="8080"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                disabled={selectedSourceType !== "socket"}
              />
            </div>
          </div>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="w-full"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <div className="h-2 w-2 rounded-full bg-white mr-1.5 animate-pulse"></div>
              Connecting...
            </>
          ) : (
            <>
              <ServerCog className="h-3.5 w-3.5 mr-1.5" />
              Connect to Stream
            </>
          )}
        </Button>
        
        <div className="rounded-md bg-sat-blue/10 p-3">
          <div className="text-xs flex items-center">
            <div className={`h-2 w-2 rounded-full ${source !== "No active connection" ? "bg-green-500" : "bg-yellow-500"} mr-1.5`}></div>
            <span className="font-medium">Currently Connected:</span>
          </div>
          <div className="pl-4 mt-1 text-xs text-muted-foreground">
            {source}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamSource;
