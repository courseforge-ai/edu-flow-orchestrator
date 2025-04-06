
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Workflow, 
  Link as LinkIcon, 
  Users, 
  LogOut 
} from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent hover:text-accent-foreground"
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const { signOut } = useClerk();

  return (
    <div className="flex h-full flex-col">
      <div className="px-2 py-4">
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
      <div className="mt-auto p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
