
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { FeatureItem } from '../../types/feature';

interface FeaturesGridProps {
  features: FeatureItem[];
  onFeatureSelect: (tabValue: string) => void;
}

const FeaturesGrid = ({ features, onFeatureSelect }: FeaturesGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <FeatureCard
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            onSelect={() => onFeatureSelect(feature.tabValue)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturesGrid;
