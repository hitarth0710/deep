import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/lib/use-toast";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access this feature",
        variant: "default",
      });
      navigate("/sign-in");
      return;
    }
  };

  return <div onClick={handleAction}>{children}</div>;
}
