
import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NoSignalStateProps {
  onTryConnect?: () => void;
}

const NoSignalState = ({ onTryConnect }: NoSignalStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
      {onTryConnect ? (
        <>
          <AlertTriangle className="h-10 w-10 mb-4 text-yellow-500 opacity-70" />
          <p>No active connection</p>
          <p className="text-xs mt-1 mb-4">Connect to a signal source to view live data</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onTryConnect}
            className="mt-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Try to connect
          </Button>
        </>
      ) : (
        <>
          <Loader2 className="h-10 w-10 mb-4 animate-spin opacity-50" />
          <p>No active connection</p>
          <p className="text-xs mt-1">Connect to a signal source to view live data</p>
        </>
      )}
    </div>
  );
};

export default NoSignalState;
