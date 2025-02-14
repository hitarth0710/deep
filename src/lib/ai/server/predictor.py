import cv2
import numpy as np
import torch
from torchvision import transforms
from PIL import Image
import os

class DeepfakePredictor:
    def __init__(self, model_path='models/model_20_frames.pt'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = torch.load(model_path, map_location=self.device)
        self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                              std=[0.229, 0.224, 0.225])
        ])

    def extract_faces(self, frame):
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        if len(faces) == 0:
            return None
            
        x, y, w, h = faces[0]  # Take the first face
        face = frame[y:y+h, x:x+w]
        return face

    def preprocess_frame(self, frame):
        # Convert to PIL Image
        frame = Image.fromarray(frame)
        # Apply transformations
        frame = self.transform(frame)
        return frame

    @torch.no_grad()
    def predict_frames(self, frames, sequence_length=20):
        processed_frames = []
        frame_results = []
        
        for frame in frames:
            face = self.extract_faces(frame)
            if face is not None:
                processed_frame = self.preprocess_frame(face)
                processed_frames.append(processed_frame)
                
                if len(processed_frames) == sequence_length:
                    # Stack frames and predict
                    sequence = torch.stack(processed_frames).unsqueeze(0)
                    output = self.model(sequence.to(self.device))
                    probability = output.item()
                    
                    result = {
                        'isFake': probability > 0.5,
                        'confidence': float(probability * 100)
                    }
                    frame_results.append(result)
                    
                    # Reset for next sequence
                    processed_frames = processed_frames[1:]
        
        if not frame_results:
            raise ValueError('No faces detected in video')
            
        # Calculate overall result
        fake_frames = sum(1 for r in frame_results if r['isFake'])
        overall_confidence = sum(r['confidence'] for r in frame_results) / len(frame_results)
        
        return {
            'overall': {
                'isFake': fake_frames / len(frame_results) > 0.3,
                'confidence': overall_confidence
            },
            'frames': frame_results
        }