import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Transform() {
  const [file, setFile] = useState<File | null>(null);
  const [transforming, setTransforming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [effect, setEffect] = useState("");

  const handleTransform = () => {
    if (!file || !effect) return;
    setTransforming(true);

    // Simulate transformation progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTransforming(false);
      }
    }, 200);
  };

  return (
    <div className="w-screen min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <Wand2 className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Transform Your Video</h1>
          <p className="text-muted-foreground mb-8">
            Apply stunning AI transformations to your video
          </p>

          <FileUploadZone
            acceptedTypes={["video"]}
            onFileSelect={setFile}
            uploading={transforming}
            progress={progress}
            className="mb-8"
          />

          {file && (
            <div className="space-y-4">
              <Select onValueChange={setEffect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transformation effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">Age Transformation</SelectItem>
                  <SelectItem value="style">Style Transfer</SelectItem>
                  <SelectItem value="emotion">Emotion Modification</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="lg"
                onClick={handleTransform}
                className="w-full md:w-auto"
                disabled={!effect || transforming}
              >
                Start Transformation
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
