
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useIntegrationCategories } from "./integrations/useIntegrationCategories";

export default function Admin() {
  const { categories, isLoading } = useIntegrationCategories();
  const [activeTab, setActiveTab] = useState("integrations");

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin</h1>
        <p className="text-muted-foreground mt-2">
          Manage your platform settings and integrations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-8">
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
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Configure global settings for your integration platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Development Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enable debug features and logging
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Third-party Integrations</p>
                  <p className="text-sm text-muted-foreground">
                    Enable external developers to create integrations
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="bg-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Strict Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Require additional verification for sensitive operations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Manage access to administrative features
            </p>
            
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                User management functionality will be implemented in a future update.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
