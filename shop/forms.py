from django import forms
from .models import *


class OrderForm(forms.ModelForm):
    
    class Meta:
        model = Order
        fields= ['customer_name', 'customer_phone', 'customer_address', 'customer_postal_code','order_details','total','delivary_urgent','user']
        widgets={
            "customer_name":forms.TextInput(attrs={"class":"form-control"}),
            "customer_phone":forms.TextInput(attrs={"class":"form-control"}),
            "customer_address":forms.TextInput(attrs={"class":"form-control"}),
            "customer_postal_code":forms.TextInput(attrs={"class":"form-control"}),
            "order_details":forms.TextInput(attrs={"class":"form-control","id":"order_ids","value":"","type":"hidden"}),
            "total":forms.NumberInput(attrs={"class":"form-control","id":"total","type":"hidden"}),
            "user":forms.TextInput(attrs={"class":"form-control","id":"user_id","type":"hidden"}),
            "delivery_urgent":forms.CheckboxInput(attrs={"class":"form-control"}), 
        }