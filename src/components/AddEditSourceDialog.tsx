
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StreamSource } from "@/services/streamSourceService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Folder, Router } from "lucide-react";

interface AddEditSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (source: Partial<StreamSource>) => void;
  source?: StreamSource;
  isEditing?: boolean;
}

export const AddEditSourceDialog = ({
  isOpen,
  onClose,
  onSave,
  source,
  isEditing = false
}: AddEditSourceDialogProps) => {
  const [formData, setFormData] = useState<Partial<StreamSource>>({
    name: "",
    type: "receiver",
    url: "",
    host: "",
    port: "",
    path: "",
  });

  useEffect(() => {
    if (source) {
      setFormData({
        name: source.name || "",
        type: source.type || "receiver",
        url: source.url || "",
        host: source.host || "",
        port: source.port || "",
        path: source.path || "",
      });
    } else {
      setFormData({
        name: "",
        type: "receiver",
        url: "",
        host: "",
        port: "",
        path: "",
      });
    }
  }, [source, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate URL based on type and fields
    if (field === "type" || field === "host" || field === "port" || field === "path") {
      const updatedData = { ...formData, [field]: value };
      
      if (updatedData.type === "network" && updatedData.host && updatedData.port) {
        setFormData(prev => ({ 
          ...prev, 
          [field]: value, 
          url: `udp://${updatedData.host}:${updatedData.port}`
        }));
      }
      else if (updatedData.type === "file" && updatedData.path) {
        setFormData(prev => ({ 
          ...prev, 
          [field]: value, 
          url: updatedData.path
        }));
      }
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name?.trim()) {
      alert("Please enter a name for the source");
      return;
    }

    if ((formData.type === "network" && (!formData.host || !formData.port)) || 
        (formData.type === "file" && !formData.path) ||
        (formData.type === "receiver" && !formData.url)) {
      alert("Please fill all required fields");
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Stream Source" : "Add New Stream Source"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receiver" className="flex items-center">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      <span>DVB-S2 Receiver</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="network">
                    <div className="flex items-center">
                      <Router className="h-4 w-4 mr-2" />
                      <span>Network Stream</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="file">
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2" />
                      <span>File Source</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.type === "network" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">
                  Host
                </Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => handleChange("host", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  Port
                </Label>
                <Input
                  id="port"
                  value={formData.port}
                  onChange={(e) => handleChange("port", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          
          {formData.type === "file" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="path" className="text-right">
                File Path
              </Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) => handleChange("path", e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          
          {formData.type === "receiver" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Device Path
              </Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              value={formData.url}
              readOnly
              className="col-span-3 bg-muted"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Source"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSourceDialog;
