import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";

interface UploadSectionProps {
  onFileSelect?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const UploadSection = ({
  onFileSelect = () => {},
  acceptedFileTypes = ["video/mp4", "video/webm", "video/quicktime"],
  maxFileSize = 100 * 1024 * 1024, // 100MB
}: UploadSectionProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Validate file size
        if (file.size > maxFileSize) {
          alert(
            `File size must be less than ${Math.floor(maxFileSize / (1024 * 1024))}MB`,
          );
          return;
        }

        // Validate file type
        if (!acceptedFileTypes.some((type) => file.type.includes(type))) {
          alert("Invalid file type. Please upload a video file.");
          return;
        }

        onFileSelect(file);
      }
    },
    [onFileSelect, maxFileSize, acceptedFileTypes],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "video/*": acceptedFileTypes,
      },
      maxSize: maxFileSize,
      multiple: false,
    });

  return (
    <Card className="w-full bg-white p-8">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          min-h-[200px] cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${isDragReject ? "border-red-500 bg-red-50" : ""}
        `}
      >
        <input {...getInputProps()} />

        <Upload
          className={`w-12 h-12 mb-4 ${
            isDragActive ? "text-blue-500" : "text-gray-400"
          }`}
        />

        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive
              ? "Drop the video here"
              : "Drag & drop your video here"}
          </p>
          <p className="text-sm text-gray-500">or</p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <File className="w-4 h-4 mr-2" />
            Select Video
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: MP4, WebM, QuickTime
            <br />
            Maximum file size: {Math.floor(maxFileSize / (1024 * 1024))}MB
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UploadSection;
