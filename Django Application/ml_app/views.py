import os
import json
import cv2
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

        # Extract frames from video
        cap = cv2.VideoCapture(file_path)
        frames = []
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(frame)
        cap.release()

        # Analyze video frames
        result = video_detector.analyze_video(frames)

        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)

        return JsonResponse(result)

    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def analyze_audio(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    file_path = None
    try:
        uploaded_file = request.FILES['file']
        
        # Validate file type
        allowed_types = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3']
        if uploaded_file.content_type not in allowed_types:
            return JsonResponse({
                'error': f'Invalid file type. Allowed types: {", ".join(allowed_types)}'
            }, status=400)

        # Save file
        file_path = save_uploaded_file(uploaded_file)

        # Analyze audio
        result = audio_detector.predict(file_path)

        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)

        return JsonResponse(result)

    except Exception as e:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
        return JsonResponse({
            'error': f'Error analyzing audio: {str(e)}'
        }, status=500)
