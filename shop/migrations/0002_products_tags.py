# Generated by Django 4.1.2 on 2022-10-29 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='tags',
            field=models.CharField(default='chair table', max_length=255),
        ),
    ]
