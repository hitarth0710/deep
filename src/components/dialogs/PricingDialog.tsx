import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Gift, Sparkles } from "lucide-react";

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl gap-2">
            <PartyPopper className="h-6 w-6 text-primary animate-bounce" />
            Surprise!
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Gift className="h-16 w-16 text-primary animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-primary">
                Plot twist: It's completely FREE! 🎉
              </p>
              <p className="text-sm">
                Why? Because we believe in making deepfake detection accessible
                to everyone!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>No credit card required</span>
                <Sparkles className="h-4 w-4" />
              </div>
              <Button className="w-full" size="lg">
                Start Using Now - It's Free!
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
