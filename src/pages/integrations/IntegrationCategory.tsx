
import { Separator } from "@/components/ui/separator";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationCategory as CategoryType } from "./types";
import React from "react";

interface IntegrationCategoryProps {
  category: CategoryType;
}

export const IntegrationCategoryComponent = ({ category }: IntegrationCategoryProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-md bg-primary/10 text-primary">
          {category.icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{category.title}</h2>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.integrations.map((integration) => (
          <IntegrationCard 
            key={integration.id}
            integration={integration}
          />
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  );
};
