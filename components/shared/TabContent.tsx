import React, { useEffect, useState } from 'react';
import { SoilParameter } from "./SoilParameters";
import { Droplet, Leaf } from "lucide-react";
import CropRecommendation from "@/components/shared/CropReccomendation";
import RealtimeMonitoring from "./RealtimeMonitoring";
import FertilizerRecommendation from "./FertilizerRecommendation";
import SoilDataChatbot from "./SoilDataChatbot";

interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const [soilData, setSoilData] = useState<any>(null); // State to hold soil data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch soil data from the API
  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const response = await fetch("https://hardwaremodule.onrender.com/latest-reading/sensor_1");
        const sensorDataJson = await response.json();
        const { nitrogen, potassium, temperature, humidity, sodium, moisture } = sensorDataJson;

        // Set the state with the fetched data
        setSoilData({
          nitrogen,
          potassium,
          humidity,
          moisture,
          temperature, // If you want to use this later
          sodium,      // If you want to use this later
        });
      } catch (error) {
        console.error("Error fetching soil data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchSoilData();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div> {/* Use the spinner CSS class */}
      </div>
    ); // Render loading spinner
  }

  // Render based on the active tab
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
              value={soilData.sodium || 0} // Default to 0 if phosphorus not available
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
            <SoilParameter
              name="Humidity" // New card for Humidity
              value={soilData.humidity} // Set the humidity value
              unit="%"
              icon={<Droplet className="h-4 w-4 text-muted-foreground" />} // Use an appropriate icon
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
    case "chatbot":
      return <SoilDataChatbot />;
    default:
      return null;
  }
};
