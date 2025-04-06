
import { useState, useEffect, useMemo } from "react";
import { IntegrationCategory, IntegrationCategoryDB, IntegrationDB } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { 
  GraduationCap, Mail, Calendar, CheckCircle, Users, DollarSign, FolderOpen, 
  BookOpen, BarChart2, Zap, Brain, Monitor, LucideIcon
} from "lucide-react";

// Map icon strings from the database to Lucide React icons
const iconMapping: Record<string, LucideIcon> = {
  GraduationCap,
  Mail,
  Calendar, 
  CheckCircle, 
  Users, 
  DollarSign, 
  FolderOpen, 
  BookOpen, 
  BarChart2, 
  Zap, 
  Brain, 
  Monitor
};

export const useIntegrationCategories = () => {
  const [categories, setCategories] = useState<IntegrationCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIntegrationData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('integration_categories')
          .select('*');
        
        if (categoriesError) throw new Error(categoriesError.message);
        
        // Fetch integrations
        const { data: integrationsData, error: integrationsError } = await supabase
          .from('integrations')
          .select('*');
          
        if (integrationsError) throw new Error(integrationsError.message);
        
        // Process the data
        const processedCategories = categoriesData.map((category: IntegrationCategoryDB) => {
          // Get all integrations for this category
          const categoryIntegrations = integrationsData
            .filter((integration: IntegrationDB) => integration.category_id === category.id)
            .map((integration: IntegrationDB) => ({
              id: integration.id,
              name: integration.name,
              description: integration.description,
              isAvailable: integration.is_available
            }));
            
          // Create icon component from string name
          const IconComponent = iconMapping[category.icon];
          
          return {
            id: category.id,
            title: category.title,
            description: category.description,
            icon: IconComponent ? <IconComponent className="h-5 w-5" /> : null,
            integrations: categoryIntegrations
          };
        });
        
        setCategories(processedCategories);
      } catch (err) {
        console.error("Failed to fetch integration data:", err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntegrationData();
  }, []);

  return {
    categories,
    isLoading,
    error
  };
};
