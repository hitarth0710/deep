import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from mtcnn import MTCNN

class ImageDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/image_model.h5'):
        print("Initializing Image Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.detector = MTCNN()
            self.target_size = (128, 128)
            print("Image detector initialized successfully")
        except Exception as e:
            print(f"Error initializing image detector: {str(e)}")
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

    def detect_and_crop_face(self, img):
        try:
            # Convert BGR to RGB for MTCNN
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results = self.detector.detect_faces(img_rgb)
            
            if results:
                bounding_box = results[0]['box']
                x, y, width, height = bounding_box
                # Add padding
                padding = int(min(width, height) * 0.1)
                x = max(0, x - padding)
                y = max(0, y - padding)
                width = min(img.shape[1] - x, width + 2*padding)
                height = min(img.shape[0] - y, height + 2*padding)
                
                face = img[y:y+height, x:x+width]
                face = cv2.resize(face, self.target_size)
                return face, True
            else:
                return cv2.resize(img, self.target_size), False

        except Exception as e:
            print(f"Error detecting face: {str(e)}")
            return cv2.resize(img, self.target_size), False

    def preprocess_image(self, img):
        try:
            # Convert BGR to RGB
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            # Normalize pixel values
            img_norm = img_rgb.astype('float32') / 255.0
            # Add batch dimension
            img_batch = np.expand_dims(img_norm, axis=0)
            return img_batch

        except Exception as e:
            print(f"Error preprocessing image: {str(e)}")
            raise

    def predict(self, image_path):
        try:
            print(f"Starting image analysis for {image_path}")
            # Read image
            img = cv2.imread(image_path)
            if img is None:
                raise ValueError("Could not read image file")

            # Get original image size
            height, width, channels = img.shape

            # Detect and crop face
            face, face_detected = self.detect_and_crop_face(img)
            
            # Preprocess face
            processed_face = self.preprocess_image(face)
            
            # Get prediction
            prediction = self.model.predict(processed_face, verbose=0)
            
            # Process prediction
            if isinstance(prediction, list):
                prediction = prediction[0]
            prediction = prediction[0] if len(prediction.shape) > 1 else prediction
            
            # Determine result
            is_fake = bool(prediction >= 0.5)
            confidence = float(prediction if is_fake else 1 - prediction) * 100

            result = {
                'result': 'FAKE' if is_fake else 'REAL',
                'confidence': confidence,
                'face_detected': face_detected,
                'image_size': [height, width, channels]
            }

            print(f"Image analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing image: {str(e)}")
            raise