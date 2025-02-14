import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ApiReferenceDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Reference</DialogTitle>
          <DialogDescription>
            Explore our comprehensive API documentation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="font-medium mb-2">Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to authenticate your API requests.
            </p>
          </section>
          <section>
            <h3 className="font-medium mb-2">Endpoints</h3>
            <p className="text-sm text-muted-foreground">
              Explore available API endpoints and their usage.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
