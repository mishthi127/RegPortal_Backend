from django.urls import path
from .views import RegisterView, VerifyOTPView, LoginView, ProfileView, homepage

urlpatterns = [
     path('', homepage, name='homepage'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
