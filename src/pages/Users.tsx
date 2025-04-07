
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

const Users = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="container mx-auto py-4">
          <div className="grid gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Users</h1>
              </div>
              
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
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage your organization users</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Add, edit, and remove users from your organization.</p>
                <p className="text-muted-foreground mt-2">Coming soon: Role-based permissions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
