import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileAudio,
  FileVideo,
  Phone,
  FilePlus,
  Cpu,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from "lucide-react";
import { DropZone } from "@/components/DropZone";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface MediaFile {
  id: string;
  name: string;
  type: "audio" | "video" | "voip";
  size: number;
  duration: number;
  source: string;
  timestamp: Date;
  url: string;
}

const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "Stream_Audio_Fragment_1.mp3",
    type: "audio",
    size: 3540000,
    duration: 195,
    source: "BBFrame #24519",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    url: "https://example.com/audio1.mp3",
  },
  {
    id: "2",
    name: "Stream_Video_Fragment_1.mp4",
    type: "video",
    size: 24500000,
    duration: 87,
    source: "TS Packet #13542",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    url: "https://example.com/video1.mp4",
  },
  {
    id: "3",
    name: "VoIP_Call_+1234567890.wav",
    type: "voip",
    size: 5260000,
    duration: 143,
    source: "RTP Stream #8",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    url: "https://example.com/call1.wav",
  },
  {
    id: "4",
    name: "Stream_Audio_Fragment_2.mp3",
    type: "audio",
    size: 2180000,
    duration: 121,
    source: "BBFrame #27844",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    url: "https://example.com/audio2.mp3",
  },
];

const MediaExtraction = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(mockMediaFiles);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return;

    setProcessingFiles(true);
    toast.info(`Processing ${files.length} files for extraction...`);

    // Simulate processing delay
    setTimeout(() => {
      const newFiles: MediaFile[] = files.map((file) => {
        const isAudio =
          file.type.includes("audio") ||
          file.name.match(/\.(mp3|wav|aac|ogg)$/i);
        const isVideo =
          file.type.includes("video") ||
          file.name.match(/\.(mp4|webm|mkv|avi)$/i);

        return {
          id: Math.random().toString(36).substring(2, 10),
          name: file.name,
          type: isAudio ? "audio" : isVideo ? "video" : "voip",
          size: file.size,
          duration: Math.floor(Math.random() * 300) + 30,
          source: `Uploaded File`,
          timestamp: new Date(),
          url: URL.createObjectURL(file),
        };
      });

      setMediaFiles((prev) => [...newFiles, ...prev]);
      setProcessingFiles(false);
      toast.success(`Successfully extracted ${files.length} media files`);
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cpu className="h-5 w-5 mr-2" />
            Media Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upload">Upload Stream</TabsTrigger>
              <TabsTrigger value="extract">Extract Media</TabsTrigger>
              <TabsTrigger value="results">Extracted Files</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="text-sm">
                Upload a stream file to extract media content
              </div>

              <DropZone
                onFilesDrop={handleFileUpload}
                accept=".ts,.bbf,.gse,.dat,.bin,.mp3,.mp4,.wav"
                maxFiles={5}
                maxSize={500} // 500MB max
              />

              <div className="text-xs text-muted-foreground">
                Supported formats: DVB-S2 Stream Files (.ts, .bbf, .gse, .dat,
                .bin) or direct media files (.mp3, .mp4, .wav)
              </div>

              {processingFiles && (
                <div className="mt-4 bg-sat-blue/10 border border-sat-blue/30 rounded p-3 flex items-center">
                  <div className="mr-3">
                    <div className="h-6 w-6 rounded-full border-2 border-sat-blue border-t-transparent animate-spin"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Processing Files</div>
                    <div className="text-xs text-muted-foreground">
                      Using AI to identify and extract media content...
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="extract" className="space-y-4">
              <div className="text-sm mb-4">
                Select media content to extract from active stream
              </div>

              <div className="bg-sat-gray/20 rounded-md border border-sat-gray/30 p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FileAudio className="h-5 w-5 mr-3 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Audio Streams</div>
                      <div className="text-xs text-muted-foreground">
                        3 streams detected
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Extract All
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <FileVideo className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Video Streams</div>
                      <div className="text-xs text-muted-foreground">
                        1 stream detected
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Extract All
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">VoIP Calls</div>
                      <div className="text-xs text-muted-foreground">
                        2 calls detected
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Extract All
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-xs text-muted-foreground border-t border-sat-gray/30 pt-3">
                  <p>
                    Space_Rise AI has detected media content in the active
                    stream.
                  </p>
                  <p className="mt-1">
                    Click "Extract All" to save all detected content or select
                    specific streams below.
                  </p>
                </div>

                <div className="mt-4">
                  <Button className="w-full">Extract Selected Content</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {mediaFiles.length > 0 ? (
                  mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 border border-sat-gray/30 rounded-md hover:border-sat-blue/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedMedia(file)}
                    >
                      <div className="flex items-center">
                        {file.type === "audio" && (
                          <FileAudio className="h-5 w-5 mr-2 text-green-500" />
                        )}
                        {file.type === "video" && (
                          <FileVideo className="h-5 w-5 mr-2 text-purple-500" />
                        )}
                        {file.type === "voip" && (
                          <Phone className="h-5 w-5 mr-2 text-blue-500" />
                        )}

                        <div>
                          <div className="font-medium text-sm truncate">
                            {file.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center space-x-3 mt-1">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span>{formatDuration(file.duration)}</span>
                            <span>•</span>
                            <span>From: {file.source}</span>
                          </div>
                        </div>

                        <Button size="sm" variant="ghost" className="ml-auto">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <FilePlus className="h-8 w-8 mb-2 opacity-50" />
                    <p>No media files extracted yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Media Player */}
      {selectedMedia && (
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedMedia.type === "audio" && (
                  <FileAudio className="h-5 w-5 mr-2 text-green-500" />
                )}
                {selectedMedia.type === "video" && (
                  <FileVideo className="h-5 w-5 mr-2 text-purple-500" />
                )}
                {selectedMedia.type === "voip" && (
                  <Phone className="h-5 w-5 mr-2 text-blue-500" />
                )}
                <span>{selectedMedia.name}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedMedia(null)}
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMedia.type === "video" ? (
              <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-70" />
                </div>
              </div>
            ) : (
              <div className="h-16 bg-sat-gray/20 rounded-md relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center">
                    <div className="w-full px-4">
                      <div className="flex items-center space-x-2">
                        {/* Waveform Visualization */}
                        {[...Array(40)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-sat-blue"
                            style={{
                              height: `${
                                Math.sin(i * 0.3) * 12 + Math.random() * 16 + 6
                              }px`,
                              opacity:
                                i ===
                                Math.floor(
                                  (currentTime / selectedMedia.duration) * 40
                                )
                                  ? 1
                                  : 0.7,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs w-10 text-right">
                  {formatDuration(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={selectedMedia.duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-xs w-10">
                  {formatDuration(selectedMedia.duration)}
                </span>
              </div>

              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  size="icon"
                  className="rounded-full h-10 w-10"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2 ml-6">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MediaExtraction;
