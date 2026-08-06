from django.db import models
from django.conf import settings
from students.models import Student


class HealthRecord(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='health_records',
    )
    recorded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='recorded_health_records',
    )
    visit_date = models.DateTimeField(auto_now_add=True)
    diagnosis = models.CharField(max_length=255, blank=True)
    treatment_notes = models.TextField(blank=True)
    follow_up_required = models.BooleanField(default=False)
    follow_up_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-visit_date']

    def __str__(self):
        return f"{self.student.admission_number} - {self.visit_date.strftime('%Y-%m-%d')}"