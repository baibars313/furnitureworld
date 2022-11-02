# Generated by Django 4.1.2 on 2022-10-27 21:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Brands',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(max_length=255)),
                ('brand_description', models.TextField()),
                ('brand_image', models.ImageField(upload_to='brand')),
            ],
        ),
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('category_description', models.TextField()),
                ('category_image', models.ImageField(upload_to='category')),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('product_image', models.ImageField(upload_to='image')),
                ('price', models.PositiveIntegerField()),
                ('discounted_price', models.PositiveIntegerField()),
                ('top_product', models.BooleanField(default=False)),
                ('sale', models.BooleanField(default=True)),
                ('brands', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.brands')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.categories')),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review', models.TextField()),
                ('produc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.products')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]