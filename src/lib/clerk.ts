export const CLERK_PUBLISHABLE_KEY = "pk_test_c3VtbWFyeS1waWctMzQuY2xlcmsuYWNjb3VudHMuZGV2JA";
export const CLERK_INTEGRATION_URL = "https://summary-pig-34.clerk.accounts.dev";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
