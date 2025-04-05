
export const CLERK_PUBLISHABLE_KEY = "pk_test_d2VhbHRoeS1jcm93LTg3LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
