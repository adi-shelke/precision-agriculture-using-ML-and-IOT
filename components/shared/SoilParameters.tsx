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
  <Card className="bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b] text-white shadow-md"> {/* Darker inclined gradient */}
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">{name}</CardTitle> {/* White text for title */}
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">
        {value}
        {unit}
      </div>
      <p className="text-xs text-white">
        {value < 50 ? "Below optimal" : "Optimal"}
      </p>
    </CardContent>
  </Card>
);
