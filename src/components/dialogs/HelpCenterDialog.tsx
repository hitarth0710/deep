import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function HelpCenterDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Help Center</DialogTitle>
          <DialogDescription>
            Get help and support for MaskOff.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="font-medium mb-2">FAQs</h3>
            <p className="text-sm text-muted-foreground">
              Frequently asked questions and answers.
            </p>
          </section>
          <section>
            <h3 className="font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-muted-foreground">
              Get in touch with our support team.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
