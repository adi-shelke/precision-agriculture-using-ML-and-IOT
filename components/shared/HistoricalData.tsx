import { LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const HistoricalData = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Historical Data</h2>
      <Card>
        <CardHeader>
          <CardTitle>Soil Parameter Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex items-center justify-center h-full bg-muted">
              <LineChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Chart placeholder
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalData;
