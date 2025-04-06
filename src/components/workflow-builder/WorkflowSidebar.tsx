
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useIntegrationCategories } from '@/pages/integrations/useIntegrationCategories';

const WorkflowSidebar = () => {
  const { categories, isLoading } = useIntegrationCategories();

  if (isLoading) {
    return <div className="p-4">Loading integrations...</div>;
  }

  return (
    <div className="h-full border-r w-72 bg-background">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Integrations</h2>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <Accordion type="multiple" className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pl-6">
                    {category.integrations.map((integration) => (
                      <div 
                        key={integration.id}
                        className="text-sm py-1 px-2 rounded-md cursor-grab hover:bg-accent flex items-center gap-2"
                        draggable
                      >
                        {integration.name}
                        {!integration.isAvailable && (
                          <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
                            Soon
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
