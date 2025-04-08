
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useIntegrationCategories } from "@/pages/integrations/useIntegrationCategories";
import { LtiAndOAuthManager } from "./LtiAndOAuthManager";

export const IntegrationsTab = () => {
  const { categories, isLoading } = useIntegrationCategories();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading integrations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Integrations</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Enable or disable integrations and update their configuration.
        </p>
        
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="font-medium flex items-center gap-2">
                {category.icon}
                <span>{category.title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {category.integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between bg-card p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="space-y-0.5">
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {integration.description}
                      </div>
                    </div>
                    <Switch 
                      checked={integration.isAvailable} 
                      onCheckedChange={() => {
                        console.log(`Toggle ${integration.name} to ${!integration.isAvailable}`);
                        // In a real app, this would update the integration status in the database
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Add New Integration</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Create a new integration for your platform.
        </p>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Integration Name</Label>
            <Input id="name" placeholder="Enter integration name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter integration description" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select 
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <Button>Add Integration</Button>
        </form>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>External Authentication</CardTitle>
          <CardDescription>
            Configure Learning Tools Interoperability (LTI) and OAuth providers for external systems integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LtiAndOAuthManager />
        </CardContent>
      </Card>
    </div>
  );
};
