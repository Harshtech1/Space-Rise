
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDigit, LineChart, ArrowDownToLine, Shield } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    packetsReceived: number;
    protocols: number;
    extractedMedia: number;
    securityEvents: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} transition={{ type: "spring", stiffness: 100 }}>
        <Card className="overflow-hidden relative group border-l-4 border-l-green-500 shadow-lg hover:shadow-green-500/10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg mr-2">
                <FileDigit className="h-5 w-5 text-green-500" />
              </div>
              Packets Received
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-green-500">
              {stats.packetsReceived.toLocaleString()}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-green-500/20 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} transition={{ type: "spring", stiffness: 100 }}>
        <Card className="overflow-hidden relative group border-l-4 border-l-blue-500 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg mr-2">
                <LineChart className="h-5 w-5 text-blue-500" />
              </div>
              Detected Protocols
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-500">{stats.protocols}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground">Including RTP, HTTP, SIP, FTP, SMTP</div>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-500/20 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} transition={{ type: "spring", stiffness: 100 }}>
        <Card className="overflow-hidden relative group border-l-4 border-l-purple-500 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg mr-2">
                <ArrowDownToLine className="h-5 w-5 text-purple-500" />
              </div>
              Extracted Media
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-purple-500">{stats.extractedMedia}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground">Audio, video and VoIP calls</div>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-purple-500/20 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} transition={{ type: "spring", stiffness: 100 }}>
        <Card className="overflow-hidden relative group border-l-4 border-l-red-500 shadow-lg hover:shadow-red-500/10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg mr-2">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              Security Events
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-red-500">{stats.securityEvents}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground">Alerts, warnings and notifications</div>
              <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-500/20 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StatsCards;
