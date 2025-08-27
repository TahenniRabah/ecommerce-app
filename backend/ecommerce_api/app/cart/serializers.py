from rest_framework import serializers

from core.models import CartItem, Cart, Product
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",  # mappe sur le champ réel 'product'
        write_only=True,  # pour ne pas l'afficher dans GET
    )

    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product", "product_id"]

    def create(self, validated_data):
        user = self.context["request"].user
        product = validated_data["product"]
        quantity = validated_data.get("quantity", 1)

        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if created:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        return cart_item

    def update(self, instance, validated_data):

        user = self.context["request"].user
        quantity = validated_data.get("quantity", 1)
        product = validated_data.get("product")
        cart = Cart.objects.get(user=user)

        if product == instance.product:
            instance.quantity = quantity
            instance.save()
            return instance
        else:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            if cart_item:
                print(cart_item)
                instance.quantity = quantity
                instance.product = product
                instance.save()
                cart_item.delete()
                return instance
