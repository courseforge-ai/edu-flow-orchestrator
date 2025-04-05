
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12 flex justify-between items-center">
          <h1 className="text-3xl font-bold">CourseForge</h1>
          <div className="flex gap-4">
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
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </header>

        <main className="py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect Your Educational Tools
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              CourseForge seamlessly integrates your favorite educational platforms, 
              automating workflows and enhancing the learning experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {isSignedIn ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-center mb-8">Supported Integrations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {["Canvas", "Blackboard", "Moodle", "Google Classroom", "Slack", "Microsoft Teams", "Zoom", "Google Calendar", 
                "Kahoot", "Stripe", "Google Drive", "Notion"].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg shadow-sm border">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
