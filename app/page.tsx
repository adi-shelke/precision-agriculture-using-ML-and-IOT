"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { TabContent } from "@/components/shared/TabContent";

// Mock data for demonstration purposes
const soilData = {
  nitrogen: 45,
  phosphorus: 30,
  potassium: 35,
  moisture: 60,
  humidity: 55,
  temperature: 25,
  rainfall: 150,
  ph: 6.5,
};

const cropRecommendations = [
  { name: "Wheat", suitability: 0.9 },
  { name: "Corn", suitability: 0.8 },
  { name: "Soybeans", suitability: 0.7 },
];

const fertilizerRecommendations = [
  { name: "Nitrogen-rich fertilizer", amount: "20 kg/acre" },
  { name: "Phosphorus supplement", amount: "10 kg/acre" },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "crops", label: "Crop Recommendations" },
  { id: "monitoring", label: "Real-Time Monitoring" },
  { id: "fertilizer", label: "Fertilizer Suggestions" },
  { id: "history", label: "Historical Data" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <TabContent
            activeTab={activeTab}
            soilData={soilData}
            fertilizerRecommendations={fertilizerRecommendations}
          />
        </main>
      </div>
    </div>
  );
}
