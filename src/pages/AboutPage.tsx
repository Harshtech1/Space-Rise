import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Layers, Radio, ArrowUpDown, Check } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">About SpaceRise</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SpaceRise is a comprehensive software application for analysis and
              processing of DVB-S2 receiver output streams in near real-time.
              The platform enables detailed examination of raw BB Frames, GSE,
              and TS packets for protocol classification, media extraction, and
              packet loss recovery analysis.
            </p>

            <h3 className="text-xl font-semibold mt-4">Key Features</h3>

            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="border border-sat-blue/30 bg-sat-gray/20 rounded-md p-4">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Radio className="h-5 w-5 text-sat-blue" />
                  Protocol Identification
                </h4>
                <p className="text-sm text-muted-foreground">
                  Classification and identification of audio, video, data &
                  protocols such as MPE, ULE, SIP, RTP, FTP, SFTP, HTTP, HTTPS,
                  SNMP, POP, SMTP, SSH and more.
                </p>
              </div>

              <div className="border border-sat-blue/30 bg-sat-gray/20 rounded-md p-4">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-sat-blue" />
                  Encryption Detection
                </h4>
                <p className="text-sm text-muted-foreground">
                  Identification of encryption/scrambling mechanisms if present
                  in the stream through headers and SI tables analysis.
                </p>
              </div>

              <div className="border border-sat-blue/30 bg-sat-gray/20 rounded-md p-4">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <ArrowUpDown className="h-5 w-5 text-sat-blue" />
                  Content Extraction
                </h4>
                <p className="text-sm text-muted-foreground">
                  Extraction of VoIP calls, audio and video programs, files,
                  emails, web pages, etc. into separate files for further
                  analysis.
                </p>
              </div>

              <div className="border border-sat-blue/30 bg-sat-gray/20 rounded-md p-4">
                <h4 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-sat-blue" />
                  Loss Recovery
                </h4>
                <p className="text-sm text-muted-foreground">
                  Advanced packet loss recovery mechanisms including
                  Space_Rise's in-orbit recovery technology that offers
                  significant performance improvements over traditional methods.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Technology</h3>
            <p className="text-sm text-muted-foreground">
              SpaceRise is built with modern web technologies for the frontend
              interface while leveraging powerful native processing capabilities
              in the backend. The system combines high-performance packet
              processing with an intuitive user interface.
            </p>

            <div className="mt-4 grid md:grid-cols-3 gap-3">
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Real-time Analysis</span>
              </div>
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Multi-protocol Support</span>
              </div>
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Media Extraction</span>
              </div>
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Loss Recovery</span>
              </div>
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Packet Analysis</span>
              </div>
              <div className="bg-sat-dark p-3 rounded border border-sat-gray flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">LEO Network Support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-b border-sat-blue/20 pb-2">
                <p className="text-xs text-muted-foreground">Version</p>
                <p className="font-medium">SpaceRise 1.0.2</p>
              </div>

              <div className="border-b border-sat-blue/20 pb-2">
                <p className="text-xs text-muted-foreground">Platform</p>
                <p className="font-medium">Linux / Windows</p>
              </div>

              <div className="border-b border-sat-blue/20 pb-2">
                <p className="text-xs text-muted-foreground">
                  Technology Stack
                </p>
                <p className="font-medium">React, Python, C++</p>
              </div>

              <div className="border-b border-sat-blue/20 pb-2">
                <p className="text-xs text-muted-foreground">
                  Supported Formats
                </p>
                <p className="font-medium">DVB-S2, TS, GSE, BBFrames</p>
              </div>

              <div className="border-b border-sat-blue/20 pb-2">
                <p className="text-xs text-muted-foreground">
                  Processing Capabilities
                </p>
                <p className="font-medium">Near Real-time Analysis</p>
              </div>

              <div className="bg-sat-gray/20 p-3 rounded mt-6">
                <h4 className="text-sm font-semibold mb-2">Documentation</h4>
                <ul className="text-sm space-y-1">
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    User Manual
                  </li>
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    API Documentation
                  </li>
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    Technical Specifications
                  </li>
                </ul>
              </div>

              <div className="bg-sat-blue/20 p-3 rounded mt-2">
                <h4 className="text-sm font-semibold mb-2">Support</h4>
                <ul className="text-sm space-y-1">
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    Contact Support
                  </li>
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    Report Issue
                  </li>
                  <li className="underline cursor-pointer hover:text-sat-blue">
                    Feature Request
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
