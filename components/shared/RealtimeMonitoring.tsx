import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const RealtimeMonitoring = () => {
  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h2>
      <Card className="bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b]">
        <CardHeader>
          <CardTitle className="text-white">Soil Health Updates</CardTitle>
          <CardDescription className="text-primary text-[#dee42f]">Last updated: 2 days ago</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white">
            Nitrogen levels have decreased by 5%. Consider applying
            nitrogen-rich fertilizer.
          </p>
          <Button className="mt-4">View Detailed Report</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeMonitoring;
