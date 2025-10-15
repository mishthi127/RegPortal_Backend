from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShowAllCompetitionsView, RegisterCompetitionView, CompetitionDetailView, CompetitionViewSet

router = DefaultRouter()
router.register(r'competitions', CompetitionViewSet, basename='competition')

urlpatterns = [
    # All competitions (for frontend grid)
    path('competitions/', ShowAllCompetitionsView.as_view(), name='show_all_competitions'),

    # Competition detail (for RegisterPage)
    path('competitions/<uuid:pk>/', CompetitionDetailView.as_view(), name='competition_detail'),

    # Register team for competition
    path('register-competition/', RegisterCompetitionView.as_view(), name='register_competition'),

    # Include router URLs
    path('', include(router.urls)),
]
