import graphene
from graphene_django import DjangoObjectType
from django.core.exceptions import PermissionDenied
from .models import HealthRecord
from students.models import Student


class HealthRecordType(DjangoObjectType):
    class Meta:
        model = HealthRecord
        fields = '__all__'


class CreateHealthRecord(graphene.Mutation):
    class Arguments:
        student_id = graphene.ID(required=True)
        diagnosis = graphene.String(required=False)
        treatment_notes = graphene.String(required=False)
        follow_up_required = graphene.Boolean(required=False)
        follow_up_date = graphene.Date(required=False)

    health_record = graphene.Field(HealthRecordType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, student_id, **kwargs):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        student = Student.objects.filter(id=student_id).first()
        if not student:
            return CreateHealthRecord(success=False, errors=["Student not found"], health_record=None)

        record = HealthRecord.objects.create(
            student=student,
            recorded_by=user,
            **kwargs,
        )
        return CreateHealthRecord(health_record=record, success=True, errors=None)


class UpdateHealthRecord(graphene.Mutation):
    class Arguments:
        record_id = graphene.ID(required=True)
        diagnosis = graphene.String(required=False)
        treatment_notes = graphene.String(required=False)
        follow_up_required = graphene.Boolean(required=False)
        follow_up_date = graphene.Date(required=False)

    health_record = graphene.Field(HealthRecordType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, record_id, **kwargs):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        record = HealthRecord.objects.filter(id=record_id).first()
        if not record:
            return UpdateHealthRecord(success=False, errors=["Record not found"], health_record=None)

        for field, value in kwargs.items():
            if value is not None:
                setattr(record, field, value)
        record.save()

        return UpdateHealthRecord(health_record=record, success=True, errors=None)


class Query(graphene.ObjectType):
    health_records_status = graphene.String(default_value="health_records app ready")
    my_health_records = graphene.List(HealthRecordType)
    all_health_records = graphene.List(HealthRecordType)
    health_records_by_student = graphene.List(HealthRecordType, student_id=graphene.ID(required=True))

    def resolve_my_health_records(self, info):
        user = info.context.user
        if user.is_anonymous or not hasattr(user, 'student_profile'):
            return HealthRecord.objects.none()
        return HealthRecord.objects.filter(student=user.student_profile)

    def resolve_all_health_records(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return HealthRecord.objects.all()

    def resolve_health_records_by_student(self, info, student_id):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return HealthRecord.objects.filter(student_id=student_id)


class Mutation(graphene.ObjectType):
    create_health_record = CreateHealthRecord.Field()
    update_health_record = UpdateHealthRecord.Field()