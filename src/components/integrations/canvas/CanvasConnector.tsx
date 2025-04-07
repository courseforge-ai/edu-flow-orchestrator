
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";

export const CanvasConnector = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    canvasUrl: "",
    clientId: "",
    developerKey: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to connect your Canvas LMS.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.name || !formData.canvasUrl || !formData.clientId || !formData.developerKey) {
      toast({
        title: "Validation error",
        description: "Please fill out all fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // First, get the Canvas connector ID
      const { data: connectors, error: connectorError } = await supabase
        .from('integration_connectors')
        .select('id')
        .eq('key', 'canvas_lms')
        .single();
        
      if (connectorError) {
        throw new Error("Canvas connector not found");
      }
      
      // Create the user connection record
      const { data: connection, error: connectionError } = await supabase
        .from('user_integration_connections')
        .insert({
          user_id: user.id,
          connector_id: connectors.id,
          connection_name: formData.name,
          auth_credentials: {
            canvas_url: formData.canvasUrl,
            client_id: formData.clientId,
            developer_key: formData.developerKey
          },
          is_active: true
        })
        .select('id')
        .single();
        
      if (connectionError) {
        throw new Error(`Failed to create connection: ${connectionError.message}`);
      }
      
      // Begin LTI authentication flow
      const response = await fetch(`${window.location.origin}/api/canvas-lti/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iss: formData.canvasUrl,
          client_id: formData.clientId,
          connection_id: connection.id
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to initiate Canvas authentication");
      }
      
      // In a real application, we would redirect to the Canvas authorization URL
      // window.location.href = result.redirect_url;
      
      toast({
        title: "Connection created",
        description: "Canvas LMS connection has been set up successfully.",
      });
      
      // Clear the form
      setFormData({
        name: "",
        canvasUrl: "",
        clientId: "",
        developerKey: ""
      });
      
    } catch (error) {
      console.error("Error connecting to Canvas:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to Canvas LMS.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle>Connect Canvas LMS</CardTitle>
        </div>
        <CardDescription>
          Link your Canvas Learning Management System instance to enable automations.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleConnect}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Connection Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="My Canvas Instance" 
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="canvasUrl">Canvas URL</Label>
            <Input 
              id="canvasUrl" 
              name="canvasUrl" 
              placeholder="https://myschool.instructure.com" 
              value={formData.canvasUrl}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input 
              id="clientId" 
              name="clientId" 
              placeholder="10000000000001" 
              value={formData.clientId}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="developerKey">Developer Key</Label>
            <Input 
              id="developerKey" 
              name="developerKey" 
              placeholder="Your Developer Key" 
              type="password"
              value={formData.developerKey}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect Canvas"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
