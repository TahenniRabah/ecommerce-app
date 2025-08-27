from rest_framework import serializers

from core.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "image"]
        read_only_fields = ["id"]


class ProductDetailSerializer(ProductSerializer):
    """Serializer for recipe detail view."""

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ["description", "stock", "image"]
        read_only_fields = ["id", "image"]


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading image to products."""

    class Meta:
        model = Product
        fields = ["id", "image"]
        read_only_fields = ["id"]
        extra_kwargs = {"image": {"required": "True"}}
