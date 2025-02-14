import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileAudio, Image } from "lucide-react";
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
      title: "Video Analysis",
      description: "Detect deepfakes with our advanced AI technology",
      icon: Shield,
      path: "/video-detection",
      color: "bg-blue-500/10",
      textColor: "text-blue-500",
      acceptedTypes: ["video"],
    },
    {
      title: "Audio Analysis",
      description: "Detect AI-generated voices and audio deepfakes",
      icon: FileAudio,
      path: "/audio-detection",
      color: "bg-green-500/10",
      textColor: "text-green-500",
      acceptedTypes: ["audio"],
    },
    {
      title: "Image Detection",
      description: "Identify manipulated and AI-generated images",
      icon: Image,
      path: "/image-detection",
      color: "bg-purple-500/10",
      textColor: "text-purple-500",
      acceptedTypes: ["image"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your content analysis and access our AI tools
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => {
                  navigate(feature.path);
                }}
              >
                <div
                  className={`${feature.color} ${feature.textColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Button className="w-full group">Get Started</Button>
              </Card>
            ))}
          </div>

          {/* Display uploaded audio files */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.entries(uploadedFiles).map(([type, file]) =>
              type === "audio" ? (
                <Card key={type} className="p-6">
                  <div className="rounded-lg bg-muted mb-4 flex items-center justify-center p-4">
                    <audio
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-full"
                    />
                  </div>
                  <div className="font-medium mb-2">{file.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </Card>
              ) : null,
            )}
          </div>

          {/* Upload Dialog */}
          {selectedFeature && (
            <UploadDialog
              open={uploadDialogOpen}
              onOpenChange={setUploadDialogOpen}
              title={`Upload ${selectedFeature.title}`}
              description={selectedFeature.description}
              acceptedTypes={selectedFeature.acceptedTypes}
              onFileSelect={(file) => {
                setUploadedFiles((prev) => ({
                  ...prev,
                  [selectedFeature.acceptedTypes[0]]: file,
                }));
              }}
            />
          )}

          {/* Recent Activity Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="text-muted-foreground text-center py-8">
              No recent activity to show.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
