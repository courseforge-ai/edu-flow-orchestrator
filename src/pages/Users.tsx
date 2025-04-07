
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { PageTitle } from "@/components/PageTitle";

const Users = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto py-6 px-4">
      <PageTitle title="Users" icon={UsersIcon}>
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
  );
};

export default Users;
