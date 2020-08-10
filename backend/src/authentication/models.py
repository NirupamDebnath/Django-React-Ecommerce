from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_mobile_no(value):
    if len(str(value)) < 10:
        raise ValidationError(
            _('%(value) is less then 10 digit'),
            params={'value': value},
        )
    if len(str(value)) > 13:
        raise ValidationError(
            _('%(value) is greater then 13 digit'),
            params={'value': value},
        )


def validate_pin(value):
    if len(str(value)) == 6:
        raise ValidationError(
            _('%(value) should be 6 digit'),
            params={'value': value},
        )


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError("User must have an email address")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    reset_password_token = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Address(models.Model):
    user = models.ForeignKey(
        'User',
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        default=user.name
    )
    mobile_numer = models.IntegerField(
        validators=[validate_mobile_no],
        null=False,
        blank=False,
    )
    pincode = models.IntegerField(
        validators=[validate_pin],
        null=False,
        blank=False,)
    line = models.TextField(null=False, blank=False)
    landmark = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        default=user.name
    )
