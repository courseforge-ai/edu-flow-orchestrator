
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IntegrationCategoryComponent } from "./IntegrationCategory";
import { IntegrationCategory } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

interface IntegrationsContentProps {
  filteredCategories: IntegrationCategory[];
  searchQuery: string;
  isLoading: boolean;
}

export const IntegrationsContent = ({ filteredCategories, searchQuery, isLoading }: IntegrationsContentProps) => {
  if (isLoading) {
    return (
      <ScrollArea className="flex-1 pr-4">
        <div className="grid gap-8 pb-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <Skeleton key={idx} className="h-24 rounded-md" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  }
  
  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="grid gap-8 pb-8">
        {filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No integrations found for "{searchQuery}"</p>
            </CardContent>
          </Card>
        ) : (
          filteredCategories.map((category) => (
            <IntegrationCategoryComponent key={category.id} category={category} />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
