
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Integrations</CardTitle>
              <CardDescription>
                Enable or disable integrations and update their configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <div className="font-medium flex items-center gap-2">
                      {category.icon}
                      <span>{category.title}</span>
                    </div>
                    <div className="grid gap-4">
                      {category.integrations.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between rounded-lg border p-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Integration</CardTitle>
              <CardDescription>
                Create a new integration for your platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
              </form>
            </CardContent>
            <CardFooter>
              <Button>Add Integration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure global settings for your integration platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Development Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Enable debug features and logging
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Third-party Integrations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable external developers to create integrations
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Strict Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Require additional verification for sensitive operations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Manage access to administrative features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This section will allow you to manage user roles and permissions for the platform.
              </p>
              <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  User management functionality will be implemented in a future update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
