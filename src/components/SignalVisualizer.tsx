import React from "react";
import { motion } from "framer-motion";

const SignalVisualizer: React.FC = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Signal Visualizer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Signal Strength
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Signal Graph</span>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Frequency Spectrum
            </h3>
            <div className="h-48 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-300">Spectrum Analyzer</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignalVisualizer;
