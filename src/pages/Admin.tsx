
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useIntegrationCategories } from "./integrations/useIntegrationCategories";
import { useClerk, useOrganizationList } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PageTitle } from "@/components/PageTitle";
import { Settings } from "lucide-react";

// Form schema for organization creation
const organizationSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
});

export default function Admin() {
  const { categories, isLoading } = useIntegrationCategories();
  const [activeTab, setActiveTab] = useState("integrations");
  const { createOrganization } = useClerk();
  const { userMemberships, isLoaded } = useOrganizationList();
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Create form for organization creation
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Handle organization creation
  const handleCreateOrg = async (values: z.infer<typeof organizationSchema>) => {
    try {
      setIsCreating(true);
      await createOrganization({ name: values.name, slug: values.slug });
      form.reset();
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Auto-generate slug when name changes
  const watchedName = form.watch("name");
  if (watchedName && !form.getValues("slug")) {
    form.setValue("slug", generateSlug(watchedName));
  }

  if (isLoading || !isLoaded) {
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
      <PageTitle title="Super Admin" icon={Settings}>
        {/* Add any actions you want here */}
      </PageTitle>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="organizations">Organization Management</TabsTrigger>
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

        <TabsContent value="organizations" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Organization Management</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Manage organizations and their settings
            </p>
            
            <div className="flex justify-end mb-6">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Organization</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Organization</DialogTitle>
                    <DialogDescription>
                      Add a new organization to the platform. This will create a new workspace for collaboration.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateOrg)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="organization-slug" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit" disabled={isCreating}>
                          {isCreating ? "Creating..." : "Create Organization"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {userMemberships.isLoaded && userMemberships.data.length > 0 ? (
              <div className="grid gap-4">
                {userMemberships.data.map((membership) => (
                  <Card key={membership.organization.id}>
                    <CardHeader>
                      <CardTitle>{membership.organization.name}</CardTitle>
                      <CardDescription>
                        Slug: {membership.organization.slug || "No slug defined"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Your Role</p>
                          <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                            {membership.role}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Manage Members
                          </Button>
                          <Button variant="outline" size="sm">
                            Settings
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Created</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(membership.organization.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Members</p>
                          <p className="text-sm text-muted-foreground">
                            {membership.organization.membersCount || "Loading..."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Organizations</CardTitle>
                  <CardDescription>
                    You haven't created any organizations yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Organizations allow you to manage access to resources and collaborate with team members.
                    Create your first organization to get started.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
