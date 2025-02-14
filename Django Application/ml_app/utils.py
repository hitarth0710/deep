import cv2
import torch
import numpy as np
from torchvision import transforms

def extract_frames(video_path, num_frames=20):
    """Extract frames from video for analysis."""
    cap = cv2.VideoCapture(video_path)
    frames = []
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = np.linspace(0, total_frames-1, num_frames, dtype=int)
    
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame)
    
    cap.release()
    return frames

def preprocess_frames(frames):
    """Preprocess frames for model input."""
    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    processed_frames = []
    for frame in frames:
        processed = transform(frame)
        processed_frames.append(processed)
    
    return torch.stack(processed_frames)

def analyze_video_frames(model, frames):
    """Run model prediction on preprocessed frames."""
    model.eval()
    with torch.no_grad():
        outputs = model(frames.unsqueeze(0))
        probabilities = torch.softmax(outputs, dim=1)
        prediction = torch.argmax(probabilities, dim=1)
        confidence = probabilities[0][prediction[0]].item() * 100
        
    return 'FAKE' if prediction.item() == 1 else 'REAL', confidence