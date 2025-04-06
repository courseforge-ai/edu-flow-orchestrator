
import { useState, useMemo } from "react";
import { useIntegrationCategories } from "./useIntegrationCategories";

export const useIntegrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { categories, isLoading, error } = useIntegrationCategories();

  // Filter categories based on search query and active tab
  const filteredCategories = useMemo(() => {
    if (isLoading || !categories) {
      return [];
    }

    return categories.map(category => ({
      ...category,
      integrations: category.integrations.filter(integration => {
        const matchesSearch = 
          integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          category.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab === "available") {
          return matchesSearch && integration.isAvailable;
        } else if (activeTab === "coming-soon") {
          return matchesSearch && !integration.isAvailable;
        }
        
        return matchesSearch;
      })
    })).filter(category => category.integrations.length > 0);
  }, [categories, searchQuery, activeTab, isLoading]);

  // Count available and upcoming integrations
  const totalIntegrations = useMemo(() => {
    if (isLoading || !categories) return 0;
    return categories.reduce(
      (acc, category) => acc + category.integrations.length, 0
    );
  }, [categories, isLoading]);

  const availableCount = useMemo(() => {
    if (isLoading || !categories) return 0;
    return categories.reduce(
      (acc, category) => acc + category.integrations.filter(i => i.isAvailable).length, 0
    );
  }, [categories, isLoading]);
  
  const upcomingCount = useMemo(() => {
    if (isLoading || !categories) return 0;
    return categories.reduce(
      (acc, category) => acc + category.integrations.filter(i => !i.isAvailable).length, 0
    );
  }, [categories, isLoading]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredCategories,
    totalIntegrations,
    availableCount,
    upcomingCount,
    isLoading,
    error
  };
};
