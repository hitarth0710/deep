import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-20 left-4 md:left-8"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
