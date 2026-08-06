import graphene
from graphene_django import DjangoObjectType
from django.core.exceptions import PermissionDenied
from django.utils import timezone
from .models import Symptom
from health_records.models import HealthRecord


class SymptomType(DjangoObjectType):
    class Meta:
        model = Symptom
        fields = '__all__'


class ReportSymptom(graphene.Mutation):
    class Arguments:
        description = graphene.String(required=True)
        severity = graphene.String(required=False)

    symptom = graphene.Field(SymptomType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, description, severity=None):
        user = info.context.user
        if user.is_anonymous or not hasattr(user, 'student_profile'):
            raise PermissionDenied("Student profile required")

        symptom = Symptom.objects.create(
            student=user.student_profile,
            description=description,
            severity=severity or Symptom.Severity.MILD,
        )
        return ReportSymptom(symptom=symptom, success=True, errors=None)


class AttendSymptom(graphene.Mutation):
    class Arguments:
        symptom_id = graphene.ID(required=True)
        health_record_id = graphene.ID(required=False)

    symptom = graphene.Field(SymptomType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, symptom_id, health_record_id=None):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        symptom = Symptom.objects.filter(id=symptom_id).first()
        if not symptom:
            return AttendSymptom(success=False, errors=["Symptom not found"], symptom=None)

        if health_record_id:
            health_record = HealthRecord.objects.filter(id=health_record_id).first()
            if not health_record:
                return AttendSymptom(success=False, errors=["Health record not found"], symptom=None)
            symptom.health_record = health_record

        symptom.status = Symptom.Status.ATTENDED
        symptom.attended_at = timezone.now()
        symptom.save()

        return AttendSymptom(symptom=symptom, success=True, errors=None)


class Query(graphene.ObjectType):
    symptoms_status = graphene.String(default_value="symptoms app ready")
    my_symptoms = graphene.List(SymptomType)
    all_symptoms = graphene.List(SymptomType)
    pending_symptoms = graphene.List(SymptomType)
    symptoms_by_student = graphene.List(SymptomType, student_id=graphene.ID(required=True))

    def resolve_my_symptoms(self, info):
        user = info.context.user
        if user.is_anonymous or not hasattr(user, 'student_profile'):
            return Symptom.objects.none()
        return Symptom.objects.filter(student=user.student_profile)

    def resolve_all_symptoms(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Symptom.objects.all()

    def resolve_pending_symptoms(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Symptom.objects.filter(status=Symptom.Status.PENDING)

    def resolve_symptoms_by_student(self, info, student_id):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Symptom.objects.filter(student_id=student_id)


class Mutation(graphene.ObjectType):
    report_symptom = ReportSymptom.Field()
    attend_symptom = AttendSymptom.Field()