
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

interface FeatureTabContentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  children: React.ReactNode;
}

const FeatureTabContent = ({ 
  title, 
  description, 
  icon, 
  color, 
  link, 
  children 
}: FeatureTabContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-muted shadow-lg">
        <CardHeader className="bg-gradient-to-r from-card/50 to-background pb-4">
          <CardTitle className={`flex items-center ${color.split(' ').length > 1 ? color.split(' ')[1] : color}`}>
            {icon}
            {title}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] relative overflow-hidden bg-gradient-to-br from-background to-card/50">
            <div className="h-full w-full overflow-auto">
              {children}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
            <motion.div 
              className="absolute bottom-4 right-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={link}>
                <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur-sm border-card-foreground/20 shadow-lg flex items-center gap-2 hover:bg-card/50">
                  <span>View Full {title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureTabContent;
