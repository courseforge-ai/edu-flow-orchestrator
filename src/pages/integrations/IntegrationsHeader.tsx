
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkIcon, Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Integrations</h1>
        </div>
        <p className="text-muted-foreground">
          Connect your learning platforms, communication tools, and more to build powerful automated workflows.
        </p>
      </div>
      
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
