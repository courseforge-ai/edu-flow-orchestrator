export const VITE_CLERK_PUBLISHABLE_KEY = "pk_test_c3VtbWFyeS1waWctMzQuY2xlcmsuYWNjb3VudHMuZGV2JA";
export const VITE_CLERK_INTEGRATION_URL = "https://summary-pig-34.clerk.accounts.dev";

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
