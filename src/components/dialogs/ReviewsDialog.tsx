import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    review:
      "Finally, an AI that's more skeptical than my mom! This tool caught a deepfake video of my 'vacation in Mars' before my friends could roast me. 😅",
    role: "Content Creator",
  },
  {
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    rating: 5,
    review:
      "Used this to check if my girlfriend's profile pic was real. Turns out she's not a supermodel from Paris. Thanks MaskOff, you saved me from another catfish! 🎣",
    role: "Software Engineer",
  },
  {
    name: "Emma Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    rating: 5,
    review:
      "My conspiracy theorist uncle tried to share a deepfake video. MaskOff helped me prove it was fake faster than he could say 'lizard people'! 🦎",
    role: "Digital Marketer",
  },
  {
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    rating: 5,
    review:
      "This tool is like having a lie detector for the internet. It's caught more fakes than my ex told stories! 🕵️‍♂️",
    role: "Journalist",
  },
];

export function ReviewsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-sm text-gray-400 hover:text-white p-0 h-auto block"
        >
          REVIEWS
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-background to-muted">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2 text-[#ff6b00]">
            What Our Users Say
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Real reviews from real people (we checked with our own tool! 😉)
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-[#ff6b00] bg-black/50 backdrop-blur-sm hover:bg-[#ff6b00]/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-[#ff6b00]">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[#ff6b00]">
                    {review.name}
                  </h3>
                  <p className="text-sm text-[#ff6b00]/70">{review.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#ff6b00] text-[#ff6b00]"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 relative">
                <Quote className="h-8 w-8 text-[#ff6b00]/20 absolute -top-2 -left-2" />
                <p className="text-muted-foreground relative z-10 pl-6">
                  {review.review}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground italic">
          * These reviews are totally real, just like your ex's excuses! 😉
        </div>
      </DialogContent>
    </Dialog>
  );
}
