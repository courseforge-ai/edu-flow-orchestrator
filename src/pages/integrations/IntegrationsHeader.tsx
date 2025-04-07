
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkIcon, Search, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface IntegrationsHeaderProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  totalIntegrations: number;
  availableCount: number;
  upcomingCount: number;
}

export const IntegrationsHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  setActiveTab, 
  totalIntegrations, 
  availableCount, 
  upcomingCount
}: IntegrationsHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <PageTitle title="Integrations" icon={LinkIcon}>
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
      </PageTitle>
      
      <p className="text-muted-foreground mb-6">
        Connect your learning platforms, communication tools, and more to build powerful automated workflows.
      </p>
      
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({totalIntegrations})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableCount})</TabsTrigger>
            <TabsTrigger value="coming-soon">Coming Soon ({upcomingCount})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};
