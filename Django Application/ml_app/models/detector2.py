import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os

class DeepfakeDetector:
    def __init__(self, model_path='C:/Users/rajes/Downloads/my_model.h5'):
        print("Initializing Video Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.target_size = (224, 224)  # Standard input size for most CNN models
            print("Video detector initialized successfully")
        except Exception as e:
            print(f"Error initializing video detector: {str(e)}")
            raise

    def load_model(self, model_path):
        try:
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            print(f"Loading model from {model_path}")
            # Try loading with custom objects and legacy mode
            try:
                model = tf.keras.models.load_model(
                    model_path,
                    compile=False,
                    custom_objects=None
                )
            except ValueError as e:
                if 'batch_shape' in str(e):
                    # Try loading with legacy support
                    model = tf.keras.models.load_model(
                        model_path,
                        compile=False,
                        custom_objects=None,
                        legacy_format=True
                    )
                else:
                    raise

            print("Model loaded successfully")
            print(f"Model input shape: {model.input_shape}")
            return model

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def extract_frames(self, video_path, max_frames=32):
        print(f"Extracting frames from {video_path}")
        frames = []
        try:
            cap = cv2.VideoCapture(video_path)
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            frame_indices = np.linspace(0, total_frames-1, max_frames, dtype=int)
            
            for idx in frame_indices:
                cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
                ret, frame = cap.read()
                if ret:
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    frame = cv2.resize(frame, self.target_size)
                    frames.append(frame)
            cap.release()
        except Exception as e:
            print(f"Error extracting frames: {str(e)}")
            raise

        return np.array(frames)

    def predict(self, video_path):
        try:
            print(f"Starting video analysis for {video_path}")
            
            # Extract frames
            frames = self.extract_frames(video_path)
            if len(frames) == 0:
                raise ValueError("No frames could be extracted from the video")

            # Preprocess frames
            frames = frames.astype('float32') / 255.0
            
            # Make predictions on each frame
            predictions = []
            confidences = []
            for frame in frames:
                # Add batch dimension
                frame_batch = np.expand_dims(frame, axis=0)
                pred = self.model.predict(frame_batch, verbose=0)
                predictions.append(pred[0][0] > 0.5)
                confidences.append(float(pred[0][0]))

            # Calculate overall result
            fake_count = sum(predictions)
            total_frames = len(predictions)
            is_fake = fake_count > total_frames * 0.5

            # Calculate average confidence
            avg_confidence = np.mean([conf if pred else 1-conf 
                                    for pred, conf in zip(predictions, confidences)]) * 100

            result = {
                'result': 'FAKE' if is_fake else 'REAL',
                'confidence': float(avg_confidence),
                'total_frames': total_frames,
                'fake_frames': int(fake_count),
                'frame_predictions': [(bool(pred), float(conf)) 
                                    for pred, conf in zip(predictions, confidences)]
            }

            print(f"Video analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing video: {str(e)}")
            raise