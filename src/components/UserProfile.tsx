
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>Welcome, {user.firstName || user.emailAddresses[0].emailAddress}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">You're signed in with {user.primaryEmailAddress?.emailAddress}</p>
      </CardContent>
    </Card>
  );
}
