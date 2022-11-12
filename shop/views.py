from unicodedata import category
from django.shortcuts import render, redirect
from .custom import total,all_products_order
from .forms import OrderForm
from .models import *
import json 
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
# Create your views here.
def home(request):
    fetured_product=Products.objects.filter(top_product=True)
    all_prod=Products.objects.all()
    all_prod=all_prod[0:4]
    return render(request, 'shop/index.html',{"fetured_product":fetured_product,"all_prod":all_prod})

def all_products(request):
    all_prod_list=Products.objects.all().order_by('id')
    paginator = Paginator(all_prod_list, 4) # Show 25 contacts per page.

    page_number = request.GET.get('page')
    all_prod = paginator.get_page(page_number)
    
    all_cats=Categories.objects.all()
    return render(request, 'shop/all_products.html',{"all_prod":all_prod, "all_cats":all_cats})

def detail(request,pk):
    product=Products.objects.get(id=pk)
    cat=product.category.id
    cats=Products.objects.filter(category=cat)
    print(cats)
    return render(request, 'shop/detail.html',{"product":product,"cats":cats})

def cat_products(request,cat):
    all_prod_list=Products.objects.filter(category=cat).order_by('id')
    all_cats=Categories.objects.all()
    paginator = Paginator(all_prod_list, 4) # Show 25 contacts per page.

    page_number = request.GET.get('page')
    all_prod = paginator.get_page(page_number)
    
    return render(request, 'shop/all_products.html',{"all_prod":all_prod, "all_cats":all_cats})

def cart(request):
    if request.method=='POST':
        if request.user.is_authenticated:
            form= OrderForm(request.POST)
            
            all_obj=json.loads(request.POST.get("order_details"))
            t=int(request.POST.get('total'))
            all_products_order(all_obj)
            if form.is_valid() and t==total(all_obj):
                form_obj=form.save()
                idm=form_obj.id
                return redirect(f'completed/{idm}')
        else:
            return redirect(f'user/login')
        
    else:
        form= OrderForm() 
    return render(request, 'shop/cart.html',{"form":form})

def completed(request,pk):
    order=Order.objects.get(id=pk)
    id_obj=all_products_order(json.loads(order.order_details))
    grand_total=total(json.loads(order.order_details))
    context={"order":order, "grand_total":grand_total, "id_obj":id_obj,'pk':pk}
    return render(request,'shop/order_placed.html',context)


@login_required(login_url='/user/login/')
def user_dashboard(request,user_id):
    orders=Order.objects.filter(user=user_id)
    return render(request, 'shop/user_dashboard.html', {"orders":orders,'user_id':user_id})