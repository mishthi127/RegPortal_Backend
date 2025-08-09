from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout

@api_view(['GET'])
@login_required
def competition_list(request):
    return Response({"message": "List of competitions"})