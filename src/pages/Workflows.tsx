
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow } from "lucide-react";

const Workflows = () => {
  return (
    <div className="container mx-auto py-4">
      <div className="grid gap-8">
        <div className="flex items-center gap-2">
          <Workflow className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Workflows</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Event-Driven Workflows</CardTitle>
            <CardDescription>Design and automate educational workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create workflows that connect your learning systems and automate tasks based on events.</p>
            <p className="text-muted-foreground mt-2">Coming soon: Visual workflow builder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workflows;
