import { Menu } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const isMobile = useIsMobile();

  // Define the main navigation links.
  const navLinks = (
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

  // Define the authentication buttons.
  const authLinks = isSignedIn ? (
    <Button asChild>
      <Link to="/dashboard">Dashboard</Link>
    </Button>
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
        <div className="flex items-center gap-2">
          {/* On mobile, show the hamburger that opens the menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] p-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks}
                  <div className="pt-4 border-t">
                    {isSignedIn ? (
                      <Button asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link to="/sign-in">Sign In</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/sign-up">Get Started Free</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          {/* Brand/logo link */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            {/* Optionally, insert an icon (e.g. an Anvil) here */}
            CourseForge
          </Link>
        </div>
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
      </div>
    </header>
  );
}