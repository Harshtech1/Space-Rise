
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtocolStats from "@/components/ProtocolStats";

const ProtocolStatsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Protocol Statistics</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Protocol Distribution & Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <ProtocolStats />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProtocolStatsPage;
