from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import Product, CartItem, Cart

from cart import serializers


class CartViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.CartItemSerializer
    queryset = CartItem.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.action)
        if self.action == "list":
            cart = Cart.objects.filter(user=self.request.user).first()
            return CartItem.objects.filter(cart=cart)
        return super().get_queryset()

    def get_serializer_class(self):
        return serializers.CartItemSerializer

    @action(methods=["delete"], detail=False)
    def remove(self, request):
        cart = Cart.objects.get(user=request.user)
        if not cart:
            return Response({"aucun panier trouvé"}, status=status.HTTP_404_NOT_FOUND)

        items = CartItem.objects.filter(cart=cart)
        items.delete()

        return Response(
            {"detail": "le panier a été supprimé"}, status=status.HTTP_204_NO_CONTENT
        )
