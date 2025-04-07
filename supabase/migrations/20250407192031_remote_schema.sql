

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "clerk";


ALTER SCHEMA "clerk" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgmq" WITH SCHEMA "pgmq";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "clerk";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."integration_actions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "connector_id" "uuid" NOT NULL,
    "key" "text" NOT NULL,
    "noun" "text" NOT NULL,
    "label" "text" NOT NULL,
    "description" "text",
    "operation_config" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "input_fields" "jsonb" DEFAULT '[]'::"jsonb",
    "output_fields" "jsonb" DEFAULT '[]'::"jsonb",
    "sample_output" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."integration_actions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_auth_configs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "connector_id" "uuid" NOT NULL,
    "auth_type" "text" NOT NULL,
    "auth_config" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "test_endpoint" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."integration_auth_configs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_categories" (
    "id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "icon" "text" NOT NULL
);


ALTER TABLE "public"."integration_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_connectors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "key" "text" NOT NULL,
    "version" "text" NOT NULL,
    "platform_version" "text",
    "description" "text",
    "icon" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."integration_connectors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "connection_id" "uuid" NOT NULL,
    "trigger_key" "text" NOT NULL,
    "event_data" "jsonb" NOT NULL,
    "processed" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "processed_at" timestamp with time zone
);

ALTER TABLE ONLY "public"."integration_events" REPLICA IDENTITY FULL;


ALTER TABLE "public"."integration_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_triggers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "connector_id" "uuid" NOT NULL,
    "key" "text" NOT NULL,
    "noun" "text" NOT NULL,
    "label" "text" NOT NULL,
    "description" "text",
    "operation_type" "text" NOT NULL,
    "operation_config" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "input_fields" "jsonb" DEFAULT '[]'::"jsonb",
    "output_fields" "jsonb" DEFAULT '[]'::"jsonb",
    "sample_output" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."integration_triggers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_workflows" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "is_active" boolean DEFAULT true,
    "flow_definition" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."integration_workflows" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integrations" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "is_available" boolean DEFAULT false NOT NULL,
    "category_id" "text" NOT NULL
);


ALTER TABLE "public"."integrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_integration_connections" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "connector_id" "uuid" NOT NULL,
    "connection_name" "text" NOT NULL,
    "auth_credentials" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_integration_connections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."workflow_executions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "workflow_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "status" "text" NOT NULL,
    "result" "jsonb",
    "error_message" "text",
    "started_at" timestamp with time zone DEFAULT "now"(),
    "completed_at" timestamp with time zone
);


ALTER TABLE "public"."workflow_executions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."integration_actions"
    ADD CONSTRAINT "integration_actions_connector_id_key_key" UNIQUE ("connector_id", "key");



ALTER TABLE ONLY "public"."integration_actions"
    ADD CONSTRAINT "integration_actions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_auth_configs"
    ADD CONSTRAINT "integration_auth_configs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_categories"
    ADD CONSTRAINT "integration_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_connectors"
    ADD CONSTRAINT "integration_connectors_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."integration_connectors"
    ADD CONSTRAINT "integration_connectors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_events"
    ADD CONSTRAINT "integration_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_triggers"
    ADD CONSTRAINT "integration_triggers_connector_id_key_key" UNIQUE ("connector_id", "key");



ALTER TABLE ONLY "public"."integration_triggers"
    ADD CONSTRAINT "integration_triggers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_workflows"
    ADD CONSTRAINT "integration_workflows_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integrations"
    ADD CONSTRAINT "integrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_integration_connections"
    ADD CONSTRAINT "user_integration_connections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."workflow_executions"
    ADD CONSTRAINT "workflow_executions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."integration_actions"
    ADD CONSTRAINT "integration_actions_connector_id_fkey" FOREIGN KEY ("connector_id") REFERENCES "public"."integration_connectors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."integration_auth_configs"
    ADD CONSTRAINT "integration_auth_configs_connector_id_fkey" FOREIGN KEY ("connector_id") REFERENCES "public"."integration_connectors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."integration_events"
    ADD CONSTRAINT "integration_events_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."user_integration_connections"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."integration_triggers"
    ADD CONSTRAINT "integration_triggers_connector_id_fkey" FOREIGN KEY ("connector_id") REFERENCES "public"."integration_connectors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."integrations"
    ADD CONSTRAINT "integrations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."integration_categories"("id");



ALTER TABLE ONLY "public"."user_integration_connections"
    ADD CONSTRAINT "user_integration_connections_connector_id_fkey" FOREIGN KEY ("connector_id") REFERENCES "public"."integration_connectors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."workflow_executions"
    ADD CONSTRAINT "workflow_executions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."integration_events"("id");



ALTER TABLE ONLY "public"."workflow_executions"
    ADD CONSTRAINT "workflow_executions_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "public"."integration_workflows"("id") ON DELETE CASCADE;



CREATE POLICY "Allow public read access to integration_categories" ON "public"."integration_categories" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to integrations" ON "public"."integrations" FOR SELECT USING (true);



CREATE POLICY "Public read access for connectors" ON "public"."integration_connectors" FOR SELECT USING (true);



CREATE POLICY "Users can create their own connections" ON "public"."user_integration_connections" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create their own workflows" ON "public"."integration_workflows" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own connections" ON "public"."user_integration_connections" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own workflows" ON "public"."integration_workflows" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own connections" ON "public"."user_integration_connections" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own workflows" ON "public"."integration_workflows" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own connections" ON "public"."user_integration_connections" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own workflows" ON "public"."integration_workflows" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."integration_actions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_auth_configs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_connectors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_triggers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_workflows" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integrations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_integration_connections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."workflow_executions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."integration_events";






GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






























































































































































































































GRANT ALL ON TABLE "public"."integration_actions" TO "anon";
GRANT ALL ON TABLE "public"."integration_actions" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_actions" TO "service_role";



GRANT ALL ON TABLE "public"."integration_auth_configs" TO "anon";
GRANT ALL ON TABLE "public"."integration_auth_configs" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_auth_configs" TO "service_role";



GRANT ALL ON TABLE "public"."integration_categories" TO "anon";
GRANT ALL ON TABLE "public"."integration_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_categories" TO "service_role";



GRANT ALL ON TABLE "public"."integration_connectors" TO "anon";
GRANT ALL ON TABLE "public"."integration_connectors" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_connectors" TO "service_role";



GRANT ALL ON TABLE "public"."integration_events" TO "anon";
GRANT ALL ON TABLE "public"."integration_events" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_events" TO "service_role";



GRANT ALL ON TABLE "public"."integration_triggers" TO "anon";
GRANT ALL ON TABLE "public"."integration_triggers" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_triggers" TO "service_role";



GRANT ALL ON TABLE "public"."integration_workflows" TO "anon";
GRANT ALL ON TABLE "public"."integration_workflows" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_workflows" TO "service_role";



GRANT ALL ON TABLE "public"."integrations" TO "anon";
GRANT ALL ON TABLE "public"."integrations" TO "authenticated";
GRANT ALL ON TABLE "public"."integrations" TO "service_role";



GRANT ALL ON TABLE "public"."user_integration_connections" TO "anon";
GRANT ALL ON TABLE "public"."user_integration_connections" TO "authenticated";
GRANT ALL ON TABLE "public"."user_integration_connections" TO "service_role";



GRANT ALL ON TABLE "public"."workflow_executions" TO "anon";
GRANT ALL ON TABLE "public"."workflow_executions" TO "authenticated";
GRANT ALL ON TABLE "public"."workflow_executions" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
