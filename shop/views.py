from unicodedata import category
from django.shortcuts import render

from .forms import OrderForm
from .models import *

# Create your views here.
def home(request):
    fetured_product=Products.objects.filter(top_product=True)
    all_prod=Products.objects.all()
    all_prod=all_prod[0:4]
    return render(request, 'shop/index.html',{"fetured_product":fetured_product,"all_prod":all_prod})

def all_products(request):
    all_prod=Products.objects.all()
    all_cats=Categories.objects.all()
    return render(request, 'shop/all_products.html',{"all_prod":all_prod, "all_cats":all_cats})

def detail(request,pk):
    product=Products.objects.get(id=pk)
    cat=product.category.id
    cats=Products.objects.filter(category=cat)
    print(cats)
    return render(request, 'shop/detail.html',{"product":product,"cats":cats})

def cat_products(request,cat):
    all_prod=Products.objects.filter(category=cat)
    all_cats=Categories.objects.all()
    return render(request, 'shop/all_products.html',{"all_prod":all_prod, "all_cats":all_cats})

def cart(request):
    if request.method=='POST':
        form= OrderForm(request.POST)
        if form.is_valid():
            form.save()
        
    else:
        form= OrderForm() 
    return render(request, 'shop/cart.html',{"form":form})