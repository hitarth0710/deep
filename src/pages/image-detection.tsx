import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import Navbar from "@/components/navbar";
import { BackButton } from "@/components/ui/back-button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/lib/use-toast";
import { useNavigate } from "react-router-dom";

export default function ImageDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    result?: "REAL" | "FAKE";
    confidence?: number;
  }>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
    multiple: false,
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to analyze images",
        variant: "default",
      });
      navigate("/sign-in");
      return;
    }
    if (!file) return;

    try {
      setAnalyzing(true);
      setProgress(0);
      setResult(null);

      // Send to backend
      const response = await api.analyzeImage(file);
      setResult(response);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container max-w-3xl pt-32 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Image Deepfake Detection</h1>
          <p className="text-muted-foreground">
            Upload an image to analyze it for potential AI manipulation
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card className="p-8">
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-12
                flex flex-col items-center justify-center
                cursor-pointer transition-colors
                ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200"}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-1">
                {file ? file.name : "Drag & drop your image here"}
              </p>
              <p className="text-gray-500 mb-4">or</p>
              <Button variant="outline" className="mb-4">
                Select Image
              </Button>
              <div className="text-center text-sm text-gray-500">
                <p>Supported formats: PNG, JPG, JPEG, WebP</p>
                <p>Maximum file size: 20MB</p>
              </div>
            </div>

            {file && !analyzing && !result && (
              <div className="mt-6 flex justify-center">
                <Button onClick={handleAnalyze} size="lg">
                  Start Analysis
                </Button>
              </div>
            )}
          </Card>

          {/* Analysis Progress */}
          {analyzing && (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Analyzing Image</h3>
                <Progress value={progress} />
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing... {progress}%
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          {result && (
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Analysis Results</h3>
                  <Badge
                    variant={
                      result.result === "FAKE" ? "destructive" : "default"
                    }
                    className="text-sm"
                  >
                    {result.result === "FAKE" ? (
                      <>
                        <AlertCircle className="w-4 h-4 mr-1" />
                        AI Generated Image
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Natural Image
                      </>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Confidence Score
                    </span>
                    <span>{result.confidence?.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={result.confidence}
                    className={
                      result.result === "FAKE" ? "bg-destructive/20" : ""
                    }
                    indicatorClassName={
                      result.result === "FAKE" ? "bg-destructive" : ""
                    }
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
