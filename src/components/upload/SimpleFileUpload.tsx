import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface SimpleFileUploadProps {
  onFileSelect?: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

export function SimpleFileUpload({
  onFileSelect = () => {},
  acceptedTypes = ["*/*"],
  maxSize = 50 * 1024 * 1024, // 50MB default
}: SimpleFileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > maxSize) {
        alert(
          `File size must be less than ${Math.floor(maxSize / (1024 * 1024))}MB`,
        );
        return;
      }
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > maxSize) {
        alert(
          `File size must be less than ${Math.floor(maxSize / (1024 * 1024))}MB`,
        );
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 transition-colors"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center text-center">
        <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">
          {dragActive ? "Drop your file here" : "Drag & drop your file here"}
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
        <Button variant="outline" asChild>
          <label className="cursor-pointer">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept={acceptedTypes.join(",")}
              onChange={handleChange}
            />
          </label>
        </Button>
      </div>
    </div>
  );
}
