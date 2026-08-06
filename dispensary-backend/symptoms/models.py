from django.db import models
from django.conf import settings
from students.models import Student
from health_records.models import HealthRecord


class Symptom(models.Model):
    class Severity(models.TextChoices):
        MILD = 'MILD', 'Mild'
        MODERATE = 'MODERATE', 'Moderate'
        SEVERE = 'SEVERE', 'Severe'

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        ATTENDED = 'ATTENDED', 'Attended'

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='symptoms',
    )
    health_record = models.ForeignKey(
        HealthRecord,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='symptoms',
    )
    description = models.TextField()
    severity = models.CharField(max_length=10, choices=Severity.choices, default=Severity.MILD)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)

    reported_at = models.DateTimeField(auto_now_add=True)
    attended_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-reported_at']

    def __str__(self):
        return f"{self.student.admission_number} - {self.description[:30]} ({self.status})"