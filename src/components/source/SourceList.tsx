
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Folder, Router, Cpu } from "lucide-react";
import { StreamSource } from '@/services/streamSourceService';

interface SourceListProps {
  sources: StreamSource[];
  isLoading: boolean;
  onConnect: (id: string) => void;
  onDelete: (id: string) => void;
}

const SourceList = ({ sources, isLoading, onConnect, onDelete }: SourceListProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Available Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin h-6 w-6 border-2 border-sat-blue border-t-transparent rounded-full"></div>
            </div>
          ) : sources.length > 0 ? (
            <ul className="divide-y divide-border">
              {sources.map((source) => (
                <li key={source.id} className="p-3 hover:bg-sat-gray/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {source.type === 'receiver' && <Cpu className="h-4 w-4 mr-2 text-sat-blue" />}
                      {source.type === 'network' && <Router className="h-4 w-4 mr-2 text-sat-blue" />}
                      {source.type === 'file' && <Folder className="h-4 w-4 mr-2 text-sat-blue" />}
                      
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-xs text-muted-foreground">{source.url}</div>
                        {source.lastConnected && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Last connected: {new Date(source.lastConnected).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant={source.active ? "default" : "outline"}
                        className={source.active ? "bg-green-500 hover:bg-green-600" : ""}
                        onClick={() => onConnect(source.id)}
                        disabled={source.active}
                      >
                        {source.active ? "Active" : "Connect"}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onDelete(source.id)}
                        disabled={source.active}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-20 text-muted-foreground">
              <Database className="h-6 w-6 mb-2 opacity-50" />
              <p>No sources available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceList;
