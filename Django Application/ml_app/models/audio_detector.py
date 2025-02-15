import os
import librosa
import numpy as np
import soundfile as sf
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.models import model_from_json

class AudioDeepfakeDetector:
    def __init__(self, model_path='C:/Users/rajes/Downloads/my_model.h5'):
        print("Initializing Audio Deepfake Detector...")
        try:
            self.model = self.load_model(model_path)
            self.target_sr = 16000
            self.n_mfcc = 128
            self.max_length = 128
            print("Audio detector initialized successfully")
        except Exception as e:
            print(f"Error initializing audio detector: {str(e)}")
            raise

    def load_model(self, model_path):
        try:
            # Verify model path
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at {model_path}")

            print(f"Loading model from {model_path}")
            model = tf.keras.models.load_model(
                model_path,
                compile=False,
                custom_objects=None
            )

            print("Model loaded successfully")
            print(f"Model input shape: {model.input_shape}")
            return model

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def predict(self, audio_file_path):
        try:
            print(f"Starting audio analysis for {audio_file_path}")
            
            # Load the audio file using soundfile
            try:
                audio, sr = sf.read(audio_file_path)
                if sr != self.target_sr:
                    audio = librosa.resample(audio, orig_sr=sr, target_sr=self.target_sr)
                    sr = self.target_sr
            except Exception as e:
                print(f"Error loading audio file with soundfile: {e}")
                # Fallback to librosa load
                audio, sr = librosa.load(audio_file_path, sr=self.target_sr)
            
            # Convert stereo to mono if necessary
            if len(audio.shape) > 1:
                audio = np.mean(audio, axis=1)
            
            # Extract features (using Mel-Frequency Cepstral Coefficients)
            mel_spect = librosa.feature.melspectrogram(
                y=audio, 
                sr=self.target_sr,
                n_mels=self.n_mfcc,
                hop_length=512,
                n_fft=2048
            )
            
            # Convert to log scale
            mel_spect_db = librosa.power_to_db(mel_spect, ref=np.max)
            
            # Normalize
            mel_spect_db = (mel_spect_db - np.min(mel_spect_db)) / (np.max(mel_spect_db) - np.min(mel_spect_db))
            
            # Pad or trim to fixed length
            if mel_spect_db.shape[1] < self.max_length:
                mel_spect_db = np.pad(
                    mel_spect_db, 
                    ((0, 0), (0, self.max_length - mel_spect_db.shape[1])), 
                    mode='constant'
                )
            else:
                mel_spect_db = mel_spect_db[:, :self.max_length]
            
            # Reshape for model input (batch_size, height, width, channels)
            features = mel_spect_db.reshape(1, mel_spect_db.shape[0], mel_spect_db.shape[1], 1)
            
            # Print shape for debugging
            print(f"Input shape: {features.shape}")
            
            # Predict using the model
            prediction = self.model.predict(features, verbose=0)
            
            # Determine result and confidence
            is_fake = bool(prediction[0][0] > 0.6)
            confidence = float(prediction[0][0] if is_fake else 1 - prediction[0][0]) * 100

            # Get audio duration
            duration = len(audio) / self.target_sr

            result = {
                'result': 'FAKE' if is_fake else 'REAL',
                'confidence': confidence,
                'duration': duration,
                'sample_rate': self.target_sr,
                'input_shape': features.shape[1:].tolist()  # Log input shape for debugging
            }

            print(f"Audio analysis complete. Result: {result['result']} with {result['confidence']:.2f}% confidence")
            return result

        except Exception as e:
            print(f"Error analyzing audio: {str(e)}")
            raise