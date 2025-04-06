
import { useState, useMemo } from "react";
import { integrationCategories } from "./data";

export const useIntegrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter categories based on search query and active tab
  const filteredCategories = useMemo(() => {
    return integrationCategories.map(category => ({
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
  }, [searchQuery, activeTab]);

  // Count available and upcoming integrations
  const totalIntegrations = useMemo(() => {
    return integrationCategories.reduce(
      (acc, category) => acc + category.integrations.length, 0
    );
  }, []);

  const availableCount = useMemo(() => {
    return integrationCategories.reduce(
      (acc, category) => acc + category.integrations.filter(i => i.isAvailable).length, 0
    );
  }, []);
  
  const upcomingCount = useMemo(() => {
    return integrationCategories.reduce(
      (acc, category) => acc + category.integrations.filter(i => !i.isAvailable).length, 0
    );
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredCategories,
    totalIntegrations,
    availableCount,
    upcomingCount
  };
};
