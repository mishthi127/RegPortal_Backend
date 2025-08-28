from django.urls import path
from .views import RegisterView, VerifyOTPView, LoginView, ProfileView, homepage, ParticipantviewSet

Participant_list =  ParticipantviewSet.as_view({
    'get': 'list',
    'post': 'create'
})

Participant_detail =  ParticipantviewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
     path('', homepage, name='homepage'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('Participant/',  Participant_list, name=' Participant-list'),
    path('Participant/<int:pk>/',  Participant_detail, name=' Participant-detail'),
]
