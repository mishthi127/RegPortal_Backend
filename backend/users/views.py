from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
#serializers means convert the queryset data into JSON format 

@api_view(['GET'])