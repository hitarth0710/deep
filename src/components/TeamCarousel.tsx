import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Hitarth Soni",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hitarth",
  },
  {
    name: "Shivnash Srivastava",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jayan&gender=male&hairColor=black&facialHairChance=100&facialHairType=beardMedium",
  },
];

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  return (
    <div className="relative max-w-md mx-auto py-12">
      <Card className="p-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage
            src={teamMembers[currentIndex].avatar}
            alt={teamMembers[currentIndex].name}
          />
          <AvatarFallback>{teamMembers[currentIndex].name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold mb-2">
          {teamMembers[currentIndex].name}
        </h3>
        <p className="text-muted-foreground">
          {teamMembers[currentIndex].role}
        </p>
      </Card>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
