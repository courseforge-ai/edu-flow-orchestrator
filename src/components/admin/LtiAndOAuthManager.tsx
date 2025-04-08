
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Settings, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Type definitions
interface LtiTool {
  id: string;
  name: string;
  description?: string;
  lti_version: "1.0" | "1.1" | "1.3";
  client_id?: string;
  auth_login_url?: string;
  auth_token_url?: string;
  jwks_url?: string;
  redirect_uris?: string[];
  custom_fields?: Record<string, string>;
  is_active: boolean;
  created_at: string;
}

interface OAuthProvider {
  id: string;
  name: string;
  provider_key: string;
  description?: string;
  client_id?: string;
  client_secret?: string;
  auth_url?: string;
  token_url?: string;
  userinfo_url?: string;
  scope?: string;
  is_active: boolean;
  created_at: string;
}

// Form schemas
const ltiToolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  lti_version: z.enum(["1.0", "1.1", "1.3"]),
  client_id: z.string().optional(),
  auth_login_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  auth_token_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  jwks_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  redirect_uris: z.string().transform(val => val.split("\n").map(line => line.trim()).filter(Boolean)),
  custom_fields: z.string().transform(val => {
    try {
      return val ? JSON.parse(val) : {};
    } catch {
      return {};
    }
  }),
  is_active: z.boolean().default(true),
});

const oauthProviderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  provider_key: z.string().min(1, "Provider key is required"),
  description: z.string().optional(),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  auth_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  token_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  userinfo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  scope: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const LtiAndOAuthManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lti-tools");
  const [isLoading, setIsLoading] = useState(false);
  
  const [ltiTools, setLtiTools] = useState<LtiTool[]>([
    {
      id: "canvas-lti",
      name: "Canvas LMS",
      description: "Learning Management System by Instructure",
      lti_version: "1.3",
      client_id: "10000000000001",
      auth_login_url: "https://canvas.instructure.com/api/lti/authorize_redirect",
      auth_token_url: "https://canvas.instructure.com/login/oauth2/token",
      jwks_url: "https://canvas.instructure.com/api/lti/security/jwks",
      redirect_uris: ["https://example.com/api/canvas-lti/launch"],
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ]);
  
  const [oauthProviders, setOAuthProviders] = useState<OAuthProvider[]>([
    {
      id: "google-oauth",
      name: "Google",
      provider_key: "google",
      description: "Google OAuth 2.0 Provider",
      client_id: "xxxxx-xxxxx.apps.googleusercontent.com",
      client_secret: "••••••••••••••••••••••••",
      auth_url: "https://accounts.google.com/o/oauth2/v2/auth",
      token_url: "https://oauth2.googleapis.com/token",
      userinfo_url: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: "email profile",
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ]);

  // Dialog state
  const [ltiDialogOpen, setLtiDialogOpen] = useState(false);
  const [oauthDialogOpen, setOauthDialogOpen] = useState(false);
  const [currentLtiTool, setCurrentLtiTool] = useState<LtiTool | null>(null);
  const [currentOAuthProvider, setCurrentOAuthProvider] = useState<OAuthProvider | null>(null);
  
  // Form handling
  const ltiForm = useForm<z.infer<typeof ltiToolSchema>>({
    resolver: zodResolver(ltiToolSchema),
    defaultValues: {
      name: "",
      description: "",
      lti_version: "1.3",
      client_id: "",
      auth_login_url: "",
      auth_token_url: "",
      jwks_url: "",
      redirect_uris: [],
      custom_fields: {},
      is_active: true,
    },
  });
  
  const oauthForm = useForm<z.infer<typeof oauthProviderSchema>>({
    resolver: zodResolver(oauthProviderSchema),
    defaultValues: {
      name: "",
      provider_key: "",
      description: "",
      client_id: "",
      client_secret: "",
      auth_url: "",
      token_url: "",
      userinfo_url: "",
      scope: "",
      is_active: true,
    },
  });

  // Handle LTI tool form submission
  const handleLtiSubmit = (data: z.infer<typeof ltiToolSchema>) => {
    setIsLoading(true);
    
    try {
      if (currentLtiTool) {
        // Update existing LTI tool
        const updatedTools = ltiTools.map(tool => 
          tool.id === currentLtiTool.id ? { ...tool, ...data } : tool
        );
        setLtiTools(updatedTools);
        toast({
          title: "LTI Tool Updated",
          description: `${data.name} has been successfully updated.`,
        });
      } else {
        // Create new LTI tool
        const newTool: LtiTool = {
          id: crypto.randomUUID(),
          ...data,
          created_at: new Date().toISOString(),
        };
        setLtiTools([...ltiTools, newTool]);
        toast({
          title: "LTI Tool Created",
          description: `${data.name} has been added to your LTI tools.`,
        });
      }
      
      setLtiDialogOpen(false);
      ltiForm.reset();
      setCurrentLtiTool(null);
    } catch (error) {
      console.error("Error saving LTI tool:", error);
      toast({
        title: "Error",
        description: "Failed to save LTI tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OAuth provider form submission
  const handleOAuthSubmit = (data: z.infer<typeof oauthProviderSchema>) => {
    setIsLoading(true);
    
    try {
      if (currentOAuthProvider) {
        // Update existing OAuth provider
        const updatedProviders = oauthProviders.map(provider => 
          provider.id === currentOAuthProvider.id ? { ...provider, ...data } : provider
        );
        setOAuthProviders(updatedProviders);
        toast({
          title: "OAuth Provider Updated",
          description: `${data.name} has been successfully updated.`,
        });
      } else {
        // Create new OAuth provider
        const newProvider: OAuthProvider = {
          id: crypto.randomUUID(),
          ...data,
          created_at: new Date().toISOString(),
        };
        setOAuthProviders([...oauthProviders, newProvider]);
        toast({
          title: "OAuth Provider Created",
          description: `${data.name} has been added to your OAuth providers.`,
        });
      }
      
      setOauthDialogOpen(false);
      oauthForm.reset();
      setCurrentOAuthProvider(null);
    } catch (error) {
      console.error("Error saving OAuth provider:", error);
      toast({
        title: "Error",
        description: "Failed to save OAuth provider. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit LTI tool
  const editLtiTool = (tool: LtiTool) => {
    setCurrentLtiTool(tool);
    ltiForm.reset({
      name: tool.name,
      description: tool.description || "",
      lti_version: tool.lti_version,
      client_id: tool.client_id || "",
      auth_login_url: tool.auth_login_url || "",
      auth_token_url: tool.auth_token_url || "",
      jwks_url: tool.jwks_url || "",
      redirect_uris: tool.redirect_uris?.join("\n") || "",
      custom_fields: JSON.stringify(tool.custom_fields || {}, null, 2),
      is_active: tool.is_active,
    });
    setLtiDialogOpen(true);
  };

  // Edit OAuth provider
  const editOAuthProvider = (provider: OAuthProvider) => {
    setCurrentOAuthProvider(provider);
    oauthForm.reset({
      name: provider.name,
      provider_key: provider.provider_key,
      description: provider.description || "",
      client_id: provider.client_id || "",
      client_secret: provider.client_secret || "",
      auth_url: provider.auth_url || "",
      token_url: provider.token_url || "",
      userinfo_url: provider.userinfo_url || "",
      scope: provider.scope || "",
      is_active: provider.is_active,
    });
    setOauthDialogOpen(true);
  };

  // Delete LTI tool
  const deleteLtiTool = (id: string) => {
    setLtiTools(ltiTools.filter(tool => tool.id !== id));
    toast({
      title: "LTI Tool Deleted",
      description: "The LTI tool has been removed.",
    });
  };

  // Delete OAuth provider
  const deleteOAuthProvider = (id: string) => {
    setOAuthProviders(oauthProviders.filter(provider => provider.id !== id));
    toast({
      title: "OAuth Provider Deleted",
      description: "The OAuth provider has been removed.",
    });
  };

  // Toggle LTI tool active status
  const toggleLtiToolStatus = (id: string) => {
    setLtiTools(
      ltiTools.map(tool => 
        tool.id === id ? { ...tool, is_active: !tool.is_active } : tool
      )
    );
  };

  // Toggle OAuth provider active status
  const toggleOAuthProviderStatus = (id: string) => {
    setOAuthProviders(
      oauthProviders.map(provider => 
        provider.id === id ? { ...provider, is_active: !provider.is_active } : provider
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">External Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Manage LTI tools and OAuth providers for integrating with external systems.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="lti-tools">LTI Tools</TabsTrigger>
          <TabsTrigger value="oauth-providers">OAuth Providers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lti-tools" className="space-y-4 mt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Learning Tools Interoperability (LTI)</h3>
            <Dialog open={ltiDialogOpen} onOpenChange={setLtiDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setCurrentLtiTool(null);
                    ltiForm.reset();
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add LTI Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {currentLtiTool ? "Edit LTI Tool" : "Add LTI Tool"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure your LTI tool integration settings.
                  </DialogDescription>
                </DialogHeader>
                <Form {...ltiForm}>
                  <form onSubmit={ltiForm.handleSubmit(handleLtiSubmit)} className="space-y-4">
                    <FormField
                      control={ltiForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
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
                            <Input placeholder="Learning Management System" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ltiForm.control}
                      name="lti_version"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LTI Version</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1.0" id="lti-1.0" />
                                <Label htmlFor="lti-1.0">LTI 1.0</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1.1" id="lti-1.1" />
                                <Label htmlFor="lti-1.1">LTI 1.1</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1.3" id="lti-1.3" />
                                <Label htmlFor="lti-1.3">LTI 1.3 (Advantage)</Label>
                              </div>
                            </RadioGroup>
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
                            <Input placeholder="10000000000001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ltiForm.control}
                      name="auth_login_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Auth Login URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/api/lti/authorize_redirect" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ltiForm.control}
                      name="auth_token_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Auth Token URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/login/oauth2/token" 
                              {...field} 
                            />
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
                            <Input 
                              placeholder="https://example.com/api/lti/security/jwks" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ltiForm.control}
                      name="redirect_uris"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Redirect URIs</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="https://example.com/api/lti/launch&#10;https://example.com/api/lti/callback"
                              {...field}
                              value={typeof field.value === 'string' ? field.value : field.value.join('\n')}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one URI per line
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
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                              placeholder='{"course_id": "$Course.id"}'
                              {...field}
                              value={typeof field.value === 'string' ? field.value : JSON.stringify(field.value, null, 2)}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter custom fields as JSON object
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ltiForm.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <FormDescription>
                              Enable or disable this LTI tool
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
                        {isLoading ? "Saving..." : currentLtiTool ? "Update Tool" : "Add Tool"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4">
            {ltiTools.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No LTI tools configured. Click "Add LTI Tool" to create one.
                </CardContent>
              </Card>
            ) : (
              ltiTools.map((tool) => (
                <Card key={tool.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center">
                          {tool.name}
                          <Badge 
                            variant={tool.is_active ? "default" : "outline"}
                            className="ml-2"
                          >
                            {tool.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={tool.is_active}
                          onCheckedChange={() => toggleLtiToolStatus(tool.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">LTI Version</p>
                          <p className="text-sm text-muted-foreground">{tool.lti_version}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Client ID</p>
                          <p className="text-sm text-muted-foreground">{tool.client_id || "—"}</p>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <p className="text-sm font-medium">Redirect URIs</p>
                      <div className="space-y-1">
                        {tool.redirect_uris?.map((uri, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground truncate">
                            {uri}
                          </p>
                        )) || "—"}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => editLtiTool(tool)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete LTI Tool</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the {tool.name} LTI tool? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteLtiTool(tool.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="oauth-providers" className="space-y-4 mt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">OAuth 2.0 Providers</h3>
            <Dialog open={oauthDialogOpen} onOpenChange={setOauthDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setCurrentOAuthProvider(null);
                    oauthForm.reset();
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add OAuth Provider
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {currentOAuthProvider ? "Edit OAuth Provider" : "Add OAuth Provider"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure your OAuth 2.0 provider settings.
                  </DialogDescription>
                </DialogHeader>
                <Form {...oauthForm}>
                  <form onSubmit={oauthForm.handleSubmit(handleOAuthSubmit)} className="space-y-4">
                    <FormField
                      control={oauthForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
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
                    
                    <FormField
                      control={oauthForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Google OAuth 2.0 Provider" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={oauthForm.control}
                      name="client_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID</FormLabel>
                          <FormControl>
                            <Input placeholder="your-client-id.apps.googleusercontent.com" {...field} />
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
                            <Input 
                              type="password"
                              placeholder="Your client secret" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={oauthForm.control}
                      name="auth_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Authorization URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://accounts.google.com/o/oauth2/v2/auth" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={oauthForm.control}
                      name="token_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://oauth2.googleapis.com/token" 
                              {...field} 
                            />
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
                            <Input 
                              placeholder="https://www.googleapis.com/oauth2/v3/userinfo" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={oauthForm.control}
                      name="scope"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scope</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="email profile" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Space-separated list of scopes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={oauthForm.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <FormDescription>
                              Enable or disable this OAuth provider
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
                        {isLoading ? "Saving..." : currentOAuthProvider ? "Update Provider" : "Add Provider"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4">
            {oauthProviders.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No OAuth providers configured. Click "Add OAuth Provider" to create one.
                </CardContent>
              </Card>
            ) : (
              oauthProviders.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center">
                          {provider.name}
                          <Badge 
                            variant={provider.is_active ? "default" : "outline"}
                            className="ml-2"
                          >
                            {provider.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{provider.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={provider.is_active}
                          onCheckedChange={() => toggleOAuthProviderStatus(provider.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Provider Key</p>
                          <p className="text-sm text-muted-foreground">{provider.provider_key}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Client ID</p>
                          <p className="text-sm text-muted-foreground truncate">{provider.client_id || "—"}</p>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Client Secret</p>
                          <p className="text-sm text-muted-foreground">
                            {provider.client_secret ? "••••••••••••••••••••••••" : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Scope</p>
                          <p className="text-sm text-muted-foreground">{provider.scope || "—"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => editOAuthProvider(provider)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete OAuth Provider</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the {provider.name} OAuth provider? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteOAuthProvider(provider.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
