import React from "react";
import { motion } from "framer-motion";
import { Satellite } from "lucide-react";

interface HomeHeaderProps {
  activeSource: string;
}

const HomeHeader = ({ activeSource }: HomeHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sat-blue to-blue-400">
            SpaceRise
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-sat-blue to-blue-400/30 rounded-full mt-2"></div>
        </div>
        <p className="text-muted-foreground mt-3 md:max-w-lg text-lg">
          Advanced analysis and processing of DVB-S2 receiver output streams
          with real-time monitoring
        </p>
      </motion.div>

      <motion.div
        className="mt-6 md:mt-0 bg-gradient-to-r from-sat-blue/20 to-blue-500/10 backdrop-blur-sm px-5 py-3 rounded-lg border border-sat-blue/30 flex items-center gap-3 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/30 absolute top-0 left-0 animate-ping"></div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Active Source:</div>
          <div className="text-sm font-medium flex items-center">
            <Satellite className="h-3.5 w-3.5 mr-1 text-sat-blue" />
            {activeSource}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeHeader;
