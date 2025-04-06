
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";

const Users = () => {
  return (
    <div className="container mx-auto py-4">
      <div className="grid gap-8">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Users</h1>
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
  );
};

export default Users;
