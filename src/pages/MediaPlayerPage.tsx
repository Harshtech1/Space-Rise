
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileAudio, FileVideo, Phone, Play, Pause, SkipBack, SkipForward, Volume2, Upload } from "lucide-react";
import { DropZone } from "@/components/DropZone";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: "video" | "audio" | "voip";
  duration?: string;
}

const MediaPlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("video");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    // Load sample media files
    const sampleFiles: MediaFile[] = [
      { id: "v1", name: "Sample Video 1", url: "", type: "video", duration: "00:30" },
      { id: "v2", name: "Sample Video 2", url: "", type: "video", duration: "01:15" },
      { id: "a1", name: "Sample Audio 1", url: "", type: "audio", duration: "02:45" },
      { id: "a2", name: "Sample Audio 2", url: "", type: "audio", duration: "03:10" },
      { id: "c1", name: "Call 1: +1234567890", url: "", type: "voip", duration: "01:05" },
      { id: "c2", name: "Call 2: +0987654321", url: "", type: "voip", duration: "00:40" },
    ];
    
    setMediaFiles(sampleFiles);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedFile(null);
    setIsPlaying(false);
  };
  
  const handleFileSelect = (fileId: string) => {
    const file = mediaFiles.find(f => f.id === fileId);
    if (file) {
      setSelectedFile(file);
      setIsPlaying(true);
    }
  };
  
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      
      // Create new media file
      const newFile: MediaFile = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: fileUrl,
        type: activeTab as "video" | "audio" | "voip",
        duration: "00:00" // Would need to be calculated from actual media
      };
      
      // Add to media files
      setMediaFiles(prev => [...prev, newFile]);
      
      // Select the new file
      setSelectedFile(newFile);
      setIsPlaying(true);
      
      toast.success(`Added ${activeTab}: ${file.name}`);
    }
  };
  
  const getCurrentTabFiles = () => {
    return mediaFiles.filter(file => file.type === activeTab);
  };
  
  const getAcceptedFileTypes = () => {
    switch (activeTab) {
      case "video": return ".mp4,.mkv,.avi,.mov,.wmv";
      case "audio": return ".mp3,.wav,.aac,.flac,.ogg";
      case "voip": return ".mp3,.wav";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Media Player</h1>
      
      <Tabs defaultValue="video" value={activeTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <FileVideo className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <FileAudio className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="voip" className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>VoIP</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Playback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-sat-dark border border-sat-gray rounded-md overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  {selectedFile && selectedFile.url ? (
                    <video 
                      src={selectedFile.url} 
                      className="h-full w-full" 
                      controls={true}
                      autoPlay={isPlaying}
                    />
                  ) : (
                    <div className="text-center">
                      <FileVideo className="h-16 w-16 mx-auto opacity-20" />
                      <p className="text-muted-foreground mt-2">No video loaded. Select a stream or upload.</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-sat-gray">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!selectedFile}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {selectedFile ? selectedFile.duration : "00:00 / 00:00"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        className="bg-sat-gray text-white text-xs p-1 rounded border border-sat-blue/20"
                        value={selectedFile?.id || ""}
                        onChange={(e) => handleFileSelect(e.target.value)}
                      >
                        <option value="" disabled>Select stream</option>
                        {getCurrentTabFiles().map(file => (
                          <option key={file.id} value={file.id}>{file.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Upload Video File</h3>
                <DropZone 
                  onFilesDrop={handleFileDrop}
                  accept={getAcceptedFileTypes()}
                  maxFiles={1}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Audio Playback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-sat-dark border border-sat-gray rounded-md overflow-hidden p-6">
                <div className="flex items-center justify-center h-64">
                  {selectedFile && selectedFile.url ? (
                    <div className="w-full">
                      <div className="flex justify-center items-center mb-4">
                        <FileAudio className="h-16 w-16 text-sat-blue" />
                      </div>
                      <audio 
                        src={selectedFile.url}
                        className="w-full" 
                        controls={true}
                        autoPlay={isPlaying}
                      />
                      <div className="text-center mt-4">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedFile.duration}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileAudio className="h-16 w-16 mx-auto opacity-20" />
                      <p className="text-muted-foreground mt-2">No audio loaded. Select a stream or upload.</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-sat-gray pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!selectedFile}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {selectedFile ? selectedFile.duration : "00:00 / 00:00"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        className="bg-sat-gray text-white text-xs p-1 rounded border border-sat-blue/20"
                        value={selectedFile?.id || ""}
                        onChange={(e) => handleFileSelect(e.target.value)}
                      >
                        <option value="" disabled>Select stream</option>
                        {getCurrentTabFiles().map(file => (
                          <option key={file.id} value={file.id}>{file.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Upload Audio File</h3>
                <DropZone 
                  onFilesDrop={handleFileDrop}
                  accept={getAcceptedFileTypes()}
                  maxFiles={1}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voip">
          <Card>
            <CardHeader>
              <CardTitle>VoIP Call Playback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-sat-dark border border-sat-gray rounded-md overflow-hidden p-6">
                <div className="flex items-center justify-center h-64">
                  {selectedFile && selectedFile.url ? (
                    <div className="w-full">
                      <div className="flex justify-center items-center mb-4">
                        <Phone className="h-16 w-16 text-sat-blue" />
                      </div>
                      <audio 
                        src={selectedFile.url}
                        className="w-full" 
                        controls={true}
                        autoPlay={isPlaying}
                      />
                      <div className="text-center mt-4">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">Call Duration: {selectedFile.duration}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Phone className="h-16 w-16 mx-auto opacity-20" />
                      <p className="text-muted-foreground mt-2">No VoIP call loaded. Select a call or upload.</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-sat-gray pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={togglePlay} disabled={!selectedFile}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" disabled={!selectedFile}>
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {selectedFile ? selectedFile.duration : "00:00 / 00:00"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        className="bg-sat-gray text-white text-xs p-1 rounded border border-sat-blue/20"
                        value={selectedFile?.id || ""}
                        onChange={(e) => handleFileSelect(e.target.value)}
                      >
                        <option value="" disabled>Select call</option>
                        {getCurrentTabFiles().map(file => (
                          <option key={file.id} value={file.id}>{file.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Upload VoIP Recording</h3>
                <DropZone 
                  onFilesDrop={handleFileDrop}
                  accept={getAcceptedFileTypes()}
                  maxFiles={1}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaPlayerPage;
