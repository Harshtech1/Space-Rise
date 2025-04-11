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
    <div className="bg-sat-dark border-b border-sat-blue/20 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <SatelliteDish className="h-6 w-6 text-sat-blue" />
            <Link to="/">
              <h1 className="text-xl font-bold text-white flex items-center">
                Space_Rise{" "}
                <span className="text-xs bg-sat-blue/20 px-2 py-1 rounded-md ml-2">
                  Vision
                </span>
              </h1>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-sat-gray",
                    isActive("/") && "bg-sat-gray/50"
                  )}
                >
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-sat-blue/10 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <Gauge className="h-6 w-6 mb-2" />
                          <div className="mb-2 text-lg font-medium text-white">
                            Main Dashboard
                          </div>
                          <p className="text-sm text-muted-foreground">
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Radio className="h-4 w-4 mr-2" />
                            Packet Stream
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            Live analysis of incoming packets
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/protocol-stats"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <LineChart className="h-4 w-4 mr-2" />
                            Protocol Statistics
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            Analysis and distribution of protocols
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/recovery"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Recovery Techniques
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
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
                    "bg-transparent hover:bg-sat-gray",
                    (isActive("/extraction") || isActive("/media")) &&
                      "bg-sat-gray/50"
                  )}
                >
                  Analysis
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/extraction"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <ArrowDownToLine className="h-4 w-4 mr-2" />
                            Media Extraction
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
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
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <VideoIcon className="h-4 w-4 mr-2" />
                            Media Player
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
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
                    "bg-transparent hover:bg-sat-gray",
                    (isActive("/source") || isActive("/about")) &&
                      "bg-sat-gray/50"
                  )}
                >
                  Source
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/source"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            Stream Source
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            Configure and connect to stream sources
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sat-gray/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            About
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
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

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-sat-dark/50 rounded-md px-2 py-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-soft"></div>
              <span className="text-xs text-muted-foreground">LIVE</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
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
