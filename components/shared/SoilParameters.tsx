import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface SoilParameterProps {
  name: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
}

export const SoilParameter: React.FC<SoilParameterProps> = ({
  name,
  value,
  unit,
  icon,
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{name}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit}
      </div>
      <p className="text-xs text-muted-foreground">
        {value < 50 ? "Below optimal" : "Optimal"}
      </p>
    </CardContent>
  </Card>
);
