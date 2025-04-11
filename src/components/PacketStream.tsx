import React from "react";
import { motion } from "framer-motion";

const PacketStream: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Packet Stream Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Live Packet Stream
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Packet Visualization</span>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Packet Statistics
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Statistics Dashboard</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PacketStream;
