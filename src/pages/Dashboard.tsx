
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="hidden md:flex w-64 flex-col border-r bg-background">
            <SidebarProvider>
              <Sidebar />
            </SidebarProvider>
          </aside>
        )}
        <main className="flex-1 overflow-auto pb-16 md:pb-4 w-full">
          <div className="container mx-auto py-4 px-4 md:px-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-6 w-6" />
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                
                {/* Add mobile sidebar trigger */}
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
              </div>
              
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
