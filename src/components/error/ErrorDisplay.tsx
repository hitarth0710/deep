import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ErrorDisplayProps = {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
};

const ErrorDisplay = ({
  title = "An error occurred",
  message = "We're sorry, but something went wrong. Please try again later.",
  showRetry = true,
  showHome = true,
  onRetry = () => {},
}: ErrorDisplayProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-background p-4">
      <Card className="w-full max-w-[600px] p-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-destructive" />

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {showRetry && (
              <Button variant="default" onClick={onRetry}>
                Try Again
              </Button>
            )}
            {showHome && (
              <Button variant="outline" onClick={() => navigate("/")}>
                Return Home
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ErrorDisplay;
