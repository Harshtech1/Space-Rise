import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Radio } from "lucide-react";

const SignalVisualizer: React.FC = () => {
  const signalCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const signalCanvas = signalCanvasRef.current;
    const spectrumCanvas = spectrumCanvasRef.current;
    if (!signalCanvas || !spectrumCanvas) return;

    const signalCtx = signalCanvas.getContext("2d");
    const spectrumCtx = spectrumCanvas.getContext("2d");
    if (!signalCtx || !spectrumCtx) return;

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      // 1. Draw Signal Strength (Sine Wave)
      signalCtx.fillStyle = "rgba(31, 41, 55, 0.5)"; // Dark background with slight transparency for trail effect
      signalCtx.fillRect(0, 0, signalCanvas.width, signalCanvas.height);

      signalCtx.beginPath();
      signalCtx.lineWidth = 2;
      signalCtx.strokeStyle = "#0ea5e9"; // sat-blue

      for (let x = 0; x < signalCanvas.width; x++) {
        // Combine multiple sine waves for a more "technical" look
        const y =
          signalCanvas.height / 2 +
          Math.sin((x + time) * 0.05) * 30 +
          Math.sin((x + time * 2) * 0.02) * 10 +
          (Math.random() - 0.5) * 5; // Add some noise
        if (x === 0) {
          signalCtx.moveTo(x, y);
        } else {
          signalCtx.lineTo(x, y);
        }
      }
      signalCtx.stroke();

      // 2. Draw Frequency Spectrum (Bar Graph)
      spectrumCtx.fillStyle = "rgb(31, 41, 55)"; // Solid dark background
      spectrumCtx.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

      const barWidth = 10;
      const gap = 2;
      const barCount = spectrumCanvas.width / (barWidth + gap);

      for (let i = 0; i < barCount; i++) {
        // Simulate frequency data
        const height =
          Math.abs(Math.sin(time * 0.05 + i * 0.2)) * spectrumCanvas.height * 0.8 +
          Math.random() * 20;
        
        // Gradient fill
        const gradient = spectrumCtx.createLinearGradient(0, spectrumCanvas.height, 0, 0);
        gradient.addColorStop(0, "#22c55e"); // Green at bottom
        gradient.addColorStop(0.6, "#eab308"); // Yellow middle
        gradient.addColorStop(1, "#ef4444"); // Red at top

        spectrumCtx.fillStyle = gradient;
        spectrumCtx.fillRect(
          i * (barWidth + gap),
          spectrumCanvas.height - height,
          barWidth,
          height
        );
      }

      time += 2;
      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle resize
    const resize = () => {
      const parent = signalCanvas.parentElement;
      if (parent) {
        signalCanvas.width = parent.clientWidth;
        signalCanvas.height = parent.clientHeight;
        spectrumCanvas.width = parent.clientWidth;
        spectrumCanvas.height = parent.clientHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize(); // Initial size
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Activity className="mr-2 h-6 w-6 text-sat-blue" />
          Signal Analysis
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Signal Strength Card */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-200 flex items-center">
                <Radio className="mr-2 h-4 w-4 text-blue-400" />
                Signal Strength (Time Domain)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700 shadow-inner">
                <canvas 
                  ref={signalCanvasRef} 
                  className="w-full h-full block"
                />
                <div className="absolute top-2 right-2 text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                  LIVE
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequency Spectrum Card */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-200 flex items-center">
                <Activity className="mr-2 h-4 w-4 text-green-400" />
                Frequency Spectrum (FFT)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700 shadow-inner">
                <canvas 
                  ref={spectrumCanvasRef} 
                  className="w-full h-full block"
                />
                <div className="absolute top-2 right-2 text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  2.4 GHz
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default SignalVisualizer;
