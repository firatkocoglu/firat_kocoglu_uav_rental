from django.urls import path, include
from rest_framework import routers


from .views import (
    login_view,
    logout_view,
    CategoryViewSet,
    UAVViewSet,
    RentalViewSet
)

router = routers.DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'uav', UAVViewSet, basename='uav')
router.register(r'rentals', RentalViewSet, basename='rental')

urlpatterns = [
 path('login/', login_view, name='login-view'),
 path('logout/', logout_view, name='logout-view'),
 path('', include(router.urls)),
]

