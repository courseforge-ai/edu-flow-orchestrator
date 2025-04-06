
import { ReactNode } from "react";

// Types for the database tables
export interface IntegrationCategoryDB {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface IntegrationDB {
  id: string;
  name: string;
  description: string;
  is_available: boolean;
  category_id: string;
}

// Types for our UI components (with icon as ReactNode)
export interface Integration {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
}

export interface IntegrationCategory {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  integrations: Integration[];
}
