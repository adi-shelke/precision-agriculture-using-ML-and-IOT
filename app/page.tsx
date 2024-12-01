"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { TabContent } from "@/components/shared/TabContent";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "crops", label: "Crop Recommendations" },
  { id: "monitoring", label: "Real-Time Monitoring" },
  { id: "fertilizer", label: "Fertilizer Suggestions" },
  { id: "cropdisease", label: "Crop Disease Predictor" },
  { id: "chatbot", label: "ChatBot" },
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
      <div className="flex-1 bg-[url('/images/bg.jpg')] bg-cover">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <TabContent
            activeTab={activeTab}
          />
        </main>
      </div>
    </div>
  );
}
