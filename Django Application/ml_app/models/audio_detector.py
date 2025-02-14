import os
import numpy as np
from tensorflow.keras.models import load_model
import librosa

class AudioDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/audio-model.h5'):
        print("Initializing Audio Deepfake Detector...")
        self.model = self.load_model(model_path)
        self.sample_rate = 16000  # Standard sample rate
        self.duration = 5  # Duration in seconds to analyze

    def load_model(self, model_path):
        try:
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            print(f"Loading audio model from {model_path}")
            model = load_model(model_path, compile=False)
            print("Audio model loaded successfully")
            return model

        except Exception as e:
            print(f"Error loading audio model: {str(e)}")
            raise

    def extract_features(self, audio_path):
        try:
            # Load audio file
            y, sr = librosa.load(audio_path, sr=self.sample_rate)

            # Trim silence
            y, _ = librosa.effects.trim(y)

            # Extract features
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            zero_crossing_rate = librosa.feature.zero_crossing_rate(y)

            # Combine features
            features = np.concatenate([
                mfccs.mean(axis=1),
                spectral_centroid.mean(axis=1),
                spectral_rolloff.mean(axis=1),
                [zero_crossing_rate.mean()]
            ])

            return features, {
                'mfccs': mfccs.tolist(),
                'spectral_centroid': spectral_centroid.tolist(),
                'spectral_rolloff': spectral_rolloff.tolist(),
                'zero_crossing_rate': zero_crossing_rate.tolist()
            }

        except Exception as e:
            print(f"Error extracting audio features: {str(e)}")
            raise

    def predict(self, audio_path):
        try:
            # Extract features
            features, feature_data = self.extract_features(audio_path)
            
            # Reshape features for model input
            features = np.expand_dims(features, axis=0)
            
            # Get prediction
            prediction = self.model.predict(features)
            
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
                'feature_data': feature_data,
                'segments_analyzed': len(feature_data['mfccs'][0])
            }

            print(f"Audio analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing audio: {str(e)}")
            raise
