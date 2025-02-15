import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileAudio, Image, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import Navbar from "./navbar";
import Footer from "./footer";
import { useAuth } from "@/contexts/AuthContext";
import { UploadDialog } from "./dialogs/UploadDialog";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<
    (typeof features)[0] | null
  >(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const features = [
    {
      title: "Video Detection",
      description: "Detect deepfakes with our advanced AI technology",
      icon: Video,
      path: "/video-detection",
      color: "bg-[#ff6b00]/10",
      textColor: "text-[#ff6b00]",
      acceptedTypes: ["video"],
    },
    {
      title: "Image Detection",
      description: "Identify manipulated and AI-generated images",
      icon: Image,
      path: "/image-detection",
      color: "bg-[#ff6b00]/10",
      textColor: "text-[#ff6b00]",
      acceptedTypes: ["image"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-[#ff6b00]">
            Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your content analysis and access our AI tools
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden border-[#ff6b00] hover:bg-[#ff6b00]/5"
                onClick={() => {
                  navigate(feature.path);
                }}
              >
                <div className="relative z-10">
                  <div
                    className={`${feature.color} ${feature.textColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-[#ff6b00]">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button className="w-full group bg-[#ff6b00] hover:bg-[#ff6b00]/90">
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
