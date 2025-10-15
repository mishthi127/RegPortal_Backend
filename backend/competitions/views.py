from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from .models import Competition, Module, TeamMembers, CompTeam
from .serializers import (
    CompetitionSerializer,
    ModuleSerializer,
    RegisterCompSerializer,
    CompTeamSerializer,
)

# ------------------------------
# Existing View (kept as is)
# ------------------------------

class CompetitionDetailView(generics.RetrieveAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer


class ShowAllCompetitionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        modulequery = request.GET.get('module') or None
        modulefilter1 = request.GET.get('filter1') or None
        modulefilter2 = request.GET.get('filter2') or None
        compfilter3 = request.GET.get('filter3') or None

        module_comp = Competition.objects.all()
        module = None

        # Filter by module
        if modulequery:
            module = Module.objects.filter(
                module_query_name_without_spaces_all_small=modulequery
            ).first()
            if module:
                module_comp = module_comp.filter(module=module)

        # Filter by members
        if modulefilter1:
            if modulefilter1 == '0':
                module_comp = module_comp.exclude(max_members=1)
            else:
                module_comp = module_comp.filter(min_members=1, max_members=1)

        # Filter by online flag
        if modulefilter2 in ['0', '1']:
            module_comp = module_comp.filter(event_mode=bool(int(modulefilter2)))

        # Filter by event name search
        if compfilter3:
            flt3 = compfilter3.replace("+", " ")
            module_comp = module_comp.filter(event_name__icontains=flt3)

        competitions_data = CompetitionSerializer(module_comp, many=True).data
        modules_data = ModuleSerializer(Module.objects.order_by('-id'), many=True).data
        event_names = list(Competition.objects.values_list('event_name', flat=True))

        return Response({
            'modules': modules_data,
            'allcomp': competitions_data,
            'modulename': module.module_query_name_without_spaces_all_small if module else "",
            'active_page': 'competitions',
            'data': event_names
        })


# ------------------------------
# New: ViewSet for API fetching
# ------------------------------
class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This ViewSet is what your React frontend will call to get all competitions.
    Example:
        GET /api/competitions/
        GET /api/competitions/<id>/
    """
    queryset = Competition.objects.all().order_by('event_name')
    serializer_class = CompetitionSerializer
    permission_classes = [AllowAny]


# ------------------------------
# Existing Registration View (kept, cleaned)
# ------------------------------
class RegisterCompetitionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Step 1: Validate competition ID
        competition_id = request.data.get('competition_id')
        if not competition_id:
            return Response({"error": "Competition ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            competition = Competition.objects.get(id=competition_id)
        except Competition.DoesNotExist:
            return Response({"error": "Competition not found."}, status=status.HTTP_404_NOT_FOUND)

        # Step 2: Prevent duplicate registration by same leader
        existing_team = CompTeam.objects.filter(event=competition, leader=request.user).first()
        if existing_team:
            return Response({"error": "You have already registered for this competition."}, status=status.HTTP_400_BAD_REQUEST)

        # Step 3: Prepare data for serializer
        serializer_data = {
            "event": str(competition.id),
            "leader": str(request.user.id),
            "team_name": request.data.get('team_name', "Untitled Team"),
            "members": request.data.get('team_members', []),  # Ensure matches your serializer field
        }

        # Step 4: Validate and save
        serializer = RegisterCompSerializer(data=serializer_data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Registration successful!", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)