
from datetime import datetime
from email.policy import default
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categories(models.Model):
    name=models.CharField(max_length=255)
    category_description=models.TextField()
    category_image=models.ImageField(upload_to='category')
    def __str__(self):
        return self.name
    

class Brands(models.Model):
    brand_name=models.CharField(max_length=255)
    brand_description=models.TextField()
    brand_image=models.ImageField(upload_to='brand')
    
    

    

class Products(models.Model):
    title=models.CharField(max_length=255)
    description=models.TextField()
    product_image=models.ImageField(upload_to='image')
    category=models.ForeignKey(Categories, on_delete=models.CASCADE)
    price=models.PositiveIntegerField()
    discounted_price=models.PositiveIntegerField()
    top_product=models.BooleanField(default=False)
    brands=models.ForeignKey(Brands, on_delete=models.CASCADE)
    sale=models.BooleanField(default=True)
    tags=models.CharField(max_length=255, default='chair table')
    def __str__(self):
        return self.title
    
class Reviews(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE )
    produc=models.ForeignKey(Products, on_delete=models.CASCADE)
    review=models.TextField()
    
class Order(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    # storing counts and ids of products
    order_details=models.TextField()
    total=models.FloatField()
    datetime=models.DateTimeField(auto_now_add=True)
    customer_name=models.CharField(max_length=255)
    customer_phone=models.CharField(max_length=255)
    customer_address=models.CharField(max_length=255)
    customer_postal_code=models.CharField(max_length=255)
    delivary_urgent=models.BooleanField(default=False)
    status=models.CharField(max_length=255, default="RECIEVD")
    
    def __str__(self):
        return self.customer_name
    
    
    
class Order_status(models.Model):
    status=models.CharField(max_length=255)
    order=models.ForeignKey(Order, on_delete=models.CASCADE)
    
    
    

    