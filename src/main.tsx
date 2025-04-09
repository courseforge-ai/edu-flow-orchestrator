
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { VITE_CLERK_PUBLISHABLE_KEY } from "./lib/clerk";

const queryClient = new QueryClient();

// Error boundary for catching rendering errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            <pre className="bg-muted p-4 rounded text-xs overflow-auto mb-4 max-h-[200px]">
              {this.state.error?.toString() || "Unknown error"}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create the React element tree
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <App />
              <Toaster />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(app);
