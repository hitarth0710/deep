import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np

class DeepfakeDetector:
    def __init__(self, model_path='models/deepfake_detection.pt'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = torch.load(model_path, map_location=self.device)
        self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                              std=[0.229, 0.224, 0.225])
        ])

    def preprocess_frame(self, frame):
        # Convert numpy array to PIL Image
        frame = Image.fromarray(frame)
        # Apply transformations
        frame = self.transform(frame)
        # Add batch dimension
        frame = frame.unsqueeze(0)
        return frame.to(self.device)

    @torch.no_grad()
    def analyze_frame(self, frame):
        # Preprocess frame
        frame_tensor = self.preprocess_frame(frame)
        
        # Get model prediction
        output = self.model(frame_tensor)
        
        # Convert output to probability
        probability = torch.sigmoid(output).item()
        
        return {
            'isFake': probability > 0.5,
            'confidence': float(probability * 100)
        }

    def analyze_video_frames(self, frames):
        results = []
        for i, frame in enumerate(frames):
            result = self.analyze_frame(frame)
            result['timestamp'] = i / len(frames)  # Normalized timestamp
            results.append(result)
            
        # Calculate overall result
        fake_frames = sum(1 for r in results if r['isFake'])
        overall_confidence = sum(r['confidence'] for r in results) / len(results)
        
        return {
            'overall': {
                'isFake': fake_frames / len(results) > 0.3,  # More than 30% fake frames
                'confidence': overall_confidence
            },
            'frames': results
        }
