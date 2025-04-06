
import { useMemo } from "react";
import { integrationCategories } from "./data";

export const useIntegrationCategories = () => {
  // For now, just return the static data
  // In a real app, this might fetch from an API
  const categories = useMemo(() => {
    return integrationCategories;
  }, []);

  return {
    categories,
    isLoading: false
  };
};
