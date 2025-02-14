import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FramesDisplayProps {
  frames: string[];
  title: string;
}

export function FramesDisplay({ frames, title }: FramesDisplayProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4">
          {frames.map((frame, index) => (
            <div key={index} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src={frame}
                  alt={`Frame ${index + 1}`}
                  className="object-cover"
                  style={{
                    width: title.includes("Face") ? "100px" : "200px",
                    height: title.includes("Face") ? "100px" : "150px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
