import librosa
import numpy as np

def load_audio(file_path):
    """Load audio file and return the waveform"""
    audio, sr = librosa.load(file_path, sr=None)
    return audio

def process_audio(audio_data, target_sr=16000):
    """Process audio data for model input"""
    # Resample if necessary
    if librosa.get_samplerate(audio_data) != target_sr:
        audio_data = librosa.resample(audio_data, orig_sr=librosa.get_samplerate(audio_data), target_sr=target_sr)

    # Extract features (e.g., mel spectrogram)
    mel_spec = librosa.feature.melspectrogram(y=audio_data, sr=target_sr)
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

    # Normalize
    mel_spec_norm = (mel_spec_db - mel_spec_db.mean()) / mel_spec_db.std()

    return mel_spec_norm
