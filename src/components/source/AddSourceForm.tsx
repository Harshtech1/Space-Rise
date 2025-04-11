
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerCog } from "lucide-react";
import { DropZone } from "@/components/DropZone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddSourceFormProps {
  onFileUpload: (files: File[]) => void;
  onNetworkSourceAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  onReceiverSourceAdd: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddSourceForm = ({ 
  onFileUpload, 
  onNetworkSourceAdd, 
  onReceiverSourceAdd 
}: AddSourceFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ServerCog className="h-5 w-5 mr-2" />
          Add New Source
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="file" className="text-xs">File Source</TabsTrigger>
            <TabsTrigger value="network" className="text-xs">Network Stream</TabsTrigger>
            <TabsTrigger value="receiver" className="text-xs">DVB-S2 Receiver</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            <div className="text-sm">
              Upload a recorded stream file (TS, BBFrame, or GSE format)
            </div>
            
            <DropZone 
              onFilesDrop={onFileUpload}
              accept=".ts,.bbf,.gse,.dat,.bin"
              maxFiles={1}
              maxSize={500} // 500MB max
            />
            
            <div className="text-xs text-muted-foreground">
              Supported formats: Transport Stream (.ts), BB Frames (.bbf/.dat), Generic Stream Encapsulation (.gse)
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <div className="text-sm">
              Connect to a network stream (UDP multicast or unicast)
            </div>
            
            <form onSubmit={onNetworkSourceAdd} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Source Name</Label>
                  <Input id="name" name="name" placeholder="Network Stream 1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="host">Host (IP Address)</Label>
                    <Input id="host" name="host" placeholder="239.255.1.1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input id="port" name="port" placeholder="1234" />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Add Network Source
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="receiver" className="space-y-4">
            <div className="text-sm">
              Connect to a DVB-S2 receiver device
            </div>
            
            <form onSubmit={onReceiverSourceAdd} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Device Name</Label>
                  <Input id="name" name="name" placeholder="DVB-S2 Receiver" />
                </div>
                
                <div>
                  <Label htmlFor="device">Device Path</Label>
                  <Input id="device" name="device" placeholder="/dev/ttyUSB0" />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Add Receiver Device
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AddSourceForm;
