
import { Anvil, Menu } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkModeToggle";
import { UserButton } from "@clerk/clerk-react";

export function Navbar() {
  const { isSignedIn, signOut } = useAuth();
  const isMobile = useIsMobile();

  // Define the navigation links based on authentication status
  const navLinks = isSignedIn ? (
    <>
      <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
        Dashboard
      </Link>
      <Link to="/workflows" className="text-sm font-medium hover:text-primary">
        Workflows
      </Link>
      <Link to="/integrations" className="text-sm font-medium hover:text-primary">
        Integrations
      </Link>
      <Link to="/users" className="text-sm font-medium hover:text-primary">
        Users
      </Link>
      <Link to="/admin" className="text-sm font-medium hover:text-primary">
        Super Admin
      </Link>
    </>
  ) : (
    <>
      <Link to="/#features" className="text-sm font-medium hover:text-primary">
        Features
      </Link>
      <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary">
        How It Works
      </Link>
      <Link to="/#pricing" className="text-sm font-medium hover:text-primary">
        Pricing
      </Link>
      <Link to="/#testimonials" className="text-sm font-medium hover:text-primary">
        Testimonials
      </Link>
      <Link to="/#contact" className="text-sm font-medium hover:text-primary">
        Contact
      </Link>
    </>
  );

  // Define the authentication buttons/user menu
  const authLinks = isSignedIn ? (
    <div className="flex items-center gap-3">
      <UserButton afterSignOutUrl="/" />
      <DarkModeToggle />
      <Button variant="outline" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  ) : (
    <>
      <Button asChild variant="outline" className="hidden sm:flex">
        <Link to="/sign-in">Sign In</Link>
      </Button>
      <Button asChild>
        <Link to="/sign-up">Get Started Free</Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand/logo link */}
        <Link to={isSignedIn ? "/dashboard" : "/"} className="flex items-center gap-2 text-xl font-bold">
          <Anvil className="h-6 w-6" />
          CourseForge
        </Link>
        
        {/* Desktop nav: display links and auth buttons inline */}
        {!isMobile && (
          <>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks}
            </nav>
            <div className="flex items-center gap-4">
              {authLinks}
            </div>
          </>
        )}
        
        {/* Moved hamburger menu to the right side */}
        {isMobile && (
          <div className="flex items-center gap-2">
            {isSignedIn && (
              <UserButton afterSignOutUrl="/" />
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] p-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks}
                  <div className="pt-4 border-t">
                    {isSignedIn ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <UserButton afterSignOutUrl="/" />
                          <span>Account</span>
                        </div>
                        <DarkModeToggle />
                        <Button 
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full mb-2">
                          <Link to="/sign-in">Sign In</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link to="/sign-up">Get Started Free</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </header>
  );
}
