import { useState } from "react";
import { ReactCrop } from "react-image-crop";
import type { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  onCropComplete: (croppedImage: Blob) => void;
}

export function ImageCropDialog({
  open,
  onOpenChange,
  imageUrl,
  onCropComplete,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const getCroppedImg = () => {
    if (!imageRef || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
      imageRef,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCropComplete(blob);
          onOpenChange(false);
        }
      },
      "image/jpeg",
      1,
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="max-h-[60vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onImageLoaded={(img) => setImageRef(img)}
              aspect={1}
            >
              <img src={imageUrl} alt="Crop me" />
            </ReactCrop>
          </div>
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={getCroppedImg}>Apply Crop</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
