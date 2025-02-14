import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import UploadSection from "./UploadSection";
import AnalysisSection from "./AnalysisSection";
import { FramesDisplay } from "./FramesDisplay";
import { Card } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

export function VideoAnalysis() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    result?: "REAL" | "FAKE";
    confidence?: number;
    video_url?: string;
    filename?: string;
    frames?: string[];
    faceFrames?: string[];
    frame_predictions?: Array<[boolean, number]>;
    faces_detected?: boolean[];
    total_frames?: number;
    frames_with_faces?: number;
  }>({});

  const handleFileSelect = (file: File) => {
    setSelectedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleStartAnalysis = async () => {
    if (!selectedVideo) return;

    try {
      setIsAnalyzing(true);

      // Call the API to analyze the video
      const results = await api.analyzeVideo(selectedVideo);
      setAnalysisResults(results);
    } catch (error) {
      console.error("Error analyzing video:", error);
      alert(error instanceof Error ? error.message : "Failed to analyze video");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Video Deepfake Detection
          </h1>
          <p className="text-gray-600">
            Upload a video to analyze it for potential deepfake manipulation
          </p>
        </div>

        <UploadSection onFileSelect={handleFileSelect} />

        {videoUrl && (
          <div className="space-y-6">
            {!analysisResults.result && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full md:w-auto"
                >
                  {isAnalyzing ? (
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

            {isAnalyzing && (
              <div className="space-y-6">
                {analysisResults.frames && (
                  <FramesDisplay
                    frames={analysisResults.frames}
                    title="Frames Split"
                  />
                )}
                {analysisResults.faceFrames && (
                  <FramesDisplay
                    frames={analysisResults.faceFrames}
                    title="Face Cropped Frames"
                  />
                )}
              </div>
            )}

            {analysisResults.result && (
              <div className="space-y-6">
                <AnalysisSection
                  videoUrl={videoUrl}
                  isAnalyzing={false}
                  confidenceScore={analysisResults.confidence}
                  detectionResult={
                    analysisResults.result?.toLowerCase() as "real" | "fake"
                  }
                />

                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
                    <span>Result: </span>
                    <span
                      className={
                        analysisResults.result === "REAL"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {analysisResults.result}
                    </span>
                    {analysisResults.result === "REAL" && (
                      <ThumbsUp className="h-8 w-8 text-green-600" />
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
