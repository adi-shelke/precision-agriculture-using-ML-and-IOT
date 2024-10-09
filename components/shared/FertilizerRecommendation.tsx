'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import axios from 'axios';

const cropOptions = ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Rice'];
const soilOptions = ['Loamy', 'Clay', 'Sandy', 'Peaty', 'Chalky'];

const FertilizerRecommendation = () => {
  const [manualInput, setManualInput] = useState<boolean>(false);
  const [fertilizerRecommendation, setFertilizerRecommendation] = useState<string>(''); 

  // State for manual input
  const [N, setN] = useState<number>(77);
  const [P, setP] = useState<number>(57);
  const [K, setK] = useState<number>(21);
  const [temperature, setTemperature] = useState<number>(24);
  const [humidity, setHumidity] = useState<number>(73);
  const [moisture, setMoisture] = useState<number>(39);

  // Always manually entered values
  const [cropType, setCropType] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');

  // Popover open state
  const [cropPopoverOpen, setCropPopoverOpen] = useState<boolean>(false);
  const [soilPopoverOpen, setSoilPopoverOpen] = useState<boolean>(false);

  // Handle recommendation request
  const handleRecommend = async () => {
    if (!cropType || !soilType) {
      alert('Please select the crop type and soil type');
      return;
    }

    try {
      if (!manualInput) {
        const sensorData = await fetch(
          "https://hardwaremodule.onrender.com/latest-reading/sensor_1"
        );
        const sensorDataJson = await sensorData.json();
        const { nitrogen, potassium, temperature, humidity, sodium, moisture } =
          sensorDataJson;
        setN(nitrogen); // Assign nitrogen to N
        setP(sodium); // If phosphorus is not provided in the response, set a default value
        setK(potassium); // Assign potassium to K
        setTemperature(temperature); // Assign temperature
        setHumidity(humidity); // Assign humidity
        setMoisture(moisture); // Assign moisture
      }

      const data = {
        Temperature: temperature,
        Humidity: humidity,
        Moisture: moisture,
        Nitrogen:N,
        Phosphorous:P,
        Potassium:K,
        Crop_Code:cropType,
        Soil_Code:soilType
      };

      const response = await axios.post('https://fertilizerrecommendationapi-2.onrender.com/post', data);
      console.log(response.data);
      const recommendedFertilizers = response.data.prediction;  // Assuming response contains the recommendations
      setFertilizerRecommendation(recommendedFertilizers);
    } catch (error) {
      console.error("Error fetching fertilizer recommendations", error);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Fertilizer Recommendation</CardTitle>
          <CardDescription>Enter the required crop and soil types and toggle the switch for manual input.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toggle between manual input and sensor-based */}
          <div className="flex items-center space-x-4">
            <Label htmlFor="manual-toggle">Manual Input</Label>
            <Switch id="manual-toggle" checked={manualInput} onCheckedChange={setManualInput} />
          </div>

          {/* Manual input fields */}
          {manualInput && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="moisture">Moisture (%)</Label>
                <Input
                  type="number"
                  id="moisture"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Crop Type Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="cropType">Crop Type</Label>
            <Popover open={cropPopoverOpen} onOpenChange={setCropPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {cropType || "Select Crop Type"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search crop..." />
                  <CommandList>
                    {cropOptions.map((crop, idx) => (
                      <CommandItem
                        key={idx}
                        onSelect={() => {
                          setCropType(crop);
                          setCropPopoverOpen(false); // Close dropdown after selection
                        }}
                      >
                        {crop}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Soil Type Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="soilType">Soil Type</Label>
            <Popover open={soilPopoverOpen} onOpenChange={setSoilPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {soilType || "Select Soil Type"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search soil..." />
                  <CommandList>
                    {soilOptions.map((soil, idx) => (
                      <CommandItem
                        key={idx}
                        onSelect={() => {
                          setSoilType(soil);
                          setSoilPopoverOpen(false); // Close dropdown after selection
                        }}
                      >
                        {soil}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Button */}
          <Button onClick={handleRecommend} className="w-full">Suggest Fertilizer</Button>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      {fertilizerRecommendation && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Fertilizer Recommendation</CardTitle>
            <CardDescription>Based on the input values</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{fertilizerRecommendation}</CardTitle>
                <CardDescription>Amount: (Adjust as needed)</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mt-4 w-full">Purchase Fertilizer</Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FertilizerRecommendation;
