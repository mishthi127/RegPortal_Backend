from rest_framework import serializers
from .models import RegistrationSession, NewUser, TeamMembers, Team, Price
from .models import NewUser
from .models import  TeamMembers

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMembers
        fields = ['id', 'name', 'email', 'gender', 'phone', 'collegename', 'city', 'state']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = NewUser
        fields = (
            'email', 'username', 'fullname',
            'phone_number', 'alternate_phone',
            'collegename', 'city', 'state',
            'password', 'confirm_password'
        )

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password before passing to create_user
        user = NewUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username'),
            fullname=validated_data.get('fullname'),
            collegename=validated_data.get('collegename'),
            city=validated_data.get('city'),
            state=validated_data.get('state'),
            phone_number=validated_data.get('phone_number'),
            alternate_phone=validated_data.get('alternate_phone'),
            password=validated_data['password']
        )
        user.is_active = False  # Not active until OTP verification
        user.generate_otp()
        user.save()
        return user

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        exclude = [
            'password', 'otp', 'otp_created_at', 'otp_used', 'password_reset_token', 'password_reset_expiry'
        ]

class TeamMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMembers
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    members = TeamMembersSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = "__all__"


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = "__all__"