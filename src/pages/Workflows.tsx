
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workflow, Plus, Menu } from "lucide-react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PageTitle } from "@/components/PageTitle";

const Workflows = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto py-6 px-4">
      <PageTitle title="Workflows" icon={Workflow}>
        <div className="flex items-center gap-2">
          {/* Mobile sidebar trigger */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[240px] sm:w-[300px]">
                <SidebarProvider>
                  <Sidebar />
                </SidebarProvider>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/workflow-builder">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </Link>
        </div>
      </PageTitle>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event-Driven Workflows</CardTitle>
            <CardDescription>Design and automate educational workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create workflows that connect your learning systems and automate tasks based on events.</p>
            <div className="mt-4">
              <Link to="/workflow-builder">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Use Visual Workflow Builder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workflows;
