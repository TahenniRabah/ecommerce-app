from django.urls import (
    path,
    include,
)
from rest_framework.routers import DefaultRouter

from cart import views


router = DefaultRouter()
router.register("", views.CartViewSet)
app_name = "cart"

urlpatterns = [
    path("", include(router.urls)),
]
