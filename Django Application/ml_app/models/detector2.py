import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from mtcnn import MTCNN

class VideoDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/cnn_model.h5'):
        print("Initializing Video Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.detector = MTCNN()
            self.target_size = (128, 128)
            print("Video detector initialized successfully")
        except Exception as e:
            print(f"Error initializing video detector: {str(e)}")
            raise

    def load_model(self, model_path):
        try:
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            print(f"Loading model from {model_path}")
            model = load_model(model_path, compile=False)
            print("Model loaded successfully")
            return model

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def detect_and_crop_face(self, frame):
        try:
            # Convert BGR to RGB for MTCNN
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = self.detector.detect_faces(frame_rgb)
            
            if results:
                bounding_box = results[0]['box']
                x, y, width, height = bounding_box
                # Add padding
                padding = int(min(width, height) * 0.1)
                x = max(0, x - padding)
                y = max(0, y - padding)
                width = min(frame.shape[1] - x, width + 2*padding)
                height = min(frame.shape[0] - y, height + 2*padding)
                
                face = frame[y:y+height, x:x+width]
                face = cv2.resize(face, self.target_size)
                return face, True
            else:
                return cv2.resize(frame, self.target_size), False

        except Exception as e:
            print(f"Error detecting face: {str(e)}")
            return cv2.resize(frame, self.target_size), False

    def preprocess_frame(self, frame):
        try:
            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # Normalize pixel values
            frame_norm = frame_rgb.astype('float32') / 255.0
            # Add batch dimension
            frame_batch = np.expand_dims(frame_norm, axis=0)
            return frame_batch

        except Exception as e:
            print(f"Error preprocessing frame: {str(e)}")
            raise

    def analyze_video(self, frames):
        try:
            print("Starting video analysis...")
            if not frames:
                raise ValueError("No frames provided")

            frame_results = []
            faces_detected = []
            total_frames = len(frames)
            frames_with_faces = 0

            print(f"Processing {total_frames} frames...")
            for i, frame in enumerate(frames):
                # Detect and crop face
                face, face_detected = self.detect_and_crop_face(frame)
                faces_detected.append(face_detected)
                if face_detected:
                    frames_with_faces += 1

                # Preprocess frame
                processed_frame = self.preprocess_frame(face)

                # Get prediction
                prediction = self.model.predict(processed_frame, verbose=0)
                prediction = prediction[0] if isinstance(prediction, list) else prediction[0][0]

                # Store result
                frame_results.append([bool(prediction >= 0.5), float(prediction)])

                if (i + 1) % 10 == 0:
                    print(f"Processed {i + 1}/{total_frames} frames")

            # Calculate overall result
            fake_predictions = [pred for pred, conf in frame_results if pred]
            is_fake = len(fake_predictions) > len(frame_results) * 0.5

            # Calculate confidence
            if is_fake:
                confidence = sum(conf for pred, conf in frame_results if pred) / len(fake_predictions) * 100
            else:
                confidence = sum(1 - conf for pred, conf in frame_results if not pred) / (len(frame_results) - len(fake_predictions)) * 100

            result = {
                'result': 'FAKE' if is_fake else 'REAL',
                'confidence': float(confidence),
                'frame_predictions': frame_results,
                'faces_detected': faces_detected,
                'total_frames': total_frames,
                'frames_with_faces': frames_with_faces
            }

            print(f"Video analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing video: {str(e)}")
            raise