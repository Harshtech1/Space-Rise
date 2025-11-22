import React, { useState, useEffect } from "react";
import {
  FileDigit,
  LineChart,
  ArrowDownToLine,
  VideoIcon,
  Database,
  Shield,
  Satellite,
  Sparkles,
  BarChart2,
  Settings,
  Server,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SignalVisualizer from "@/components/SignalVisualizer";
import PacketStream from "@/components/PacketStream";
import ProtocolStats from "@/components/ProtocolStats";
import LossRecovery from "@/components/LossRecovery";
import MediaExtractor from "@/components/MediaExtractor";
import SecurityDashboard from "@/components/SecurityDashboard";
import SatelliteDashboard from "@/components/SatelliteDashboard";
import HomeHeader from "@/components/home/HomeHeader";
import StatsCards from "@/components/home/StatsCards";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import FeatureTabContent from "@/components/home/FeatureTabContent";
import AboutSection from "@/components/home/AboutSection";
import { FeatureItem } from "@/types/feature";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState<string>(
    "No active connection"
  );
  const [activeSection, setActiveSection] = useState("packet-stream");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [stats, setStats] = useState({
    packetsReceived: 0,
    protocols: 0,
    extractedMedia: 0,
    securityEvents: 0,
  });

  // Define top navigation items
  const topNavItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      color: "text-blue-500",
      link: "/",
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <LineChart className="h-5 w-5" />,
      color: "text-green-500",
      link: "/protocol-stats",
    },
    {
      id: "source",
      title: "Source",
      icon: <Server className="h-5 w-5" />,
      color: "text-purple-500",
      link: "/source",
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      color: "text-gray-500",
      link: "/about",
    },
  ];

  // Define features array
  const features: FeatureItem[] = [
    {
      title: "Packet Stream",
      description:
        "Real-time packet monitoring and analysis",
      icon: <LineChart className="h-6 w-6" />,
      link: "/packet-stream",
      color: "bg-blue-500/10 text-blue-500",
      tabValue: "packet-stream",
      component: <PacketStream />,
    },
    {
      title: "Protocol Stats",
      description:
        "Comprehensive protocol distribution and performance metrics",
      icon: <BarChart2 className="h-6 w-6" />,
      link: "/protocol-stats",
      color: "bg-green-500/10 text-green-500",
      tabValue: "protocol-stats",
      component: <ProtocolStats />,
    },
    {
      title: "Loss Recovery",
      description: "Advanced packet loss detection and recovery mechanisms",
      icon: <ArrowDownToLine className="h-6 w-6" />,
      link: "/recovery",
      color: "bg-red-500/10 text-red-500",
      tabValue: "recovery",
      component: <LossRecovery />,
    },
    {
      title: "Media Extractor",
      description: "Extract and analyze media streams from packets",
      icon: <VideoIcon className="h-6 w-6" />,
      link: "/extraction",
      color: "bg-purple-500/10 text-purple-500",
      tabValue: "extraction",
      component: <MediaExtractor />,
    },
    {
      title: "Security Dashboard",
      description: "Monitor and analyze security events and threats",
      icon: <Shield className="h-6 w-6" />,
      link: "/security",
      color: "bg-yellow-500/10 text-yellow-500",
      tabValue: "security",
      component: <SecurityDashboard />,
    },
    {
      title: "Satellite Dashboard",
      description: "Monitor LEO satellite behavior and handovers",
      icon: <Satellite className="h-6 w-6" />,
      link: "/satellite",
      color: "bg-amber-500/10 text-amber-500",
      tabValue: "satellite",
      component: <SatelliteDashboard />,
    },
    {
      title: "Media Player",
      description: "Play and analyze extracted media content",
      icon: <Sparkles className="h-6 w-6" />,
      link: "/media",
      color: "bg-indigo-500/10 text-indigo-500",
      tabValue: "media",
      component: <LossRecovery />,
    },
  ];

  useEffect(() => {
    // Simulate stats changing over time
    const interval = setInterval(() => {
      setStats((prev) => ({
        packetsReceived: prev.packetsReceived + Math.floor(Math.random() * 20),
        protocols: Math.floor(Math.random() * 2) + 5,
        extractedMedia: prev.extractedMedia + Math.floor(Math.random() * 0.3),
        securityEvents: prev.securityEvents + Math.floor(Math.random() * 0.1),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (feature: FeatureItem) => {
    setActiveSection(feature.tabValue);
    navigate(feature.link);
  };

  const handleNavClick = (item: (typeof topNavItems)[0]) => {
    setActiveNav(item.id);
    navigate(item.link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section with Background Video */}
      <div className="relative h-[500px] overflow-hidden">
        <video
          src="/videos/210886.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Space Rise
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Exploring the Future of Space Technology .Secure Satellite Signal
              Decoding – Empowering Strategic Communication.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Space Rise
              </span>
            </motion.div>
            <div className="flex space-x-4">
              {topNavItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeNav === item.id
                      ? "bg-gray-700 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <motion.span
                    className={`mr-2 ${item.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto p-6 animate-fade-in">
        <StatsCards stats={stats} />

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.tabValue}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer group ${feature.color}`}
                  onClick={() => handleFeatureClick(feature)}
                >
                  <div className="flex items-center mb-4">
                    <motion.span
                      className={`p-3 rounded-lg ${
                        feature.color.split(" ")[0]
                      } group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {React.cloneElement(feature.icon as React.ReactElement, {
                        className: "h-6 w-6",
                      })}
                    </motion.span>
                    <motion.h3
                      className="text-xl font-semibold ml-3 group-hover:text-blue-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {feature.title}
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <AboutSection />

        {/* Footer with Animated Tagline */}
        <motion.footer
          className="py-8 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                When Satellites Whisper, SpaceRise Listens.
              </motion.p>
              <motion.div
                className="mt-4 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} Space Rise. All rights reserved.
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
