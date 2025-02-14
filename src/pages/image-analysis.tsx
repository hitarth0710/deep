import { useState } from "react";
import { Layout } from "@/components/layout";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Loader2 } from "lucide-react";

export default function ImageAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <Layout>
      <div className="container max-w-4xl pt-32 pb-20">
        <div className="text-center mb-12">
          <Image className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Image Analysis</h1>
          <p className="text-muted-foreground">
            Upload an image to detect AI-generated or manipulated content
          </p>
        </div>

        <Card className="p-8">
          <FileUploadZone
            acceptedTypes={["image"]}
            onFileSelect={setFile}
            uploading={analyzing}
            progress={progress}
            maxSize={20 * 1024 * 1024} // 20MB
          />

          {file && !analyzing && (
            <div className="mt-6 text-center">
              <Button
                size="lg"
                onClick={handleAnalyze}
                className="min-w-[200px]"
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
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
