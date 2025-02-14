import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface FrameDisplayProps {
  imageUrl: string;
  label: string;
}

export function FrameDisplay({ imageUrl, label }: FrameDisplayProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 text-sm text-center">{label}</div>
    </Card>
  );
}
