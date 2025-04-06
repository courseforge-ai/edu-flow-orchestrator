
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkLoaded, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Workflows from "./pages/Workflows";
import Integrations from "./pages/Integrations";
import Users from "./pages/Users";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoaded>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/workflows" element={<RequireAuth><Workflows /></RequireAuth>} />
            <Route path="/integrations" element={<RequireAuth><Integrations /></RequireAuth>} />
            <Route path="/users" element={<RequireAuth><Users /></RequireAuth>} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
