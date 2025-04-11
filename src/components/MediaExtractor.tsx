import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioLines, Download, FileVideo, Phone, Video } from "lucide-react";
import { DropZone } from "@/components/DropZone";
import { toast } from "sonner";

const MediaExtractor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("video");
  const [extracting, setExtracting] = useState(false);
  const [selectedStream, setSelectedStream] = useState<number | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const mediaStreams = {
    video: [
      { id: 1, name: "Stream #1 (TS)", status: "active" },
      { id: 2, name: "Stream #2 (TS)", status: "warning" },
    ],
    audio: [
      { id: 1, name: "Audio #1 (AAC)", status: "info" },
      { id: 2, name: "Audio #2 (MP3)", status: "purple" },
    ],
    voip: [
      { id: 1, name: "VoIP Call #1", time: "14:12:05" },
      { id: 2, name: "VoIP Call #2", time: "14:15:22" },
      { id: 3, name: "VoIP Call #3", time: "14:28:47" },
    ],
  };

  const handleExtract = () => {
    if (!selectedStream) {
      toast.error("Please select a stream first");
      return;
    }

    setExtracting(true);
    toast.info(`Extracting ${activeTab} stream #${selectedStream}...`);

    setTimeout(() => {
      setExtracting(false);
      toast.success(
        `Successfully extracted ${activeTab} stream #${selectedStream}`
      );

      // Simulate download
      const link = document.createElement("a");
      link.href = "#";
      link.download = `${activeTab}-stream-${selectedStream}.${getFileExtension()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  const getFileExtension = () => {
    switch (activeTab) {
      case "video":
        return "mp4";
      case "audio":
        return "mp3";
      case "voip":
        return "wav";
      default:
        return "bin";
    }
  };

  const handleVideoFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      setVideoPreview(objectUrl);
      toast.success(`Added video file: ${file.name}`);

      // Clean up when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleAudioFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      setAudioPreview(objectUrl);
      toast.success(`Added audio file: ${file.name}`);

      // Clean up when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Media Extraction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Video Stream
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Video Player</span>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Audio Stream
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Audio Player</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MediaExtractor;
