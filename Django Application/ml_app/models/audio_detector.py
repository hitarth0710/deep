import os
import numpy as np
from tensorflow.keras.models import load_model
import librosa

class AudioDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/audio-model.h5'):
        print("Initializing Audio Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.sample_rate = 16000  # Standard sample rate
            self.duration = 5  # Duration in seconds to analyze
            self.n_mfcc = 40  # Number of MFCC features
            self.n_segments = 256  # Number of segments to split audio into
            print("Audio detector initialized successfully")
        except Exception as e:
            print(f"Error initializing audio detector: {str(e)}")
            raise

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
            print(f"Extracting features from {audio_path}")
            # Load audio file
            y, sr = librosa.load(audio_path, sr=self.sample_rate)

            # Ensure minimum length
            if len(y) < self.sample_rate * 1:  # At least 1 second
                raise Exception("Audio file too short")

            # Trim silence
            y, _ = librosa.effects.trim(y)

            # Pad or truncate to fixed duration
            target_length = self.sample_rate * self.duration
            if len(y) < target_length:
                y = np.pad(y, (0, target_length - len(y)))
            else:
                y = y[:target_length]

            # Extract MFCC features
            mfcc = librosa.feature.mfcc(
                y=y,
                sr=sr,
                n_mfcc=self.n_mfcc,
                n_fft=2048,
                hop_length=512
            )

            # Extract additional features
            spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            zero_crossing_rate = librosa.feature.zero_crossing_rate(y)

            # Ensure all features have the same number of segments
            target_segments = self.n_segments
            mfcc = librosa.util.fix_length(mfcc, target_segments, axis=1)
            spectral_centroid = librosa.util.fix_length(spectral_centroid, target_segments, axis=1)
            spectral_rolloff = librosa.util.fix_length(spectral_rolloff, target_segments, axis=1)
            zero_crossing_rate = librosa.util.fix_length(zero_crossing_rate, target_segments, axis=1)

            # Flatten and concatenate all features
            features = np.concatenate([
                mfcc.flatten(),
                spectral_centroid.flatten(),
                spectral_rolloff.flatten(),
                zero_crossing_rate.flatten()
            ])

            # Ensure exact size of 10240
            if len(features) > 10240:
                features = features[:10240]
            elif len(features) < 10240:
                features = np.pad(features, (0, 10240 - len(features)))

            # Reshape for model input
            features = features.reshape(1, -1)

            print("Feature extraction completed successfully")
            return features, {
                'mfcc_shape': mfcc.shape,
                'duration': len(y) / sr,
                'sample_rate': sr
            }

        except Exception as e:
            print(f"Error extracting audio features: {str(e)}")
            raise

    def predict(self, audio_path):
        try:
            print(f"Starting audio analysis for {audio_path}")
            # Validate file exists
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")

            # Extract features
            features, feature_data = self.extract_features(audio_path)
            
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
                'duration': feature_data['duration']
            }

            print(f"Audio analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing audio: {str(e)}")
            raise