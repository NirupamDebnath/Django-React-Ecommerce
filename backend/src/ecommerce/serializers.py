from rest_framework import serializers

from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a Product"""
    category = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Category.objects.all()
    )

    class Meta:
        model = Product
        fields = ('id', 'category', 'title', 'description', 'quantity', 'price', 'effective_price', 'discount', 'image')
        read_only_fields = ('id', 'effective_price')


class CategorySerializer(serializers.ModelSerializer):
    """Serialize a category"""

    class Meta:
        model = Category
        fields = ('id', 'title')
        read_only_fields = ('id',)
