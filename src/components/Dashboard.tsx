
import { Card } from "@/components/ui/card";
import Header from "./Header";
import PacketStream from "./PacketStream";
import ProtocolStats from "./ProtocolStats";
import LossRecovery from "./LossRecovery";
import MediaExtractor from "./MediaExtractor";
import StreamSource from "./StreamSource";
import RecoveryTechniques from "./RecoveryTechniques";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 space-y-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-6 gap-4 mb-4">
            <Card className="col-span-3 relative group">
              <PacketStream />
              <Link to="/packet-stream" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>View Full Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
            <Card className="col-span-3 relative group">
              <ProtocolStats />
              <Link to="/protocol-stats" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>View Detailed Stats</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
          </div>
          
          <div className="grid grid-cols-6 gap-4">
            <Card className="col-span-3 relative group">
              <LossRecovery />
              <Link to="/recovery" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>View Recovery Details</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
            <Card className="col-span-3 relative group">
              <RecoveryTechniques />
              <Link to="/recovery" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>Compare Techniques</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
          </div>
          
          <div className="grid grid-cols-6 gap-4 mt-4">
            <Card className="col-span-3 relative group">
              <MediaExtractor />
              <Link to="/extraction" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>Extract Media</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
            <Card className="col-span-3 relative group">
              <StreamSource />
              <Link to="/source" className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-sat-blue px-3 py-2 rounded-md flex items-center gap-2">
                  <span>Configure Source</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
