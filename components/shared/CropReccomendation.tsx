"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import SpinnerWithStyle from "./Spinner";

interface CropRecommendation {
  crop: string;
  suitability: number;
}

export default function CropRecommendation() {
  const [rainfall, setRainfall] = useState<number>(190);
  const [ph, setPh] = useState<number>(6.5);
  const [manualInput, setManualInput] = useState<boolean>(false); // Toggle state
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // State for manual input
  const [N, setN] = useState<number>(77);
  const [P, setP] = useState<number>(57);
  const [K, setK] = useState<number>(21);
  const [temperature, setTemperature] = useState<number>(24);
  const [humidity, setHumidity] = useState<number>(73);

  // Handle recommendation request
  const handleRecommend = async () => {
   
    try {
      setIsLoading(true);
      //fetch the data from sensors only if the manual mode is off
      if (!manualInput) {
        const sensorData = await fetch(
          "https://hardwaremodule.onrender.com/latest-reading/sensor_1"
        );
        const sensorDataJson = await sensorData.json();
        const { nitrogen, potassium, temperature, humidity, sodium } =
          sensorDataJson;
        setN(nitrogen); // Assign nitrogen to N
        setP(sodium); // If phosphorus is not provided in the response, set a default value
        setK(potassium); // Assign potassium to K
        setTemperature(temperature); // Assign temperature
        setHumidity(humidity); // Assign humidity
      }

      const data = {
        N, 
        P,
        K,
        temperature,
        humidity,
        ph,// Always manual input
        rainfall // Always manual input
      };

      const response = await axios.post(
        "https://prediction-and-real-time-monitoring.onrender.com/predict",
        data
      );
      const recommendedCrops = response.data.recommendations; // Assuming response contains the recommended crops
      setRecommendations(recommendedCrops);
    } catch (error) {
      console.error("Error fetching crop recommendations", error);
    }finally {
      setIsLoading(false); // Set loading to false after request is complete
    }
  };

  // Rainfall and pH bounds
  const MIN_RAINFALL = 20;
  const MAX_RAINFALL = 299;
  const MIN_PH = 3.4;
  const MAX_PH = 10;

  return (
    <div className="space-y-6 p-4 md:p-8 ">
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b]">
        <CardHeader>
          <CardTitle className="text-white">Input Soil Parameters</CardTitle>
          <CardDescription className="text-[#dee42f]">
            Enter the rainfall and soil pH to get crop recommendations. Toggle
            the switch if you want to input all the values manually.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toggle between manual input and sensor-based */}
          <div className="flex items-center space-x-4 text-white">
            <Label htmlFor="manual-toggle">Manual Input</Label>
            <Switch
              id="manual-toggle"
              checked={manualInput}
              onCheckedChange={setManualInput}
            />
          </div>

          {/* Manual input fields */}
          {manualInput && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#dee42f]">
              <div className="space-y-2">
                <Label htmlFor="N">Nitrogen (N)</Label>
                <Input
                  type="number"
                  id="N"
                  value={N}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="P">Phosphorus (P)</Label>
                <Input
                  type="number"
                  id="P"
                  value={P}
                  onChange={(e) => setP(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="K">Potassium (K)</Label>
                <Input
                  type="number"
                  id="K"
                  value={K}
                  onChange={(e) => setK(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  type="number"
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  type="number"
                  id="humidity"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Rainfall Section */}
          <div className="space-y-2 text-[#dee42f]">
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Slider
                id="rainfall"
                min={MIN_RAINFALL}
                max={MAX_RAINFALL}
                step={10}
                value={[rainfall]}
                onValueChange={(value) => setRainfall(value[0])}
                className="flex-grow"
              />
              <Input
                type="number"
                id="rainfall-input"
                value={rainfall}
                min={MIN_RAINFALL}
                max={MAX_RAINFALL}
                onChange={(e) =>
                  setRainfall(
                    Math.min(
                      Math.max(Number(e.target.value), MIN_RAINFALL),
                      MAX_RAINFALL
                    )
                  )
                }
                className="w-full md:w-20"
              />
            </div>
          </div>

          {/* pH Section */}
          <div className="space-y-2 text-[#dee42f]">
            <Label htmlFor="ph">Soil pH</Label>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Slider
                id="ph"
                min={MIN_PH}
                max={MAX_PH}
                step={0.1}
                value={[ph]}
                onValueChange={(value) => setPh(value[0])}
                className="flex-grow"
              />
              <Input
                type="number"
                id="ph-input"
                value={ph}
                min={MIN_PH}
                max={MAX_PH}
                onChange={(e) =>
                  setPh(
                    Math.min(Math.max(Number(e.target.value), MIN_PH), MAX_PH)
                  )
                }
                className="w-full md:w-20"
              />
            </div>
          </div>

          {/* Button */}
          <Button onClick={handleRecommend} className="w-full">
          {isLoading ? <SpinnerWithStyle /> : "Suggest Crop"}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b]">
          <CardHeader>
            <CardTitle className="text-white">Crop Recommendations</CardTitle>
            <CardDescription className="text-[#dee42f]">
              Based on{" "}
              <span className="text-green-500 font-semibold">{rainfall}mm</span>{" "}
              annual rainfall and soil pH{" "}
              <span className="text-green-500 font-semibold">{ph}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((crop, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle>{crop.crop}</CardTitle>
                    <CardDescription>
                      Suitability: {crop.suitability.toFixed(0)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${crop.suitability}%` }}
                      ></div>
                    </div>
                    <Button className="mt-4 w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
