from django.shortcuts import render
from rest_framework import viewsets, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .serializers import ProductSerializer, CategorySerializer
from .permissions import IsStaffOrReadOnly
from .models import Product, Category


# Create your views here.
class ProductViewset(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = (IsStaffOrReadOnly,)
    filter_backends = [
        DjangoFilterBackend, filters.OrderingFilter,
        filters.SearchFilter
    ]
    search_fields = ['title', 'description']
    filter_fields = ['category']
    ordering_fields = ['id', 'quantity', 'price', 'discount']

    def get_queryset(self):
        """Retrive the products for the authenticated user"""
        return self.queryset.order_by("-id").filter(is_available=True)


class CategoryViewset(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        """Retrive the Categories for the authenticated user"""
        return self.queryset.order_by("id")
