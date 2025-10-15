from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, VerifyOTPView, LoginView, ProfileView, homepage, ParticipantviewSet

from .views import (
    RegisterView, VerifyOTPView, LoginView, ProfileView,
    homepage, google_complete_profile, complete_profile, google_login,
    TeamMembersViewSet, TeamViewSet, PriceViewSet
)

Participant_list =  ParticipantviewSet.as_view({
    'get': 'list',
    'post': 'create'
})

Participant_detail =  ParticipantviewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
    'get': 'list'
})


# Router for ViewSets (DRF auto-generates list, create, retrieve, update, delete endpoints)
# router = DefaultRouter()
# router.register(r"team-members", TeamMembersViewSet)
# router.register(r"teams", TeamViewSet)
# router.register(r"prices", PriceViewSet)

# rohit

router = DefaultRouter()
router.register(r"team-members", TeamMembersViewSet, basename="team-member")
router.register(r"teams", TeamViewSet, basename="team")
router.register(r"prices", PriceViewSet)  # PriceViewSet has a queryset, no basename needed


urlpatterns = [
    path('', homepage, name='homepage'),

    # Auth routes
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),

    # Google authentication
    path('accounts/', include('allauth.urls')),
    path('auth/google/', google_login, name='google_login'),
    path('auth/google/complete/', google_complete_profile, name='google_complete_profile'),
    path('auth/complete-profile/', complete_profile, name='complete_profile'),

    # DRF router endpoints
    path('', include(router.urls)),
    path('Participant/',  Participant_list, name=' Participant-list'),
    path('Participant/<uuid:pk>/',  Participant_detail, name=' Participant-detail'),

]
