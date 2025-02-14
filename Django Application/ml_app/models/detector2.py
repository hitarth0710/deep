import tensorflow as tf
import numpy as np
import cv2

class VideoDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/video_deepfake_model.h5'):
        self.model = tf.keras.models.load_model(model_path)
        self.target_size = (224, 224)  # Standard input size for most models

    def preprocess_frame(self, frame):
        """Preprocess a single frame"""
        # Resize frame
        frame = cv2.resize(frame, self.target_size)
        
        # Convert to RGB if needed
        if len(frame.shape) == 2:
            frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2RGB)
        elif frame.shape[2] == 4:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2RGB)
        elif frame.shape[2] == 3:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Normalize pixel values
        frame = frame.astype(np.float32) / 255.0

        return frame

    def predict(self, video_path):
        """Predict if video is real or fake"""
        try:
            # Open video file
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                raise Exception("Error opening video file")

            predictions = []
            frame_count = 0
            max_frames = 30  # Process first 30 frames

            while frame_count < max_frames:
                ret, frame = cap.read()
                if not ret:
                    break

                # Process frame
                processed_frame = self.preprocess_frame(frame)
                
                # Make prediction
                prediction = self.model.predict(np.expand_dims(processed_frame, axis=0))
                predictions.append(prediction[0][0])
                
                frame_count += 1

            cap.release()

            if not predictions:
                raise Exception("No frames could be processed")

            # Average predictions
            final_prediction = np.mean(predictions)
            predicted_class = int(final_prediction > 0.5)
            confidence = float(final_prediction if predicted_class else 1 - final_prediction)

            return predicted_class, confidence

        except Exception as e:
            raise Exception(f"Prediction error: {str(e)}")
