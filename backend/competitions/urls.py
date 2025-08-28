from django.urls import path
from .views import ShowAllCompetitionsView

urlpatterns = [
    path('competitions/', ShowAllCompetitionsView.as_view(), name='show_all_competitions'),
]
