
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDigit } from "lucide-react";
import { StreamSource as StreamSourceType, streamSourceService } from "@/services/streamSourceService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import StreamSource from "@/components/StreamSource";
import SourceHeader from "@/components/source/SourceHeader";
import SourceList from "@/components/source/SourceList";
import AddSourceForm from "@/components/source/AddSourceForm";

const StreamSourcePage = () => {
  const queryClient = useQueryClient();
  
  const { data: sources = [], isLoading } = useQuery({
    queryKey: ['streamSources'],
    queryFn: () => streamSourceService.getSources(),
  });

  const { data: activeSource } = useQuery({
    queryKey: ['activeSource'],
    queryFn: () => streamSourceService.getActiveSource(),
  });

  const addSourceMutation = useMutation({
    mutationFn: streamSourceService.addSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamSources'] });
    },
  });

  const connectSourceMutation = useMutation({
    mutationFn: streamSourceService.connectToSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamSources'] });
      queryClient.invalidateQueries({ queryKey: ['activeSource'] });
    },
  });

  const disconnectSourceMutation = useMutation({
    mutationFn: streamSourceService.disconnect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamSources'] });
      queryClient.invalidateQueries({ queryKey: ['activeSource'] });
    },
  });

  const deleteSourceMutation = useMutation({
    mutationFn: streamSourceService.deleteSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamSources'] });
      queryClient.invalidateQueries({ queryKey: ['activeSource'] });
    },
  });

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const source = {
        name: file.name,
        type: "file" as const,
        url: `/uploads/${file.name}`,
        path: `/uploads/${file.name}`
      };
      
      addSourceMutation.mutate(source);
      toast.success(`Added new file source: ${file.name}`);
    }
  };

  const handleConnectSource = (id: string) => {
    connectSourceMutation.mutate(id);
  };

  const handleDisconnectSource = () => {
    disconnectSourceMutation.mutate();
  };

  const handleDeleteSource = (id: string) => {
    deleteSourceMutation.mutate(id);
  };

  const handleNetworkSourceAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const host = formData.get('host') as string;
    const port = formData.get('port') as string;
    
    if (!name || !host || !port) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const source = {
      name,
      type: "network" as const,
      url: `udp://${host}:${port}`,
      host,
      port
    };
    
    addSourceMutation.mutate(source);
    e.currentTarget.reset();
  };

  const handleReceiverSourceAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const device = formData.get('device') as string;
    
    if (!name || !device) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const source = {
      name,
      type: "receiver" as const,
      url: device
    };
    
    addSourceMutation.mutate(source);
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <SourceHeader 
        activeSource={activeSource} 
        onDisconnect={handleDisconnectSource}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <SourceList
            sources={sources}
            isLoading={isLoading}
            onConnect={handleConnectSource}
            onDelete={handleDeleteSource}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <AddSourceForm
            onFileUpload={handleFileUpload}
            onNetworkSourceAdd={handleNetworkSourceAdd}
            onReceiverSourceAdd={handleReceiverSourceAdd}
          />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileDigit className="h-5 w-5 mr-2" />
                Signal Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StreamSource />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StreamSourcePage;
