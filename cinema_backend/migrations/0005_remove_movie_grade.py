# Generated by Django 4.1.7 on 2023-06-04 17:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("cinema_backend", "0004_reviews"),
    ]

    operations = [
        migrations.RemoveField(model_name="movie", name="grade",),
    ]
