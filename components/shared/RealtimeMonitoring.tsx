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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h2>
      <Card>
        <CardHeader>
          <CardTitle>Soil Health Updates</CardTitle>
          <CardDescription>Last updated: 2 days ago</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
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
