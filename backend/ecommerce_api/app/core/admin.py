from django.contrib import admin
from core.models import Product, Cart, CartItem

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
