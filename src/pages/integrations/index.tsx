
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/Sidebar";
import { IntegrationsHeader } from "./IntegrationsHeader";
import { IntegrationsContent } from "./IntegrationsContent";
import { useIntegrations } from "./useIntegrations";

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
      {!isMobile && <Sidebar />}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto py-4 h-full flex flex-col">
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
        </div>
      </div>
    </div>
  );
};

export default Integrations;
