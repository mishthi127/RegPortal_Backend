from django.contrib import admin
from .models import Participant
# Register your models here.
@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone','gender','created_at')
    search_fields = ('name', 'email','phone','gender','created_at')