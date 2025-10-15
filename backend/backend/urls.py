from django.contrib import admin
from django.urls import path, include
from competitions.views import ShowAllCompetitionsView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Users app (authentication, profile, participants)
    path('api/', include('users.urls')),  # all user-related API endpoints
    
    path('', include('users.urls')),

    # Competitions app
    path('api/competitions/', include('competitions.urls')),  # all competition-related APIs

    # Allauth (login/signup/social accounts)
    path('accounts/', include('allauth.urls')),
    
    path('api/', include('competitions.urls')),
    
    path('Participantdata/', include('users.urls')),

]
