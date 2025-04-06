
import { ReactNode } from "react";

export interface Integration {
  id: string;
  name: string;
  isAvailable: boolean;
  description?: string;
}

export interface IntegrationCategory {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  integrations: Integration[];
}
