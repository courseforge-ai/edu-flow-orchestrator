
import { useState } from "react";
import { useOrganizationList } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrganizationCreateDialog } from "./OrganizationCreateDialog";

export const OrganizationsTab = () => {
  const { userMemberships, isLoaded } = useOrganizationList();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading organizations...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Organization Management</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Manage organizations and their settings
      </p>
      
      <div className="flex justify-end mb-6">
        <Button onClick={() => setDialogOpen(true)}>Create New Organization</Button>
        <OrganizationCreateDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
      
      {userMemberships.data.length > 0 ? (
        <div className="grid gap-4">
          {userMemberships.data.map((membership) => (
            <Card key={membership.organization.id}>
              <CardHeader>
                <CardTitle>{membership.organization.name}</CardTitle>
                <CardDescription>
                  Slug: {membership.organization.slug || "No slug defined"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Your Role</p>
                    <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                      {membership.role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Manage Members
                    </Button>
                    <Button variant="outline" size="sm">
                      Settings
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Created</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(membership.organization.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Members</p>
                    <p className="text-sm text-muted-foreground">
                      {membership.organization.membersCount || "Loading..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Organizations</CardTitle>
            <CardDescription>
              You haven't created any organizations yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organizations allow you to manage access to resources and collaborate with team members.
              Create your first organization to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
