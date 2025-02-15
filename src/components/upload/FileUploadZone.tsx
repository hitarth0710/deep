import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileAudio, FileText, FileVideo, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const loadingMessages = [
  "Analyzing... Our AI is Giving This a Side-Eye 🧐",
  "AI is Thinking... Just Like You Did Before Trusting That Video 🤔",
  "Deep Learning in Progress... Like Really Deep 🕵️‍♂️",
  "Teaching Robots to Spot Fakes... They're Quick Learners! 🤖",
  "Running Advanced Analysis... No Pressure! 🔍",
];

const subLoadingMessages = [
  "Checking pixel by pixel... trust issues are our specialty",
  "Training our AI to be more skeptical than your mom",
  "Making sure this content is as real as your excuses",
  "Analyzing harder than a detective with a magnifying glass",
  "Our AI is doing its homework, unlike some people we know",
];

type FileType = "video" | "audio" | "text" | "image";

interface FilePreview {
  url: string;
  type: "video" | "image";
}

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: FileType[];
  maxSize?: number;
  className?: string;
  uploading?: boolean;
  progress?: number;
}

export function FileUploadZone({
  onFileSelect,
  acceptedTypes = ["video"],
  maxSize = 100 * 1024 * 1024, // 100MB default
  className,
  uploading = false,
  progress = 0,
}: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [preview, setPreview] = useState<FilePreview | null>(null);

  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [uploading]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview]);

  const getLoadingMessage = () => loadingMessages[messageIndex];
  const getSubLoadingMessage = () => subLoadingMessages[messageIndex];

  const getAcceptedFiles = useCallback(() => {
    const accepted: Record<string, string[]> = {};
    acceptedTypes.forEach((type) => {
      switch (type) {
        case "video":
          accepted["video/*"] = [];
          break;
        case "audio":
          accepted["audio/*"] = [];
          break;
        case "text":
          accepted["text/*"] = [".txt", ".doc", ".docx", ".pdf"];
          break;
        case "image":
          accepted["image/*"] = [];
          break;
      }
    });
    return accepted;
  }, [acceptedTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        const file = acceptedFiles[0];
        onFileSelect(file);

        // Create preview URL
        const url = URL.createObjectURL(file);
        if (file.type.startsWith("video/")) {
          setPreview({ url, type: "video" });
        } else if (file.type.startsWith("image/")) {
          setPreview({ url, type: "image" });
        }
      }
    },
    onDropRejected: () => {
      setPreview(null);
    },
    accept: getAcceptedFiles(),
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "p-8 border-2 border-dashed rounded-lg transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border",
        className,
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-center space-y-4 relative z-10">
        {preview && (
          <div className="relative w-full max-w-2xl mx-auto mb-8 group">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff9d00] blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#ff6b00] shadow-2xl shadow-[#ff6b00]/20 bg-black/50 backdrop-blur-sm"
            >
              {preview.type === "video" ? (
                <video
                  src={preview.url}
                  className="w-full h-full object-contain"
                  controls
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={preview.url}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-[#ff6b00]/30 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50" />
            </motion.div>
          </div>
        )}
        <Upload className="h-6 w-6 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-lg font-medium">
            {isDragActive
              ? "Drop it like it's hot! 🔥"
              : acceptedTypes.includes("video")
                ? "Drop Your Video Here... Unless You're Afraid of the Truth! 🕵️‍♂️"
                : acceptedTypes.includes("audio")
                  ? "AI Detective at Your Service – Sherlock.exe Activated! 🎯"
                  : "If It's Real, You're Safe. If It's Fake, We'll Expose It! 🎭"}
          </p>
          <p className="text-sm text-muted-foreground">or</p>
          <Button variant="outline" size="sm">
            {acceptedTypes.includes("video")
              ? "Select Video"
              : acceptedTypes.includes("image")
                ? "Select Image"
                : acceptedTypes.includes("audio")
                  ? "Select Audio"
                  : "Select File"}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            Supported formats:{" "}
            {acceptedTypes.includes("video")
              ? "MP4, WebM, QuickTime"
              : acceptedTypes.includes("image")
                ? "JPG, PNG, GIF"
                : acceptedTypes.includes("audio")
                  ? "MP3, WAV, OGG"
                  : "All Files"}
          </p>
          <p>Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB</p>
        </div>
        {uploading && (
          <div className="w-full mt-4 space-y-2">
            <Progress value={progress} />
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-[#ff6b00]">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{getLoadingMessage()}</span>
              </div>
              <p className="text-xs text-[#ff6b00]/70 italic">
                {getSubLoadingMessage()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
