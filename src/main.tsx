
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

// Create the React element tree
const app = (
  <React.StrictMode>
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
  </React.StrictMode>
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(app);
