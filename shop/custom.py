import json
from .models import Order, Products
def total(obj):
    if  obj != None:
        sum=0
        for i in range(len(obj)):
            pk=obj[i].get('id')
            count=obj[i].get('cont')
            product=Products.objects.get(id=pk)
            sum+=product.discounted_price * int(count)
        return sum
    else:
        return 0
            
            
def all_products_order(obj):
    if  obj != None:
        product_array=[]
        sum=0
        for i in range(len(obj)):
            pk=obj[i].get('id')
            count=obj[i].get('cont')
            product=Products.objects.get(id=pk)
            product_sum=product.discounted_price * int(count)
            product_dict={'price':product.discounted_price, 'count':count,'product_total':product_sum, "product_name":product.title}
            product_array.append(product_dict)
        return product_array
    else:
        return "no order"
            