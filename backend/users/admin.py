from django.contrib import admin
from .models import NewUser
from .models import TeamMembers

admin.site.register(NewUser)
admin.site.register(TeamMembers)