import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Step {
  label: string;
  status: "pending" | "processing" | "completed" | "error";
  progress?: number;
}

interface ProcessingStepsProps {
  steps: Step[];
}

export function ProcessingSteps({ steps }: ProcessingStepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{step.label}</span>
            <span className="text-sm text-muted-foreground">
              {step.status === "completed"
                ? "100%"
                : step.status === "processing"
                  ? `${step.progress || 0}%`
                  : step.status === "error"
                    ? "Error"
                    : "Pending"}
            </span>
          </div>
          <Progress
            value={
              step.status === "completed"
                ? 100
                : step.status === "processing"
                  ? step.progress
                  : step.status === "error"
                    ? 100
                    : 0
            }
            className={step.status === "error" ? "bg-destructive/20" : ""}
            indicatorClassName={step.status === "error" ? "bg-destructive" : ""}
          />
        </Card>
      ))}
    </div>
  );
}
