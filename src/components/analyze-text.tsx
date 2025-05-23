import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import Navbar from "./navbar";
import Footer from "./footer";

export default function AnalyzeText() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);

    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAnalyzing(false);
      }
    }, 500);
  };

  return (
    <div className="w-screen min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Text Analysis</h1>
          <p className="text-muted-foreground mb-8">
            Check text content for AI generation and plagiarism
          </p>

          <FileUploadZone
            acceptedTypes={["text"]}
            onFileSelect={setFile}
            uploading={analyzing}
            progress={progress}
            maxSize={10 * 1024 * 1024} // 10MB for text files
          />

          {file && !analyzing && (
            <Button
              size="lg"
              onClick={handleAnalyze}
              className="w-full md:w-auto mt-8"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Start Analysis"
              )}
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
