from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Competition, Module
from .serializers import CompetitionSerializer, ModuleSerializer

class ShowAllCompetitionsView(APIView):
    # permission_classes = [IsAuthenticated]  # Same as @login_required

    def get(self, request):
        # Get filters from query parameters
        modulequery = request.GET.get('module') or None
        modulefilter1 = request.GET.get('filter1') or None
        modulefilter2 = request.GET.get('filter2') or None
        compfilter3 = request.GET.get('filter3') or None

        # Base queryset
        module_comp = Competition.objects.all()
        module = None

        # Apply module filter
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

        # Filter by online flag (ensure correct type)
        if modulefilter2 in ['0', '1']:
            module_comp = module_comp.filter(online=bool(int(modulefilter2)))

        # Filter by event name search
        if compfilter3:
            flt3 = compfilter3.replace("+", " ")
            module_comp = module_comp.filter(event_name__icontains=flt3)

        # Prepare data
        competitions_data = CompetitionSerializer(module_comp, many=True).data
        modules_data = ModuleSerializer(Module.objects.order_by('-id'), many=True).data
        event_names = list(Competition.objects.values_list('event_name', flat=True))

        # Send JSON response
        return Response({
            'modules': modules_data,
            'allcomp': competitions_data,
            'modulename': module.module_query_name_without_spaces_all_small if module else "",
            'active_page': 'competitions',
            'data': event_names
        })
