import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-black backdrop-blur-sm text-[#ff6b00] py-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-24">
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
              onClick={() => navigate("/video-detection")}
            >
              VIDEO DETECTION
            </Button>
            <Button
              variant="link"
              className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
              onClick={() => navigate("/image-detection")}
            >
              IMAGE DETECTION
            </Button>
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">CONTACT US</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>mask.off@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
                GCET, Vallabh Vidyanagar,
                <br />
                Anand, Gujarat, India-388120
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
