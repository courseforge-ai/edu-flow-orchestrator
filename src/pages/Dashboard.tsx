
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const isMobile = useIsMobile();

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Redirect to sign in if not signed in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="hidden md:flex w-64 flex-col border-r bg-background">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 p-4">
          <div className="container mx-auto py-4">
            <div className="grid gap-8">
              <UserProfile />

              <Card>
                <CardHeader>
                  <CardTitle>Integration Platform</CardTitle>
                  <CardDescription>Connect your educational tools and automate workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Welcome to CourseForge! You'll soon be able to create integrations between your favorite educational platforms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
