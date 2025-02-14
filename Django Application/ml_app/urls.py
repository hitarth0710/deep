from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('api/analyze/', csrf_exempt(views.analyze_video), name='analyze_video'),
]
