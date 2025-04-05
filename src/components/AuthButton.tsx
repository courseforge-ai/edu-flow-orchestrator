
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { isSignedIn } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  if (isSignedIn) {
    return (
      <Button 
        variant="outline" 
        onClick={() => signOut(() => navigate("/"))}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => navigate("/sign-in")}
    >
      Sign In
    </Button>
  );
}
