from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import NewUser
from .serializers import RegisterSerializer, VerifyOTPSerializer, LoginSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings

from django.utils import timezone
from datetime import timedelta


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

from django.http import HttpResponse
def homepage(request):
    return HttpResponse("Welcome to the homepage!")

#User adding page

@api_view(['GET'])
@login_required
def competition_list(request):
    return Response({"message": "List of competitions"})


class ParticipantviewSet(viewsets.ModelViewSet):
    queryset =  TeamMembers.objects.all()
    serializer_class =  ParticipantSerializer
    permission_classes = [AllowAny] 
