from django.urls import path , include
from .views import RegisterView, VerifyOTPView, LoginView, ProfileView, homepage , google_complete_profile , complete_profile , google_login

urlpatterns = [
     path('', homepage, name='homepage'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
      path('accounts/', include('allauth.urls')),
      path('auth/google/complete/', google_complete_profile , name='google_complete_profile'),
      path('auth/complete-profile/', complete_profile, name='complete_profile'),
      path('auth/google/', google_login, name='google_login'),

]
