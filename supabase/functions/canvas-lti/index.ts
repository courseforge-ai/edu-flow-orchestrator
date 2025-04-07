
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Parse the URL to get the path
  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();

  try {
    if (path === 'launch') {
      return await handleLaunch(req);
    } else if (path === 'login') {
      return await handleLogin(req);
    } else {
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

async function handleLogin(req: Request) {
  // Parse request body
  const data = await req.json();
  const { iss, client_id, connection_id } = data;
  
  console.log(`Processing login request for ${iss} with client ${client_id} and connection ${connection_id}`);
  
  // In a real implementation, we would:
  // 1. Verify the connection_id belongs to the authenticated user
  // 2. Generate a state and nonce for OIDC
  // 3. Store them in a temporary storage with expiration
  // 4. Redirect to the appropriate authorization URL
  
  // For now, we're simulating the response
  return new Response(JSON.stringify({ 
    success: true,
    redirect_url: `https://canvas.example.com/auth?client_id=${client_id}&state=some-state&nonce=some-nonce` 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

async function handleLaunch(req: Request) {
  // Parse request body
  const data = await req.json();
  const { id_token, connection_id } = data;
  
  console.log(`Processing launch request for connection ${connection_id}`);

  // In a real implementation, we would:
  // 1. Verify the JWT token using the public key from Canvas
  // 2. Extract user and context information
  // 3. Create an integration event in our database
  // 4. Return success with the parsed information

  // For now, we're simulating a successful launch
  
  // Create an integration event
  const { data: event, error } = await supabase
    .from('integration_events')
    .insert({
      connection_id,
      trigger_key: 'lti_launch',
      event_data: {
        context_id: 'course_123',
        resource_link_id: 'assignment_456',
        user_id: 'user_789',
        roles: ['Instructor'],
        timestamp: new Date().toISOString(),
      },
      processed: false
    })
    .select('id')
    .single();
    
  if (error) {
    throw new Error(`Failed to create event: ${error.message}`);
  }

  return new Response(JSON.stringify({ 
    success: true,
    event_id: event.id,
    message: 'LTI launch processed successfully'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}
