
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Info } from "lucide-react";
import { Integration } from "./types";

interface IntegrationCardProps {
  integration: Integration;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const handleConnect = (integration: Integration) => {
    if (integration.isAvailable) {
      toast({
        title: "Connection Started",
        description: `Connecting to ${integration.name}...`,
      });
    } else {
      toast({
        title: "Coming Soon",
        description: `${integration.name} integration is coming soon.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${!integration.isAvailable ? "opacity-80" : ""}`}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base flex items-center gap-1">
            {integration.name}
            {integration.description && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                    <Info className="h-3.5 w-3.5" />
                    <span className="sr-only">Info</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                  <p className="text-sm">{integration.description}</p>
                </HoverCardContent>
              </HoverCard>
            )}
          </CardTitle>
        </div>
        {integration.isAvailable ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-950">
            Available
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800">
            Coming soon
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 h-10">
          {integration.description || `Connect to ${integration.name} to enhance your learning workflows.`}
        </CardDescription>
      </CardContent>
      <div className="px-4 pb-4">
        <Button 
          size="sm" 
          className="w-full"
          disabled={!integration.isAvailable}
          variant={integration.isAvailable ? "default" : "outline"}
          onClick={() => handleConnect(integration)}
        >
          {integration.isAvailable ? "Connect" : "Coming Soon"}
          {integration.isAvailable && <ExternalLink className="ml-1 h-3.5 w-3.5" />}
        </Button>
      </div>
    </Card>
  );
};
