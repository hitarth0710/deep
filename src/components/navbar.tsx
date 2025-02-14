import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { DocumentationDialog } from "./dialogs/DocumentationDialog";
import { PricingDialog } from "./dialogs/PricingDialog";
import { ProfileDialog } from "./dialogs/ProfileDialog";

export default function Navbar() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-black z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#ff6b00] flex items-center justify-center">
            <span className="text-black font-bold">M</span>
          </div>
          <span className="font-bold text-[#ff6b00]">MaskOff</span>
        </Link>
        <div className="flex items-center gap-8">
          <Button
            variant="ghost"
            className="text-[#ff6b00] hover:text-[#ff6b00]/80 hover:bg-transparent"
            onClick={() => navigate("/docs")}
          >
            Documentation
          </Button>
          <Button
            variant="ghost"
            className="text-[#ff6b00] hover:text-[#ff6b00]/80 hover:bg-transparent"
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="text-[#ff6b00] hover:text-[#ff6b00]/80 hover:bg-transparent"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="text-[#ff6b00] hover:text-[#ff6b00]/80 hover:bg-transparent"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
          <Button
            variant="outline"
            className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
