from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Product
from products import serializers


class ProductsViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.ProductDetailSerializer
    queryset = Product.objects.all()
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
            "upload_image",
        ]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.ProductSerializer
        if self.action == "upload_image":
            return serializers.ProductImageSerializer

        return self.serializer_class

    @action(methods=["post"], detail=True, url_path="upload-image")
    def upload_image(self, request, pk):
        "Upload an image to product"
        product = self.get_object()
        serializer = self.get_serializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
