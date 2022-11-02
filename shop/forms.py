from django import forms
from .models import *


class OrderForm(forms.ModelForm):
    
    class Meta:
        model = Order
        fields= ['customer_name', 'customer_phone', 'customer_address', 'customer_postal_code','order_details']
        widgets={
            "customer_name":forms.TextInput(attrs={"class":"form-control"}),
            "customer_phone":forms.TextInput(attrs={"class":"form-control"}),
            "customer_address":forms.TextInput(attrs={"class":"form-control"}),
            "customer_postal_code":forms.TextInput(attrs={"class":"form-control"}),
            "order_details":forms.TextInput(attrs={"class":"form-control"}),
            "total":forms.NumberInput(attrs={"class":"form-control"}),
            # "delivery_urgent":forms.BooleanField(attrs={"class":"form-control","type":"hidden"}),
            
        }