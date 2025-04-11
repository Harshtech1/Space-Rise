import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowUpDown, Maximize2, Shield, Wand2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RecoveryMethod {
  name: string;
  efficiency: number;
  latency: number;
  overhead: number;
  reliability: number;
}

export const RecoveryTechniques = () => {
  const [methods, setMethods] = useState<RecoveryMethod[]>([]);

  useEffect(() => {
    // Simulated data for different packet recovery techniques
    const recoveryMethods: RecoveryMethod[] = [
      {
        name: "ARQ",
        efficiency: 65,
        latency: 75,
        overhead: 30,
        reliability: 80,
      },
      {
        name: "FEC",
        efficiency: 78,
        latency: 45,
        overhead: 60,
        reliability: 75,
      },
      {
        name: "Space_Rise",
        efficiency: 92,
        latency: 25,
        overhead: 45,
        reliability: 95,
      },
      {
        name: "rQUIC",
        efficiency: 90,
        latency: 30,
        overhead: 55,
        reliability: 88,
      },
    ];

    setMethods(recoveryMethods);
  }, []);

  const compareData = [
    {
      name: "Packet Loss Recovery",
      ARQ: 65,
      FEC: 75,
      Space_Rise: 92,
      rQUIC: 89,
    },
    { name: "Low Latency", ARQ: 40, FEC: 65, Space_Rise: 85, rQUIC: 80 },
    {
      name: "Bursty Loss Handling",
      ARQ: 35,
      FEC: 60,
      Space_Rise: 90,
      rQUIC: 85,
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <Shield className="h-4 w-4 mr-1.5" />
          Recovery Techniques Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {methods.map((method) => (
              <div
                key={method.name}
                className={`p-3 rounded-md ${
                  method.name === "Space_Rise"
                    ? "bg-sat-blue/20"
                    : "bg-sat-gray/20"
                }`}
              >
                <div className="text-sm font-semibold mb-2 flex items-center">
                  {method.name === "ARQ" && (
                    <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                  )}
                  {method.name === "FEC" && (
                    <Wand2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  {method.name === "Space_Rise" && (
                    <Shield className="h-3.5 w-3.5 mr-1" />
                  )}
                  {method.name === "rQUIC" && (
                    <Maximize2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  {method.name}
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="font-mono">{method.efficiency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="font-mono">{method.latency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overhead:</span>
                    <span className="font-mono">{method.overhead}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reliability:</span>
                    <span className="font-mono">{method.reliability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[250px]">
            <ChartContainer
              config={{
                ARQ: { color: "#64748b" },
                FEC: { color: "#3b82f6" },
                Space_Rise: { color: "#22c55e" },
                rQUIC: { color: "#f97316" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={compareData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                  <YAxis unit="%" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="ARQ" fill="var(--color-ARQ)" />
                  <Bar dataKey="FEC" fill="var(--color-FEC)" />
                  <Bar dataKey="Space_Rise" fill="var(--color-Space_Rise)" />
                  <Bar dataKey="rQUIC" fill="var(--color-rQUIC)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="text-xs text-muted-foreground p-2 bg-sat-gray/10 rounded border border-sat-gray/20">
            <p className="mb-1 font-medium text-white">
              Recovery Technique Insights:
            </p>
            <p>
              Space_Rise employs in-orbit loss recovery by combining link-local
              retransmission with buffer migration, enabling fast recovery of
              lost packets without sender retransmission. It outperforms
              traditional ARQ and FEC approaches by reducing recovery latency up
              to 55% in bursty loss conditions typical in satellite networks.
            </p>
            <p className="mt-1">
              rQUIC demonstrates similar capabilities by integrating coding
              techniques with QUIC, showing up to 70% latency improvement in
              lossy environments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecoveryTechniques;
