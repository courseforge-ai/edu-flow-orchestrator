export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      integration_actions: {
        Row: {
          connector_id: string
          created_at: string | null
          description: string | null
          id: string
          input_fields: Json | null
          key: string
          label: string
          noun: string
          operation_config: Json
          output_fields: Json | null
          sample_output: Json | null
          updated_at: string | null
        }
        Insert: {
          connector_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          input_fields?: Json | null
          key: string
          label: string
          noun: string
          operation_config?: Json
          output_fields?: Json | null
          sample_output?: Json | null
          updated_at?: string | null
        }
        Update: {
          connector_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          input_fields?: Json | null
          key?: string
          label?: string
          noun?: string
          operation_config?: Json
          output_fields?: Json | null
          sample_output?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_actions_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "integration_connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_auth_configs: {
        Row: {
          auth_config: Json
          auth_type: string
          connector_id: string
          created_at: string | null
          id: string
          test_endpoint: string | null
          updated_at: string | null
        }
        Insert: {
          auth_config?: Json
          auth_type: string
          connector_id: string
          created_at?: string | null
          id?: string
          test_endpoint?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_config?: Json
          auth_type?: string
          connector_id?: string
          created_at?: string | null
          id?: string
          test_endpoint?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_auth_configs_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "integration_connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_categories: {
        Row: {
          description: string
          icon: string
          id: string
          title: string
        }
        Insert: {
          description: string
          icon: string
          id: string
          title: string
        }
        Update: {
          description?: string
          icon?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      integration_connectors: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          key: string
          name: string
          platform_version: string | null
          updated_at: string | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          name: string
          platform_version?: string | null
          updated_at?: string | null
          version: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          name?: string
          platform_version?: string | null
          updated_at?: string | null
          version?: string
        }
        Relationships: []
      }
      integration_events: {
        Row: {
          connection_id: string
          created_at: string | null
          event_data: Json
          id: string
          processed: boolean | null
          processed_at: string | null
          trigger_key: string
        }
        Insert: {
          connection_id: string
          created_at?: string | null
          event_data: Json
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          trigger_key: string
        }
        Update: {
          connection_id?: string
          created_at?: string | null
          event_data?: Json
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          trigger_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_events_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "user_integration_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_triggers: {
        Row: {
          connector_id: string
          created_at: string | null
          description: string | null
          id: string
          input_fields: Json | null
          key: string
          label: string
          noun: string
          operation_config: Json
          operation_type: string
          output_fields: Json | null
          sample_output: Json | null
          updated_at: string | null
        }
        Insert: {
          connector_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          input_fields?: Json | null
          key: string
          label: string
          noun: string
          operation_config?: Json
          operation_type: string
          output_fields?: Json | null
          sample_output?: Json | null
          updated_at?: string | null
        }
        Update: {
          connector_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          input_fields?: Json | null
          key?: string
          label?: string
          noun?: string
          operation_config?: Json
          operation_type?: string
          output_fields?: Json | null
          sample_output?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_triggers_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "integration_connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_workflows: {
        Row: {
          created_at: string | null
          description: string | null
          flow_definition: Json
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          flow_definition?: Json
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          flow_definition?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      integrations: {
        Row: {
          category_id: string
          description: string
          id: string
          is_available: boolean
          name: string
        }
        Insert: {
          category_id: string
          description: string
          id: string
          is_available?: boolean
          name: string
        }
        Update: {
          category_id?: string
          description?: string
          id?: string
          is_available?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "integration_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_integration_connections: {
        Row: {
          auth_credentials: Json
          connection_name: string
          connector_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auth_credentials?: Json
          connection_name: string
          connector_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auth_credentials?: Json
          connection_name?: string
          connector_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_integration_connections_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "integration_connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          error_message: string | null
          event_id: string | null
          id: string
          result: Json | null
          started_at: string | null
          status: string
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status: string
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "integration_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "integration_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
