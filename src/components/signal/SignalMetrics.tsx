
import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, Shield, Activity, Wifi } from 'lucide-react';

interface SignalMetricsProps {
  signalStrength: number;
  dataRate: number;
  bitErrorRate: number;
}

interface SatelliteInfoProps {
  altitude: number;
  period: number;
  coverage: number;
}

export const getSignalQualityClass = (strength: number) => {
  if (strength >= 85) return 'text-green-500';
  if (strength >= 70) return 'text-yellow-500';
  return 'text-red-500';
};

export const SignalMetrics = ({ signalStrength, dataRate, bitErrorRate }: SignalMetricsProps) => {
  const metrics = [
    { 
      icon: <Satellite className="h-3 w-3" />, 
      label: "Signal", 
      value: `${signalStrength.toFixed(1)}%`,
      colorClass: getSignalQualityClass(signalStrength)
    },
    { 
      icon: <Activity className="h-3 w-3" />, 
      label: "Data Rate", 
      value: `${dataRate.toFixed(0)} Kbps`,
      colorClass: "text-blue-400"
    },
    { 
      icon: <Shield className={`h-3 w-3 ${bitErrorRate > 0.0005 ? 'text-yellow-500' : 'text-green-500'}`} />, 
      label: "BER", 
      value: bitErrorRate.toExponential(2),
      colorClass: bitErrorRate > 0.0005 ? 'text-yellow-500' : 'text-green-500'
    }
  ];

  return (
    <motion.div 
      className="absolute top-2 left-2 right-2 flex flex-wrap justify-between text-xs"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {metrics.map((metric, index) => (
        <motion.div 
          key={index}
          className="bg-sat-dark/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center border border-white/5 shadow-lg"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="mr-1">{metric.icon}</div>
          <span>{metric.label}: </span>
          <span className={`font-mono ml-1 ${metric.colorClass}`}>
            {metric.value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const SatelliteInfo = ({ altitude, period, coverage }: SatelliteInfoProps) => {
  const info = [
    { label: "Altitude", value: `${altitude} km` },
    { label: "Period", value: `${period} min` },
    { label: "Coverage", value: `${coverage}%` }
  ];

  return (
    <motion.div 
      className="absolute bottom-2 left-2 right-2 flex justify-between text-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {info.map((item, index) => (
        <motion.div 
          key={index} 
          className="bg-sat-dark/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center border border-white/5 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Wifi className="h-2.5 w-2.5 mr-1 text-sat-blue opacity-70" />
          <span>{item.label}: </span>
          <span className="font-mono ml-1">{item.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
