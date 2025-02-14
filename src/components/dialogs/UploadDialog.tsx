import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  acceptedTypes: ("video" | "audio" | "image")[];
  onFileSelect: (file: File) => void;
}

export function UploadDialog({
  open,
  onOpenChange,
  title,
  description,
  acceptedTypes,
  onFileSelect,
}: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<{
    result: "REAL" | "FAKE" | null;
    confidence: number;
  }>({ result: null, confidence: 0 });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    // Simulate analysis
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setAnalysisResult({
            result: Math.random() > 0.5 ? "FAKE" : "REAL",
            confidence: 85,
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    if (acceptedTypes[0] === "audio" || acceptedTypes[0] === "image") {
      onFileSelect(selectedFile);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-md",
          acceptedTypes[0] === "video" && "sm:max-w-[900px]",
        )}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
            <DialogClose className="h-6 w-6 rounded-md border border-input hover:bg-accent hover:text-accent-foreground">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* For audio and image, show only upload box */}
          {(acceptedTypes[0] === "audio" || acceptedTypes[0] === "image") && (
            <FileUploadZone
              acceptedTypes={acceptedTypes}
              onFileSelect={handleFileSelect}
              maxSize={50 * 1024 * 1024}
            />
          )}

          {/* For video, show split view with analysis */}
          {acceptedTypes[0] === "video" && (
            <div>
              {!file ? (
                <FileUploadZone
                  acceptedTypes={acceptedTypes}
                  onFileSelect={handleFileSelect}
                  maxSize={50 * 1024 * 1024}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left side - Video Preview */}
                  <Card className="p-4">
                    <div className="aspect-video rounded-lg bg-muted mb-4 flex items-center justify-center overflow-hidden">
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  </Card>

                  {/* Right side - Analysis Results */}
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Analysis Results
                        </h3>
                        {analysisResult.result && (
                          <Badge
                            variant={
                              analysisResult.result === "FAKE"
                                ? "destructive"
                                : "default"
                            }
                            className="mb-4"
                          >
                            {analysisResult.result === "FAKE" ? (
                              <>
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Likely Deepfake
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Likely Authentic
                              </>
                            )}
                          </Badge>
                        )}
                      </div>

                      {!analysisResult.result && !uploading && (
                        <Button
                          onClick={handleUpload}
                          className="w-full"
                          disabled={uploading}
                        >
                          Start Analysis
                        </Button>
                      )}

                      {uploading && (
                        <div className="space-y-2">
                          <Progress value={progress} />
                          <div className="text-sm text-center text-muted-foreground">
                            Processing... {progress}%
                          </div>
                        </div>
                      )}

                      {analysisResult.result && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Confidence Score
                            </span>
                            <span>{analysisResult.confidence}%</span>
                          </div>
                          <Progress
                            value={analysisResult.confidence}
                            className={cn(
                              "h-2",
                              analysisResult.result === "FAKE"
                                ? "bg-destructive/20"
                                : "bg-primary/20",
                            )}
                            indicatorClassName={
                              analysisResult.result === "FAKE"
                                ? "bg-destructive"
                                : "bg-primary"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
