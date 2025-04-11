
import React from 'react';
import { Button } from "@/components/ui/button";
import { StreamSource } from '@/services/streamSourceService';

interface SourceHeaderProps {
  activeSource: StreamSource | null;
  onDisconnect: () => void;
}

const SourceHeader = ({ activeSource, onDisconnect }: SourceHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">Stream Source Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Manage and configure different stream sources for analysis
        </p>
      </div>
      
      <div className="mt-4 md:mt-0">
        {activeSource ? (
          <div className="flex items-center">
            <div className="bg-green-500/20 px-4 py-2 rounded-l border border-green-500/30 flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <div>
                <div className="text-xs text-muted-foreground">Connected to:</div>
                <div className="text-sm font-medium">{activeSource.name}</div>
              </div>
            </div>
            <Button 
              variant="destructive"
              size="sm"
              className="rounded-l-none"
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="bg-yellow-500/20 px-4 py-2 rounded border border-yellow-500/30 flex items-center">
            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">No active connection</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceHeader;
