
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PageTitle } from "@/components/PageTitle";

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
    <div className="min-h-screen">
      <main className="container mx-auto py-6 px-4">
        <PageTitle title="Dashboard" icon={LayoutDashboard}>
          {/* Mobile sidebar trigger */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[240px] sm:w-[300px]">
                <SidebarProvider>
                  <Sidebar />
                </SidebarProvider>
              </SheetContent>
            </Sheet>
          )}
        </PageTitle>
        
        <div className="grid gap-6">
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
      </main>
    </div>
  );
};

export default Dashboard;
