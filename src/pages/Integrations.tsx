
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";

const Integrations = () => {
  return (
    <div className="container mx-auto py-4">
      <div className="grid gap-8">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Integrations</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Connect your educational platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Connect to learning management systems, communication tools, and other educational platforms.</p>
            <p className="text-muted-foreground mt-2">Coming soon: Integration marketplace</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;
