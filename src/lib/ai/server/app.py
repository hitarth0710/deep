from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from predictor import DeepfakePredictor
import tempfile
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize predictor
predictor = DeepfakePredictor()

@app.post("/analyze")
async def analyze_video(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.mp4', '.avi', '.mov')):
        raise HTTPException(status_code=400, detail="Only video files are allowed")
        
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_path = temp_file.name

    try:
        # Read video frames
        cap = cv2.VideoCapture(temp_path)
        frames = []
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            # Convert BGR to RGB
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame)
        cap.release()

        if not frames:
            raise HTTPException(status_code=400, detail="Could not read video file")

        # Analyze frames
        try:
            results = predictor.predict_frames(frames)
            return results
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
            
    finally:
        # Cleanup
        os.unlink(temp_path)