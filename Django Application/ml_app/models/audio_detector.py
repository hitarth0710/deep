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
            self.n_mels = 128  # Number of mel bands
            self.hop_length = 512  # Number of samples between frames
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
            # Load audio file with error handling
            try:
                y, sr = librosa.load(audio_path, sr=self.sample_rate)
            except Exception as e:
                raise Exception(f"Error loading audio file: {str(e)}")

            # Ensure minimum length
            if len(y) < self.sample_rate * 1:  # At least 1 second
                raise Exception("Audio file too short")

            # Trim silence
            y, _ = librosa.effects.trim(y)

            # Extract mel spectrogram
            mel_spect = librosa.feature.melspectrogram(
                y=y,
                sr=sr,
                n_mels=self.n_mels,
                hop_length=self.hop_length
            )
            
            # Convert to log scale
            mel_spect_db = librosa.power_to_db(mel_spect, ref=np.max)
            
            # Normalize
            mel_spect_norm = (mel_spect_db - mel_spect_db.min()) / (mel_spect_db.max() - mel_spect_db.min())
            
            # Ensure fixed size by either truncating or padding
            target_width = 128  # Fixed width for the spectrogram
            if mel_spect_norm.shape[1] > target_width:
                mel_spect_norm = mel_spect_norm[:, :target_width]
            else:
                pad_width = target_width - mel_spect_norm.shape[1]
                mel_spect_norm = np.pad(mel_spect_norm, ((0, 0), (0, pad_width)))

            # Reshape for model input (batch_size, height, width, channels)
            features = mel_spect_norm.reshape(1, self.n_mels, target_width, 1)

            print("Feature extraction completed successfully")
            return features, {
                'mel_spectrogram': mel_spect_norm.tolist(),
                'sample_rate': sr,
                'duration': len(y) / sr
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