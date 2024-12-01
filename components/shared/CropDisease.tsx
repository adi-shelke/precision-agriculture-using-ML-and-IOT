"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const cropOptions = [
  "corn",
  "apple",
  "cherry",
  "grape",
  "peach",
  "pepper",
  "potato",
  "soyabean",
  "strawberry",
  "tomato",
];

export default function CropDiseasePredictorForm() {
  const [cropName, setCropName] = useState("");
  const [cropImage, setCropImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cropName || !cropImage) {
      setError("Please select a crop and provide an image.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    // Convert image to base64
    const toBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      // Convert the image file to base64
      const base64Image = await toBase64(cropImage);

      // Prepare the payload for the API
      const payload = {
        name: cropName,
        img_base64: base64Image.split(",")[1], // Strip the base64 header if necessary
      };

      // Send a POST request to the Flask API
      // const response = await fetch("https://apple-v7g9.onrender.com/predict", {
      const response = await fetch("https://plant-disease-prediction-kdmc.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to predict disease");
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
        console.error("Error predicting disease:", err);
      setError(
        "An error occurred while predicting the disease. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-green-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800">
          Crop Disease Predictor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cropName" className="text-green-700">
              Crop Name
            </Label>
            <Select onValueChange={setCropName} value={cropName}>
              <SelectTrigger
                id="cropName"
                className="border-green-300 focus:border-green-500 focus:ring-green-500"
              >
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cropImage" className="text-green-700">
              Crop Image
            </Label>
            <Input
              id="cropImage"
              type="file"
              accept="image/*"
              onChange={(e) => setCropImage(e.target.files?.[0] || null)}
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict Disease"
          )}
        </Button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {result && (
          <p className="mt-4 text-green-800 font-semibold">
            Prediction: {result}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
