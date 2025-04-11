
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PacketStream from "@/components/PacketStream";

const PacketStreamPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Packet Stream Analysis</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Live Packet Stream</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <PacketStream />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PacketStreamPage;
