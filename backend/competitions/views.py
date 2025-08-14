from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from .models import  Participant
from .serializers import ParticipantSerializer

@api_view(['GET'])
@login_required
def competition_list(request):
    return Response({"message": "List of competitions"})


class ParticipantviewSet(viewsets.ModelViewSet):
    queryset =  Participant.objects.all().order_by('-created_at')
    serializer_class =  ParticipantSerializer
    permission_classes = [AllowAny]  