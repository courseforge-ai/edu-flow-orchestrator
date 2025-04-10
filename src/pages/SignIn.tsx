
import { SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const SignInPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">CourseForge</h1>
          <p className="mt-2 text-gray-600">Integration Platform for Education</p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignIn redirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
