
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
