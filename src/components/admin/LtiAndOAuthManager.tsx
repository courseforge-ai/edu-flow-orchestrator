import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Types for LTI Tools
export interface LtiTool {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  lti_version?: "1.0" | "1.1" | "1.3";
  client_id?: string;
  auth_login_url?: string;
  auth_token_url?: string;
  jwks_url?: string;
  redirect_uris?: string[];
  custom_fields?: Record<string, any>;
}

// Types for OAuth Providers
export interface OAuthProvider {
  id: string;
  name: string;
  description?: string;
  provider_key?: string;
  is_active: boolean;
  created_at: string;
  client_id?: string;
  client_secret?: string;
  auth_url?: string;
  token_url?: string;
  userinfo_url?: string;
  scope?: string;
}

// Example data for testing
const sampleLtiTools: LtiTool[] = [
  {
    id: "1",
    name: "Canvas LMS",
    description: "Integration with Canvas Learning Management System",
    is_active: true,
    created_at: new Date().toISOString(),
    lti_version: "1.3",
    client_id: "client123",
    auth_login_url: "https://canvas.instructure.com/api/lti/authorize",
    auth_token_url: "https://canvas.instructure.com/api/lti/token",
    jwks_url: "https://canvas.instructure.com/api/lti/jwks",
    redirect_uris: [
      "https://example.com/lti/callback",
      "https://staging.example.com/lti/callback"
    ],
    custom_fields: {
      "course_id": "$Canvas.course.id"
    }
  }
];

const sampleOAuthProviders: OAuthProvider[] = [
  {
    id: "1",
    name: "Google",
    description: "Google OAuth 2.0 integration",
    provider_key: "google",
    is_active: true,
    created_at: new Date().toISOString(),
    client_id: "google123",
    client_secret: "••••••••",
    auth_url: "https://accounts.google.com/o/oauth2/auth",
    token_url: "https://oauth2.googleapis.com/token",
    userinfo_url: "https://openidconnect.googleapis.com/v1/userinfo",
    scope: "openid profile email"
  }
];

// LTI Tool form schema
const ltiToolFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  lti_version: z.enum(["1.0", "1.1", "1.3"]).default("1.3"),
  client_id: z.string().optional(),
  auth_login_url: z.string().url("Must be a valid URL").optional(),
  auth_token_url: z.string().url("Must be a valid URL").optional(),
  jwks_url: z.string().url("Must be a valid URL").optional(),
  redirect_uris: z.string().transform(val => val ? val.split("\n").filter(Boolean) : []),
  custom_fields: z.string().optional().transform(val => {
    try {
      return val ? JSON.parse(val) : {};
    } catch {
      return {};
    }
  }),
});

// OAuth Provider form schema
const oauthProviderFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  provider_key: z.string().min(2, "Provider key is required"),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  auth_url: z.string().url("Must be a valid URL").optional(),
  token_url: z.string().url("Must be a valid URL").optional(),
  userinfo_url: z.string().url("Must be a valid URL").optional(),
  scope: z.string().optional(),
});

// Define a type for the form data that includes the transformed values
type LtiToolFormValues = z.input<typeof ltiToolFormSchema>;
type LtiToolFormTransformed = z.output<typeof ltiToolFormSchema>;

export function LtiAndOAuthManager() {
  const [ltiTools, setLtiTools] = useState<LtiTool[]>(sampleLtiTools);
  const [oauthProviders, setOAuthProviders] = useState<OAuthProvider[]>(sampleOAuthProviders);
  const [isLoading, setIsLoading] = useState(false);
  const [addLtiDialogOpen, setAddLtiDialogOpen] = useState(false);
  const [addOAuthDialogOpen, setAddOAuthDialogOpen] = useState(false);
  const { toast } = useToast();

  // LTI Tool form
  const ltiForm = useForm<LtiToolFormValues>({
    resolver: zodResolver(ltiToolFormSchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
      lti_version: "1.3",
      redirect_uris: "",
    },
  });

  // OAuth Provider form
  const oauthForm = useForm<z.infer<typeof oauthProviderFormSchema>>({
    resolver: zodResolver(oauthProviderFormSchema),
    defaultValues: {
      name: "",
      provider_key: "",
      description: "",
      is_active: true,
    },
  });

  // Handle LTI Tool submission
  const onLtiSubmit = (values: LtiToolFormValues) => {
    setIsLoading(true);
    
    // Get the transformed values with proper types
    const transformedValues = ltiToolFormSchema.parse(values) as LtiToolFormTransformed;
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newTool: LtiTool = {
        id: `${Date.now().toString()}`,
        created_at: new Date().toISOString(),
        name: transformedValues.name,
        description: transformedValues.description,
        is_active: transformedValues.is_active,
        lti_version: transformedValues.lti_version,
        client_id: transformedValues.client_id,
        auth_login_url: transformedValues.auth_login_url,
        auth_token_url: transformedValues.auth_token_url,
        jwks_url: transformedValues.jwks_url,
        redirect_uris: transformedValues.redirect_uris,
        custom_fields: transformedValues.custom_fields,
      };
      setLtiTools([...ltiTools, newTool]);
      setIsLoading(false);
      setAddLtiDialogOpen(false);
      ltiForm.reset();
      toast({
        title: "LTI Tool Added",
        description: `${transformedValues.name} has been successfully added.`,
      });
    }, 1000);
  };

  // Handle OAuth Provider submission
  const onOAuthSubmit = (values: z.infer<typeof oauthProviderFormSchema>) => {
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      const newProvider: OAuthProvider = {
        id: `${Date.now().toString()}`,
        created_at: new Date().toISOString(),
        name: values.name,
        provider_key: values.provider_key,
        description: values.description,
        is_active: values.is_active,
        client_id: values.client_id,
        client_secret: values.client_secret,
        auth_url: values.auth_url,
        token_url: values.token_url,
        userinfo_url: values.userinfo_url,
        scope: values.scope,
      };
      setOAuthProviders([...oauthProviders, newProvider]);
      setIsLoading(false);
      setAddOAuthDialogOpen(false);
      oauthForm.reset();
      toast({
        title: "OAuth Provider Added",
        description: `${values.name} has been successfully added.`,
      });
    }, 1000);
  };

  // Toggle LTI Tool active status
  const toggleLtiToolStatus = (id: string) => {
    setLtiTools(
      ltiTools.map(tool =>
        tool.id === id ? { ...tool, is_active: !tool.is_active } : tool
      )
    );
    toast({
      title: "Status Updated",
      description: `Tool status has been updated.`,
    });
  };

  // Toggle OAuth Provider active status
  const toggleOAuthProviderStatus = (id: string) => {
    setOAuthProviders(
      oauthProviders.map(provider =>
        provider.id === id ? { ...provider, is_active: !provider.is_active } : provider
      )
    );
    toast({
      title: "Status Updated",
      description: `Provider status has been updated.`,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="lti" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="lti">LTI Tools</TabsTrigger>
            <TabsTrigger value="oauth">OAuth Providers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lti" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">LTI Tools</h3>
              <Dialog open={addLtiDialogOpen} onOpenChange={setAddLtiDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add LTI Tool</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New LTI Tool</DialogTitle>
                    <DialogDescription>
                      Configure a new LTI tool for integration with external learning systems.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...ltiForm}>
                    <form onSubmit={ltiForm.handleSubmit(onLtiSubmit)} className="space-y-4">
                      <FormField
                        control={ltiForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tool Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Canvas LMS" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ltiForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tool description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={ltiForm.control}
                          name="lti_version"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LTI Version</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  {...field}
                                >
                                  <option value="1.0">LTI 1.0</option>
                                  <option value="1.1">LTI 1.1</option>
                                  <option value="1.3">LTI 1.3 (Advantage)</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={ltiForm.control}
                          name="client_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client ID</FormLabel>
                              <FormControl>
                                <Input placeholder="client_id" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={ltiForm.control}
                        name="auth_login_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Auth Login URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/auth" type="url" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={ltiForm.control}
                          name="auth_token_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Auth Token URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/token" type="url" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={ltiForm.control}
                          name="jwks_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>JWKS URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/jwks" type="url" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={ltiForm.control}
                        name="redirect_uris"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Redirect URIs (one per line)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="https://example.com/callback" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Enter one URL per line. These are the allowed redirect URIs after authentication.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ltiForm.control}
                        name="custom_fields"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Fields (JSON)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder='{"course_id": "$Canvas.course.id"}' 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Enter custom fields as a JSON object.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={ltiForm.control}
                        name="is_active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Active
                              </FormLabel>
                              <FormDescription>
                                Enable or disable this LTI tool.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Adding..." : "Add LTI Tool"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ltiTools.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No LTI tools configured.
                        </TableCell>
                      </TableRow>
                    ) : (
                      ltiTools.map((tool) => (
                        <TableRow key={tool.id}>
                          <TableCell className="font-medium">
                            {tool.name}
                            {tool.description && (
                              <p className="text-xs text-muted-foreground">{tool.description}</p>
                            )}
                          </TableCell>
                          <TableCell>{tool.lti_version || "N/A"}</TableCell>
                          <TableCell>
                            <Switch 
                              checked={tool.is_active} 
                              onCheckedChange={() => toggleLtiToolStatus(tool.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="oauth" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">OAuth Providers</h3>
              <Dialog open={addOAuthDialogOpen} onOpenChange={setAddOAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add OAuth Provider</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New OAuth Provider</DialogTitle>
                    <DialogDescription>
                      Configure a new OAuth provider for authentication with external services.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...oauthForm}>
                    <form onSubmit={oauthForm.handleSubmit(onOAuthSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={oauthForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provider Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Google" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={oauthForm.control}
                          name="provider_key"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provider Key</FormLabel>
                              <FormControl>
                                <Input placeholder="google" {...field} />
                              </FormControl>
                              <FormDescription>
                                Unique identifier for this provider
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={oauthForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Provider description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={oauthForm.control}
                          name="client_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client ID</FormLabel>
                              <FormControl>
                                <Input placeholder="client_id" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={oauthForm.control}
                          name="client_secret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Secret</FormLabel>
                              <FormControl>
                                <Input placeholder="client_secret" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={oauthForm.control}
                        name="auth_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Authorization URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/auth" type="url" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={oauthForm.control}
                          name="token_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Token URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/token" type="url" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={oauthForm.control}
                          name="userinfo_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>User Info URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/userinfo" type="url" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={oauthForm.control}
                        name="scope"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scope</FormLabel>
                            <FormControl>
                              <Input placeholder="openid profile email" {...field} />
                            </FormControl>
                            <FormDescription>
                              Space-separated list of scopes.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={oauthForm.control}
                        name="is_active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Active
                              </FormLabel>
                              <FormDescription>
                                Enable or disable this OAuth provider.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Adding..." : "Add OAuth Provider"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {oauthProviders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No OAuth providers configured.
                        </TableCell>
                      </TableRow>
                    ) : (
                      oauthProviders.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell className="font-medium">
                            {provider.name}
                            {provider.description && (
                              <p className="text-xs text-muted-foreground">{provider.description}</p>
                            )}
                          </TableCell>
                          <TableCell>{provider.provider_key || "N/A"}</TableCell>
                          <TableCell>
                            <Switch 
                              checked={provider.is_active} 
                              onCheckedChange={() => toggleOAuthProviderStatus(provider.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
