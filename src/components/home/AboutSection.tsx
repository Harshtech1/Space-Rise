import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cpu, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="h-5 w-5 mr-2 text-sat-blue" />
          About SpaceRise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Welcome to SpaceRise, an advanced tool for analyzing DVB-S2 stream
            data. This application enables you to monitor, analyze, extract and
            secure content from various protocol streams.
          </p>

          <div className="bg-sat-blue/10 p-4 rounded border border-sat-blue/30">
            <h3 className="text-lg font-medium mb-2">AI-Powered Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 mr-2 text-sat-blue shrink-0 mt-0.5" />
                <span>
                  Intelligent packet loss detection and recovery using
                  predictive algorithms
                </span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 mr-2 text-sat-blue shrink-0 mt-0.5" />
                <span>
                  Automatic media content identification and extraction
                </span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 mr-2 text-sat-blue shrink-0 mt-0.5" />
                <span>
                  Protocol classification with advanced pattern recognition
                </span>
              </li>
              <li className="flex items-start">
                <Sparkles className="h-5 w-5 mr-2 text-sat-blue shrink-0 mt-0.5" />
                <span>Anomaly detection for enhanced security monitoring</span>
              </li>
            </ul>
          </div>

          <div className="bg-sat-gray/20 p-4 rounded border border-sat-gray/50">
            <h3 className="text-lg font-medium mb-2">Quick Start Guide</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Configure a stream source using the{" "}
                <Link to="/source" className="text-sat-blue hover:underline">
                  Stream Source
                </Link>{" "}
                page
              </li>
              <li>
                Monitor incoming packets with the{" "}
                <Link
                  to="/packet-stream"
                  className="text-sat-blue hover:underline"
                >
                  Packet Stream Analysis
                </Link>
              </li>
              <li>
                View protocol distribution in{" "}
                <Link
                  to="/protocol-stats"
                  className="text-sat-blue hover:underline"
                >
                  Protocol Statistics
                </Link>
              </li>
              <li>
                Extract media content using the{" "}
                <Link
                  to="/extraction"
                  className="text-sat-blue hover:underline"
                >
                  Media Extraction
                </Link>{" "}
                tools
              </li>
              <li>
                Play and analyze media with the{" "}
                <Link to="/media" className="text-sat-blue hover:underline">
                  Media Player
                </Link>
              </li>
              <li>
                Monitor signal security with the{" "}
                <Link to="/security" className="text-sat-blue hover:underline">
                  Security Dashboard
                </Link>
              </li>
              <li>
                Track satellite behavior with the{" "}
                <Link to="/satellite" className="text-sat-blue hover:underline">
                  Satellite Dashboard
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
