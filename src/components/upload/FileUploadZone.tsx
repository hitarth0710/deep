import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileAudio, FileText, FileVideo, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileType = "video" | "audio" | "text";

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
      }
    });
    return accepted;
  }, [acceptedTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        onFileSelect(acceptedFiles[0]);
      }
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
      <div className="flex flex-col items-center text-center space-y-4">
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
            Select Video
          </Button>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Supported formats: MP4, WebM, QuickTime</p>
          <p>Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB</p>
        </div>
        {uploading && (
          <div className="w-full mt-4 space-y-2">
            <Progress value={progress} />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
