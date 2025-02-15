import { useState } from "react";
import { Layout } from "./layout";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Laugh } from "lucide-react";

const defaultMemes = [
  {
    title: "AI Caught in 4K",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    likes: 420,
    category: "Deepfake Fails",
  },
  {
    title: "When the AI Glitches",
    imageUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd",
    likes: 69,
    category: "AI Bloopers",
  },
  {
    title: "Trust Issues Level 9000",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    likes: 999,
    category: "Trust Issues",
  },
];

export default function Memes() {
  const [memes, setMemes] = useState(defaultMemes);

  return (
    <Layout>
      <div className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Meme Gallery</h1>
              <p className="text-muted-foreground">
                Because sometimes you just need to laugh at the absurdity of
                deepfakes
              </p>
            </div>
            <Button className="gap-2">
              <Laugh className="w-4 h-4" />
              Submit Meme
            </Button>
          </div>

          <div className="grid gap-6">
            {memes.map((meme, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-lg transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{meme.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {meme.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Laugh className="w-4 h-4" />
                      {meme.likes}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
