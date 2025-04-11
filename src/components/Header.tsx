import { Radio, SatelliteDish, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-sat-gray p-4 flex items-center justify-between border-b border-sat-blue/20">
      <div className="flex items-center space-x-2">
        <SatelliteDish className="h-6 w-6 text-sat-blue" />
        <div>
          <h1 className="text-xl font-bold text-white flex items-center">
            Space_Rise{" "}
            <span className="text-xs bg-sat-blue/20 px-2 py-1 rounded-md ml-2">
              Vision
            </span>
          </h1>
          <p className="text-xs text-muted-foreground">
            DVB-S2 Stream Analysis Platform
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 bg-sat-dark/50 rounded-md px-2 py-1">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-soft"></div>
          <span className="text-xs text-muted-foreground">LIVE</span>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <Radio className="h-3 w-3 mr-1" />
          LEO Network
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
