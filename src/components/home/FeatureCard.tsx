
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onSelect: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
  onSelect
}) => {
  return (
    <Card className="h-full overflow-hidden border-2 hover:border-sat-blue transition-all duration-300 group">
      <CardHeader>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`p-3 rounded-full inline-block ${color} shadow-lg`}
        >
          {icon}
        </motion.div>
        <CardTitle className="mt-4 group-hover:text-sat-blue transition-colors">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full group border-sat-blue/30 hover:bg-sat-blue/10 hover:border-sat-blue"
          onClick={onSelect}
        >
          <span className="mr-1">View {title}</span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
            initial={{ x: 0 }}
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.8 }}
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </motion.svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
