
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LossRecovery from "@/components/LossRecovery";
import RecoveryTechniques from "@/components/RecoveryTechniques";

const RecoveryPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Loss Recovery Analysis</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Loss Recovery Status</CardTitle>
          </CardHeader>
          <CardContent>
            <LossRecovery />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recovery Techniques Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <RecoveryTechniques />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryPage;
