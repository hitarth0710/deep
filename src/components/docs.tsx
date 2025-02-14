import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, FileText, FileType } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Docs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-muted-foreground mb-8">
            Learn how to integrate and use MaskOff's powerful video analysis and
            transformation tools.
          </p>

          <Tabs defaultValue="quickstart" className="space-y-8">
            <TabsList>
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

            <TabsContent value="quickstart" className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Getting Started</h2>
                <p>Follow these steps to start using DeepAI in your project:</p>
                <ol>
                  <li>Sign up for an account</li>
                  <li>Get your API key from the dashboard</li>
                  <li>Install our SDK</li>
                  <li>Make your first API call</li>
                </ol>
                <Button>View Installation Guide</Button>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>API Reference</h2>
                <p>Explore our comprehensive API documentation:</p>
                <ul>
                  <li>Authentication</li>
                  <li>Video Analysis API</li>
                  <li>Video Transformation API</li>
                  <li>Webhooks</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Guides & Tutorials</h2>
                <p>Learn how to implement specific features:</p>
                <ul>
                  <li>Deepfake Detection Guide</li>
                  <li>Video Style Transfer Tutorial</li>
                  <li>Batch Processing Guide</li>
                  <li>Error Handling Best Practices</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="presentations" className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>Project Presentations</h2>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg hover:bg-accent">
                    <h3 className="text-lg font-semibold mb-2">
                      Project Overview
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Complete overview of the MaskOff project and its features
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href="https://docs.google.com/presentation/d/your-presentation-id"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileType className="h-4 w-4 mr-2" />
                        View Presentation
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent">
                    <h3 className="text-lg font-semibold mb-2">
                      Technical Architecture
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Detailed technical overview of the system architecture
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href="https://docs.google.com/presentation/d/your-presentation-id"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileType className="h-4 w-4 mr-2" />
                        View Presentation
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent">
                    <h3 className="text-lg font-semibold mb-2">Project Demo</h3>
                    <p className="text-muted-foreground mb-4">
                      Live demonstration of key features and capabilities
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href="https://docs.google.com/presentation/d/your-presentation-id"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileType className="h-4 w-4 mr-2" />
                        View Presentation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
