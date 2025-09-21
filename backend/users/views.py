from rest_framework import generics, status, permissions
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import RegistrationSession, NewUser, TeamMembers, Team, Price
from .serializers import RegisterSerializer, VerifyOTPSerializer, LoginSerializer, ProfileSerializer , TeamMembersSerializer, TeamSerializer, PriceSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings

from django.utils import timezone
from datetime import timedelta

from allauth.socialaccount.models import SocialAccount
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from .models import  TeamMembers
from .serializers import ParticipantSerializer




from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from .models import  TeamMembers
from .serializers import ParticipantSerializer


def clean_old_unverified_users():
    cutoff = timezone.now() - timedelta(minutes=5)
    NewUser.objects.filter(
        is_active=False,
        verified_email=False,
        date_joined__lt=cutoff
    ).delete()


def send_otp_email(user):
    send_mail(
        subject="Your OTP Code",
        message=f"Your OTP code is {user.otp}",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
        fail_silently=False,
    )

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    def perform_create(self, serializer):
        clean_old_unverified_users() 
        user = serializer.save()
        send_otp_email(user)

class VerifyOTPView(generics.GenericAPIView):
    serializer_class = VerifyOTPSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        try:
            user = NewUser.objects.get(email=email)
            if user.otp == otp and user.is_otp_valid():
                user.is_active = True
                user.otp_used = True
                user.verified_email = True
                user.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': ProfileSerializer(user).data,
                })
            else:
                return Response({"detail": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
        except NewUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': ProfileSerializer(user).data,
            })
        return Response({'detail': 'Invalid credentials or account not activated.'}, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return self.request.user
    
class TeamMembersViewSet(viewsets.ModelViewSet):
    queryset = TeamMembers.objects.all()
    serializer_class = TeamMembersSerializer
    permission_classes = [IsAuthenticated]


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]


class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    permission_classes = [IsAdminUser]  # only admin can manage prices


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def google_complete_profile(request):
    user = request.user
    profile_data = ProfileSerializer(user).data
    refresh = RefreshToken.for_user(user)
    needs_completion = any([
        not user.phone_number,
        not user.collegename,
        not user.city,
        not user.state
    ])
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': profile_data,
        'needs_completion': needs_completion
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    user = request.user
    user.fullname = request.data.get('fullname', user.fullname)
    user.phone_number = request.data.get('phone_number', user.phone_number)
    user.alternate_phone = request.data.get('alternate_phone', user.alternate_phone)  # Add this line
    user.collegename = request.data.get('collegename', user.collegename)
    user.city = request.data.get('city', user.city)
    user.state = request.data.get('state', user.state)
    user.save()
    return Response({'detail': 'Profile updated', 'user': ProfileSerializer(user).data})


from django.http import HttpResponse
def homepage(request):
    return HttpResponse("Welcome to the homepage!")

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    if not token:
        return Response({'detail': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), "719905784477-e7cc0nhv3vd6v8r1cmr87asn42bc77uc.apps.googleusercontent.com")
        email = idinfo['email']
        name = idinfo.get('name', '')

        # Get or create the user
        user, created = NewUser.objects.get_or_create(
            email=email,
            defaults={
                'fullname': name,
                'username': email.split('@')[0],
                'provider': 'google',
                'is_active': True,  # Google verified email
                'verified_email': True
            }
        )

        # Generate refresh & access tokens
        refresh = RefreshToken.for_user(user)

        # Check for profile completion
        needs_completion = any([
            not user.phone_number,
            not user.collegename,
            not user.city,
            not user.state
        ])

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': ProfileSerializer(user).data,
            'needs_completion': needs_completion
        })

    except ValueError:
        return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

#User adding page

@api_view(['GET'])
@login_required
def competition_list(request):
    return Response({"message": "List of competitions"})


class ParticipantviewSet(viewsets.ModelViewSet):
    queryset =  TeamMembers.objects.all()
    serializer_class =  ParticipantSerializer
    permission_classes= [AllowAny]
