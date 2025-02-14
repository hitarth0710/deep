import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-black backdrop-blur-sm text-[#ff6b00] py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <div className="text-2xl font-bold">MaskOff</div>
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Advanced deepfake detection platform helping organizations verify
            content authenticity.
          </p>
          <div className="space-y-2">
            <Button
              variant="link"
              className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
              onClick={() => navigate("/terms")}
            >
              TERMS OF SERVICE
            </Button>
            <Button
              variant="link"
              className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
              onClick={() => navigate("/privacy")}
            >
              PRIVACY POLICY
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">FEATURES</h3>
          <div className="space-y-2">
            <Button
              variant="link"
              className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
              onClick={() => navigate("/analyze")}
            >
              VIDEO DETECTION
            </Button>
            <Button
              variant="link"
              className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
              onClick={() => navigate("/analyze-audio")}
            >
              AUDIO ANALYSIS
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
