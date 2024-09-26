import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const FertilizerRecommendation = () => {
  const fertilizerRecommendations = [
    { name: "Nitrogen-rich fertilizer", amount: "20 kg/acre" },
    { name: "Phosphorus supplement", amount: "10 kg/acre" },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Fertilizer Suggestions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {fertilizerRecommendations.map((fertilizer, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{fertilizer.name}</CardTitle>
              <CardDescription>
                Recommended amount: {fertilizer.amount}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Based on current soil NPK levels and crop type.</p>
              <Button className="mt-4">Purchase Fertilizer</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
