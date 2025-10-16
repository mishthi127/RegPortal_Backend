from django.contrib import admin
from .models import Competition  , Module


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    list_display = ('id', 'event_name', 'module', 'prize_worth', 'event_mode')
    readonly_fields = ('id',)

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'modulename')
