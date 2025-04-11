import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Packet,
  getLossStats,
  generateRandomPacket,
  LossStats,
} from "@/utils/mockData";
import { ArrowLeftRight, Waves } from "lucide-react";

export const LossRecovery = () => {
  const [lossStats, setLossStats] = useState<LossStats>({
    total: 0,
    lost: 0,
    retransmitted: 0,
    lossRate: 0,
    burstEvents: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Just generate a random packet to update stats, we don't need to keep it
      generateRandomPacket();
      setLossStats(getLossStats());
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <ArrowLeftRight className="h-4 w-4 mr-1.5" />
          Space_Rise Loss Recovery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-2xl font-semibold font-mono">
                {lossStats.total}
              </div>
              <div className="text-xs text-muted-foreground">Total Packets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold font-mono text-status-lost">
                {lossStats.lost}
              </div>
              <div className="text-xs text-muted-foreground">Lost Packets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold font-mono text-status-retransmitted">
                {lossStats.retransmitted}
              </div>
              <div className="text-xs text-muted-foreground">Retransmitted</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Loss Rate</span>
              <span className="font-mono">
                {lossStats.lossRate.toFixed(2)}%
              </span>
            </div>
            <div className="h-2 w-full bg-sat-gray/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-status-lost rounded-full"
                style={{ width: `${Math.min(lossStats.lossRate * 3, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Recovery Rate</span>
              <span className="font-mono">
                {lossStats.lost + lossStats.retransmitted > 0
                  ? (
                      (lossStats.retransmitted /
                        (lossStats.lost + lossStats.retransmitted)) *
                      100
                    ).toFixed(2)
                  : "0.00"}
                %
              </span>
            </div>
            <div className="h-2 w-full bg-sat-gray/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-status-retransmitted rounded-full"
                style={{
                  width:
                    lossStats.lost + lossStats.retransmitted > 0
                      ? `${Math.min(
                          (lossStats.retransmitted /
                            (lossStats.lost + lossStats.retransmitted)) *
                            100,
                          100
                        )}%`
                      : "0%",
                }}
              ></div>
            </div>
          </div>

          <div className="rounded-md bg-sat-gray/20 p-3 text-xs">
            <div className="flex items-center text-sat-blue mb-2 font-semibold">
              <Waves className="h-3.5 w-3.5 mr-1.5" />
              <span>Burst Events Summary</span>
            </div>
            <div className="pl-5 space-y-1.5 text-muted-foreground">
              <div>
                Total Burst Events:{" "}
                <span className="text-white font-mono">
                  {lossStats.burstEvents}
                </span>
              </div>
              <div>
                Last Burst:{" "}
                <span className="text-white font-mono">14:32:47</span>
              </div>
              <div>
                Avg. Duration:{" "}
                <span className="text-white font-mono">235ms</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LossRecovery;
