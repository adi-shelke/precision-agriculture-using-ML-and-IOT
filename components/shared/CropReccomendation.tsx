'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Mock function to get crop recommendations
const getCropRecommendations = (rainfall: number, ph: number) => {
  const crops = [
    { name: 'Wheat', minRainfall: 400, maxRainfall: 650, minPh: 6.0, maxPh: 7.0 },
    { name: 'Rice', minRainfall: 1000, maxRainfall: 2000, minPh: 5.5, maxPh: 6.5 },
    { name: 'Corn', minRainfall: 500, maxRainfall: 800, minPh: 5.8, maxPh: 7.0 },
    { name: 'Soybeans', minRainfall: 450, maxRainfall: 700, minPh: 6.0, maxPh: 6.8 },
    { name: 'Cotton', minRainfall: 700, maxRainfall: 1300, minPh: 5.8, maxPh: 8.0 },
  ]

  return crops.filter(crop =>
    rainfall >= crop.minRainfall &&
    rainfall <= crop.maxRainfall &&
    ph >= crop.minPh &&
    ph <= crop.maxPh
  ).map(crop => ({
    ...crop,
    suitability: Math.random()
  }))
}

export default function CropRecommendation() {
  const [rainfall, setRainfall] = useState<number>(500)
  const [ph, setPh] = useState<number>(6.5)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const handleRecommend = () => {
    const newRecommendations = getCropRecommendations(rainfall, ph)
    setRecommendations(newRecommendations)
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Input Soil Parameters</CardTitle>
          <CardDescription>Enter the rainfall and soil pH to get crop recommendations, other values would be fetched from the sensors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Slider
                id="rainfall"
                min={0}
                max={2000}
                step={10}
                value={[rainfall]}
                onValueChange={(value) => setRainfall(value[0])}
                className="flex-grow"
              />
              <Input
                type="number"
                id="rainfall-input"
                value={rainfall}
                onChange={(e) => setRainfall(Number(e.target.value))}
                className="w-full md:w-20"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ph">Soil pH</Label>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Slider
                id="ph"
                min={0}
                max={14}
                step={0.1}
                value={[ph]}
                onValueChange={(value) => setPh(value[0])}
                className="flex-grow"
              />
              <Input
                type="number"
                id="ph-input"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full md:w-20"
              />
            </div>
          </div>
          <Button onClick={handleRecommend} className="w-full">Get Recommendations</Button>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Crop Recommendations</CardTitle>
            <CardDescription>Based on {rainfall}mm annual rainfall and soil pH {ph}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((crop, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle>{crop.name}</CardTitle>
                    <CardDescription>Suitability: {(crop.suitability * 100).toFixed(0)}%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${crop.suitability * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Rainfall: {crop.minRainfall}-{crop.maxRainfall} mm</p>
                      <p>pH: {crop.minPh}-{crop.maxPh}</p>
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
  )
}
