import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, ShieldAlert } from "lucide-react";

interface VideoAnalysisResultProps {
  result: {
    overall: {
      isFake: boolean;
      confidence: number;
    };
    frames: Array<{
      isFake: boolean;
      confidence: number;
      timestamp: number;
    }>;
  };
}

export function VideoAnalysisResult({ result }: VideoAnalysisResultProps) {
  const { overall, frames } = result;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          {overall.isFake ? (
            <ShieldAlert className="h-6 w-6 text-destructive" />
          ) : (
            <Shield className="h-6 w-6 text-primary" />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Authenticity
              </span>
              <span className="text-sm font-medium">
                {overall.isFake ? "Likely Fake" : "Likely Authentic"}
              </span>
            </div>
            <Progress
              value={overall.confidence}
              className={overall.isFake ? "bg-destructive/20" : "bg-primary/20"}
              indicatorClassName={
                overall.isFake ? "bg-destructive" : "bg-primary"
              }
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Frame Analysis</h4>
            <div className="h-20 relative border rounded-md overflow-hidden">
              {frames.map((frame, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-full transition-colors ${frame.isFake ? "bg-destructive" : "bg-primary"}`}
                  style={{
                    left: `${(i / frames.length) * 100}%`,
                    opacity: frame.confidence / 100,
                  }}
                  title={`Frame ${i}: ${frame.confidence.toFixed(1)}% confidence`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
