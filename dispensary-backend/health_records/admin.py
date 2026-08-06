from django.contrib import admin
from .models import HealthRecord


@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    list_display = ['student', 'visit_date', 'diagnosis', 'follow_up_required', 'recorded_by']
    search_fields = ['student__admission_number', 'diagnosis']
    list_filter = ['follow_up_required', 'visit_date']