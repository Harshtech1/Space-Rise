
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MediaExtraction from "@/components/MediaExtraction";

const ExtractionPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Media Extraction</h1>
      <MediaExtraction />
    </div>
  );
};

export default ExtractionPage;
