import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  FileText,
  FileType,
  Wand2,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-background to-muted">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            The "How Not to Get Fooled" Guide 🕵️‍♂️
          </DialogTitle>
          <DialogDescription className="text-lg">
            Because in 2024, even your cat's photos could be AI-generated! 🐱
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quickstart" className="mt-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="quickstart">
              <Zap className="h-4 w-4 mr-2" />
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="features">
              <Shield className="h-4 w-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="api">
              <Code className="h-4 w-4 mr-2" />
              API Magic
            </TabsTrigger>
            <TabsTrigger value="guides">
              <Wand2 className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-4 mt-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-xl font-semibold mb-4">
                Getting Started (It's easier than explaining why you're still
                single)
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">
                      Step 1: Sign Up (No blood sacrifice required)
                    </h4>
                    <p className="text-muted-foreground">
                      Just your regular email will do. We promise not to send
                      you cat videos... unless you want them.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Step 2: Upload Media</h4>
                    <p className="text-muted-foreground">
                      Drag and drop like it's hot! We accept videos, images, and
                      your trust issues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">
                      Step 3: Let AI Do Its Thing
                    </h4>
                    <p className="text-muted-foreground">
                      Our AI is like your mom - it can spot fakeness from a mile
                      away!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="font-semibold mb-2 group-hover:text-black">
                  🔍 Deep Analysis
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-black">
                  More thorough than your ex's social media stalking
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="font-semibold mb-2 group-hover:text-black">
                  ⚡ Lightning Fast
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-black">
                  Faster than your friend's excuse for canceling plans
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="font-semibold mb-2 group-hover:text-black">
                  🎯 High Accuracy
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-black">
                  More accurate than your weather app
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="font-semibold mb-2 group-hover:text-black">
                  🔒 Privacy First
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-black">
                  We keep secrets better than your best friend
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 mt-4">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-xl font-semibold mb-4">
                API Documentation (The Fun Part! 🎉)
              </h3>
              <div className="bg-black/90 p-4 rounded-lg font-mono text-sm text-primary">
                <p>// Detecting deepfakes is as easy as:</p>
                <p>const truth = await maskoff.analyze(suspiciousContent);</p>
                <p>if (truth.isFake) {"{"};</p>
                <p> console.log("Nice try, AI!");</p>
                <p>{"}"};</p>
              </div>
              <p className="text-muted-foreground mt-4">
                Check out our full API docs - they're more entertaining than
                your favorite Netflix show!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-black">
                  🎓 Deepfake Detection 101
                </h3>
                <p className="text-muted-foreground mb-4 group-hover:text-black">
                  A guide so simple, even your grandma could use it
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:border-black group-hover:text-black"
                >
                  <FileType className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-[#ff6b00] transition-colors group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-black">
                  🚀 Advanced Techniques
                </h3>
                <p className="text-muted-foreground mb-4 group-hover:text-black">
                  For when you're ready to become a deepfake-detecting ninja
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:border-black group-hover:text-black"
                >
                  <FileType className="h-4 w-4 mr-2" />
                  Level Up
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
