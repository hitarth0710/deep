import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
}

const VideoPlayer = ({
  src = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  onTimeUpdate = () => {},
  onEnded = () => {},
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration,
      );
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0,
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-[640px] bg-white p-4 space-y-4">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={onEnded}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-blue-600 h-1 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" onClick={handleSkipBackward}>
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button variant="outline" size="icon" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;
