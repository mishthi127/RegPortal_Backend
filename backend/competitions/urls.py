from django.urls import path
from .views import  ParticipantviewSet

Participant_list =  ParticipantviewSet.as_view({
    'get': 'list',
    'post': 'create'
})

Participant_detail =  ParticipantviewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path(' Participant/',  Participant_list, name=' Participant-list'),
    path(' Participant/<int:pk>/',  Participant_detail, name=' Participant-detail'),
]
