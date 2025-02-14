import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import librosa

class AudioDeepfakeDetector:
    def __init__(self, model_path='ml_app/models/simple-cnn-ssv.h5'):
        self.model = load_model(model_path)
        self.sr = 16000  # Sample rate
        self.duration = 3  # Duration in seconds
        self.samples = self.sr * self.duration

    def extract_features(self, audio_path):
        """Extract features from audio file"""
        try:
            # Load audio file
            audio, sr = librosa.load(audio_path, sr=self.sr)
            
            # Ensure consistent length
            if len(audio) > self.samples:
                audio = audio[:self.samples]
            else:
                audio = np.pad(audio, (0, max(0, self.samples - len(audio))))

            # Extract mel spectrogram
            mel_spect = librosa.feature.melspectrogram(
                y=audio,
                sr=self.sr,
                n_mels=128,
                fmax=8000
            )

            # Convert to log scale
            mel_spect_db = librosa.power_to_db(mel_spect, ref=np.max)
            
            # Normalize
            mel_spect_norm = (mel_spect_db - mel_spect_db.mean()) / mel_spect_db.std()
            
            # Reshape for model input (add batch dimension)
            features = np.expand_dims(mel_spect_norm, axis=-1)
            features = np.expand_dims(features, axis=0)
            
            return features, audio

        except Exception as e:
            raise Exception(f"Error extracting features: {str(e)}")

    def predict(self, audio_path):
        """Predict if audio is real or fake"""
        try:
            # Extract features
            features, audio = self.extract_features(audio_path)
            
            # Make prediction
            prediction = self.model.predict(features)
            
            # Get class and confidence
            predicted_class = int(prediction[0][0] > 0.5)
            confidence = float(prediction[0][0] if predicted_class else 1 - prediction[0][0])

            # Get waveform data for visualization
            waveform = audio.tolist()[:10000]  # First 10k samples
            
            return {
                'prediction': predicted_class,
                'confidence': confidence * 100,
                'waveform': waveform,
                'features': features[0, :, :, 0].tolist()  # Convert to 2D list
            }

        except Exception as e:
            raise Exception(f"Prediction error: {str(e)}")
