from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
