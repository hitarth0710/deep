import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, FileText, FileType } from "lucide-react";

export function DocumentationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:scale-105 transition-all duration-200"
        >
          Documentation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Documentation</DialogTitle>
          <DialogDescription>
            Learn how to integrate and use MaskOff's powerful video analysis and
            transformation tools.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quickstart" className="mt-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="quickstart">
              <BookOpen className="h-4 w-4 mr-2" />
              Quickstart
            </TabsTrigger>
            <TabsTrigger value="api">
              <Code className="h-4 w-4 mr-2" />
              API Reference
            </TabsTrigger>
            <TabsTrigger value="guides">
              <FileText className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="presentations">
              <FileType className="h-4 w-4 mr-2" />
              Presentations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-4 mt-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold">Getting Started</h3>
              <p>Follow these steps to start using MaskOff in your project:</p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Sign up for an account</li>
                <li>Get your API key from the dashboard</li>
                <li>Install our SDK</li>
                <li>Make your first API call</li>
              </ol>
              <Button className="mt-4">View Installation Guide</Button>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 mt-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold">API Reference</h3>
              <p>Explore our comprehensive API documentation:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Authentication</li>
                <li>Video Analysis API</li>
                <li>Video Transformation API</li>
                <li>Webhooks</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4 mt-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold">Guides & Tutorials</h3>
              <p>Learn how to implement specific features:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Deepfake Detection Guide</li>
                <li>Video Style Transfer Tutorial</li>
                <li>Batch Processing Guide</li>
                <li>Error Handling Best Practices</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="presentations" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg hover:bg-accent">
                <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete overview of the MaskOff project and its features
                </p>
                <Button variant="outline" size="sm">
                  <FileType className="h-4 w-4 mr-2" />
                  View Presentation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
