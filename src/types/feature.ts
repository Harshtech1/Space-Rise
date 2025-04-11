import { ReactNode } from "react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color: string;
  tabValue: string;
  component: ReactNode;
}
