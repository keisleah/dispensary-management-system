from django.contrib import admin
from .models import Medicine, DispensingRecord


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'quantity_in_stock', 'unit', 'reorder_level', 'expiry_date']
    search_fields = ['name']


@admin.register(DispensingRecord)
class DispensingRecordAdmin(admin.ModelAdmin):
    list_display = ['medicine', 'quantity_dispensed', 'dispensed_by', 'dispensed_at']
    search_fields = ['medicine__name']