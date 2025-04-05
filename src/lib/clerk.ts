
export const CLERK_PUBLISHABLE_KEY = "pk_test_c3VtbWFyeS1waWctMzQuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
