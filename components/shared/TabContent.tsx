import { SoilParameter } from "./SoilParameters";
import { Droplet, Leaf, Thermometer } from "lucide-react";
import CropRecommendation from "@/components/shared/CropReccomendation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import RealtimeMonitoring from "./RealtimeMonitoring";
import HistoricalData from "./HistoricalData";
import FertilizerRecommendation from "./FertilizerRecommendation";

interface TabContentProps {
  activeTab: string;
  soilData: any;
  fertilizerRecommendations: any[];
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  soilData,
  fertilizerRecommendations,
}) => {
  switch (activeTab) {
    case "overview":
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Soil Health Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SoilParameter
              name="Nitrogen"
              value={soilData.nitrogen}
              unit="%"
              icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            />
            <SoilParameter
              name="Phosphorus"
              value={soilData.phosphorus}
              unit="%"
              icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            />
            <SoilParameter
              name="Potassium"
              value={soilData.potassium}
              unit="%"
              icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
            />
            <SoilParameter
              name="Moisture"
              value={soilData.moisture}
              unit="%"
              icon={<Droplet className="h-4 w-4 text-muted-foreground" />}
            />
            {/* Additional parameters here */}
          </div>
        </div>
      );
    case "crops":
      return <CropRecommendation />;
    case "monitoring":
      return <RealtimeMonitoring />;
    case "fertilizer":
      return <FertilizerRecommendation />;
    case "history":
      return <HistoricalData />;
    default:
      return null;
  }
};
