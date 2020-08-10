from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import os
import uuid
from authentication.models import User, Address


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = uuid.uuid4().hex
    name, ext = get_filename_ext(filename)
    final_filename = f'{new_filename}{ext}'
    return f"products/{final_filename}"


class Category(models.Model):
    title = models.CharField(max_length=120, null=False, blank=False)

    def __str__(self):
        return self.title


class Product(models.Model):
    category = models.ForeignKey(
        'Category',
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    title = models.CharField(
        max_length=120,
        null=False,
        blank=False
    )
    description = models.TextField(null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    price = models.DecimalField(
        decimal_places=2,
        max_digits=20,
        null=False,
        blank=False
    )
    image = models.ImageField(
        upload_to=upload_image_path,
        null=False,
        blank=False
    )
    discount = models.IntegerField(
        null=False,
        blank=False,
        default=0,
        validators=[
            MaxValueValidator(100),
            MinValueValidator(0)
        ]
    )
    added_on = models.DateField(auto_now_add=True)
    is_available = models.BooleanField(
        blank=False,
        null=False,
        default=True
    )

    @property
    def effective_price(self):
        return self.price - (self.price * self.discount / 100)

    def __str__(self):
        return self.title


class Orders(models.Model):
    user = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    address = models.ForeignKey(
        Address,
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    product_quantity_amount_mapping_json = models.TextField()
