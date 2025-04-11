
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";

// Pages
import HomePage from "./pages/HomePage";
import PacketStreamPage from "./pages/PacketStreamPage";
import ProtocolStatsPage from "./pages/ProtocolStatsPage";
import RecoveryPage from "./pages/RecoveryPage";
import ExtractionPage from "./pages/ExtractionPage";
import MediaPlayerPage from "./pages/MediaPlayerPage";
import StreamSourcePage from "./pages/StreamSourcePage";
import SecurityPage from "./pages/SecurityPage";
import SatellitePage from "./pages/SatellitePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="packet-stream" element={<PacketStreamPage />} />
            <Route path="protocol-stats" element={<ProtocolStatsPage />} />
            <Route path="recovery" element={<RecoveryPage />} />
            <Route path="extraction" element={<ExtractionPage />} />
            <Route path="media" element={<MediaPlayerPage />} />
            <Route path="source" element={<StreamSourcePage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="satellite" element={<SatellitePage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
