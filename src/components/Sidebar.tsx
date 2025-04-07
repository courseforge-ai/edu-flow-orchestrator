
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Workflow, 
  Link as LinkIcon, 
  Users, 
  LogOut,
  Settings,
  ChevronRight
} from "lucide-react";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DarkModeToggle } from "./DarkModeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 transition-colors",
          // Make touch targets larger on mobile
          isMobile ? "py-3" : "py-2",
          "text-sm",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent hover:text-accent-foreground active:bg-accent/80"
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {isMobile && <ChevronRight className="h-4 w-4 ml-auto opacity-70" />}
    </NavLink>
  );
}

export function Sidebar() {
  const { signOut } = useClerk();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-full flex-col">
      <div className={cn("px-2", isMobile ? "py-6" : "py-4")}>
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          CourseForge
        </h2>
        <div className="space-y-1">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/workflows" icon={Workflow} label="Workflows" />
          <NavItem to="/integrations" icon={LinkIcon} label="Integrations" />
          <NavItem to="/users" icon={Users} label="Users" />
        </div>
      </div>
      <Separator />
      <div className="mt-auto p-4 space-y-2">
        <div className="space-y-1 mb-4">
          <NavItem to="/admin" icon={Settings} label="Super Admin" />
        </div>
        <Separator />
        <div className={cn("flex items-center gap-2 px-3", isMobile ? "py-3" : "py-2")}>
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm">Account</span>
        </div>
        <DarkModeToggle />
        <Button 
          variant="outline" 
          className={cn(
            "w-full justify-start",
            isMobile && "py-6" // Larger touch target for mobile
          )}
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
