from django.contrib import admin
from django.urls import path, include
from competitions.views import ShowAllCompetitionsView

urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include('users.urls')),
        path('', include('users.urls')),
        path('accounts/', include('allauth.urls')),
        path('api/', include('competitions.urls')),

]
