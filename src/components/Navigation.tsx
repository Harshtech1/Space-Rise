import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  Database,
  Gauge,
  LineChart,
  Radio,
  SatelliteDish,
  Shield,
  VideoIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="glass-panel w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 animate-scale-in">
            <SatelliteDish className="h-6 w-6 text-sat-blue animate-pulse" />
            <Link to="/">
              <h1 className="text-xl font-bold text-white flex items-center">
                Space_Rise{" "}
                <span className="text-xs bg-sat-blue/20 px-2 py-1 rounded-md ml-2 border border-sat-blue/30">
                  Vision
                </span>
              </h1>
            </Link>
          </div>

          <NavigationMenu className="hidden md:block animate-fade-in-up delay-100">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-white/10 text-gray-200",
                    isActive("/") && "bg-white/10 text-white"
                  )}
                >
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent className="glass-panel border border-white/10">
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sat-blue/20 to-sat-dark/50 p-6 no-underline outline-none focus:shadow-md border border-sat-blue/20 hover:border-sat-blue/50 transition-colors"
                        >
                          <Gauge className="h-6 w-6 mb-2 text-sat-blue" />
                          <div className="mb-2 text-lg font-medium text-white">
                            Main Dashboard
                          </div>
                          <p className="text-sm text-gray-400">
                            Overview of packet stream, protocol statistics, and
                            recovery techniques
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/packet-stream"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <Radio className="h-4 w-4 mr-2 text-blue-400" />
                            Packet Stream
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Live analysis of incoming packets
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/protocol-stats"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <LineChart className="h-4 w-4 mr-2 text-green-400" />
                            Protocol Statistics
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Analysis and distribution of protocols
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/recovery"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <Shield className="h-4 w-4 mr-2 text-red-400" />
                            Recovery Techniques
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Analysis of packet loss recovery mechanisms
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-white/10 text-gray-200",
                    (isActive("/extraction") || isActive("/media")) &&
                      "bg-white/10 text-white"
                  )}
                >
                  Analysis
                </NavigationMenuTrigger>
                <NavigationMenuContent className="glass-panel border border-white/10">
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/extraction"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <ArrowDownToLine className="h-4 w-4 mr-2 text-purple-400" />
                            Media Extraction
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Extract VoIP calls, audio, video and files from
                            stream
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/media"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <VideoIcon className="h-4 w-4 mr-2 text-pink-400" />
                            Media Player
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Play and analyze extracted media content
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-white/10 text-gray-200",
                    (isActive("/source") || isActive("/about")) &&
                      "bg-white/10 text-white"
                  )}
                >
                  Source
                </NavigationMenuTrigger>
                <NavigationMenuContent className="glass-panel border border-white/10">
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/source"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center text-gray-200">
                            <Database className="h-4 w-4 mr-2 text-amber-400" />
                            Stream Source
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            Configure and connect to stream sources
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none text-gray-200">
                            About
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-400">
                            About SpaceRise and its features
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-3 animate-fade-in-up delay-200">
            <div className="flex items-center space-x-1 bg-sat-dark/50 rounded-md px-2 py-1 border border-sat-blue/20">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">LIVE</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs glass-button text-gray-200">
              <Radio className="h-3 w-3 mr-1" />
              LEO Network
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
