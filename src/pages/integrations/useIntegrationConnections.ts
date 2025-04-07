
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@clerk/clerk-react";

export interface IntegrationConnection {
  id: string;
  connection_name: string;
  auth_credentials: any;
  is_active: boolean;
  created_at: string;
  connector: {
    id: string;
    name: string;
    key: string;
    icon: string;
    description: string;
  }
}

export const useIntegrationConnections = () => {
  const { user } = useUser();
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConnections = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('user_integration_connections')
        .select(`
          id,
          connection_name,
          auth_credentials,
          is_active,
          created_at,
          connector:connector_id(id, name, key, icon, description)
        `)
        .eq('user_id', user.id);
        
      if (error) throw new Error(error.message);
      
      setConnections(data || []);
    } catch (err) {
      console.error("Failed to fetch integration connections:", err);
      setError(err instanceof Error ? err : new Error('Unknown error fetching connections'));
    } finally {
      setIsLoading(false);
    }
  };

  const addConnection = async (connectionData: any) => {
    if (!user?.id) throw new Error("User not authenticated");
    
    try {
      const { data, error } = await supabase
        .from('user_integration_connections')
        .insert({
          ...connectionData,
          user_id: user.id
        })
        .select();
        
      if (error) throw new Error(error.message);
      
      // Refresh the connections list
      await fetchConnections();
      
      return data[0];
    } catch (err) {
      console.error("Failed to add integration connection:", err);
      throw err;
    }
  };

  const removeConnection = async (connectionId: string) => {
    if (!user?.id) throw new Error("User not authenticated");
    
    try {
      const { error } = await supabase
        .from('user_integration_connections')
        .delete()
        .eq('id', connectionId)
        .eq('user_id', user.id);
        
      if (error) throw new Error(error.message);
      
      // Refresh the connections list
      await fetchConnections();
    } catch (err) {
      console.error("Failed to remove integration connection:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [user?.id]);

  return {
    connections,
    isLoading,
    error,
    fetchConnections,
    addConnection,
    removeConnection
  };
};
