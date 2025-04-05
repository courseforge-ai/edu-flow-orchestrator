
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

// This hook provides a way to use Supabase with Clerk authentication
export function useSupabaseAuth() {
  const { getToken } = useAuth();
  const [supabaseAccessToken, setSupabaseAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupSupabaseAuth = async () => {
      try {
        // Get JWT token from Clerk
        const token = await getToken();
        
        if (token) {
          // Set the auth JWT token in Supabase
          const { error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          });
          
          if (error) {
            console.error('Error setting Supabase session:', error);
          } else {
            setSupabaseAccessToken(token);
          }
        }
      } catch (error) {
        console.error('Error setting up Supabase auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    setupSupabaseAuth();
    
    // Set up a listener for Clerk authentication changes
    const intervalId = setInterval(setupSupabaseAuth, 10 * 60 * 1000); // Refresh every 10 minutes
    
    return () => {
      clearInterval(intervalId);
    };
  }, [getToken]);

  return { supabaseAccessToken, isLoading };
}
