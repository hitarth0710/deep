interface FrameAnalysisResult {
  isFake: boolean;
  confidence: number;
  timestamp: number;
}

interface VideoAnalysisResult {
  overall: {
    isFake: boolean;
    confidence: number;
  };
  frames: FrameAnalysisResult[];
}

export class VideoAnalyzer {
  private API_URL = "http://127.0.0.1:8000";

  constructor() {
    // Initialize any required resources
  }

  private async checkModelStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/status`);
      return response.ok;
    } catch {
      return false;
    }
  }

  private async sendVideoForAnalysis(
    file: File,
    onProgress?: (stage: string, progress: number) => void,
  ): Promise<VideoAnalysisResult> {
    // Validate file type
    if (!file.type.startsWith("video/")) {
      throw new Error("Please upload a video file");
    }

    // Check if model is ready
    const isModelReady = await this.checkModelStatus();
    if (!isModelReady) {
      throw new Error("Model server is not ready");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.API_URL}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Analysis failed");
    }

    // Start progress simulation for different stages
    let progress = 0;
    const updateProgress = setInterval(() => {
      progress += 2;
      if (progress <= 30) {
        onProgress?.("extract_frames", progress * 3.33);
      } else if (progress <= 60) {
        onProgress?.("detect_faces", (progress - 30) * 3.33);
      } else if (progress <= 90) {
        onProgress?.("analyze", (progress - 60) * 3.33);
      } else {
        clearInterval(updateProgress);
      }
    }, 100);

    const result = await response.json();
    clearInterval(updateProgress);
    return result;
  }

  public async analyzeVideo(
    file: File,
    onProgress?: (stage: string, progress: number) => void,
  ): Promise<VideoAnalysisResult> {
    if (!file) {
      throw new Error("No file provided");
    }

    try {
      return await this.sendVideoForAnalysis(file, onProgress);
    } catch (error) {
      console.error("Video analysis failed:", error);
      throw error;
    }
  }
}

// Create singleton instance
export const videoAnalyzer = new VideoAnalyzer();
