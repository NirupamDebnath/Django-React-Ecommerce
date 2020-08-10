from django.contrib import admin

from .models import Product, Category


class NoDeleteAdminMixin:
    def has_delete_permission(self, request, obj=None):
        return False


class ProductAdmin(NoDeleteAdminMixin, admin.ModelAdmin):
    list_editable = ('quantity',)
    list_display = ('title', 'id', 'quantity', 'price', 'discount')


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
