
export const VITE_CLERK_PUBLISHABLE_KEY = "pk_test_d2VhbHRoeS1jcm93LTg3LmNsZXJrLmFjY291bnRzLmRldiQ";
export const VITE_CLERK_INTEGRATION_URL = "https://wealthy-crow-87.clerk.accounts.dev";

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
