# Generated by Django 3.0.4 on 2020-07-11 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='added_on',
            field=models.DateField(auto_now_add=True),
        ),
    ]
