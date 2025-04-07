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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
