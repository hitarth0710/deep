import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function TermsDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="font-medium mb-2">1. Acceptance of Terms</h3>
            <p className="text-sm text-muted-foreground">
              By accessing and using MaskOff, you accept and agree to be bound
              by the terms and provision of this agreement.
            </p>
          </section>
          <section>
            <h3 className="font-medium mb-2">2. Use License</h3>
            <p className="text-sm text-muted-foreground">
              Permission is granted to temporarily use this software for
              personal, non-commercial transitory viewing only.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
