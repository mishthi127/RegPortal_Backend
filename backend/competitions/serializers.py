from rest_framework import serializers
from .models import Module, Competition, CompTeam, SubmitPerformance, TeamMembers

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"

class CompetitionSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()  # nested
    class Meta:
        model = Competition
        fields = "__all__"

class TeamMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMembers
        fields = "__all__"

class CompTeamSerializer(serializers.ModelSerializer):
    event = CompetitionSerializer()
    leader_name = serializers.CharField(source="leader.username", read_only=True)
    members = TeamMembersSerializer(many=True)
    class Meta:
        model = CompTeam
        fields = "__all__"

class SubmitPerformanceSerializer(serializers.ModelSerializer):
    event = CompetitionSerializer()
    team = CompTeamSerializer()
    class Meta:
        model = SubmitPerformance
        fields = "__all__"
