import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function Home() {
  return (
    <div>
      {/* Location and Favorite Button */}
      <div className="flex justify-center">
        <Input placeholder="location" />
        <Button>Favorites</Button>
      </div>

      {/* Current Forecast */}
      <div>

      </div>

      {/* Five day forecast */}
      <div className="flex justify-evenly">
        {/* Card 1 */}
        <div>
          <Card className="w-[240px]">
            <CardHeader>Forecast Card 1</CardHeader>
            <CardDescription>Image Here</CardDescription>
            <CardContent>56 / 45</CardContent>
          </Card>
        </div>

        {/* Card 2 */}
        <div>
          <Card className="w-[240px]">
            <CardHeader>Forecast Card 2</CardHeader>
            <CardDescription>Image Here</CardDescription>
            <CardContent>56 / 45</CardContent>
          </Card>
        </div>

        {/* Card 3 */}
        <div>
          <Card className="w-[240px]">
            <CardHeader>Forecast Card 3</CardHeader>
            <CardDescription>Image Here</CardDescription>
            <CardContent>56 / 45</CardContent>
          </Card>
        </div>

        {/* Card 4 */}
        <div>
          <Card className="w-[240px]">
            <CardHeader>Forecast Card 4</CardHeader>
            <CardDescription>Image Here</CardDescription>
            <CardContent>56 / 45</CardContent>
          </Card>
        </div>

        {/* Card 5 */}
        <div>
          <Card className="w-[240px]">
            <CardHeader>Forecast Card 5</CardHeader>
            <CardDescription>Image Here</CardDescription>
            <CardContent>56 / 45</CardContent>
          </Card>
        </div>
      </div>

    </div>

  );
}
