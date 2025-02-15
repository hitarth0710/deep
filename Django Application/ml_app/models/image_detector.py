import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os

class ImageDeepfakeDetector:
    def __init__(self, model_path='C:/Users/rajes/Downloads/my_model.h5'):
        print("Initializing Image Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.target_size = (224, 224)  # Standard input size for most CNN models
            print("Image detector initialized successfully")
        except Exception as e:
            print(f"Error initializing image detector: {str(e)}")
            raise

    def load_model(self, model_path):
        try:
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            print(f"Loading model from {model_path}")
            
            # Load model with minimal options
            model = tf.keras.models.load_model(
                model_path,
                compile=False
            )
            
            print("Model loaded successfully")
            print(f"Model input shape: {model.input_shape}")
            return model

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def predict(self, image_path):
        try:
            print(f"Starting image analysis for {image_path}")
            
            # Read and preprocess image
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError("Could not read image file")
                
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image = cv2.resize(image, self.target_size)
            image = image.astype('float32') / 255.0
            image = np.expand_dims(image, axis=0)
            
            # Make prediction
            prediction = self.model.predict(image, verbose=0)
            is_fake = bool(prediction[0][0] > 0.5)
            confidence = float(prediction[0][0] if is_fake else 1 - prediction[0][0]) * 100

            # Get image details
            original_image = cv2.imread(image_path)
            height, width = original_image.shape[:2]

            result = {
                'result': 'FAKE' if is_fake else 'REAL',
                'confidence': confidence,
                'image_size': [height, width, 3],
                'input_shape': list(image.shape[1:])
            }

            print(f"Image analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing image: {str(e)}")
            raise