import uuid, random
from datetime import timedelta
from django.db import models
from django.utils import timezone, translation
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.crypto import get_random_string

# ---- Constants for Choices ----

GENDER_CHOICES = [('M', _('Male')), ('F', _('Female')), ('O', _('Other'))]
ACCOMMODATION_CHOICES = [('Y', _('Yes')), ('N', _('No'))]
USER_ROLE_CHOICES = [
    ('participant', _('Participant')), ('volunteer', _('Volunteer')),
    ('judge', _('Judge')), ('sponsor', _('Sponsor')), ('organizer', _('Organizer'))
]

# ---- Helper Function ----

def create_new_ref_number():
    """Auto-generates a unique alcherid."""
    base = "ALC-" + str(NewUser.objects.count() + 5001)
    suffix = "-" + get_random_string(length=4)
    alcherid = base + suffix
    return alcherid if not NewUser.objects.filter(alcherid=alcherid).exists() else create_new_ref_number()

# ---- User Account & Manager ----

class CustomAccountManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        if not email: raise ValueError(_('You must provide an email address'))
        user = self.model(email=self.normalize_email(email), **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        return self._create_user(email, password, **other_fields)

# ---- Profile & Authentication Models ----

class NewUser(AbstractBaseUser, PermissionsMixin):
    # Auth & Account
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True, db_index=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    provider = models.CharField(max_length=200, default='email')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    verified_email = models.BooleanField(default=False)
    password_reset_token = models.CharField(max_length=64, blank=True, null=True)
    password_reset_expiry = models.DateTimeField(blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = CustomAccountManager()
    class Meta: ordering = ['email']

    # Profile
    fullname = models.CharField(max_length=150)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='M')
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, default='participant')
    img = models.ImageField(upload_to="image_uploads/userdp/%Y/%m/%d/", default='user-default.png')
    about = models.TextField(max_length=500, blank=True)
    percentage_complete = models.IntegerField(default=0)

    # Contact
    phone_number = PhoneNumberField(unique=True)
    alternate_phone = PhoneNumberField(blank=True, null=True)

    # College & Location
    collegename = models.CharField(max_length=150)
    city = models.CharField(max_length=150, blank=True)
    state = models.CharField(max_length=200, blank=True)

    # IDs & Referral
    alcherid = models.CharField(max_length=255, blank=True, unique=True)
    referred_by = models.CharField(max_length=255, blank=True)

    # OTP & Verification
    otp = models.CharField(max_length=6, default='000000')
    otp_created_at = models.DateTimeField(blank=True, null=True)
    otp_used = models.BooleanField(default=False)

    # Events & Teams
    interest = models.ManyToManyField("competitions.Module", related_name="interested_users", blank=True)
    events_registered = models.ManyToManyField("competitions.Competition", related_name="participants", blank=True)
    team_members = models.IntegerField(default=0)

    def generate_otp(self):
        self.otp, self.otp_created_at, self.otp_used = str(random.randint(100000, 999999)), timezone.now(), False
        self.save()

    def is_otp_valid(self):
        return self.otp_created_at and not self.otp_used and timezone.now() < self.otp_created_at + timedelta(minutes=5)

    def save(self, *args, **kwargs):
        if not self.alcherid: self.alcherid = create_new_ref_number()
        required_fields = ['fullname', 'email', 'phone_number', 'collegename', 'city', 'state', 'gender', 'role', 'about', 'img']
        completed = sum((getattr(self, f) not in (None, '', self._meta.get_field(f).default) if f != 'img' else getattr(self, f) != self._meta.get_field(f).default) for f in required_fields)
        self.percentage_complete = (completed * 100) // len(required_fields)
        super().save(*args, **kwargs)

    def __str__(self): return str(self.email)

# ---- Team Member Model ----

class TeamMembers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    memberid = models.CharField(max_length=255, default="MEM-XXXX-XXXX")
    img = models.ImageField(upload_to="image_uploads/userdp/%Y/%m/%d/", default='user-default.png')
    email = models.EmailField()
    name = models.CharField(max_length=150, blank=True)
    phone = PhoneNumberField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    collegename = models.CharField(max_length=150)
    city = models.CharField(max_length=150, blank=True)
    state = models.CharField(max_length=200, blank=True)
    accommodation = models.BooleanField(default=False, blank=True)
    days_stay = models.IntegerField(default=0)
    accommodation_type = models.CharField(max_length=14, default='none')
    def save(self, *args, **kwargs):
        if not self.memberid: self.memberid = f"MEM-{get_random_string(length=4)}-{get_random_string(length=4)}"
        super().save(*args, **kwargs)
    def __str__(self): return str(self.email)

# ---- Team Model ----

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, blank=True, null=True)
    accommodation = models.CharField(max_length=1, choices=ACCOMMODATION_CHOICES, default='N', null=True, blank=True)
    blankets = models.IntegerField(default=0)
    dues = models.IntegerField(default=0)
    total_paid = models.IntegerField(default=0)
    leader = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="team", on_delete=models.CASCADE)
    members = models.ManyToManyField(TeamMembers, related_name="teams")
    def __str__(self): return str(self.leader)
    
# ---- Price History Model ----

class Price(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='prices')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    datetime_created = models.DateTimeField(auto_now_add=True)
    datetime_updated = models.DateTimeField(auto_now=True)
    def __str__(self): return f"Team {self.team_id}: {self.price}"
