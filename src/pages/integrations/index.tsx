
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { IntegrationsHeader } from "./IntegrationsHeader";
import { IntegrationsContent } from "./IntegrationsContent";
import { UserConnections } from "./UserConnections";
import { useIntegrations } from "./useIntegrations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Integrations = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredCategories,
    totalIntegrations,
    availableCount,
    upcomingCount,
    isLoading
  } = useIntegrations();
  
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen">
      {!isMobile && (
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
      )}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto py-4 h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-6">Integrations</h1>
          
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="w-full max-w-md mb-6">
              <TabsTrigger value="available" className="flex-1">Available Integrations</TabsTrigger>
              <TabsTrigger value="connections" className="flex-1">Your Connections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="h-full overflow-hidden flex flex-col">
              {/* Header */}
              <IntegrationsHeader 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setActiveTab={setActiveTab}
                totalIntegrations={totalIntegrations}
                availableCount={availableCount}
                upcomingCount={upcomingCount}
              />
              
              {/* Categories and integrations */}
              <IntegrationsContent 
                filteredCategories={filteredCategories}
                searchQuery={searchQuery}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="connections">
              <UserConnections />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
