import React, { useEffect, useState } from "react";
import { SoilParameter } from "./SoilParameters";
import { Droplet, Leaf } from "lucide-react";
import CropRecommendation from "@/components/shared/CropReccomendation";
import RealtimeMonitoring from "./RealtimeMonitoring";
import FertilizerRecommendation from "./FertilizerRecommendation";
import SoilDataChatbot from "./SoilDataChatbot";
import CropDiseasePredictorForm from "./CropDisease";
import Image from "next/image";

interface SoilData {
  nitrogen: number;
  potassium: number;
  humidity: number;
  moisture: number;
  temperature: number;
  sodium: number;
}
interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const [soilData, setSoilData] = useState<SoilData | null>(null); // Update state type
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const response = await fetch(
          "https://hardwaremodule.onrender.com/latest-reading/sensor_1"
        );
        const sensorDataJson = await response.json();
        const { nitrogen, potassium, temperature, humidity, sodium, moisture } =
          sensorDataJson;

        setSoilData({
          nitrogen,
          potassium,
          humidity,
          moisture,
          temperature,
          sodium,
        });
      } catch (error) {
        console.error("Error fetching soil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoilData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f0e6d2]">
        <div className="w-12 h-12 border-4 border-[#5c8c4d] border-t-[#f0e6d2] rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="relative w-full h-60 mb-6">
        <Image
          src="/images/overview.jpg"
          alt="Agriculture landscape"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-[#d8cc27]">
        Soil Health Overview
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SoilParameter
          name="Nitrogen"
          value={soilData?.nitrogen || 0}
          unit="%"
          icon={<Leaf className="h-4 w-4 text-white" />}
        />
        <SoilParameter
          name="Phosphorus"
          value={soilData?.sodium || 0}
          unit="%"
          icon={<Leaf className="h-4 w-4 text-white" />}
        />
        <SoilParameter
          name="Potassium"
          value={soilData?.potassium || 0}
          unit="%"
          icon={<Leaf className="h-4 w-4 text-white" />}
        />
        <SoilParameter
          name="Moisture"
          value={soilData?.moisture || 0}
          unit="%"
          icon={<Droplet className="h-4 w-4 text-white" />}
        />
        <SoilParameter
          name="Humidity"
          value={soilData?.humidity || 0}
          unit="%"
          icon={<Droplet className="h-4 w-4 text-white" />}
        />
      </div>
    </div>
  );

  switch (activeTab) {
    case "overview":
      return renderOverview();
    case "crops":
      return <CropRecommendation />;
    case "monitoring":
      return <RealtimeMonitoring />;
    case "fertilizer":
      return <FertilizerRecommendation />;
    case "cropdisease":
      return <CropDiseasePredictorForm />;
    case "chatbot":
      return <SoilDataChatbot />;
    default:
      return null;
  }
};
