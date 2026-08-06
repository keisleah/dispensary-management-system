from django.contrib import admin
from .models import Symptom


@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
    list_display = ['student', 'description', 'severity', 'status', 'reported_at']
    search_fields = ['student__admission_number', 'description']
    list_filter = ['severity', 'status']