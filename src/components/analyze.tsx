import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import { VideoUpload } from "./upload/VideoUpload";
import { ProcessingSteps } from "./analysis/ProcessingSteps";
import { VideoAnalysisResult } from "./analysis/VideoAnalysisResult";
import { videoAnalyzer } from "@/lib/ai/video-analysis";
import Navbar from "./navbar";
import Footer from "./footer";

type ProcessingStep = {
  label: string;
  status: "pending" | "processing" | "completed" | "error";
  progress?: number;
};

export default function Analyze() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { label: "Upload Video", status: "pending" },
    { label: "Extract Frames", status: "pending" },
    { label: "Detect Faces", status: "pending" },
    { label: "Analyze Frames", status: "pending" },
    { label: "Generate Results", status: "pending" },
  ]);

  const updateStep = (
    index: number,
    status: ProcessingStep["status"],
    progress?: number,
  ) => {
    setSteps((steps) =>
      steps.map((step, i) =>
        i === index ? { ...step, status, progress } : step,
      ),
    );
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setAnalyzing(true);
      setProgress(0);

      // Update upload step
      updateStep(0, "completed");

      // Start frame extraction
      updateStep(1, "processing");

      const analysisResult = await videoAnalyzer.analyzeVideo(
        file,
        (stage, progress) => {
          switch (stage) {
            case "extract_frames":
              updateStep(1, "processing", progress);
              break;
            case "detect_faces":
              updateStep(1, "completed");
              updateStep(2, "processing", progress);
              break;
            case "analyze":
              updateStep(2, "completed");
              updateStep(3, "processing", progress);
              break;
          }
          setProgress(progress);
        },
      );

      // Complete all steps
      updateStep(3, "completed");
      updateStep(4, "completed");

      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Mark current step as error
      const currentStep = steps.findIndex(
        (step) => step.status === "processing",
      );
      if (currentStep !== -1) {
        updateStep(currentStep, "error");
      }
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <main className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="mt-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Analyze Video</h1>
            <p className="text-muted-foreground">
              Upload a video to detect potential deepfakes
            </p>
          </div>

          <VideoUpload
            onVideoSelect={setFile}
            isProcessing={analyzing}
            progress={progress}
          />

          {analyzing && (
            <div className="mt-8">
              <ProcessingSteps steps={steps} />
            </div>
          )}

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

          {result && <VideoAnalysisResult result={result} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
