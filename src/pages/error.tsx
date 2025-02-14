import React from "react";
import ErrorDisplay from "@/components/error/ErrorDisplay";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ErrorDisplay />
    </div>
  );
};

export default ErrorPage;
