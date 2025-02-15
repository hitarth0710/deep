import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from mtcnn import MTCNN

class ImageDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/cnn_model.h5'):
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

    def detect_and_crop_face(self, image):
        try:
            # Convert BGR to RGB for MTCNN
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = self.detector.detect_faces(image_rgb)
            
            if results:
                bounding_box = results[0]['box']
                x, y, width, height = bounding_box
                # Add padding
                padding = int(min(width, height) * 0.1)
                x = max(0, x - padding)
                y = max(0, y - padding)
                width = min(image.shape[1] - x, width + 2*padding)
                height = min(image.shape[0] - y, height + 2*padding)
                
                face = image[y:y+height, x:x+width]
                face = cv2.resize(face, self.target_size)
                return face, True
            else:
                return cv2.resize(image, self.target_size), False

        except Exception as e:
            print(f"Error detecting face: {str(e)}")
            return cv2.resize(image, self.target_size), False

    def preprocess_image(self, image):
        try:
            # Convert BGR to RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            # Normalize pixel values
            image_norm = image_rgb.astype('float32') / 255.0
            # Add batch dimension
            image_batch = np.expand_dims(image_norm, axis=0)
            return image_batch

        except Exception as e:
            print(f"Error preprocessing image: {str(e)}")
            raise

    def predict(self, image_path):
        try:
            print(f"Starting image analysis for {image_path}")
            # Validate file exists
            if not os.path.exists(image_path):
                raise FileNotFoundError(f"Image file not found: {image_path}")

            # Read image
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError("Failed to read image file")

            # Get image size
            height, width, channels = image.shape

            # Detect and crop face
            face, face_detected = self.detect_and_crop_face(image)

            # Preprocess image
            processed_image = self.preprocess_image(face)

            # Get prediction
            prediction = self.model.predict(processed_image, verbose=0)
            prediction = prediction[0] if isinstance(prediction, list) else prediction[0][0]

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