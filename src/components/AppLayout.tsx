import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "./Navigation";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-sat-dark text-muted-foreground text-xs p-4 border-t border-sat-blue/20">
        <div className="container mx-auto flex justify-between items-center">
          <div>SpaceRise - DVB-S2 Stream Analysis Platform</div>
          <div>© {new Date().getFullYear()} Space_Rise Labs</div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default AppLayout;
