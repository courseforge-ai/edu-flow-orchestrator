
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            ) : null
          ) : null}
          <Link to="/" className="text-xl font-bold">CourseForge</Link>
        </div>
      </div>
    </header>
  );
}
