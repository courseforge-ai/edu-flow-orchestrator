
export interface IntegrationConnector {
  id: string;
  name: string;
  key: string;
  version: string;
  platform_version?: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IntegrationAuthConfig {
  id: string;
  connector_id: string;
  auth_type: string;
  auth_config: Record<string, any>;
  test_endpoint?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IntegrationTrigger {
  id: string;
  connector_id: string;
  key: string;
  noun: string;
  label: string;
  description?: string;
  operation_type: string;
  operation_config: Record<string, any>;
  input_fields?: Record<string, any>[];
  output_fields?: Record<string, any>[];
  sample_output?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface IntegrationAction {
  id: string;
  connector_id: string;
  key: string;
  noun: string;
  label: string;
  description?: string;
  operation_config: Record<string, any>;
  input_fields?: Record<string, any>[];
  output_fields?: Record<string, any>[];
  sample_output?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface IntegrationConnection {
  id: string;
  user_id: string;
  connector_id: string;
  connection_name: string;
  auth_credentials: Record<string, any>;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  connector?: IntegrationConnector;
}

export interface IntegrationEvent {
  id: string;
  connection_id: string;
  trigger_key: string;
  event_data: Record<string, any>;
  processed: boolean;
  created_at?: string;
  processed_at?: string;
}

export interface IntegrationWorkflow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  flow_definition: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  event_id?: string;
  status: 'success' | 'error' | 'in_progress';
  result?: Record<string, any>;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
}
