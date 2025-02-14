import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models.detector2 import VideoDeepfakeDetector
from .models.audio_detector import AudioDeepfakeDetector

# Initialize detectors
video_detector = VideoDeepfakeDetector()
audio_detector = AudioDeepfakeDetector()

def save_uploaded_file(uploaded_file):
    file_path = os.path.join(settings.MEDIA_ROOT, 'temp', uploaded_file.name)
    with open(file_path, 'wb+') as destination:
        for chunk in uploaded_file.chunks():
            destination.write(chunk)
    return file_path

@csrf_exempt
def analyze_video(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        uploaded_file = request.FILES['file']
        file_path = save_uploaded_file(uploaded_file)

        # Analyze video
        result = video_detector.analyze_video(file_path)

        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)

        return JsonResponse(result)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def analyze_audio(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        uploaded_file = request.FILES['file']
        file_path = save_uploaded_file(uploaded_file)

        # Analyze audio
        result = audio_detector.predict(file_path)

        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)

        return JsonResponse(result)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
