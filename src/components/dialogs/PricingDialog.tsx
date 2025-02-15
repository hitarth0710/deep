import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Gift, Sparkles, CheckCircle } from "lucide-react";

const features = [
  "Unlimited deepfake detection (because trust issues should be free)",
  "24/7 AI support (our robots never sleep, unlike us)",
  "Advanced analysis (more thorough than your ex's Instagram stalking)",
  "Real-time processing (faster than making up excuses)",
  "Cloud storage (like your brain, but more reliable)",
];

export function PricingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:scale-105 transition-all duration-200"
        >
          Pricing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gradient-to-br from-background to-muted">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl gap-2">
            <PartyPopper className="h-6 w-6 text-primary animate-bounce" />
            Surprise!
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Gift className="h-16 w-16 text-primary animate-bounce" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-2xl font-bold text-primary">
                  Plot Twist: It's FREE! 🎉
                </p>
                <p className="text-sm text-muted-foreground italic">
                  (Yes, we're serious. No, we haven't lost our minds... yet)
                </p>
              </div>

              <div className="space-y-4 bg-card p-4 rounded-lg border border-primary/20">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    No credit card required (we don't even want to see it)
                  </span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Start Using Now - Because Free is Good!
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  * Terms & Conditions: Just be nice and don't break the
                  internet 😊
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
