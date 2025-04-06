
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IntegrationCategoryComponent } from "./IntegrationCategory";
import { IntegrationCategory } from "./types";

interface IntegrationsContentProps {
  filteredCategories: IntegrationCategory[];
  searchQuery: string;
}

export const IntegrationsContent = ({ filteredCategories, searchQuery }: IntegrationsContentProps) => {
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
