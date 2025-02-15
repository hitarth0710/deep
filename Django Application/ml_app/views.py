import os
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models.detector2 import DeepfakeDetector
from .models.image_detector import ImageDeepfakeDetector

# Initialize detectors
video_detector = DeepfakeDetector()
image_detector = ImageDeepfakeDetector()

@api_view(['POST'])
def analyze_video(request):
    try:
        video_file = request.FILES.get('file')
        if not video_file:
            return Response({'error': 'No video file provided'}, status=400)

        # Save the uploaded file temporarily
        temp_path = os.path.join(settings.MEDIA_ROOT, 'temp', video_file.name)
        os.makedirs(os.path.dirname(temp_path), exist_ok=True)
        
        with open(temp_path, 'wb+') as destination:
            for chunk in video_file.chunks():
                destination.write(chunk)

        # Analyze the video
        result = video_detector.predict(temp_path)

        # Clean up
        os.remove(temp_path)

        return Response(result)

    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def analyze_image(request):
    try:
        image_file = request.FILES.get('file')
        if not image_file:
            return Response({'error': 'No image file provided'}, status=400)

        # Save the uploaded file temporarily
        temp_path = os.path.join(settings.MEDIA_ROOT, 'temp', image_file.name)
        os.makedirs(os.path.dirname(temp_path), exist_ok=True)
        
        with open(temp_path, 'wb+') as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)

        # Analyze the image
        result = image_detector.predict(temp_path)

        # Clean up
        os.remove(temp_path)

        return Response(result)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
