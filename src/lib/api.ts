import { config } from "./config";

export const api = {
  async analyzeVideo(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(config.endpoints.video, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      return {
        result: data.result as "REAL" | "FAKE",
        confidence: parseFloat(data.confidence.toFixed(2)),
        video_url: data.video_url,
        filename: data.filename,
        frame_predictions: data.frame_predictions,
        faces_detected: data.faces_detected,
        total_frames: data.total_frames,
        frames_with_faces: data.frames_with_faces,
      };
    } catch (error) {
      console.error("Error analyzing video:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to analyze video",
      );
    }
  },

  async analyzeAudio(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(config.endpoints.audio, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      return {
        result: data.result as "REAL" | "FAKE",
        confidence: parseFloat(data.confidence.toFixed(2)),
        filename: data.filename,
        waveform_data: data.waveform_data,
        spectral_features: data.spectral_features,
        segments_analyzed: data.segments_analyzed,
      };
    } catch (error) {
      console.error("Error analyzing audio:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to analyze audio",
      );
    }
  },
};
