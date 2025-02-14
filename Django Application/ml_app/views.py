from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .models.detector2 import VideoDeepfakeDetector
from .models.audio_detector import AudioDeepfakeDetector
import os

@csrf_exempt
def analyze_video(request):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            video_file = request.FILES['file']
            fs = FileSystemStorage()
            filename = fs.save(f'temp/{video_file.name}', video_file)
            file_path = fs.path(filename)

            # Process video and get prediction
            detector = VideoDeepfakeDetector()
            prediction, confidence = detector.predict(file_path)

            # Clean up
            fs.delete(filename)

            return JsonResponse({
                'result': 'FAKE' if prediction == 1 else 'REAL',
                'confidence': float(confidence * 100),
                'filename': video_file.name
            })

        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def analyze_audio(request):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            audio_file = request.FILES['file']
            fs = FileSystemStorage()
            filename = fs.save(f'temp/{audio_file.name}', audio_file)
            file_path = fs.path(filename)

            # Initialize detector and get prediction
            detector = AudioDeepfakeDetector()
            result = detector.predict(file_path)

            # Clean up
            fs.delete(filename)

            return JsonResponse({
                'result': 'FAKE' if result['prediction'] == 1 else 'REAL',
                'confidence': result['confidence'],
                'filename': audio_file.name,
                'waveform_data': result['waveform'],
                'spectral_features': result['features'],
                'segments_analyzed': 3  # Fixed 3-second segments
            })

        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)
