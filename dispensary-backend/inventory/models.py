from django.db import models
from django.conf import settings
from health_records.models import HealthRecord


class Medicine(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True)
    quantity_in_stock = models.PositiveIntegerField(default=0)
    unit = models.CharField(max_length=30, blank=True)  # e.g. "tablets", "ml", "bottles"
    reorder_level = models.PositiveIntegerField(default=10)
    expiry_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.quantity_in_stock} {self.unit})"

    @property
    def is_low_stock(self):
        return self.quantity_in_stock <= self.reorder_level


class DispensingRecord(models.Model):
    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE,
        related_name='dispensing_records',
    )
    health_record = models.ForeignKey(
        HealthRecord,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='dispensing_records',
    )
    dispensed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='dispensed_medicines',
    )
    quantity_dispensed = models.PositiveIntegerField()
    dispensed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dispensed_at']

    def __str__(self):
        return f"{self.quantity_dispensed} x {self.medicine.name} on {self.dispensed_at.strftime('%Y-%m-%d')}"