
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2';
import * as jose from 'https://esm.sh/jose@5.1.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request path
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Handle login request
    if (path === 'login' && req.method === 'POST') {
      const { iss, client_id, connection_id } = await req.json();

      if (!iss || !client_id || !connection_id) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Missing required parameters: iss, client_id, or connection_id' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }

      // Generate state and nonce for OIDC flow
      const state = crypto.randomUUID();
      const nonce = crypto.randomUUID();
      
      // Store state and nonce in database for later verification
      const { error: stateError } = await supabase
        .from('lti_auth_states')
        .insert({
          state,
          nonce,
          connection_id,
          expires_at: new Date(Date.now() + 1000 * 60 * 5).toISOString() // 5 minutes expiration
        });
      
      if (stateError) {
        console.error('Error storing auth state:', stateError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Failed to create authentication session' 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }
      
      // Create the redirect URL to Canvas's OAuth2/OIDC login endpoint
      const redirectUrl = `${iss}/login/oauth2/auth?client_id=${client_id}&response_type=id_token&redirect_uri=${encodeURIComponent(url.origin + '/api/canvas-lti/launch')}&state=${state}&scope=openid&response_mode=form_post&nonce=${nonce}`;
      
      // Log the connection attempt
      console.log(`Canvas LTI login initiated: Connection ID ${connection_id}, Canvas URL: ${iss}, State: ${state}`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          redirect_url: redirectUrl 
        }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders,
          } 
        }
      );
    }
    
    // Handle launch request
    if (path === 'launch' && req.method === 'POST') {
      const formData = await req.formData();
      const idToken = formData.get('id_token')?.toString();
      const state = formData.get('state')?.toString();
      
      if (!idToken || !state) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Missing ID token or state parameter' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }
      
      // Verify the state parameter
      const { data: stateData, error: stateError } = await supabase
        .from('lti_auth_states')
        .select('connection_id, nonce')
        .eq('state', state)
        .gte('expires_at', new Date().toISOString())
        .single();
      
      if (stateError || !stateData) {
        console.error('Invalid or expired state parameter:', stateError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Invalid or expired authentication session' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }
      
      // Get the connection info to retrieve the Canvas URL
      const { data: connection, error: connectionError } = await supabase
        .from('user_integration_connections')
        .select('auth_credentials')
        .eq('id', stateData.connection_id)
        .single();
      
      if (connectionError || !connection) {
        console.error('Failed to fetch connection details:', connectionError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Failed to retrieve connection details' 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }
      
      try {
        // Parse and decode the JWT ID Token
        const decoded = jose.decodeJwt(idToken);
        
        // Verify the nonce
        if (decoded.nonce !== stateData.nonce) {
          throw new Error('Invalid nonce in ID token');
        }
        
        // In a production environment, validate the JWT signature using the platform's JWKS
        
        // Extract user information from the token
        const userId = decoded.sub;
        const name = decoded.name || '';
        const email = decoded.email || '';
        const roles = decoded.roles || [];
        
        // Update the connection with user data
        const { error: updateError } = await supabase
          .from('user_integration_connections')
          .update({
            last_connected_at: new Date().toISOString(),
            connection_data: {
              user: {
                id: userId,
                name,
                email,
                roles,
              }
            }
          })
          .eq('id', stateData.connection_id);
        
        if (updateError) {
          console.error('Failed to update connection with user data:', updateError);
        }
        
        // Delete the used auth state
        await supabase
          .from('lti_auth_states')
          .delete()
          .eq('state', state);
        
        // Log the successful launch
        console.log(`Canvas LTI launch completed: User ${userId} authenticated for connection ${stateData.connection_id}`);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Launch successful',
            user: {
              id: userId,
              name,
              email,
              roles
            }
          }),
          { 
            status: 200, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      } catch (error) {
        console.error('Error processing ID token:', error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Failed to process authentication token' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders,
            } 
          }
        );
      }
    }

    // Handle JWKS endpoint
    if (path === 'jwks' && req.method === 'GET') {
      // In a production environment, this would return the platform's JSON Web Key Set
      return new Response(
        JSON.stringify({ 
          keys: [] 
        }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders,
          } 
        }
      );
    }

    // Return 404 for any other paths
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Not found' 
      }),
      { 
        status: 404, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders,
        } 
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders,
        } 
      }
    );
  }
});
