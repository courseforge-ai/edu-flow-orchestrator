
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Workflows = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      {!isMobile && <Sidebar />}
      <div className="flex-1">
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
      </div>
    </div>
  );
};

export default Workflows;
