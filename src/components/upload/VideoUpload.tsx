import { useState } from "react";
import { FileUploadZone } from "./FileUploadZone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  isProcessing?: boolean;
  progress?: number;
}

export function VideoUpload({
  onVideoSelect,
  isProcessing = false,
  progress = 0,
}: VideoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onVideoSelect(file);
  };

  return (
    <div className="space-y-4">
      <FileUploadZone
        acceptedTypes={["video"]}
        onFileSelect={handleFileSelect}
        uploading={isProcessing}
        progress={progress}
      />

      {isProcessing && (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing video...</span>
        </div>
      )}
    </div>
  );
}
